import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Provenix',
  description: 'Simple, predictable pricing that scales with your growth.',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          Simple, predictable pricing that scales with your growth.
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Pay for what you use. No surprises. No hidden fees. Just transparent pricing that grows with you.
        </p>
      </section>

      {/* Pricing Tiers */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Starter Tier */}
          <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-2">Starter</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-neutral-900">$49</span>
                <span className="text-neutral-600">/month</span>
              </div>
              <p className="text-neutral-600 text-sm">Perfect for solo founders and early-stage projects.</p>
            </div>

            <div className="mb-6">
              <p className="font-semibold text-neutral-900 mb-3">Included:</p>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  5,000 signs/month
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited verifications
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  1 API key
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Email support
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Verification widget
                </li>
              </ul>
            </div>

            <div className="mb-6 p-3 bg-neutral-50 rounded">
              <p className="text-xs text-neutral-600">
                <span className="font-semibold">Overage:</span> $0.01 per additional sign
              </p>
            </div>

            <button className="mt-auto bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-hover transition-colors font-medium">
              Get Started
            </button>
          </div>

          {/* Growth Tier */}
          <div className="bg-white rounded-xl shadow-lg border-2 border-primary p-8 flex flex-col relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-2">Growth</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-neutral-900">$199</span>
                <span className="text-neutral-600">/month</span>
              </div>
              <p className="text-neutral-600 text-sm">For small AI tools with growing user bases.</p>
            </div>

            <div className="mb-6">
              <p className="font-semibold text-neutral-900 mb-3">Included:</p>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  25,000 signs/month
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited verifications
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  3 API keys
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced analytics
                </li>
              </ul>
            </div>

            <div className="mb-6 p-3 bg-neutral-50 rounded">
              <p className="text-xs text-neutral-600">
                <span className="font-semibold">Overage:</span> $0.005 per additional sign
              </p>
            </div>

            <button className="mt-auto bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-hover transition-colors font-medium">
              Get Started
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-neutral-900">$499</span>
                <span className="text-neutral-600">/month</span>
              </div>
              <p className="text-neutral-600 text-sm">For scaling AI tools with high volumes.</p>
            </div>

            <div className="mb-6">
              <p className="font-semibold text-neutral-900 mb-3">Included:</p>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  100,000 signs/month
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited verifications
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  10 API keys
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom integrations
                </li>
              </ul>
            </div>

            <div className="mb-6 p-3 bg-neutral-50 rounded">
              <p className="text-xs text-neutral-600">
                <span className="font-semibold">Overage:</span> $0.003 per additional sign
              </p>
            </div>

            <button className="mt-auto bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-hover transition-colors font-medium">
              Get Started
            </button>
          </div>
        </div>

        {/* Enterprise Card */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-700 rounded-xl shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
          <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
            Custom solutions for high-volume customers. Volume discounts, custom retention policies, private verification endpoints, SLAs, and dedicated support.
          </p>
          <a
            href="mailto:hello@provenix.dev?subject=Enterprise%20Inquiry"
            className="inline-block bg-white text-neutral-900 px-6 py-3 rounded-md hover:bg-neutral-100 transition-colors font-medium"
          >
            Contact Sales
          </a>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Usage Examples</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">Light Usage</h4>
            <p className="text-sm text-neutral-600 mb-4">~3,000 texts/month</p>
            <p className="text-2xl font-bold text-neutral-900">$49/mo</p>
            <p className="text-xs text-neutral-500 mt-2">Starter tier</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">Medium Usage</h4>
            <p className="text-sm text-neutral-600 mb-4">~30,000 texts/month</p>
            <p className="text-2xl font-bold text-neutral-900">$224/mo</p>
            <p className="text-xs text-neutral-500 mt-2">Growth tier + $25 overage</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">Heavy Usage</h4>
            <p className="text-sm text-neutral-600 mb-4">~150,000 texts/month</p>
            <p className="text-2xl font-bold text-neutral-900">$649/mo</p>
            <p className="text-xs text-neutral-500 mt-2">Pro tier + $150 overage</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Pricing FAQ</h2>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">How do overages work?</h4>
            <p className="text-sm text-neutral-600">
              If you exceed your monthly sign quota, you'll be charged per-call for additional signs at your tier's overage rate.
              Verification calls are always unlimited and free.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">What happens if I exceed my quota?</h4>
            <p className="text-sm text-neutral-600">
              Your service continues without interruption. Overage charges are added to your next invoice.
              You'll receive email notifications at 80% and 100% of your quota.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">Can I pause billing?</h4>
            <p className="text-sm text-neutral-600">
              Yes. You can downgrade to a free tier (coming soon) or cancel your subscription at any time.
              Your data and signed manifests remain accessible for 90 days after cancellation.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h4 className="font-semibold text-neutral-900 mb-2">Do you offer annual discounts?</h4>
            <p className="text-sm text-neutral-600">
              Yes. Annual plans receive a 20% discount. Contact us to set up annual billing for your account.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
