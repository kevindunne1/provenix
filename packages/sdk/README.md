# @provenix/sdk

Official JavaScript/TypeScript SDK for [Provenix](https://provenix.dev) - cryptographic text provenance.

**AI detection is guesswork. Provenance is evidence.**

## Installation

```bash
npm install @provenix/sdk
# or
pnpm add @provenix/sdk
# or
yarn add @provenix/sdk
```

## Quick Start

```typescript
import { ProvenixClient } from '@provenix/sdk'

// Initialize client with API key
const client = new ProvenixClient({
  apiKey: 'prov_live_...'
})

// Sign text
const manifest = await client.sign('Hello world', {
  author: 'user@example.com'
})

// Verify text
const result = await client.verify('Hello world', manifest)
console.log(result.valid) // true
```

## API Reference

### `ProvenixClient`

#### `sign(text: string, metadata?: object): Promise<SignResponse>`

Generate cryptographic manifest for text.

**Parameters:**
- `text` - Text to sign (max 1MB)
- `metadata` - Optional metadata object (max 10KB)

**Returns:**
```typescript
{
  hash: string           // SHA-256 hash of text
  signature: string      // Ed25519 signature
  manifest: {
    hash: string
    timestamp: string    // ISO 8601
    metadata?: object
    version: string
  }
  publicKey: string      // For verification
}
```

#### `verify(text: string, manifest: SignResponse): Promise<VerifyResponse>`

Verify text against signed manifest.

**Parameters:**
- `text` - Text to verify
- `manifest` - Previously generated manifest

**Returns:**
```typescript
{
  valid: boolean         // Overall verification result
  hashMatch: boolean     // Text hash matches manifest
  signatureValid: boolean // Signature is valid
  timestamp: string
  metadata?: object
  warnings?: string[]    // Optional warnings (e.g., stale timestamp)
}
```

## Error Handling

```typescript
import { ProvenixClient, ProvenixError } from '@provenix/sdk'

try {
  const manifest = await client.sign(text)
} catch (error) {
  if (error instanceof ProvenixError) {
    console.error(`Error ${error.code}: ${error.message}`)
  }
}
```

## License

MIT
