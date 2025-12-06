import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subprocessor List - Provenix',
  description: 'List of third-party subprocessors used by Provenix.',
}

export default function SubprocessorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Subprocessor List</h1>
        <p className="text-neutral-600 mb-8">Last updated: December 2025</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <p className="text-neutral-700">
            Provenix engages the following subprocessors to deliver its service.
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-neutral-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Subprocessor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Purpose</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-neutral-900">Railway</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">API and database hosting</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">Global</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-neutral-900">Vercel</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">Frontend hosting</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">Global</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-neutral-900">Stripe</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">Billing and payment processing</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">Global</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-neutral-900">GitHub</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">Source code hosting</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">Global</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-neutral-600 text-sm">
            Updated lists will be posted on this page.
          </p>
        </div>
      </div>
    </div>
  )
}
