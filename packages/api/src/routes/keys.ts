/**
 * POST /api/v1/keys - Create API key
 * GET /api/v1/keys - List API keys
 * DELETE /api/v1/keys/:id - Revoke API key
 * API key management endpoints
 */
import type { FastifyInstance, FastifyPluginAsync, FastifyRequest } from 'fastify'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { randomBytes } from 'crypto'
import { ErrorCode, ErrorMessages } from '@provenix/shared'
import type { ErrorResponse } from '@provenix/shared'

const prisma = new PrismaClient()

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string
  }
}

interface CreateKeyRequest {
  name?: string
}

interface ApiKeyResponse {
  id: string
  key?: string // Only returned on creation
  keyPrefix: string
  name?: string
  createdAt: string
  lastUsedAt?: string
}

/**
 * Middleware to authenticate user via JWT
 */
async function authenticateUser(request: FastifyRequest, reply: any) {
  try {
    const authHeader = request.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(401).send({
        error: {
          code: ErrorCode.UNAUTHORIZED,
          message: 'Missing or invalid Authorization header',
        },
      })
    }

    const token = authHeader.substring(7) // Remove 'Bearer '

    // Verify JWT
    const decoded = request.server.jwt.verify(token) as { userId: string; email: string }
    request.userId = decoded.userId
  } catch (err) {
    return reply.status(401).send({
      error: {
        code: ErrorCode.UNAUTHORIZED,
        message: 'Invalid or expired token',
      },
    })
  }
}

const keysRoute: FastifyPluginAsync = async (app: FastifyInstance) => {
  /**
   * Create new API key
   */
  app.post<{
    Body: CreateKeyRequest
    Reply: ApiKeyResponse | ErrorResponse
  }>(
    '/keys',
    { preHandler: authenticateUser },
    async (request, reply) => {
      try {
        const { name } = request.body

        // Generate random API key
        const keyBytes = randomBytes(32)
        const apiKey = `prov_live_${keyBytes.toString('base64url')}`

        // Hash the key for storage
        const keyHash = await bcrypt.hash(apiKey, 10)

        // Extract prefix for display (first 17 chars: "prov_live_" + 7 chars)
        const keyPrefix = apiKey.substring(0, 17) + '...'

        // Create API key in database
        const createdKey = await prisma.apiKey.create({
          data: {
            keyHash,
            keyPrefix,
            name: name || undefined,
            userId: request.userId!,
          },
        })

        return reply.status(201).send({
          id: createdKey.id,
          key: apiKey, // Only shown once!
          keyPrefix: createdKey.keyPrefix,
          name: createdKey.name || undefined,
          createdAt: createdKey.createdAt.toISOString(),
          lastUsedAt: createdKey.lastUsedAt?.toISOString(),
        })
      } catch (err) {
        request.log.error({ err }, 'Create API key error')
        return reply.status(500).send({
          error: {
            code: ErrorCode.INTERNAL_ERROR,
            message: ErrorMessages[ErrorCode.INTERNAL_ERROR],
          },
        })
      }
    }
  )

  /**
   * List user's API keys
   */
  app.get<{
    Reply: ApiKeyResponse[] | ErrorResponse
  }>(
    '/keys',
    { preHandler: authenticateUser },
    async (request, reply) => {
      try {
        const keys = await prisma.apiKey.findMany({
          where: {
            userId: request.userId!,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })

        return reply.send(
          keys.map((key) => ({
            id: key.id,
            keyPrefix: key.keyPrefix,
            name: key.name || undefined,
            createdAt: key.createdAt.toISOString(),
            lastUsedAt: key.lastUsedAt?.toISOString(),
          }))
        )
      } catch (err) {
        request.log.error({ err }, 'List API keys error')
        return reply.status(500).send({
          error: {
            code: ErrorCode.INTERNAL_ERROR,
            message: ErrorMessages[ErrorCode.INTERNAL_ERROR],
          },
        })
      }
    }
  )

  /**
   * Revoke/delete API key
   */
  app.delete<{
    Params: { id: string }
    Reply: { success: boolean } | ErrorResponse
  }>(
    '/keys/:id',
    { preHandler: authenticateUser },
    async (request, reply) => {
      try {
        const { id } = request.params

        // Verify the key belongs to the user
        const key = await prisma.apiKey.findFirst({
          where: {
            id,
            userId: request.userId!,
          },
        })

        if (!key) {
          return reply.status(404).send({
            error: {
              code: ErrorCode.INVALID_REQUEST,
              message: 'API key not found',
            },
          })
        }

        // Delete the key
        await prisma.apiKey.delete({
          where: { id },
        })

        return reply.send({ success: true })
      } catch (err) {
        request.log.error({ err }, 'Delete API key error')
        return reply.status(500).send({
          error: {
            code: ErrorCode.INTERNAL_ERROR,
            message: ErrorMessages[ErrorCode.INTERNAL_ERROR],
          },
        })
      }
    }
  )
}

export default keysRoute
