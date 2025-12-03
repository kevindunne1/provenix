/**
 * Cryptographic signing and verification utilities
 */
import * as ed from '@noble/ed25519'
import { sha512 } from '@noble/hashes/sha2.js'
import crypto from 'node:crypto'

// Configure SHA-512 for ed25519 (required by the library)
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m))

const privateKeyEnv = process.env.ED25519_PRIVATE_KEY
const publicKeyEnv = process.env.ED25519_PUBLIC_KEY

if (!privateKeyEnv || !publicKeyEnv) {
  throw new Error('ED25519_PRIVATE_KEY and ED25519_PUBLIC_KEY must be set in environment')
}

// Type-safe after runtime validation
const privateKey: string = privateKeyEnv
const publicKey: string = publicKeyEnv

/**
 * Sign a message using Ed25519
 */
export async function signMessage(message: string): Promise<string> {
  const messageBytes = new TextEncoder().encode(message)
  const privateKeyBytes = Buffer.from(privateKey, 'hex')
  const signatureBytes = await ed.sign(messageBytes, privateKeyBytes)
  return Buffer.from(signatureBytes).toString('hex')
}

/**
 * Verify an Ed25519 signature
 */
export async function verifySignature(
  message: string,
  signature: string,
  publicKeyHex: string
): Promise<boolean> {
  try {
    const messageBytes = new TextEncoder().encode(message)
    const signatureBytes = Buffer.from(signature, 'hex')
    const publicKeyBytes = Buffer.from(publicKeyHex, 'hex')
    return await ed.verify(signatureBytes, messageBytes, publicKeyBytes)
  } catch {
    return false
  }
}

/**
 * Get the server's public key
 */
export function getPublicKey(): string {
  return publicKey
}

/**
 * Compute SHA-256 hash of text (synchronous Node.js version)
 */
export function hashText(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex')
}
