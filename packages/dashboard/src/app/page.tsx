'use client'

import { useState } from 'react'

export default function Home() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

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
            href="/login"
            className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Get Started Free
          </a>
          <a
            href="https://provenix-eight.vercel.app"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition"
          >
            Try Live Demo
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
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">How Provenix Works</h2>
        <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
          Cryptographic proof in three steps. Watch how content gets signed, verified, and shared.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1: Sign */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-slate-900 text-slate-100 p-4 font-mono text-xs h-32 flex flex-col justify-center">
              <div className="text-green-400 mb-2">$ provenix sign "My AI-generated content"</div>
              <div className="text-slate-400 animate-pulse">Generating signature...</div>
              <div className="mt-2 text-slate-300 text-[10px] opacity-70">
                hash: b3f2a1c9...
                <br />
                signature: 8d4e2f...
              </div>
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">1. Sign Your Content</h3>
              <p className="text-slate-600 text-sm">
                Generate a cryptographic signature (Ed25519) and hash (SHA-256) for any text.
                Takes less than 100ms.
              </p>
            </div>
          </div>

          {/* Step 2: Verify */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-slate-900 text-slate-100 p-4 font-mono text-xs h-32 flex flex-col justify-center">
              <div className="text-green-400 mb-2">$ provenix verify &lt;manifest&gt;</div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400">✓ Signature valid</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-400">✓ Hash matches</span>
              </div>
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">2. Anyone Can Verify</h3>
              <p className="text-slate-600 text-sm">
                No account needed. Anyone with the manifest can cryptographically verify the content
                hasn't been modified.
              </p>
            </div>
          </div>

          {/* Step 3: Share */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-32 flex items-center justify-center text-center px-6">
              <div className="w-full">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3">
                  <div className="text-white text-xs font-mono break-all">
                    https://provenix.dev/verify/a3c8...
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-white text-sm">
                  <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Share this URL</span>
                </div>
              </div>
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">3. Share Proof Publicly</h3>
              <p className="text-slate-600 text-sm">
                Every signature gets a unique verification URL. Share it anywhere - the proof is permanent
                and tamper-evident.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Built for Developers</h2>
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">5-Minute Integration</h3>
              <p className="text-slate-600 mb-4">Drop-in SDK for JavaScript, TypeScript, and REST API</p>
              <div className="relative group">
                <pre className="bg-slate-900 text-slate-100 p-5 rounded-lg text-sm overflow-x-auto font-mono shadow-xl ring-1 ring-slate-700">
{`const result = await provenix.sign(text)
console.log(result.verificationUrl)`}
                </pre>
                <button
                  onClick={() => copyToClipboard(`const result = await provenix.sign(text)\nconsole.log(result.verificationUrl)`, 'sdk')}
                  className="absolute top-3 right-3 bg-slate-700 hover:bg-slate-600 text-white p-2 rounded transition opacity-0 group-hover:opacity-100"
                  title="Copy code"
                >
                  {copiedCode === 'sdk' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Embeddable Widget</h3>
              <p className="text-slate-600 mb-4">Show verification status in your product</p>
              <div className="relative group">
                <pre className="bg-slate-900 text-slate-100 p-5 rounded-lg text-sm overflow-x-auto font-mono shadow-xl ring-1 ring-slate-700">
{`<provenix-widget
  manifest='...'
>
</provenix-widget>`}
                </pre>
                <button
                  onClick={() => copyToClipboard(`<provenix-widget\n  manifest='...'\n>\n</provenix-widget>`, 'widget')}
                  className="absolute top-3 right-3 bg-slate-700 hover:bg-slate-600 text-white p-2 rounded transition opacity-0 group-hover:opacity-100"
                  title="Copy code"
                >
                  {copiedCode === 'widget' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
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
