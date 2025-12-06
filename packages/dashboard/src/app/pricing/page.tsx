import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Provenix',
  description: 'Simple. Predictable. Scales with you.',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          Simple. Predictable. Scales with you.
        </h1>
      </section>

      {/* Pricing Tiers */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Free Tier */}
          <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-2">Free Tier</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-neutral-900">$0</span>
                <span className="text-neutral-600">/month</span>
              </div>
              <p className="text-neutral-600 text-sm">For testing and early evaluation.</p>
            </div>

            <div className="mb-6">
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  200 signing requests/month
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  200 verification requests/month
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
                  No credit card required
                </li>
              </ul>
            </div>

            <p className="text-xs text-neutral-500 mb-4">
              Perfect for: prototyping, proof-of-concepts, and trying Provenix without commitment.
            </p>

            <button className="mt-auto bg-neutral-200 text-neutral-900 px-6 py-3 rounded-md hover:bg-neutral-300 transition-colors font-medium">
              Get Started
            </button>
          </div>

          {/* Starter Tier */}
          <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-2">Starter</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-neutral-900">$49</span>
                <span className="text-neutral-600">/month</span>
              </div>
              <p className="text-neutral-600 text-sm">For solo founders and early-stage AI tools.</p>
            </div>

            <div className="mb-6">
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  5,000 signing requests included
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  5,000 verification requests included
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Overage: $0.01 per additional sign
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority email support
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ideal for low-volume production traffic
                </li>
              </ul>
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
              <p className="text-neutral-600 text-sm">For teams shipping real product.</p>
            </div>

            <div className="mb-6">
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  25,000 signing requests included
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  25,000 verification requests included
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Overage: $0.005 per additional sign
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Slack support (business hours)
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Great for growing user bases or B2B adoption
                </li>
              </ul>
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
              <p className="text-neutral-600 text-sm">For scale-ups with heavy workloads.</p>
            </div>

            <div className="mb-6">
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  100,000 signing requests included
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  100,000 verification requests included
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Overage: $0.003 per additional sign
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority Slack support
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Dedicated technical contact
                </li>
              </ul>
            </div>

            <p className="text-xs text-neutral-500 mb-4">
              Suitable for large AI tools and companies closing enterprise deals
            </p>

            <button className="mt-auto bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-hover transition-colors font-medium">
              Get Started
            </button>
          </div>
        </div>

        {/* Enterprise Card */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-700 rounded-xl shadow-lg p-8 text-center text-white mt-8">
          <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
          <p className="text-neutral-300 mb-2">Custom Pricing</p>
          <p className="text-neutral-300 mb-6 max-w-3xl mx-auto text-sm">
            For organizations requiring compliance and scale.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-4xl mx-auto mb-6 text-sm">
            <div>
              <p className="text-neutral-400">Custom signing and verification volumes</p>
            </div>
            <div>
              <p className="text-neutral-400">Custom SLAs</p>
            </div>
            <div>
              <p className="text-neutral-400">Dedicated customer success engineer</p>
            </div>
            <div>
              <p className="text-neutral-400">Onboarding assistance</p>
            </div>
            <div>
              <p className="text-neutral-400">Security review support</p>
            </div>
          </div>
          <p className="text-neutral-400 text-sm mb-6">Annual billing options available</p>
          <a
            href="mailto:sales@provenix.dev"
            className="inline-block bg-white text-neutral-900 px-6 py-3 rounded-md hover:bg-neutral-100 transition-colors font-medium"
          >
            Contact us at sales@provenix.dev
          </a>
        </div>
      </section>
    </div>
  )
}
