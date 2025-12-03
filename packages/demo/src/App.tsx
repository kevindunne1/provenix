import { useState } from 'react'

function App() {
  const [text, setText] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Provenix</h1>
          <p className="text-2xl text-gray-700 mb-2">
            AI detection is guesswork. Provenance is evidence.
          </p>
          <p className="text-gray-600">
            Sign and verify text with cryptographic proof in under 60 seconds.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">🚧 Demo Under Construction</h2>
          <p className="text-gray-700 mb-4">
            This demo awaits discovery validation and API implementation.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter text to sign
              </label>
              <textarea
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!text.trim()}
            >
              Sign Text
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">How it works:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Enter text and click "Sign Text"</li>
              <li>Provenix generates SHA-256 hash and Ed25519 signature</li>
              <li>Signed manifest is returned instantly</li>
              <li>Verify the text later to prove it hasn't been modified</li>
            </ol>
          </div>
        </div>

        <footer className="text-center text-gray-600 text-sm">
          <p>
            Provenix is deterministic provenance, not probabilistic detection.
          </p>
          <p className="mt-2">
            Built with Ed25519 cryptography • GDPR-compliant • No raw text stored
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
