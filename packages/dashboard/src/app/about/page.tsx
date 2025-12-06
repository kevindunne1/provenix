import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Provenix',
  description: 'Learn about Provenix and our mission.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">About Us</h1>

        <div className="prose prose-neutral max-w-none space-y-6">
          <p className="text-lg text-neutral-700 leading-relaxed">
            Provenix is a developer-first provenance platform designed to help AI writing tools create verifiable, trusted content.
          </p>

          <p className="text-lg text-neutral-700 leading-relaxed">
            Our goal is simple. Make trust in AI generated text clear, reliable and accessible to every developer.
          </p>

          <p className="text-lg text-neutral-700 leading-relaxed">
            We do this without storing customer text, without complex integrations and without heavy compliance burdens for early-stage teams.
          </p>

          <p className="text-lg text-neutral-700 leading-relaxed font-medium">
            Provenix is built in Perth, Australia.
          </p>
        </div>
      </div>
    </div>
  )
}
