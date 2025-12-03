/**
 * Database seed script for local development
 * Creates a test user with an API key
 */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...\n')

  // Create test user
  const passwordHash = await bcrypt.hash('testpassword123', 10)

  const user = await prisma.user.upsert({
    where: { email: 'test@provenix.dev' },
    update: {},
    create: {
      email: 'test@provenix.dev',
      passwordHash,
    },
  })

  console.log(`✅ Created user: ${user.email}`)

  // Generate API key
  const apiKeyValue = `prov_test_${crypto.randomBytes(24).toString('hex')}`
  const keyHash = await bcrypt.hash(apiKeyValue, 10)
  const keyPrefix = apiKeyValue.substring(0, 16)

  const apiKey = await prisma.apiKey.upsert({
    where: { keyHash },
    update: {},
    create: {
      keyHash,
      keyPrefix,
      name: 'Development Key',
      userId: user.id,
    },
  })

  console.log(`✅ Created API key: ${apiKey.keyPrefix}...`)
  console.log(`\n📋 Your API key (save this - it won't be shown again):`)
  console.log(`\n   ${apiKeyValue}\n`)
  console.log(`💡 Use this key in the Authorization header:`)
  console.log(`   Authorization: Bearer ${apiKeyValue}\n`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
