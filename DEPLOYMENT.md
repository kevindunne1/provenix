# Provenix Deployment Guide

This guide walks you through deploying Provenix API to Railway and the demo to Vercel.

## Prerequisites

- ✅ Railway account (logged in via CLI)
- ✅ Vercel account (for demo deployment)
- ✅ Git repository (github.com/kevindunne1/provenix)

---

## Part 1: Deploy API to Railway

### Step 1: Create Railway Project

In your terminal, run:

```bash
cd /Users/kevin/pm-agents/provenix
railway init
```

- Select workspace: **Kevin Dunne's Projects**
- Choose: **Empty Project**
- Name: **provenix-api**

### Step 2: Add PostgreSQL Database

```bash
railway add --database postgresql
```

This creates a PostgreSQL instance and automatically sets the `DATABASE_URL` environment variable.

### Step 3: Link to API Service

```bash
cd packages/api
railway link
```

Select the **provenix-api** project you just created.

### Step 4: Set Environment Variables

Railway provides `DATABASE_URL` automatically. You need to add the others:

```bash
# Set Node environment
railway variables --set NODE_ENV=production

# Set port (Railway provides $PORT, but we'll default to 3001)
railway variables --set PORT=3001

# Set JWT secret (COPY FROM BELOW)
railway variables --set JWT_SECRET=<see-below>

# Set Ed25519 keys (COPY FROM BELOW)
railway variables --set ED25519_PRIVATE_KEY=<see-below>
railway variables --set ED25519_PUBLIC_KEY=<see-below>

# Set CORS origins (update after Vercel deployment)
railway variables --set CORS_ORIGIN=https://demo-provenix.vercel.app
```

**PRODUCTION SECRETS (generated for you):**

See the secrets printed below after running the generate-keypair command.

### Step 5: Run Database Migrations

Before deploying, run migrations against the Railway database:

```bash
# This uses the DATABASE_URL from Railway
railway run pnpm prisma migrate deploy
```

### Step 6: Deploy API

```bash
railway up
```

This builds and deploys your API. Railway will:
1. Install dependencies
2. Run `pnpm build` (generates Prisma client + compiles TypeScript)
3. Start the server with `pnpm start`

### Step 7: Get Your API URL

```bash
railway domain
```

Copy the URL (e.g., `provenix-api-production.up.railway.app`)

---

## Part 2: Create Production API Key

Once deployed, you need to create an API key for the demo:

```bash
# SSH into Railway container
railway run pnpm --filter=@provenix/api prisma:seed
```

This will output an API key like:
```
prov_test_abc123...
```

**Save this API key** - you'll need it for the demo deployment.

---

## Part 3: Deploy Demo to Vercel

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy Demo

```bash
cd /Users/kevin/pm-agents/provenix/packages/demo
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Link to existing project?** No
- **Project name:** provenix-demo
- **Directory:** `./` (current directory)
- **Override settings?** Yes
  - **Build command:** `pnpm build`
  - **Output directory:** `dist`
  - **Install command:** `pnpm install`

### Step 4: Set Environment Variables in Vercel

After deployment, set the environment variables:

```bash
# Set API URL (use your Railway URL from Step 7 above)
vercel env add VITE_API_URL production
# Enter: https://your-railway-url.up.railway.app

# Set API key (use the key from Part 2)
vercel env add VITE_API_KEY production
# Enter: prov_test_abc123...
```

**Important:** The demo currently hardcodes the test API key. You need to update it:

Edit `packages/demo/src/App.tsx`:

```typescript
// Replace this line:
apiKey: 'prov_test_2b220e07e2275a114670604ea4a0b3e1a9330e4d2c8edb2a',

// With environment variable:
apiKey: import.meta.env.VITE_API_KEY || 'fallback-key-for-local-dev',
```

Then redeploy:

```bash
vercel --prod
```

### Step 5: Update CORS in Railway

Now that you have your Vercel URL, update the CORS settings:

```bash
cd /Users/kevin/pm-agents/provenix/packages/api
railway variables --set CORS_ORIGIN=https://your-vercel-url.vercel.app
```

Redeploy the API:

```bash
railway up
```

---

## Part 4: Verify Deployment

### Test API Health

```bash
curl https://your-railway-url.up.railway.app/health
```

Should return:
```json
{"status":"ok","timestamp":"2025-12-03T..."}
```

### Test Demo

Open your Vercel URL in a browser:
- https://your-vercel-url.vercel.app

Try signing and verifying text.

---

## Cost Estimate

**Railway (API + PostgreSQL):**
- Free tier: $5/month credit
- Estimated usage: $5-10/month
- Charged only if you exceed free credit

**Vercel (Demo):**
- Free tier: Unlimited for hobby projects
- No cost expected

**Total: ~$0-5/month during discovery**

---

## Shutting Down (If Discovery Fails)

If discovery validation fails:

```bash
# Delete Railway project
railway project delete

# Delete Vercel project
vercel remove provenix-demo
```

---

## Troubleshooting

**API fails to start:**
- Check Railway logs: `railway logs`
- Verify all environment variables are set
- Confirm Prisma migrations ran successfully

**Demo can't connect to API:**
- Check CORS_ORIGIN includes your Vercel URL
- Verify VITE_API_URL is set correctly
- Check browser console for errors

**Database connection fails:**
- Ensure `railway add --database postgresql` was run
- Check `DATABASE_URL` is set: `railway variables`

---

## Next Steps

Once deployed:
1. Test the full sign → verify flow
2. Share demo URL with discovery targets
3. Monitor usage in Railway dashboard
4. Track API errors via Railway logs
