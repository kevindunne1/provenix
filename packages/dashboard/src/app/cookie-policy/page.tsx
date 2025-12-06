import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy - Provenix',
  description: 'How Provenix uses cookies and tracking technologies.',
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Cookie Policy</h1>
        <p className="text-neutral-600 mb-8">Last updated: December 2025</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <p className="text-neutral-700 text-lg">
            Provenix uses a minimal cookie model designed only to support authentication and essential functionality.
          </p>

          {/* Types of Cookies Used */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Types of Cookies Used</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Essential Cookies</h3>
                <p className="text-neutral-600">
                  Required to authenticate users, maintain sessions and provide secure access to the dashboard.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Tracking Cookies</h3>
                <p className="text-neutral-600">
                  Provenix does not use advertising, tracking or behavioural analytics cookies.
                </p>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Managing Cookies</h2>
            <p className="text-neutral-600">
              You may configure your browser to block cookies, but this may cause the Provenix dashboard or authentication to stop working.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
