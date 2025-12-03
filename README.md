# Provenix

**AI detection is guesswork. Provenance is evidence.**

Provenix is a developer-first API for cryptographic text provenance. It provides deterministic, tamper-evident proof of text authorship and integrity—not probabilistic AI detection.

---

## ⚠️ Project Status: Discovery & Architecture Phase

**This repository contains production-ready architecture scaffolding.**

**No implementation code has been written yet.** Actual development awaits discovery validation:

- ✅ Architecture designed and documented
- ✅ Repository structure scaffolded
- ✅ Technology stack selected
- 🔄 Discovery interviews in progress (target: 10-12 developers)
- ⏳ API implementation blocked until validation

**Validation criteria:**
- Problem severity ≥ 6/10 (average across interviews)
- ≥ 4 developers express integration willingness within 90 days
- ≥ 1 LMS workflow developer confirms real use case

**If discovery fails to validate, this project will be paused or pivoted.**

---

## What is Provenix?

Provenix provides cryptographic signing and verification for text:

1. **Sign**: Generate SHA-256 hash + Ed25519 signature for any text
2. **Verify**: Prove text hasn't been modified since signing
3. **Audit**: Maintain tamper-evident record of provenance

**Use cases:**
- Academic integrity (student submissions, essays)
- Content attribution (journalism, publishing)
- Contract signing (legal, business documents)
- LMS integrations (assessment workflows)
- AI writing tools (transparent AI assistance)

**Not an AI detector.** Provenix doesn't guess whether AI wrote something—it proves who signed it and when.

---

## Repository Structure

This monorepo contains six packages:

```
provenix/
├── packages/
│   ├── api/          # Fastify backend (Railway deployment)
│   ├── sdk/          # JavaScript/TypeScript SDK (npm package)
│   ├── dashboard/    # Developer portal (Next.js on Vercel)
│   ├── demo/         # Public demo (Vite on Vercel)
│   ├── widget/       # Embeddable verification widget
│   └── shared/       # Shared types, validation, utilities
├── docker-compose.yml
├── pnpm-workspace.yaml
└── README.md (you are here)
```

---

## Technology Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| **Backend** | Fastify + TypeScript | 2-3x faster than Express, type-safe |
| **Database** | PostgreSQL (Prisma ORM) | ACID compliance, type-safe queries |
| **Crypto** | @noble/ed25519 | Modern, audited, zero dependencies |
| **Frontend** | React (Next.js + Vite) | Fast development, excellent DX |
| **Hosting** | Railway (API) + Vercel (frontends) | Zero-friction deployment, free tiers |
| **Testing** | Vitest | ESM-native, faster than Jest |
| **Monorepo** | pnpm workspaces + Turbo | Shared types, coordinated releases |

**Cost:** £0/month for MVP (free tiers only)

---

## Local Development Setup

### Prerequisites

- Node.js 20+
- pnpm 8+
- Docker (for local Postgres)

### 1. Clone and Install

```bash
git clone https://github.com/kevindunne1/provenix.git
cd provenix
pnpm install
```

### 2. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your values. Critical variables:

- `DATABASE_URL`: PostgreSQL connection string
- `ED25519_PRIVATE_KEY`: Signing key (generate with script)
- `ED25519_PUBLIC_KEY`: Public verification key
- `JWT_SECRET`: Session secret (generate: `openssl rand -base64 32`)

### 3. Generate Ed25519 Keypair

```bash
pnpm --filter=api generate-keypair
```

Copy output to `.env` file.

⚠️ **Never commit private key to git.** Store in Railway secrets for production.

### 4. Start Local Database

```bash
docker-compose up -d
```

This starts PostgreSQL on `localhost:5432`.

### 5. Run Database Migrations

```bash
pnpm --filter=api prisma migrate dev
```

### 6. Start Development Servers

**Option A: All services in parallel (recommended)**

```bash
pnpm dev
```

This starts:
- API: `http://localhost:3001`
- Dashboard: `http://localhost:3000`
- Demo: `http://localhost:5173`

**Option B: Individual services**

```bash
# Terminal 1: API
pnpm --filter=api dev

# Terminal 2: Dashboard
pnpm --filter=dashboard dev

# Terminal 3: Demo
pnpm --filter=demo dev
```

---

## Package Commands

### API (`packages/api`)

```bash
# Development
pnpm --filter=api dev

# Build for production
pnpm --filter=api build

# Run tests
pnpm --filter=api test

# Database operations
pnpm --filter=api prisma:studio    # Visual DB editor
pnpm --filter=api prisma:migrate   # Create migration
pnpm --filter=api generate-keypair # Generate Ed25519 keys
```

