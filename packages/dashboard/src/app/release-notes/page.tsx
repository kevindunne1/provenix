import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Release Notes - Provenix',
  description: 'Product updates, new features, and improvements to Provenix.',
}

export default function ReleaseNotesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Release Notes</h1>
        <p className="text-lg text-neutral-600 mb-12">
          Track product updates, new features, and improvements to Provenix.
        </p>

        {/* Release Timeline */}
        <div className="space-y-8">
          {/* Version 0.1.0 - MVP Launch */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-neutral-900">v0.1.0 - MVP Launch</h2>
              <span className="text-sm text-neutral-500">December 2025</span>
            </div>
            <div className="mb-4">
              <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Initial Release
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">🎉 New Features</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-600 ml-4">
                  <li>Cryptographic signing API (<code className="bg-neutral-100 px-1 py-0.5 rounded font-mono text-sm">/sign</code>)</li>
                  <li>Public verification API (<code className="bg-neutral-100 px-1 py-0.5 rounded font-mono text-sm">/verify</code>)</li>
                  <li>JavaScript/TypeScript SDK</li>
                  <li>Developer dashboard with API key management</li>
                  <li>Public demo site</li>
                  <li>Stripe billing integration</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">🔒 Security</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-600 ml-4">
                  <li>Ed25519 signature implementation</li>
                  <li>SHA-256 hashing</li>
                  <li>Zero raw text storage (privacy by design)</li>
                  <li>TLS 1.3 encryption</li>
                  <li>Bcrypt password hashing</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">📦 Infrastructure</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-600 ml-4">
                  <li>Railway deployment for API and PostgreSQL</li>
                  <li>Vercel deployment for dashboard and demo</li>
                  <li>CDN-distributed verification widget</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Upcoming */}
          <div className="bg-neutral-50 rounded-lg border border-neutral-200 p-6">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">🚀 Coming Soon</h2>
            <p className="text-neutral-600 mb-4">Features currently in development or planned for future releases:</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600 ml-4">
              <li>Python SDK</li>
              <li>Go SDK</li>
              <li>Advanced analytics dashboard</li>
              <li>Webhooks for signature events</li>
              <li>Custom manifest retention policies (Enterprise)</li>
              <li>Private verification endpoints (Enterprise)</li>
              <li>SSO/SAML authentication (Enterprise)</li>
              <li>SOC 2 Type II certification</li>
            </ul>
          </div>

          {/* How to Stay Updated */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">📬 Stay Updated</h3>
            <p className="text-neutral-600 mb-4">
              Subscribe to release notifications by enabling email updates in your dashboard settings.
            </p>
            <p className="text-neutral-600">
              Have a feature request? Email us at <a href="mailto:hello@provenix.dev" className="text-primary hover:text-primary-hover">hello@provenix.dev</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
