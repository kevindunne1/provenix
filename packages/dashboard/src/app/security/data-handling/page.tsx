import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Handling - Provenix Security',
  description: 'Explicit statement of how Provenix handles, stores, and protects data.',
}

export default function DataHandlingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Data Handling Practices</h1>
        <p className="text-lg text-neutral-600 mb-12">
          Complete transparency on what we store, how we process it, and what we never touch.
        </p>

        {/* Explicit Statement */}
        <section className="mb-12">
          <div className="bg-primary-light border-2 border-primary rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">We Never Store or Log Raw Text Inputs</h2>
            <p className="text-neutral-700 text-lg">
              This is the foundational principle of Provenix. When you submit text to <code className="bg-white px-2 py-1 rounded font-mono text-sm">/sign</code>,
              we immediately compute a SHA-256 hash and discard the original text.
            </p>
            <p className="text-neutral-700 mt-3">
              The original content never touches our database, logs, or backups. It exists in memory for milliseconds,
              then disappears forever.
            </p>
          </div>
        </section>

        {/* What We Store */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">What We Store</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">1. Cryptographic Hashes</h3>
              <p className="text-neutral-600 mb-2">
                <strong>Data:</strong> SHA-256 hash of signed text (64-character hex string)
              </p>
              <p className="text-neutral-600 mb-2">
                <strong>Why:</strong> To verify text integrity during verification
              </p>
              <p className="text-neutral-600">
                <strong>Irreversibility:</strong> SHA-256 is a one-way function. There is no mathematical way to reverse
                a hash back into the original text.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">2. Signed Manifests</h3>
              <p className="text-neutral-600 mb-2">
                <strong>Data:</strong> JSON object containing:
              </p>
              <pre className="bg-neutral-900 text-neutral-50 p-4 rounded text-sm overflow-x-auto font-mono">
{`{
  "hash": "abc123...",
  "signature": "def456...",
  "timestamp": 1701388800,
  "publicKey": "ed25519_pub_..."
}`}
              </pre>
              <p className="text-neutral-600 mt-2">
                <strong>Why:</strong> To enable public verification of signatures
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">3. API Usage Metadata</h3>
              <p className="text-neutral-600 mb-2">
                <strong>Data:</strong> Timestamp, endpoint, API key hash, status code, IP address
              </p>
              <p className="text-neutral-600 mb-2">
                <strong>Why:</strong> For billing, abuse detection, and rate limiting
              </p>
              <p className="text-neutral-600">
                <strong>Retention:</strong> 12 months
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">4. Account Information</h3>
              <p className="text-neutral-600 mb-2">
                <strong>Data:</strong> Email, hashed password (bcrypt), account creation date
              </p>
              <p className="text-neutral-600">
                <strong>Why:</strong> To authenticate users and manage subscriptions
              </p>
            </div>
          </div>
        </section>

        {/* What We Never Store */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">What We Never Store</h2>
          <div className="bg-error/10 border border-error rounded-lg p-6">
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-error mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span><strong>Raw text content:</strong> Never stored in database, logs, or backups</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-error mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span><strong>Plain-text API keys:</strong> Hashed immediately after generation</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-error mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span><strong>Plain-text passwords:</strong> Bcrypt hashed with per-user salts</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-error mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span><strong>Credit card numbers:</strong> Payment processing handled entirely by Stripe</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-error mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span><strong>User browsing behavior:</strong> No tracking pixels, analytics cookies, or fingerprinting</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Data Processing Flow */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Data Processing Flow</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">When you call /sign:</h3>
            <ol className="list-decimal list-inside space-y-2 text-neutral-600">
              <li>Your text arrives via HTTPS (encrypted in transit)</li>
              <li>We compute SHA-256 hash in memory</li>
              <li><strong className="text-error">Original text is discarded</strong></li>
              <li>We sign the hash with Ed25519 private key</li>
              <li>We store the hash + signature (not the text)</li>
              <li>We return the signed manifest to you</li>
            </ol>
            <p className="mt-4 text-neutral-600">
              Total time text exists in our system: <strong>~50ms</strong>. Then it's gone forever.
            </p>
          </div>
        </section>

        {/* Data Retention */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Data Retention Policies</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <table className="min-w-full border border-neutral-300">
              <thead className="bg-neutral-100">
                <tr>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Data Type</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Retention Period</th>
                </tr>
              </thead>
              <tbody className="text-neutral-600">
                <tr>
                  <td className="border border-neutral-300 px-4 py-2">Signed manifests</td>
                  <td className="border border-neutral-300 px-4 py-2">Indefinite (or until you delete them)</td>
                </tr>
                <tr>
                  <td className="border border-neutral-300 px-4 py-2">Account data</td>
                  <td className="border border-neutral-300 px-4 py-2">90 days after account closure</td>
                </tr>
                <tr>
                  <td className="border border-neutral-300 px-4 py-2">Usage logs</td>
                  <td className="border border-neutral-300 px-4 py-2">12 months</td>
                </tr>
                <tr>
                  <td className="border border-neutral-300 px-4 py-2">Payment records</td>
                  <td className="border border-neutral-300 px-4 py-2">7 years (tax/accounting compliance)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* GDPR Compliance */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">GDPR Compliance</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <p className="text-neutral-600 mb-3">
              Our "never store raw text" design ensures GDPR compliance by default:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600 ml-4">
              <li><strong>Data minimization:</strong> We only collect what's necessary (hashes, not text)</li>
              <li><strong>Privacy by design:</strong> Text is discarded immediately, not stored "for later deletion"</li>
              <li><strong>Right to erasure:</strong> You can delete manifests at any time</li>
              <li><strong>Transparency:</strong> This page documents exactly what we store</li>
              <li><strong>Data portability:</strong> Export your manifests as JSON anytime</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
