import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Security Overview - Provenix',
  description: 'How Provenix secures your data and protects cryptographic integrity.',
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Security Overview</h1>
        <p className="text-lg text-neutral-600 mb-12">
          Provenix is designed with a minimal-data, cryptographically verifiable architecture.
        </p>

        {/* Key Security Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Key Security Practices</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <ul className="space-y-3 text-neutral-600">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Ed25519 signing</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No text retention</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>TLS encryption for all requests</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Strict API key authentication</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Rate limiting</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Regular review of dependencies and configurations</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Data Handling */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Data Handling</h2>
          <div className="bg-primary-light border border-primary rounded-lg p-6">
            <p className="text-neutral-900 font-semibold">
              Provenix processes only the hash of the text. The raw text never leaves the customer's system.
            </p>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Infrastructure</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <p className="text-neutral-600">
              Hosted on secure cloud providers with industry-standard protections.
            </p>
          </div>
        </section>

        {/* Additional Resources */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Learn More</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/security/responsible-disclosure"
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 hover:border-primary transition-colors"
            >
              <h3 className="font-semibold text-neutral-900 mb-2">Responsible Disclosure</h3>
              <p className="text-neutral-600 text-sm">Report security vulnerabilities</p>
            </Link>
            <Link
              href="/subprocessors"
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 hover:border-primary transition-colors"
            >
              <h3 className="font-semibold text-neutral-900 mb-2">Subprocessors</h3>
              <p className="text-neutral-600 text-sm">Third-party service providers</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
