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
        <p className="text-neutral-600 mb-8">Effective Date: 1 December 2025</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">1. What Are Cookies?</h2>
            <p className="text-neutral-600">
              Cookies are small text files stored on your device when you visit a website. They help websites remember
              your preferences and provide essential functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">2. Cookies We Use</h2>
            <div className="text-neutral-600 space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">2.1 Strictly Necessary Cookies</h3>
              <p>These cookies are essential for the Service to function. Without them, core features won't work.</p>
              <table className="min-w-full border border-neutral-300 mt-3">
                <thead className="bg-neutral-100">
                  <tr>
                    <th className="border border-neutral-300 px-4 py-2 text-left">Cookie Name</th>
                    <th className="border border-neutral-300 px-4 py-2 text-left">Purpose</th>
                    <th className="border border-neutral-300 px-4 py-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-300 px-4 py-2 font-mono text-sm">provenix_session</td>
                    <td className="border border-neutral-300 px-4 py-2">Maintains your logged-in state</td>
                    <td className="border border-neutral-300 px-4 py-2">7 days</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 px-4 py-2 font-mono text-sm">csrf_token</td>
                    <td className="border border-neutral-300 px-4 py-2">Prevents cross-site request forgery attacks</td>
                    <td className="border border-neutral-300 px-4 py-2">Session</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="text-lg font-semibold text-neutral-900 mt-6">2.2 Analytics Cookies</h3>
              <p><strong>We do not use analytics cookies.</strong></p>
              <p>We do not track your browsing behavior, page views, or interactions for marketing purposes.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">3. How to Disable Cookies</h2>
            <div className="text-neutral-600 space-y-2">
              <p>You can disable cookies in your browser settings:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies</li>
              </ul>
              <p className="mt-4 font-semibold">Warning: Disabling cookies will prevent you from logging into your account.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">4. Third-Party Cookies</h2>
            <p className="text-neutral-600">
              We do not allow third-party advertising or tracking cookies. The only third-party cookies may come from:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-neutral-600">
              <li><strong>Stripe:</strong> Payment processing (session cookies only)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">5. Updates to This Policy</h2>
            <p className="text-neutral-600">
              We may update this Cookie Policy. Any changes will be posted on this page with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">6. Contact</h2>
            <p className="text-neutral-600">
              For questions about cookies: <a href="mailto:privacy@provenix.dev" className="text-primary hover:text-primary-hover">privacy@provenix.dev</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
