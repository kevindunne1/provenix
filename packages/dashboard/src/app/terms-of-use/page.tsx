import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use - Provenix',
  description: 'Terms governing the use of the Provenix website.',
}

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Terms of Use</h1>
        <p className="text-neutral-600 mb-8">Last updated: December 2025</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <p className="text-neutral-700">
            These Terms govern your use of the Provenix platform. By accessing the service you agree to these Terms.
          </p>

          {/* Use of Service */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Use of Service</h2>
            <p className="text-neutral-600">
              You may use the Provenix API and dashboard only in accordance with applicable laws. You are responsible for
              any activity conducted under your account.
            </p>
          </section>

          {/* Customer Data */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Customer Data</h2>
            <p className="text-neutral-600">
              Provenix does not store or retain text content submitted to the API. You are responsible for ensuring that
              you have the right to process any content you submit.
            </p>
          </section>

          {/* Availability */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Availability</h2>
            <p className="text-neutral-600">
              We aim to provide reliable service but cannot guarantee uninterrupted uptime. Maintenance or unforeseen
              outages may occur.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Acceptable Use</h2>
            <p className="text-neutral-700 mb-3">You may not:</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600 ml-4">
              <li>Use the service to build a competing provenance product</li>
              <li>Attempt to reverse engineer our signing or verification methods</li>
              <li>Use the platform for fraudulent, harmful or unlawful behaviour</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Termination</h2>
            <p className="text-neutral-600">
              We may suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Limitation of Liability</h2>
            <p className="text-neutral-600">
              Provenix is provided "as-is". To the extent permitted by law, we disclaim liability for indirect or consequential losses.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Changes</h2>
            <p className="text-neutral-600">
              We may update these Terms. Continued use constitutes acceptance.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
