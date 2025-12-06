import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions - Provenix',
  description: 'Enterprise service agreement governing the use of the Provenix API.',
}

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Terms & Conditions (Enterprise)</h1>
        <p className="text-neutral-600 mb-8">Last updated: December 2025</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <p className="text-neutral-700">
            Designed for enterprise customers requiring contractual clarity.
          </p>

          {/* Service Commitment */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Service Commitment</h2>
            <p className="text-neutral-600 mb-2">
              Provenix will provide signing and verification services through our API.
            </p>
            <p className="text-neutral-600 mb-2">
              We do not modify or store customer text.
            </p>
            <p className="text-neutral-600">
              Customers are responsible for integrating the API in accordance with documentation.
            </p>
          </section>

          {/* Support */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Support</h2>
            <p className="text-neutral-600">
              Support is provided by email. Response times may vary.
            </p>
          </section>

          {/* Billing */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Billing</h2>
            <p className="text-neutral-600">
              Enterprise plans may use flat monthly pricing or metered billing. Invoices are due within 30 days.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Security</h2>
            <p className="text-neutral-600">
              Provenix uses modern cryptographic practices including Ed25519 signing and TLS encryption. Details are
              available on our <a href="/security" className="text-primary hover:text-primary-hover">Security page</a>.
            </p>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Data Protection</h2>
            <p className="text-neutral-600">
              Provenix acts as a processor for customer account data only. No text content is retained.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Governing Law</h2>
            <p className="text-neutral-600">
              These conditions are governed by the laws of Australia unless otherwise stated in a signed agreement.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
