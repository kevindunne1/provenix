/**
 * Standard error codes across Provenix API
 */
export enum ErrorCode {
  // Authentication
  INVALID_API_KEY = 'INVALID_API_KEY',
  MISSING_API_KEY = 'MISSING_API_KEY',
  API_KEY_REVOKED = 'API_KEY_REVOKED',

  // Rate Limiting
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',

  // Validation
  INVALID_REQUEST = 'INVALID_REQUEST',
  TEXT_TOO_LARGE = 'TEXT_TOO_LARGE',
  METADATA_TOO_LARGE = 'METADATA_TOO_LARGE',

  // Verification
  VERIFICATION_FAILED = 'VERIFICATION_FAILED',
  HASH_MISMATCH = 'HASH_MISMATCH',
  SIGNATURE_INVALID = 'SIGNATURE_INVALID',
  MANIFEST_INVALID = 'MANIFEST_INVALID',

  // Server
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  SIGNING_FAILED = 'SIGNING_FAILED',
}

/**
 * Standard error messages
 */
export const ErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.INVALID_API_KEY]: 'API key is invalid or has been revoked',
  [ErrorCode.MISSING_API_KEY]: 'API key is required for this endpoint',
  [ErrorCode.API_KEY_REVOKED]: 'API key has been revoked',
  [ErrorCode.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded. Please try again later.',
  [ErrorCode.INVALID_REQUEST]: 'Invalid request payload',
  [ErrorCode.TEXT_TOO_LARGE]: 'Text exceeds maximum size limit (1MB)',
  [ErrorCode.METADATA_TOO_LARGE]: 'Metadata exceeds maximum size limit (10KB)',
  [ErrorCode.VERIFICATION_FAILED]: 'Verification failed',
  [ErrorCode.HASH_MISMATCH]: 'Text hash does not match manifest',
  [ErrorCode.SIGNATURE_INVALID]: 'Signature verification failed',
  [ErrorCode.MANIFEST_INVALID]: 'Manifest structure is invalid',
  [ErrorCode.INTERNAL_ERROR]: 'Internal server error',
  [ErrorCode.DATABASE_ERROR]: 'Database operation failed',
  [ErrorCode.SIGNING_FAILED]: 'Failed to sign manifest',
}
