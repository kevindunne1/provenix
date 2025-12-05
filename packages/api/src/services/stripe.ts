/**
 * Stripe Service - Manages subscriptions and billing
 */
import Stripe from 'stripe'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// In development, Stripe is optional (allows local testing without Stripe setup)
// In production, it's required
if (!process.env.STRIPE_SECRET_KEY) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('STRIPE_SECRET_KEY environment variable is required in production')
  }
  console.warn('⚠️  STRIPE_SECRET_KEY not set - billing features will be disabled')
}

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-11-17.clover',
    })
  : null

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || ''

/**
 * Create a Stripe customer for a user
 */
export async function createStripeCustomer(userId: string, email: string): Promise<string> {
  if (!stripe) {
    throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY in environment.')
  }

  const customer = await stripe.customers.create({
    email,
    metadata: {
      provenixUserId: userId,
    },
  })

  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  })

  return customer.id
}

/**
 * Create a checkout session for subscription
 */
export async function createCheckoutSession(
  userId: string,
  email: string,
  successUrl: string,
  cancelUrl: string
): Promise<string> {
  if (!stripe) {
    throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY in environment.')
  }

  // Get or create Stripe customer
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    throw new Error('User not found')
  }

  let customerId = user.stripeCustomerId
  if (!customerId) {
    customerId = await createStripeCustomer(userId, email)
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      provenixUserId: userId,
    },
  })

  return session.url || ''
}

/**
 * Create a customer portal session for managing subscription
 */
export async function createCustomerPortalSession(
  userId: string,
  returnUrl: string
): Promise<string> {
  if (!stripe) {
    throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY in environment.')
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user?.stripeCustomerId) {
    throw new Error('No Stripe customer found')
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: returnUrl,
  })

  return session.url
}

/**
 * Handle subscription created/updated webhook
 */
export async function handleSubscriptionUpdate(subscription: Stripe.Subscription): Promise<void> {
  const userId = subscription.metadata.provenixUserId
  if (!userId) {
    console.error('No provenixUserId in subscription metadata')
    return
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      stripeSubscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
      plan: subscription.status === 'active' ? 'paid' : 'free',
    },
  })
}

/**
 * Handle subscription deleted webhook
 */
export async function handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
  const userId = subscription.metadata.provenixUserId
  if (!userId) {
    console.error('No provenixUserId in subscription metadata')
    return
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      stripeSubscriptionId: null,
      subscriptionStatus: 'canceled',
      currentPeriodEnd: null,
      plan: 'free',
    },
  })
}

/**
 * Check if user has exceeded free tier limits
 */
export async function checkUsageLimit(userId: string): Promise<{
  allowed: boolean
  plan: string
  usage: number
  limit: number
}> {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    throw new Error('User not found')
  }

  // Paid plan has unlimited usage
  if (user.plan === 'paid' && user.subscriptionStatus === 'active') {
    return { allowed: true, plan: 'paid', usage: 0, limit: -1 }
  }

  // Free tier: 100 requests/month
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const usage = await prisma.usageLog.count({
    where: {
      apiKey: {
        userId,
      },
      timestamp: {
        gte: startOfMonth,
      },
      statusCode: 200, // Only count successful requests
    },
  })

  const FREE_TIER_LIMIT = 100
  const allowed = usage < FREE_TIER_LIMIT

  return {
    allowed,
    plan: 'free',
    usage,
    limit: FREE_TIER_LIMIT,
  }
}

export { stripe }
