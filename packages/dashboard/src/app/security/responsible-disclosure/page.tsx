import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Responsible Disclosure - Provenix Security',
  description: 'How to report security vulnerabilities to Provenix.',
}

export default function ResponsibleDisclosurePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Responsible Disclosure</h1>
        <p className="text-lg text-neutral-600 mb-12">
          We take security seriously. If you've found a vulnerability, we want to hear about it.
        </p>

        <div className="prose prose-neutral max-w-none space-y-8">
          {/* How to Report */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">How to Report</h2>
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <p className="text-neutral-700 mb-4">
                If you believe you have discovered a security issue in Provenix, contact{' '}
                <a href="mailto:security@provenix.dev" className="text-primary hover:text-primary-hover font-medium">
                  security@provenix.dev
                </a>.
              </p>

              <p className="text-neutral-700 font-semibold mb-2">Please include:</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-600 ml-4">
                <li>Description of the issue</li>
                <li>Steps to reproduce</li>
                <li>Expected impact</li>
              </ul>

              <p className="text-neutral-600 mt-4">
                We ask researchers not to publicly disclose vulnerabilities before remediation.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
