import posthog from 'posthog-js'

// Initialize PostHog (call this once on app start)
export function initAnalytics() {
  if (typeof window === 'undefined') return

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'

  if (!posthogKey) {
    console.warn('PostHog key not configured. Analytics disabled.')
    return
  }

  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: false, // We'll manually track page views
    capture_pageleave: true,
    autocapture: false, // Explicit event tracking only
    disable_session_recording: true, // GDPR-friendly: no session recordings
    persistence: 'localStorage',
  })
}

// Event tracking utility
export const analytics = {
  // A. Marketing Site Events
  pageView: (pageName: string) => {
    posthog.capture(`${pageName}_view`)
  },

  ctaClick: (ctaName: string, location?: string) => {
    posthog.capture('cta_click', {
      cta_name: ctaName,
      location,
    })
  },

  scrollDepth: (depth: 50 | 90) => {
    posthog.capture(`scrolled_${depth}`)
  },

  // B. Signup + Authentication Events
  signupStarted: () => {
    posthog.capture('signup_started')
  },

  signupCompleted: (userId: string) => {
    posthog.capture('signup_completed', { user_id: userId })
    posthog.identify(userId)
  },

  loginSuccess: (userId: string) => {
    posthog.capture('login_success', { user_id: userId })
    posthog.identify(userId)
  },

  loginFailed: (reason?: string) => {
    posthog.capture('login_failed', { reason })
  },

  passwordResetRequested: () => {
    posthog.capture('password_reset_requested')
  },

  passwordResetCompleted: () => {
    posthog.capture('password_reset_completed')
  },

  // C. Dashboard Events (API Keys)
  apiKeyCreated: () => {
    posthog.capture('api_key_created')
  },

  apiKeyRevoked: () => {
    posthog.capture('api_key_revoked')
  },

  // D. Billing Events (Frontend triggers)
  billingCheckoutStarted: (plan: string) => {
    posthog.capture('billing_checkout_started', { plan })
  },

  billingCheckoutCompleted: (plan: string) => {
    posthog.capture('billing_checkout_completed', { plan })
  },

  billingPlanChanged: (oldPlan: string, newPlan: string) => {
    posthog.capture('billing_plan_changed', {
      old_plan: oldPlan,
      new_plan: newPlan,
    })
  },

  // E. Documentation Events
  docsView: (section: string) => {
    posthog.capture('docs_view', { section })
  },

  docsCopySnippet: (snippetType: string) => {
    posthog.capture('docs_copy_code_snippet', { snippet_type: snippetType })
  },

  // F. Public Verification Events
  publicVerifyPageView: () => {
    posthog.capture('public_verify_page_view')
  },

  publicVerifySuccess: () => {
    posthog.capture('public_verify_success')
  },

  publicVerifyFailure: (reason?: string) => {
    posthog.capture('public_verify_failure', { reason })
  },

  // Generic event for custom tracking
  track: (eventName: string, properties?: Record<string, any>) => {
    posthog.capture(eventName, properties)
  },

  // Identify user
  identify: (userId: string, traits?: Record<string, any>) => {
    posthog.identify(userId, traits)
  },

  // Reset on logout
  reset: () => {
    posthog.reset()
  },
}

// Scroll depth tracker (call once per page)
export function setupScrollTracking() {
  if (typeof window === 'undefined') return

  let tracked50 = false
  let tracked90 = false

  const handleScroll = () => {
    const scrollPercent =
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

    if (scrollPercent >= 50 && !tracked50) {
      analytics.scrollDepth(50)
      tracked50 = true
    }

    if (scrollPercent >= 90 && !tracked90) {
      analytics.scrollDepth(90)
      tracked90 = true
    }

    if (tracked50 && tracked90) {
      window.removeEventListener('scroll', handleScroll)
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
}
