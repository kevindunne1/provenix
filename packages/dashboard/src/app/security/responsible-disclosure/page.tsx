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

        {/* How to Report */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">How to Report a Vulnerability</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <p className="text-neutral-600 mb-4">
              Please email security reports to:
            </p>
            <div className="bg-neutral-100 p-4 rounded font-mono text-lg">
              <a href="mailto:security@provenix.dev" className="text-primary hover:text-primary-hover">
                security@provenix.dev
              </a>
            </div>
            <p className="text-neutral-600 mt-4">
              For encrypted communication, use our PGP key: <a href="/pgp-key.txt" className="text-primary hover:text-primary-hover">Download PGP Key</a> (coming soon)
            </p>
          </div>
        </section>

        {/* What to Include */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">What to Include in Your Report</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <p className="text-neutral-600 mb-3">Help us understand and reproduce the issue by including:</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600 ml-4">
              <li>Description of the vulnerability</li>
              <li>Steps to reproduce the issue</li>
              <li>Affected endpoints or components</li>
              <li>Potential impact (data exposure, privilege escalation, etc.)</li>
              <li>Proof-of-concept (if applicable)</li>
              <li>Your name and contact information (if you want credit)</li>
            </ul>
          </div>
        </section>

        {/* Scope */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Scope</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">In Scope:</h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-600 ml-4">
              <li>Provenix API (provenixapi-production.up.railway.app)</li>
              <li>Provenix Dashboard (provenix.vercel.app)</li>
              <li>Provenix Demo (demo-provenix.vercel.app)</li>
              <li>Authentication and authorization flaws</li>
              <li>Cryptographic weaknesses</li>
              <li>SQL injection, XSS, CSRF</li>
              <li>Data leakage or exposure</li>
            </ul>

            <h3 className="text-lg font-semibold text-neutral-900 mt-6 mb-3">Out of Scope:</h3>
            <ul className="list-disc list-inside space-y-1 text-neutral-600 ml-4">
              <li>Social engineering attacks</li>
              <li>Physical attacks on infrastructure</li>
              <li>Denial of Service (DoS) attacks</li>
              <li>Issues in third-party services (Stripe, Railway, Vercel)</li>
              <li>Spam or phishing reports</li>
            </ul>
          </div>
        </section>

        {/* What to Expect */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">What to Expect</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <ol className="list-decimal list-inside space-y-2 text-neutral-600">
              <li><strong>Acknowledgment:</strong> We'll confirm receipt within 48 hours.</li>
              <li><strong>Triage:</strong> We'll assess severity and impact within 5 business days.</li>
              <li><strong>Updates:</strong> We'll keep you informed of our progress.</li>
              <li><strong>Resolution:</strong> We'll fix the issue and notify affected users if necessary.</li>
              <li><strong>Credit:</strong> With your permission, we'll credit you in our security acknowledgments.</li>
            </ol>
          </div>
        </section>

        {/* Bug Bounty */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Bug Bounty Program</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <p className="text-neutral-600">
              <strong>We do not currently offer a bug bounty program.</strong>
            </p>
            <p className="text-neutral-600 mt-3">
              However, we deeply appreciate responsible disclosure and will publicly acknowledge your contribution
              (with your permission).
            </p>
            <p className="text-neutral-600 mt-3">
              If we launch a bug bounty in the future, we'll notify researchers who have previously reported vulnerabilities.
            </p>
          </div>
        </section>

        {/* Responsible Disclosure Guidelines */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Responsible Disclosure Guidelines</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <p className="text-neutral-600 mb-3">To qualify as responsible disclosure, please:</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600 ml-4">
              <li>Give us reasonable time to fix the issue before public disclosure (we aim for 90 days)</li>
              <li>Do not exploit the vulnerability beyond proof-of-concept</li>
              <li>Do not access, modify, or delete user data</li>
              <li>Do not perform DoS attacks or degrade service availability</li>
              <li>Do not publicly disclose the vulnerability before we've patched it</li>
            </ul>
            <p className="text-neutral-600 mt-4">
              We commit to not pursuing legal action against researchers who follow these guidelines.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Contact</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <p className="text-neutral-600">
              <strong>Email:</strong> <a href="mailto:security@provenix.dev" className="text-primary hover:text-primary-hover">security@provenix.dev</a>
            </p>
            <p className="text-neutral-600 mt-2">
              <strong>PGP Key:</strong> <a href="/pgp-key.txt" className="text-primary hover:text-primary-hover">Download PGP Key</a> (coming soon)
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
