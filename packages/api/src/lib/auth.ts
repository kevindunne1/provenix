/**
 * API Key Authentication Middleware
 * Validates Bearer token against database
 */
import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { ErrorCode, ErrorMessages } from '@provenix/shared'
import { checkUsageLimit } from '../services/stripe.js'

const prisma = new PrismaClient()

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string
    apiKeyId?: string
  }
}

export async function authenticateApiKey(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({
      error: {
        code: ErrorCode.MISSING_API_KEY,
        message: ErrorMessages[ErrorCode.MISSING_API_KEY],
      },
    })
  }

  const apiKeyValue = authHeader.substring(7) // Remove 'Bearer '

  try {
    // Find all API keys (we need to hash-compare each one)
    const apiKeys = await prisma.apiKey.findMany({
      select: {
        id: true,
        keyHash: true,
        userId: true,
        lastUsedAt: true,
      },
    })

    let matchedKey: typeof apiKeys[0] | null = null

    for (const key of apiKeys) {
      const isMatch = await bcrypt.compare(apiKeyValue, key.keyHash)
      if (isMatch) {
        matchedKey = key
        break
      }
    }

    if (!matchedKey) {
      return reply.status(401).send({
        error: {
          code: ErrorCode.INVALID_API_KEY,
          message: ErrorMessages[ErrorCode.INVALID_API_KEY],
        },
      })
    }

    // Update last used timestamp (fire and forget)
    prisma.apiKey
      .update({
        where: { id: matchedKey.id },
        data: { lastUsedAt: new Date() },
      })
      .catch((err) => {
        request.log.warn({ err }, 'Failed to update API key lastUsedAt')
      })

    // Check usage limits
    const usageCheck = await checkUsageLimit(matchedKey.userId)
    if (!usageCheck.allowed) {
      return reply.status(429).send({
        error: {
          code: ErrorCode.RATE_LIMIT_EXCEEDED,
          message: `Free tier limit exceeded (${usageCheck.usage}/${usageCheck.limit} this month). Please upgrade to continue.`,
          details: {
            plan: usageCheck.plan,
            usage: usageCheck.usage,
            limit: usageCheck.limit,
          },
        },
      })
    }

    // Attach userId and apiKeyId to request
    request.userId = matchedKey.userId
    request.apiKeyId = matchedKey.id
  } catch (err) {
    request.log.error({ err }, 'Authentication error')
    return reply.status(500).send({
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: ErrorMessages[ErrorCode.INTERNAL_ERROR],
      },
    })
  }
}
