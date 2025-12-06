# Backend Implementation: Usage Tracking & First Call Celebration

## Overview
This document outlines the backend changes needed to support the animated dashboard components built in Stage 3.

## Database Schema Changes

### 1. Add usage tracking columns to `users` table

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS signing_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS first_api_call_success BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS tier VARCHAR(50) DEFAULT 'Free';
```

**Tier limits (reference):**
- Free: 200 signing + 200 verification requests/month
- Starter: 5,000 + 5,000
- Growth: 25,000 + 25,000
- Pro: 100,000 + 100,000
- Enterprise: Custom

### 2. Optional: Create `usage_events` table for detailed tracking

```sql
CREATE TABLE IF NOT EXISTS usage_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(20) NOT NULL, -- 'sign' or 'verify'
    api_key_id UUID REFERENCES api_keys(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    INDEX idx_user_created (user_id, created_at)
);
```

## API Endpoints

### 1. GET /api/v1/usage

**Purpose:** Return current usage stats for authenticated user

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "signing": {
    "current": 127,
    "limit": 200
  },
  "verification": {
    "current": 89,
    "limit": 200
  },
  "tier": "Free",
  "first_api_call_success": true
}
```

**Implementation (FastAPI):**

```python
# packages/api/app/routers/usage.py
from fastapi import APIRouter, Depends
from app.auth import get_current_user
from app.models import User
from app.database import get_db

router = APIRouter(prefix="/api/v1/usage", tags=["usage"])

TIER_LIMITS = {
    "Free": {"signing": 200, "verification": 200},
    "Starter": {"signing": 5000, "verification": 5000},
    "Growth": {"signing": 25000, "verification": 25000},
    "Pro": {"signing": 100000, "verification": 100000},
    "Enterprise": {"signing": 999999999, "verification": 999999999},
}

@router.get("")
async def get_usage(
    current_user: User = Depends(get_current_user),
    db = Depends(get_db)
):
    tier = current_user.tier or "Free"
    limits = TIER_LIMITS.get(tier, TIER_LIMITS["Free"])

    return {
        "signing": {
            "current": current_user.signing_count or 0,
            "limit": limits["signing"]
        },
        "verification": {
            "current": current_user.verification_count or 0,
            "limit": limits["verification"]
        },
        "tier": tier,
        "first_api_call_success": current_user.first_api_call_success or False
    }
```

**Register router in main app:**
```python
# packages/api/app/main.py
from app.routers import usage

app.include_router(usage.router)
```

### 2. Increment usage counters

**Modify existing sign/verify endpoints:**

```python
# packages/api/app/routers/sign.py
@router.post("/sign")
async def sign_content(
    request: SignRequest,
    api_key: str = Depends(verify_api_key),
    db = Depends(get_db)
):
    # ... existing signing logic ...

    # Increment signing count
    user = db.query(User).filter(User.id == api_key.user_id).first()
    user.signing_count = (user.signing_count or 0) + 1

    # Mark first success
    if not user.first_api_call_success:
        user.first_api_call_success = True

    db.commit()

    return result
```

```python
# packages/api/app/routers/verify.py
@router.post("/verify")
async def verify_content(
    request: VerifyRequest,
    api_key: str = Depends(verify_api_key),  # Optional: track if API key used
    db = Depends(get_db)
):
    # ... existing verification logic ...

    # Increment verification count (if API key provided)
    if api_key:
        user = db.query(User).filter(User.id == api_key.user_id).first()
        user.verification_count = (user.verification_count or 0) + 1
        db.commit()

    return result
```

## Rate Limiting Enhancement

**Add tier-based rate limiting:**

```python
# packages/api/app/middleware/rate_limit.py
from fastapi import HTTPException

async def check_usage_limit(user: User, operation: str):
    """
    Check if user has exceeded their tier limit
    operation: 'signing' or 'verification'
    """
    tier = user.tier or "Free"
    limits = TIER_LIMITS.get(tier, TIER_LIMITS["Free"])

    current_count = getattr(user, f"{operation}_count", 0)
    limit = limits[operation]

    if current_count >= limit:
        raise HTTPException(
            status_code=429,
            detail=f"Usage limit exceeded. Upgrade to increase your {operation} limit."
        )
```