### SDK (`packages/sdk`)

```bash
# Build SDK
pnpm --filter=sdk build

# Run tests
pnpm --filter=sdk test

# Publish to npm (after validation)
# pnpm --filter=sdk publish
```

### Dashboard (`packages/dashboard`)

```bash
# Development
pnpm --filter=dashboard dev

# Build
pnpm --filter=dashboard build
```

### Demo (`packages/demo`)

```bash
# Development
pnpm --filter=demo dev

# Build
pnpm --filter=demo build
```

---

## Architecture Overview

### Sign Flow

```
1. Client → POST /api/v1/sign
   Body: { text: "content", metadata: {...} }

2. API computes SHA-256 hash

3. API signs manifest with Ed25519 private key

4. API stores hash + manifest (NOT raw text)

5. API returns signed manifest
   { hash, signature, manifest, publicKey }
```

### Verify Flow

```
1. Client → POST /api/v1/verify
   Body: { text: "content", signature: "...", manifest: {...} }

2. API recomputes hash of submitted text

3. API checks hash matches manifest

4. API verifies signature with public key

5. API returns verification result
   { valid: true/false, hashMatch, signatureValid, ... }
```

### Data Storage (GDPR-Compliant)

**Stored:**
- SHA-256 hashes (irreversible)
- Signed manifests (metadata only)
- API usage logs (no text)

**Never stored:**
- Raw text content
- Full API keys (bcrypt hashed only)

---

## MVP Implementation Phases

**Total estimated time: 30-50 hours (solo developer)**

### Phase 1: Core API (10-12 hours)
- `/sign` and `/verify` endpoints
- Prisma schema + migrations
- Ed25519 signing/verification
- API key authentication
- Tests

**Success:** `curl` commands successfully sign/verify text

### Phase 2: JavaScript SDK (4-6 hours)
- `ProvenixClient` class
- `sign()` and `verify()` methods
- Error handling
- README + examples
- Publish to npm

**Success:** Developers can `npm install @provenix/sdk` and integrate in 2 lines

### Phase 3: Public Demo (6-8 hours)
- Sign form (textarea + button)
- Verify form (manifest + text input)
- Visual feedback (✅ valid / ❌ tampered)
- Deploy to Vercel

**Success:** Non-technical user signs/verifies text in <60 seconds

### Phase 4: Developer Dashboard (8-10 hours)
- Email/password auth
- API key CRUD
- Usage stats (requests per day)
- Deploy to Vercel

**Success:** Developer creates account, generates API key, views usage

### Phase 5: Verification Widget (4-6 hours) [Optional]
- Web Component (`<provenix-widget>`)
- Client-side signature verification
- Embeddable badge
- CDN deployment

---

## Discovery Validation Framework

**Before Phase 1 begins, these conditions must be met:**

### Quantitative Criteria

- [ ] 10-12 developer conversations completed
- [ ] Average problem severity ≥ 6/10
- [ ] ≥ 4 developers express integration willingness within 90 days
- [ ] ≥ 1 LMS developer confirms specific use case
- [ ] ≥ 3 developers indicate budget availability

### Qualitative Criteria

- [ ] Clear use case identified (LMS submissions, contract signing, etc.)
- [ ] Differentiation from C2PA validated
- [ ] Pricing model validated (per-call vs monthly vs freemium)
- [ ] Distribution channel identified (how do developers find this?)

### Kill Criteria (Abandon if True)

- Average severity < 6/10
- Fewer than 4 integration-willing developers in 90 days
- No LMS developer confirms use case
- Pricing willingness < £10/month per developer
- Stronger opportunity emerges from discovery

---

## Contributing

**Contributions are not accepted until MVP is validated.**

After validation:
- Contribution guidelines will be added
- Issues and PRs will be monitored
- MIT license permits forking and modification

---

## License

MIT License - see [LICENSE](./LICENSE) file.

**Why MIT?** Developer tools live or die by ecosystem adoption. MIT maximises usage and reduces friction.

---

## Contact

**Kevin Dunne**
- GitHub: [@kevindunne1](https://github.com/kevindunne1)
- Email: tbc

---

## Acknowledgments

**Architecture informed by:**
- Forma's DIBB strategic framework (Data → Insights → Beliefs → Bets)
- @noble/ed25519 cryptography library (Ethereum Foundation)
- Fastify performance benchmarks
- Railway and Vercel deployment best practices

**Built with discipline:**
- No code written before validation
- Clear kill criteria
- Optimised for solo founder velocity (6-10 hours/week)
- Production-ready architecture awaiting green light

---

**Status:** 🟡 Awaiting Discovery Validation

Last updated: 2025-12-03
