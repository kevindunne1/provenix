import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Release Notes - Provenix',
  description: 'Product updates and changelog for Provenix.',
}

export default function ReleaseNotesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Release Notes</h1>
        <p className="text-lg text-neutral-600 mb-12">
          Track product updates and changes to Provenix.
        </p>

        {/* Release Timeline */}
        <div className="space-y-8">
          {/* Version 0.1.0 */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-neutral-900">Version 0.1.0</h2>
              <span className="text-sm text-neutral-500">December 2025</span>
            </div>
            <div className="mb-4">
              <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Initial Preview Release
              </span>
            </div>

            <div className="space-y-3 text-neutral-600">
              <p className="font-semibold text-neutral-900 mb-2">Added:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Signing endpoint</li>
                <li>Verification endpoint</li>
                <li>JavaScript SDK</li>
                <li>Demo interface</li>
                <li>Manifest viewer</li>
              </ul>

              <p className="text-neutral-600 mt-4">
                <strong>No breaking changes</strong>
              </p>
            </div>
          </div>

          {/* Future Updates */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Future Updates</h2>
            <p className="text-neutral-600 mb-4">Future updates will include:</p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600 ml-4">
              <li>Pricing plans</li>
              <li>Self-serve API key dashboard</li>
              <li>Web verification widget</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