**Apply to endpoints:**
```python
@router.post("/sign")
async def sign_content(
    request: SignRequest,
    api_key: str = Depends(verify_api_key),
    db = Depends(get_db)
):
    user = db.query(User).filter(User.id == api_key.user_id).first()

    # Check limit BEFORE processing
    await check_usage_limit(user, "signing")

    # ... proceed with signing ...
```

## Monthly Reset (Cron Job)

**Create scheduled task to reset counters:**

```python
# packages/api/app/tasks/reset_usage.py
from app.database import get_db
from app.models import User
from datetime import datetime

async def reset_monthly_usage():
    """
    Reset signing_count and verification_count for all users
    Run this on the 1st of each month
    """
    db = next(get_db())

    db.query(User).update({
        "signing_count": 0,
        "verification_count": 0
    })

    db.commit()

    print(f"[{datetime.now()}] Monthly usage counters reset for all users")
```

**Setup cron (Railway):**
```bash
# Add to Railway cron jobs or use APScheduler
# Cron: 0 0 1 * * (At 00:00 on day 1 of every month)
```

**Or use APScheduler:**
```python
# packages/api/app/main.py
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.tasks.reset_usage import reset_monthly_usage

scheduler = AsyncIOScheduler()

@app.on_event("startup")
async def startup_event():
    # Reset usage on 1st of every month at midnight
    scheduler.add_job(reset_monthly_usage, 'cron', day=1, hour=0, minute=0)
    scheduler.start()

@app.on_event("shutdown")
async def shutdown_event():
    scheduler.shutdown()
```

## Frontend Integration

**Update dashboard to fetch real data:**

```typescript
// packages/dashboard/src/app/dashboard/page.tsx

useEffect(() => {
  const storedToken = localStorage.getItem('provenix_token')
  setToken(storedToken)

  if (storedToken) {
    fetchKeys(storedToken)
    fetchUsage(storedToken) // UNCOMMENT THIS

    // ... celebration logic ...
  }
}, [])

async function fetchUsage(authToken: string) {
  try {
    const response = await fetch(`${API_URL}/api/v1/usage`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    })
    if (response.ok) {
      const data = await response.json()
      setUsage(data)

      // Trigger celebration if first success
      if (data.first_api_call_success) {
        const hasSeenCelebration = localStorage.getItem('provenix_seen_celebration')
        if (!hasSeenCelebration) {
          setShowCelebration(true)
          localStorage.setItem('provenix_seen_celebration', 'true')
        }
      }
    }
  } catch (err) {
    console.error('Failed to fetch usage:', err)
  }
}
```

**Re-enable setUsage:**
```typescript
const [usage, setUsage] = useState<UsageData>({ ... })
```

## Testing

**Manual test sequence:**

1. **Create user and API key**
2. **Make signing request:**
   ```bash
   curl -X POST https://provenixapi-production.up.railway.app/api/v1/sign \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"text": "Test content"}'
   ```
3. **Check usage endpoint:**
   ```bash
   curl https://provenixapi-production.up.railway.app/api/v1/usage \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```
4. **Verify dashboard shows:**
   - Signing count: 1
   - Progress bar animated to ~0.5% (1/200)
   - FirstCallCelebration banner (first time only)

## Migration Checklist

- [ ] Add database columns (`signing_count`, `verification_count`, `first_api_call_success`, `tier`)
- [ ] Create GET /api/v1/usage endpoint
- [ ] Increment counters in sign/verify endpoints
- [ ] Add tier-based rate limiting
- [ ] Set up monthly reset cron job
- [ ] Update frontend to fetch real usage data
- [ ] Test with real API calls
- [ ] Deploy to production

## Priority Order

1. **Database schema** (5 min) - Add columns
2. **GET /api/v1/usage** (10 min) - Read endpoint
3. **Increment counters** (15 min) - Modify sign/verify
4. **Frontend integration** (5 min) - Uncomment fetchUsage
5. **Rate limiting** (15 min) - Prevent overage
6. **Monthly reset** (10 min) - Scheduled task

**Total estimated time:** ~1 hour

---

## Notes

- Mock data in dashboard: `signing: 127/200 (63%)`, `verification: 89/200 (44%)`
- This shows upgrade CTA and orange progress bar
- Real data will replace this once backend is live
- FirstCallCelebration stored in localStorage to avoid showing repeatedly
