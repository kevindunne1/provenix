/**
 * POST /api/v1/verify
 * Verify a signed manifest
 */
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'
import {
  VerifyRequestSchema,
  ErrorCode,
  ErrorMessages,
} from '@provenix/shared'
import type { VerifyRequest, VerifyResponse, ErrorResponse } from '@provenix/shared'
import { authenticateApiKey } from '../lib/auth.js'
import { rateLimitMiddleware } from '../lib/rateLimit.js'
import { verifySignature, hashText } from '../lib/crypto.js'

const prisma = new PrismaClient()

const verifyRoute: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.post<{ Body: VerifyRequest; Reply: VerifyResponse | ErrorResponse }>(
    '/verify',
    {
      preHandler: [authenticateApiKey, rateLimitMiddleware],
    },
    async (request, reply) => {
      try {
        // Validate request
        const validation = VerifyRequestSchema.safeParse(request.body)
        if (!validation.success) {
          return reply.status(400).send({
            error: {
              code: ErrorCode.INVALID_REQUEST,
              message: ErrorMessages[ErrorCode.INVALID_REQUEST],
              details: validation.error.flatten(),
            },
          })
        }

        const { text, signature, manifest } = validation.data

        // 1. Check hash match
        const computedHash = hashText(text)
        const hashMatch = computedHash === manifest.hash

        // 2. Verify signature
        const manifestString = JSON.stringify(manifest)

        // Try to find the manifest in the database to get the public key
        let publicKey: string | undefined
        const storedManifest = await prisma.manifest.findUnique({
          where: { hash: manifest.hash },
        })

        if (storedManifest) {
          // Use the signature from the database to extract public key
          // In a real implementation, we'd store the public key
          // For now, we'll use the server's public key (assumes single-tenant)
          publicKey = process.env.ED25519_PUBLIC_KEY!
        } else {
          // Manifest not found - use server public key as fallback
          publicKey = process.env.ED25519_PUBLIC_KEY!
        }

        const signatureValid = await verifySignature(manifestString, signature, publicKey)

        // 3. Check for warnings
        const warnings: string[] = []
        const manifestAge = Date.now() - new Date(manifest.timestamp).getTime()
        const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000

        if (manifestAge > thirtyDaysMs) {
          warnings.push('Manifest is older than 30 days')
        }

        // 4. Overall validity
        const valid = hashMatch && signatureValid

        // Log usage
        await prisma.usageLog.create({
          data: {
            apiKeyId: request.apiKeyId!,
            endpoint: '/api/v1/verify',
            statusCode: valid ? 200 : 400,
          },
        })

        return reply.send({
          valid,
          hashMatch,
          signatureValid,
          timestamp: manifest.timestamp,
          metadata: manifest.metadata,
          warnings: warnings.length > 0 ? warnings : undefined,
        })
      } catch (err) {
        request.log.error({ err }, 'Verify endpoint error')
        return reply.status(500).send({
          error: {
            code: ErrorCode.VERIFICATION_FAILED,
            message: ErrorMessages[ErrorCode.VERIFICATION_FAILED],
          },
        })
      }
    }
  )
}

export default verifyRoute
