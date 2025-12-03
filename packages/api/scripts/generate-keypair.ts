/**
 * Generate Ed25519 keypair for signing manifests
 * Run once during initial setup: pnpm --filter=api generate-keypair
 */
import * as ed from '@noble/ed25519'
import { sha512 } from '@noble/hashes/sha2.js'

// Configure SHA-512 for ed25519 (required by the library)
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m))

async function generateKeypair() {
  console.log('🔐 Generating Ed25519 keypair for Provenix...\n')

  const privateKey = ed.utils.randomPrivateKey()
  const publicKey = await ed.getPublicKey(privateKey)

  const privateKeyHex = Buffer.from(privateKey).toString('hex')
  const publicKeyHex = Buffer.from(publicKey).toString('hex')

  console.log('✅ Keypair generated successfully!\n')
  console.log('Add these to your .env file:\n')
  console.log(`ED25519_PRIVATE_KEY=${privateKeyHex}`)
  console.log(`ED25519_PUBLIC_KEY=${publicKeyHex}\n`)
  console.log('⚠️  NEVER commit the private key to git!')
  console.log('⚠️  Store it in Railway secrets for production\n')
}

generateKeypair()
