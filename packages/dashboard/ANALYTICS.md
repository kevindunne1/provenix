# Provenix Analytics Implementation

This document tracks what analytics events are implemented and what still needs backend instrumentation.

## ✅ Implemented (Frontend)

### Marketing Site Events
- [x] Page views (all pages: home, pricing, faq, help, etc.)
- [x] CTA clicks (Get Started, View Demo)
- [x] Scroll depth (50%, 90%)
- [x] Code snippet copy events

### Authentication Events
- [x] `signup_started` - When user toggles to signup form
- [x] `signup_completed` - After successful signup
- [x] `login_success` - After successful login
- [x] `login_failed` - When login fails (includes reason)

## ⏳ Backend Events (Not Yet Implemented)

These events require backend instrumentation in the API layer:

### API Usage Events
- [ ] `api_sign_request` - When /sign endpoint is called
- [ ] `api_verify_request` - When /verify endpoint is called
- [ ] `api_error_signature_invalid` - Signature verification fails
- [ ] `api_error_rate_limit` - User hits rate limit
- [ ] `api_error_*` - Other API errors

**Implementation:** Add event emitters in `/packages/api/src/routes/` for sign/verify endpoints

### Dashboard Events
- [ ] `api_key_created` - User generates new API key
- [ ] `api_key_revoked` - User revokes API key
- [ ] `dashboard_first_visit` - User's first dashboard login

**Implementation:** Add tracking to dashboard API endpoints in `/packages/api/src/routes/dashboard`

### Billing Events
- [ ] `billing_checkout_started` - User clicks upgrade button
- [ ] `billing_checkout_completed` - Stripe webhook confirms payment
- [ ] `billing_plan_changed` - User upgrades/downgrades plan
- [ ] `billing_payment_failed` - Stripe webhook reports failed payment

**Implementation:** Add Stripe webhook handlers in `/packages/api/src/routes/billing/webhooks.ts`

### Documentation Events
- [ ] `docs_view_quickstart` - Viewed quickstart guide
- [ ] `docs_view_sdk_install` - Viewed SDK installation
- [ ] `docs_view_error_codes` - Viewed error code reference

**Implementation:** Add tracking when docs pages are created

### Public Verification Events
- [ ] `public_verify_page_view` - Someone views a verification page
- [ ] `public_verify_success` - Verification succeeds
- [ ] `public_verify_failure` - Verification fails (includes reason)

**Implementation:** Add to `/verify` page when built

## PostHog Configuration

**Setup:**
1. Sign up at https://app.posthog.com (free tier: 1M events/month)
2. Copy your project API key
3. Add to `.env`:
   ```
   NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

**Privacy:**
- Session recording is **disabled** (GDPR-friendly)
- Autocapture is **disabled** (explicit events only)
- No PII is collected (user IDs are hashed email addresses or UUIDs)

## Event Schema

All events follow this structure:

```json
{
  "event": "event_name",
  "properties": {
    "user_id": "optional_user_id",
    "timestamp": "auto_added_by_posthog",
    "metadata": { ... }
  }
}
```

## Adding New Events

**Frontend events:**
```typescript
import { analytics } from '@/lib/analytics'

// Simple event
analytics.track('custom_event')

// Event with properties
analytics.track('custom_event', {
  property1: 'value',
  property2: 123
})
```

**Backend events (when implemented):**
```typescript
// In API code
import { trackEvent } from '@provenix/shared/analytics'

trackEvent('api_sign_request', {
  userId: req.user.id,
  plan: req.user.plan,
})
```

## Metrics Dashboard

**Key funnels to track:**

1. **Signup Conversion:**
   - `home_view` → `cta_click` → `signup_started` → `signup_completed`

2. **Activation:**
   - `signup_completed` → `api_key_created` (within 10 minutes)

3. **Usage:**
   - `api_key_created` → `api_sign_request` (within 24 hours)

4. **Retention:**
   - `api_sign_request` (daily/weekly/monthly active users)

## Next Steps

1. ✅ PostHog installed and configured
2. ✅ Frontend events instrumented
3. ⏳ Set up PostHog project (you need to do this)
4. ⏳ Add backend event tracking (future task)
5. ⏳ Create PostHog dashboard with key funnels
