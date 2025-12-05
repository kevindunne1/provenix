/**
 * POST /api/v1/webhooks/stripe
 * Stripe webhook handler for subscription events
 */
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { stripe, handleSubscriptionUpdate, handleSubscriptionDeleted } from '../services/stripe.js'
import type Stripe from 'stripe'

const webhooksRoute: FastifyPluginAsync = async (app: FastifyInstance) => {
  /**
   * Stripe webhook endpoint
   * Handles subscription.created, subscription.updated, subscription.deleted events
   */
  app.post(
    '/webhooks/stripe',
    {
      config: {
        // Disable body parser to get raw body for signature verification
        rawBody: true,
      },
    },
    async (request, reply) => {
      // Check if Stripe is configured
      if (!stripe) {
        request.log.error('Stripe not configured')
        return reply.status(503).send({ error: 'Stripe webhooks not available - payment system not configured' })
      }

      const signature = request.headers['stripe-signature']
      if (!signature || typeof signature !== 'string') {
        return reply.status(400).send({ error: 'Missing stripe-signature header' })
      }

      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
      if (!webhookSecret) {
        request.log.error('STRIPE_WEBHOOK_SECRET not configured')
        return reply.status(500).send({ error: 'Webhook secret not configured' })
      }

      try {
        // Get raw body as string
        const rawBody = typeof request.body === 'string'
          ? request.body
          : JSON.stringify(request.body)

        // Verify webhook signature
        const event = stripe.webhooks.constructEvent(
          rawBody,
          signature,
          webhookSecret
        ) as Stripe.Event

        request.log.info({ type: event.type }, 'Received Stripe webhook')

        // Handle subscription events
        switch (event.type) {
          case 'customer.subscription.created':
          case 'customer.subscription.updated': {
            const subscription = event.data.object as Stripe.Subscription
            await handleSubscriptionUpdate(subscription)
            request.log.info(
              { subscriptionId: subscription.id, status: subscription.status },
              'Subscription updated'
            )
            break
          }

          case 'customer.subscription.deleted': {
            const subscription = event.data.object as Stripe.Subscription
            await handleSubscriptionDeleted(subscription)
            request.log.info(
              { subscriptionId: subscription.id },
              'Subscription deleted'
            )
            break
          }

          default:
            request.log.info({ type: event.type }, 'Unhandled webhook event type')
        }

        return reply.send({ received: true })
      } catch (err: any) {
        request.log.error({ err }, 'Webhook processing error')
        return reply.status(400).send({
          error: `Webhook Error: ${err.message}`,
        })
      }
    }
  )
}

export default webhooksRoute
