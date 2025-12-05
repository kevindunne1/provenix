/**
 * POST /api/v1/billing/checkout
 * POST /api/v1/billing/portal
 * Stripe billing endpoints
 */
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { authenticateApiKey } from '../lib/auth.js'
import { createCheckoutSession, createCustomerPortalSession } from '../services/stripe.js'
import { ErrorCode, ErrorMessages } from '@provenix/shared'
import type { ErrorResponse } from '@provenix/shared'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface CheckoutRequest {
  successUrl: string
  cancelUrl: string
}

interface CheckoutResponse {
  url: string
}

interface PortalRequest {
  returnUrl: string
}

interface PortalResponse {
  url: string
}

const billingRoute: FastifyPluginAsync = async (app: FastifyInstance) => {
  /**
   * Create Stripe checkout session for subscription
   */
  app.post<{
    Body: CheckoutRequest
    Reply: CheckoutResponse | ErrorResponse
  }>(
    '/billing/checkout',
    { preHandler: authenticateApiKey },
    async (request, reply) => {
      try {
        const { successUrl, cancelUrl } = request.body

        if (!successUrl || !cancelUrl) {
          return reply.status(400).send({
            error: {
              code: ErrorCode.INVALID_REQUEST,
              message: 'successUrl and cancelUrl are required',
            },
          })
        }

        const user = await prisma.user.findUnique({
          where: { id: request.userId! },
        })

        if (!user) {
          return reply.status(404).send({
            error: {
              code: ErrorCode.INTERNAL_ERROR,
              message: 'User not found',
            },
          })
        }

        const url = await createCheckoutSession(
          user.id,
          user.email,
          successUrl,
          cancelUrl
        )

        return reply.send({ url })
      } catch (err) {
        request.log.error({ err }, 'Checkout session creation error')
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
   * Create Stripe customer portal session
   */
  app.post<{
    Body: PortalRequest
    Reply: PortalResponse | ErrorResponse
  }>(
    '/billing/portal',
    { preHandler: authenticateApiKey },
    async (request, reply) => {
      try {
        const { returnUrl } = request.body

        if (!returnUrl) {
          return reply.status(400).send({
            error: {
              code: ErrorCode.INVALID_REQUEST,
              message: 'returnUrl is required',
            },
          })
        }

        const url = await createCustomerPortalSession(request.userId!, returnUrl)

        return reply.send({ url })
      } catch (err) {
        request.log.error({ err }, 'Customer portal session creation error')
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
   * Get current billing status
   */
  app.get<{
    Reply: {
      plan: string
      subscriptionStatus: string | null
      currentPeriodEnd: string | null
      usage: {
        current: number
        limit: number
      }
    } | ErrorResponse
  }>(
    '/billing/status',
    { preHandler: authenticateApiKey },
    async (request, reply) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: request.userId! },
        })

        if (!user) {
          return reply.status(404).send({
            error: {
              code: ErrorCode.INTERNAL_ERROR,
              message: 'User not found',
            },
          })
        }

        // Get current month usage
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        const usage = await prisma.usageLog.count({
          where: {
            apiKey: {
              userId: user.id,
            },
            timestamp: {
              gte: startOfMonth,
            },
            statusCode: 200,
          },
        })

        return reply.send({
          plan: user.plan,
          subscriptionStatus: user.subscriptionStatus,
          currentPeriodEnd: user.currentPeriodEnd?.toISOString() || null,
          usage: {
            current: usage,
            limit: user.plan === 'paid' ? -1 : 100, // -1 means unlimited
          },
        })
      } catch (err) {
        request.log.error({ err }, 'Billing status error')
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

export default billingRoute
