/**
 * Provenix API Client
 */
import type {
  SignRequest,
  SignResponse,
  VerifyRequest,
  VerifyResponse,
  ErrorResponse,
} from '@provenix/shared'

export interface ProvenixClientConfig {
  apiKey: string
  baseUrl?: string
}

export class ProvenixClient {
  private apiKey: string
  private baseUrl: string

  constructor(config: ProvenixClientConfig) {
    this.apiKey = config.apiKey
    this.baseUrl = config.baseUrl || 'https://api.provenix.dev'
  }

  /**
   * Sign text and generate cryptographic manifest
   *
   * @param text - Text to sign
   * @param metadata - Optional metadata (author, context, etc.)
   * @returns Signed manifest with signature
   *
   * @example
   * ```typescript
   * const manifest = await client.sign('My essay content', {
   *   author: 'student@university.edu',
   *   assignment: 'COMP101-Essay-1'
   * })
   * ```
   */
  async sign(text: string, metadata?: Record<string, unknown>): Promise<SignResponse> {
    const body: SignRequest = { text, metadata }

    const response = await this.request<SignResponse>('/api/v1/sign', {
      method: 'POST',
      body,
    })

    return response
  }

  /**
   * Verify text against signed manifest
   *
   * @param text - Text to verify
   * @param manifest - Previously generated manifest
   * @returns Verification result
   *
   * @example
   * ```typescript
   * const result = await client.verify('My essay content', manifest)
   * if (result.valid) {
   *   console.log('✅ Text is authentic')
   * } else {
   *   console.log('❌ Text has been modified')
   * }
   * ```
   */
  async verify(
    text: string,
    signedManifest: SignResponse
  ): Promise<VerifyResponse> {
    const body: VerifyRequest = {
      text,
      signature: signedManifest.signature,
      manifest: signedManifest.manifest,
    }

    const response = await this.request<VerifyResponse>('/api/v1/verify', {
      method: 'POST',
      body,
    })

    return response
  }

  /**
   * Make authenticated request to Provenix API
   */
  private async request<T>(
    endpoint: string,
    options: {
      method: 'GET' | 'POST' | 'DELETE'
      body?: unknown
    }
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const response = await fetch(url, {
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const error = (await response.json()) as ErrorResponse
      throw new ProvenixError(error.error.code, error.error.message)
    }

    return response.json() as Promise<T>
  }
}

/**
 * Custom error class for Provenix SDK
 */
export class ProvenixError extends Error {
  constructor(
    public code: string,
    message: string
  ) {
    super(message)
    this.name = 'ProvenixError'
  }
}
