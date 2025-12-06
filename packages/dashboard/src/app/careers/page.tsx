import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers - Provenix',
  description: 'Join the Provenix team.',
}

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Careers</h1>
        <p className="text-lg text-neutral-600 mb-12">
          Join us in building the future of text provenance.
        </p>

        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 text-center">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Not Hiring Yet</h2>
          <p className="text-neutral-600 mb-6">
            Provenix is not hiring at this time.
          </p>
          <p className="text-neutral-600">
            Future roles will be posted here.
          </p>
        </div>
      </div>
    </div>
  )
}
