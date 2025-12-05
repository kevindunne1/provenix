/**
 * POST /api/v1/sign
 * Sign text and return cryptographic manifest
 */
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'
import {
  SignRequestSchema,
  validateMetadataSize,
  ErrorCode,
  ErrorMessages,
} from '@provenix/shared'
import type { SignRequest, SignResponse, ErrorResponse } from '@provenix/shared'
import { authenticateApiKey } from '../lib/auth.js'
import { rateLimitMiddleware } from '../lib/rateLimit.js'
import { signMessage, getPublicKey, hashText } from '../lib/crypto.js'

const prisma = new PrismaClient()

const signRoute: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.post<{ Body: SignRequest; Reply: SignResponse | ErrorResponse }>(
    '/sign',
    {
      preHandler: [authenticateApiKey, rateLimitMiddleware],
    },
    async (request, reply) => {
      try {
        // Validate request
        const validation = SignRequestSchema.safeParse(request.body)
        if (!validation.success) {
          return reply.status(400).send({
            error: {
              code: ErrorCode.INVALID_REQUEST,
              message: ErrorMessages[ErrorCode.INVALID_REQUEST],
              details: validation.error.flatten(),
            },
          })
        }

        const { text, metadata } = validation.data

        // Validate metadata size
        if (metadata && !validateMetadataSize(metadata)) {
          return reply.status(400).send({
            error: {
              code: ErrorCode.METADATA_TOO_LARGE,
              message: ErrorMessages[ErrorCode.METADATA_TOO_LARGE],
            },
          })
        }

        // Compute hash
        const hash = hashText(text)
        const timestamp = new Date().toISOString()
        const version = '1.0'

        // Create manifest
        const manifest = {
          content: text,
          hash,
          timestamp,
          metadata,
          version,
        }

        // Sign the manifest (sign the JSON string)
        const manifestString = JSON.stringify(manifest)
        const signature = await signMessage(manifestString)
        const publicKey = getPublicKey()

        // Store in database
        const storedManifest = await prisma.manifest.create({
          data: {
            hash,
            manifest: manifest as any, // Prisma Json type
            signature,
            userId: request.userId!,
          },
        })

        // Log usage
        await prisma.usageLog.create({
          data: {
            apiKeyId: request.apiKeyId!,
            endpoint: '/api/v1/sign',
            statusCode: 200,
          },
        })

        // Generate verification URL
        const verificationUrl = `https://provenix.dev/verify/${storedManifest.id}`

        return reply.send({
          manifestId: storedManifest.id,
          hash,
          signature,
          manifest,
          publicKey,
          verificationUrl,
        })
      } catch (err) {
        request.log.error({ err }, 'Sign endpoint error')
        return reply.status(500).send({
          error: {
            code: ErrorCode.SIGNING_FAILED,
            message: ErrorMessages[ErrorCode.SIGNING_FAILED],
          },
        })
      }
    }
  )
}

export default signRoute
