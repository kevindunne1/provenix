import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Processing Addendum - Provenix',
  description: 'Data Processing Addendum for enterprise customers.',
}

export default function DPAPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Data Processing Addendum (DPA)</h1>
        <p className="text-neutral-600 mb-8">Last updated: December 2025</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          {/* Purpose */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Purpose</h2>
            <p className="text-neutral-600">
              This DPA forms part of the agreement between Provenix and the customer where data protection law applies.
            </p>
          </section>

          {/* Roles */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Roles</h2>
            <p className="text-neutral-600 mb-2">
              Provenix acts as a data processor for account information.
            </p>
            <p className="text-neutral-600">
              Customers act as data controllers.
            </p>
          </section>

          {/* Subprocessors */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Subprocessors</h2>
            <p className="text-neutral-600">
              A list of subprocessors is maintained at{' '}
              <a href="/subprocessors" className="text-primary hover:text-primary-hover">
                provenix.dev/subprocessors
              </a>.
            </p>
          </section>

          {/* Data Subject Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Data Subject Rights</h2>
            <p className="text-neutral-600">
              Provenix will assist customers in responding to data subject requests where applicable.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Security</h2>
            <p className="text-neutral-600">
              Provenix maintains security standards appropriate for the protection of customer account data.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">International Transfers</h2>
            <p className="text-neutral-600">
              Any transfers outside the customer's jurisdiction will comply with required safeguards.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
