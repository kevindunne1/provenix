import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Provenix',
  description: 'Provenix Privacy Policy - How we collect, use, and protect your data.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Privacy Policy</h1>
        <p className="text-neutral-600 mb-8">Last updated: December 2025</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <p className="text-neutral-700 text-lg">
            Provenix provides a text provenance platform that helps customers verify the origin and integrity of content.
            <strong> We do not store or retain customer text.</strong> We process only the minimum information required to provide our service.
          </p>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Information We Collect</h2>
            <p className="text-neutral-700 mb-4">We collect the following categories of information.</p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Customer Account Information</h3>
                <p className="text-neutral-600">
                  Name, email address, billing information and organisation details provided when creating an account.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Service Metadata</h3>
                <p className="text-neutral-600">
                  Technical logs such as API usage counts, timestamps, response codes and authentication events.
                </p>
                <p className="text-neutral-700 font-semibold mt-2">
                  Provenix does not store or retain the text submitted to the API for signing or verification.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Cookies</h3>
                <p className="text-neutral-600">
                  We use essential cookies for authentication and session management. No tracking or advertising cookies are used.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">How We Use Information</h2>
            <p className="text-neutral-700 mb-3">We use information to:</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600 ml-4">
              <li>Provide and operate the Provenix service</li>
              <li>Secure and monitor the platform</li>
              <li>Process billing and payments</li>
              <li>Communicate service updates and support</li>
              <li>Meet legal obligations</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Data Retention</h2>
            <p className="text-neutral-600">
              We retain account and billing information for as long as the account remains active or as required by law.
            </p>
            <p className="text-neutral-600 mt-2">
              Service metadata is retained for operational and security purposes.
            </p>
          </section>

          {/* Data Storage and Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Data Storage and Transfers</h2>
            <p className="text-neutral-600">
              Provenix may store account and billing information in secure data centres operated by third-party providers.
            </p>
            <p className="text-neutral-600 mt-2">
              All transfers comply with applicable data protection laws.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Your Rights</h2>
            <p className="text-neutral-600">
              Depending on your jurisdiction, you may have the right to request access, correction or deletion of your account information.
              Contact <a href="mailto:support@provenix.dev" className="text-primary hover:text-primary-hover">support@provenix.dev</a> to submit a request.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Contact</h2>
            <p className="text-neutral-600">
              Questions about this policy may be directed to{' '}
              <a href="mailto:privacy@provenix.dev" className="text-primary hover:text-primary-hover">
                privacy@provenix.dev
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
