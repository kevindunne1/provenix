export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Cryptographic Provenance <br />for AI-Generated Content
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
          AI detection is guesswork. Provenance is evidence.
        </p>
        <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto">
          Add deterministic, cryptographic proof to any text. No probabilistic detection. No false positives. Just Ed25519 signatures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://provenix-eight.vercel.app"
            className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Try the Demo
          </a>
          <a
            href="/docs"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition"
          >
            Read the Docs
          </a>
        </div>
      </header>

      {/* Problem Statement */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Why AI Detection Fails</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-red-500 text-4xl font-bold mb-3">26%</div>
              <p className="text-slate-600">False positive rate for leading AI detectors</p>
            </div>
            <div>
              <div className="text-orange-500 text-4xl font-bold mb-3">Guesswork</div>
              <p className="text-slate-600">Statistical inference, not proof</p>
            </div>
            <div>
              <div className="text-yellow-500 text-4xl font-bold mb-3">Broken</div>
              <p className="text-slate-600">Updates to models break detection</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How Provenix Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">1. Sign</h3>
            <p className="text-slate-600">Generate SHA-256 hash + Ed25519 signature for your text</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">2. Verify</h3>
            <p className="text-slate-600">Anyone can verify authenticity using the public manifest</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">3. Share</h3>
            <p className="text-slate-600">Public verification URLs prove content hasn't been tampered with</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Built for Developers</h2>
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">5-Minute Integration</h3>
              <p className="text-slate-600 mb-4">Drop-in SDK for JavaScript, TypeScript, and REST API</p>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto">
{`const result = await provenix.sign(text)
console.log(result.verificationUrl)`}
              </pre>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Embeddable Widget</h3>
              <p className="text-slate-600 mb-4">Show verification status in your product</p>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto">
{`<provenix-widget
  manifest='...'
></provenix-widget>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Perfect For</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
            <div className="text-3xl mb-3">✍️</div>
            <h3 className="font-semibold text-slate-900 mb-2">AI Writing Tools</h3>
            <p className="text-sm text-slate-600">Prove content authenticity to enterprise buyers</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="font-semibold text-slate-900 mb-2">Education</h3>
            <p className="text-sm text-slate-600">Replace guesswork with cryptographic proof</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
            <div className="text-3xl mb-3">📄</div>
            <h3 className="font-semibold text-slate-900 mb-2">Publishing</h3>
            <p className="text-sm text-slate-600">Verify content origin and integrity</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
            <div className="text-3xl mb-3">⚖️</div>
            <h3 className="font-semibold text-slate-900 mb-2">Legal & Compliance</h3>
            <p className="text-sm text-slate-600">Audit-ready, immutable records</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-indigo-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Add Provenance?</h2>
          <p className="text-xl mb-8 opacity-90">
            Integrate cryptographic verification in under 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/docs"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-slate-100 transition"
            >
              Get Started
            </a>
            <a
              href="https://provenix-eight.vercel.app"
              className="inline-flex items-center justify-center px-8 py-3 bg-indigo-700 text-white font-semibold rounded-lg border-2 border-white hover:bg-indigo-800 transition"
            >
              Try Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-200">
        <div className="text-center text-slate-500 space-y-2">
          <p>
            <strong>Provenix</strong> — Deterministic provenance, not probabilistic detection
          </p>
          <p className="text-sm">
            Built with Ed25519 cryptography • GDPR-compliant • No raw text stored
          </p>
          <p className="text-sm">
            <a href="mailto:founder@provenix.dev" className="text-indigo-600 hover:text-indigo-700">
              founder@provenix.dev
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
