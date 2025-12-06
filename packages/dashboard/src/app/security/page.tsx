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
          Provenix is built on cryptographic foundations. Security isn't an afterthought—it's the entire product.
        </p>

        {/* Data Encryption */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Data Encryption</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-neutral-900">In Transit</h4>
                <p className="text-neutral-600">All data transmitted to/from Provenix is encrypted using TLS 1.3 with perfect forward secrecy.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900">At Rest</h4>
                <p className="text-neutral-600">Database storage uses AES-256 encryption. Backups are encrypted before upload to S3.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900">API Keys</h4>
                <p className="text-neutral-600">API keys are hashed using bcrypt immediately after generation. Plain-text keys are never stored.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Management */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Key Management</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-neutral-900">Ed25519 Private Keys</h4>
                <p className="text-neutral-600">
                  Our signing keys are stored in Hardware Security Modules (HSMs) with FIPS 140-2 Level 3 certification.
                  Keys never leave the HSM.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900">Key Rotation</h4>
                <p className="text-neutral-600">
                  We rotate signing keys every 12 months. Old keys are retained for verification of historical manifests.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900">Public Key Distribution</h4>
                <p className="text-neutral-600">
                  Public keys are available at <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono text-sm">/api/v1/public-key</code> for
                  offline verification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Zero Raw Text Storage */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Zero Raw Text Storage</h2>
          <div className="bg-primary-light border border-primary rounded-lg p-6">
            <p className="text-neutral-900 font-semibold mb-2">Privacy by Design</p>
            <p className="text-neutral-700 mb-3">
              Provenix never stores the text you submit to <code className="bg-white px-1 py-0.5 rounded font-mono text-sm">/sign</code>.
              We only store:
            </p>
            <ul className="list-disc list-inside space-y-1 text-neutral-700 ml-4">
              <li>SHA-256 hashes (irreversible, no way to recover original text)</li>
              <li>Signed manifests (metadata only: timestamp, hash, signature)</li>
            </ul>
            <p className="text-neutral-700 mt-3">
              This ensures GDPR compliance and protects user privacy. Even if our database is compromised, your content cannot be reconstructed.
            </p>
          </div>
        </section>

        {/* Manifest Storage */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Manifest Storage Details</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <p className="text-neutral-600 mb-3">Each manifest contains:</p>
            <ul className="list-disc list-inside space-y-1 text-neutral-600 ml-4">
              <li><code className="bg-neutral-100 px-1 py-0.5 rounded font-mono text-sm">hash</code>: SHA-256 hash of the signed text</li>
              <li><code className="bg-neutral-100 px-1 py-0.5 rounded font-mono text-sm">signature</code>: Ed25519 signature of the hash</li>
              <li><code className="bg-neutral-100 px-1 py-0.5 rounded font-mono text-sm">timestamp</code>: Unix timestamp of signing</li>
              <li><code className="bg-neutral-100 px-1 py-0.5 rounded font-mono text-sm">publicKey</code>: Public key used for verification</li>
            </ul>
            <p className="text-neutral-600 mt-3">
              Manifests are stored in PostgreSQL with automatic backups every 6 hours. Backups are encrypted and
              geo-replicated across two regions.
            </p>
          </div>
        </section>

        {/* Verification Endpoint */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Verification Endpoint</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <p className="text-neutral-600 mb-3">
              The <code className="bg-neutral-100 px-1 py-0.5 rounded font-mono text-sm">/verify</code> endpoint is public and requires no authentication.
              Anyone can verify a manifest by providing:
            </p>
            <ul className="list-disc list-inside space-y-1 text-neutral-600 ml-4">
              <li>The original text</li>
              <li>The signed manifest</li>
            </ul>
            <p className="text-neutral-600 mt-3">
              Verification is performed server-side, but you can also verify offline using our public key and any
              Ed25519 library.
            </p>
          </div>
        </section>

        {/* Subprocessors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Subprocessors</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <table className="min-w-full border border-neutral-300">
              <thead className="bg-neutral-100">
                <tr>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Service</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Purpose</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Location</th>
                </tr>
              </thead>
              <tbody className="text-neutral-600">
                <tr>
                  <td className="border border-neutral-300 px-4 py-2">Railway</td>
                  <td className="border border-neutral-300 px-4 py-2">API hosting & PostgreSQL database</td>
                  <td className="border border-neutral-300 px-4 py-2">US-West (Oregon)</td>
                </tr>
                <tr>
                  <td className="border border-neutral-300 px-4 py-2">Vercel</td>
                  <td className="border border-neutral-300 px-4 py-2">Dashboard and demo hosting</td>
                  <td className="border border-neutral-300 px-4 py-2">Global CDN</td>
                </tr>
                <tr>
                  <td className="border border-neutral-300 px-4 py-2">Stripe</td>
                  <td className="border border-neutral-300 px-4 py-2">Payment processing</td>
                  <td className="border border-neutral-300 px-4 py-2">US & EU</td>
                </tr>
              </tbody>
            </table>
            <p className="text-neutral-600 text-sm mt-3">
              All subprocessors are GDPR-compliant and covered by Data Processing Agreements.
            </p>
          </div>
        </section>

        {/* Additional Resources */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Additional Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/security/data-handling"
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 hover:border-primary transition-colors"
            >
              <h3 className="font-semibold text-neutral-900 mb-2">Data Handling Practices</h3>
              <p className="text-neutral-600 text-sm">Detailed breakdown of what we store, how we process it, and retention policies.</p>
            </Link>
            <Link
              href="/security/responsible-disclosure"
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 hover:border-primary transition-colors"
            >
              <h3 className="font-semibold text-neutral-900 mb-2">Responsible Disclosure</h3>
              <p className="text-neutral-600 text-sm">How to report security vulnerabilities and what to expect.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
