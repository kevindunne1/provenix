/**
 * Core manifest structure for cryptographic text provenance
 */
export interface Manifest {
  /** SHA-256 hash of the original text */
  hash: string
  /** ISO 8601 timestamp when manifest was created */
  timestamp: string
  /** Optional metadata about authorship and context */
  metadata?: Record<string, unknown>
  /** Manifest schema version */
  version: string
}

/**
 * Signed manifest returned from /sign endpoint
 */
export interface SignedManifest {
  hash: string
  signature: string
  manifest: Manifest
  publicKey: string
}

/**
 * Verification result from /verify endpoint
 */
export interface VerificationResult {
  /** Whether verification succeeded overall */
  valid: boolean
  /** Whether text hash matches manifest hash */
  hashMatch: boolean
  /** Whether signature is cryptographically valid */
  signatureValid: boolean
  /** Original manifest timestamp */
  timestamp: string
  /** Original metadata */
  metadata?: Record<string, unknown>
  /** Optional warning messages (e.g., stale timestamp) */
  warnings?: string[]
}
