/**
 * Provenix SDK - Official JavaScript/TypeScript client
 *
 * @example
 * ```typescript
 * import { ProvenixClient } from '@provenix/sdk'
 *
 * const client = new ProvenixClient({ apiKey: 'prov_live_...' })
 *
 * // Sign text
 * const manifest = await client.sign('Hello world')
 *
 * // Verify text
 * const result = await client.verify('Hello world', manifest)
 * console.log(result.valid) // true
 * ```
 */

export { ProvenixClient } from './client'
export type { ProvenixClientConfig } from './client'
export * from '@provenix/shared'
