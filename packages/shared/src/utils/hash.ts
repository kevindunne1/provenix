/**
 * SHA-256 hashing utility
 * Works in both Node.js and browser environments
 */

/**
 * Compute SHA-256 hash of text (Node.js)
 */
export async function hashText(text: string): Promise<string> {
  // Node.js implementation
  if (typeof window === 'undefined') {
    const crypto = await import('node:crypto')
    return crypto.createHash('sha256').update(text).digest('hex')
  }

  // Browser implementation (Web Crypto API)
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Normalize text before hashing (consistent newlines, trim trailing whitespace)
 */
export function normalizeText(text: string): string {
  return text
    .replace(/\r\n/g, '\n') // Normalize Windows line endings
    .replace(/\r/g, '\n') // Normalize old Mac line endings
    .trim() // Remove leading/trailing whitespace
}
