/**
 * Simple in-memory rate limiter
 * 100 requests per hour per API key
 */
import type { FastifyRequest, FastifyReply } from 'fastify'
import { ErrorCode, ErrorMessages } from '@provenix/shared'

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimits = new Map<string, RateLimitEntry>()

const RATE_LIMIT = 100 // requests per hour
const WINDOW_MS = 60 * 60 * 1000 // 1 hour

export function rateLimitMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) {
  const apiKeyId = request.apiKeyId

  if (!apiKeyId) {
    // No API key ID attached - auth middleware should have caught this
    return done()
  }

  const now = Date.now()
  const entry = rateLimits.get(apiKeyId)

  if (!entry || now > entry.resetAt) {
    // New window
    rateLimits.set(apiKeyId, {
      count: 1,
      resetAt: now + WINDOW_MS,
    })
    return done()
  }

  if (entry.count >= RATE_LIMIT) {
    return reply.status(429).send({
      error: {
        code: ErrorCode.RATE_LIMIT_EXCEEDED,
        message: ErrorMessages[ErrorCode.RATE_LIMIT_EXCEEDED],
        details: {
          limit: RATE_LIMIT,
          resetAt: new Date(entry.resetAt).toISOString(),
        },
      },
    })
  }

  entry.count++
  done()
}
