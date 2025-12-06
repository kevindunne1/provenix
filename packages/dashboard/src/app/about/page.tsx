import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Provenix',
  description: 'Learn about Provenix, our mission, and why we built cryptographic provenance for AI-generated text.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">About Provenix</h1>
        <p className="text-lg text-neutral-600 mb-12">
          We're building cryptographic provenance for AI-generated text. Not guesswork. Evidence.
        </p>

        {/* Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Our Mission</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
            <p className="text-neutral-600 text-lg leading-relaxed mb-4">
              AI-generated content is everywhere. But trust is broken. How do you prove a piece of text hasn't been
              tampered with? How do students, writers, and businesses demonstrate authenticity without intrusive surveillance?
            </p>
            <p className="text-neutral-600 text-lg leading-relaxed mb-4">
              AI detection tools guess. They're probabilistic, error-prone, and fundamentally unreliable. A single false
              accusation can destroy trust, damage reputations, and create unfair outcomes.
            </p>
            <p className="text-neutral-600 text-lg leading-relaxed">
              We built Provenix to replace guesswork with cryptographic proof. Every signature is deterministic,
              tamper-evident, and verifiable by anyone. No black boxes. No probabilistic scores. Just mathematical certainty.
            </p>
          </div>
        </section>

        {/* Founder */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Founder</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Kevin Dunne</h3>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Kevin is a product manager with 9+ years of experience building regulated infrastructure at scale. Previously,
              he delivered a £1.58 billion payments platform for 1.3 million energy customers across the UK.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-4">
              After seeing AI detection tools wrongly accuse students of cheating and educators struggle with false positives,
              Kevin realized the problem wasn't detection—it was the lack of deterministic proof.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Provenix is the result: cryptographic signatures that prove authenticity without surveillance, privacy invasion,
              or probabilistic guesswork.
            </p>
          </div>
        </section>

        {/* The Story Behind Provenix */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">The Story Behind Provenix</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
            <p className="text-neutral-600 leading-relaxed mb-4">
              In 2023, AI writing tools exploded in popularity. So did panic. Educators scrambled to detect AI-generated
              essays. Platforms like Turnitin deployed probabilistic detectors that flagged innocent students.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-4">
              The problem? AI detection is fundamentally broken. It's a cat-and-mouse game with no winner. False positives
              destroy trust. False negatives let cheaters through. And the arms race never ends.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We asked a different question: What if we stopped trying to detect AI and started proving authorship instead?
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Provenix is that answer. A single API call cryptographically signs any text. The signature proves integrity.
              Anyone can verify it. No guessing. No surveillance. Just evidence.
            </p>
          </div>
        </section>

        {/* What We Believe */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">What We Believe</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">Trust should be deterministic</h4>
                <p className="text-neutral-600">
                  Probabilistic detection creates uncertainty. Cryptographic signatures provide mathematical certainty.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">Transparency beats surveillance</h4>
                <p className="text-neutral-600">
                  Public verification is better than opaque AI models. Anyone can verify a signature. No black boxes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">Privacy by design</h4>
                <p className="text-neutral-600">
                  We never store raw text. Only hashes and manifests. Your content stays yours.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">Developers deserve simple tools</h4>
                <p className="text-neutral-600">
                  Integration should take minutes, not days. Our SDK is two lines of code.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">Infrastructure should be boring</h4>
                <p className="text-neutral-600">
                  No flashy animations. No unnecessary complexity. Just fast, reliable provenance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Contact</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
            <p className="text-neutral-600 mb-4">
              Have questions? Want to partner? Just want to say hello?
            </p>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-neutral-900">Email:</p>
                <a href="mailto:hello@provenix.dev" className="text-primary hover:text-primary-hover">
                  hello@provenix.dev
                </a>
              </div>
              <div>
                <p className="font-semibold text-neutral-900">Location:</p>
                <p className="text-neutral-600">Perth, Western Australia</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
