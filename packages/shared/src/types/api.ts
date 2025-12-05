import type { Manifest } from './manifest.js'

/**
 * API request/response types
 */

// ----- Sign Endpoint -----
export interface SignRequest {
  text: string
  metadata?: Record<string, unknown>
}

export interface SignResponse {
  manifestId: string
  hash: string
  signature: string
  manifest: Manifest
  publicKey: string
  verificationUrl: string
}

// ----- Verify Endpoint -----
export interface VerifyRequest {
  text: string
  signature: string
  manifest: Manifest
}

export interface VerifyResponse {
  valid: boolean
  hashMatch: boolean
  signatureValid: boolean
  timestamp: string
  metadata?: Record<string, unknown>
  warnings?: string[]
}

// ----- API Key Management -----
export interface ApiKey {
  id: string
  keyPrefix: string
  name?: string
  createdAt: string
  lastUsedAt?: string
}

export interface CreateApiKeyRequest {
  name?: string
}

export interface CreateApiKeyResponse {
  apiKey: ApiKey
  /** Full API key (only shown once) */
  key: string
}

// ----- Usage Stats -----
export interface UsageStats {
  totalRequests: number
  signRequests: number
  verifyRequests: number
  periodStart: string
  periodEnd: string
}

// ----- Error Response -----
export interface ErrorResponse {
  error: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
}
