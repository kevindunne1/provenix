import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Provenix',
  description: 'Get in touch with the Provenix team.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Contact</h1>
        <p className="text-lg text-neutral-600 mb-12">
          Get in touch with the Provenix team.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Email */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Email</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-neutral-500 mb-1">General Inquiries</p>
                <a href="mailto:support@provenix.dev" className="text-primary hover:text-primary-hover font-medium">
                  support@provenix.dev
                </a>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Security</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-neutral-500 mb-1">Security Issues</p>
                <a href="mailto:security@provenix.dev" className="text-primary hover:text-primary-hover font-medium">
                  security@provenix.dev
                </a>
              </div>
            </div>
          </div>

          {/* Partnerships */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Partnerships</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-neutral-500 mb-1">Partnership Opportunities</p>
                <a href="mailto:partners@provenix.dev" className="text-primary hover:text-primary-hover font-medium">
                  partners@provenix.dev
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
