import { z } from 'zod'

/**
 * Validation schemas using Zod
 * Shared between API and SDK for consistent validation
 */

// ----- Sign Request Schema -----
export const SignRequestSchema = z.object({
  text: z.string().min(1, 'Text cannot be empty').max(1_000_000, 'Text exceeds 1MB limit'),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export type SignRequestInput = z.infer<typeof SignRequestSchema>

// ----- Verify Request Schema -----
export const ManifestSchema = z.object({
  content: z.string(),
  hash: z.string().min(1),
  timestamp: z.string().datetime(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  version: z.string(),
})

export const VerifyRequestSchema = z.object({
  text: z.string().min(1).optional(),
  signature: z.string().min(1),
  manifest: ManifestSchema,
})

export type VerifyRequestInput = z.infer<typeof VerifyRequestSchema>

// ----- API Key Management -----
export const CreateApiKeySchema = z.object({
  name: z.string().max(100).optional(),
})

export type CreateApiKeyInput = z.infer<typeof CreateApiKeySchema>

// ----- Metadata Constraints -----
export function validateMetadataSize(metadata: Record<string, unknown>): boolean {
  const metadataJson = JSON.stringify(metadata)
  const sizeInBytes = new TextEncoder().encode(metadataJson).length
  return sizeInBytes <= 10240 // 10 KB limit
}
