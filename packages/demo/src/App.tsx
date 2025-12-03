import { useState } from 'react'
import { ProvenixClient } from '@provenix/sdk'
import type { SignResponse } from '@provenix/shared'

// Initialize SDK with API key from environment
const client = new ProvenixClient({
  apiKey: import.meta.env.VITE_API_KEY || 'prov_test_2b220e07e2275a114670604ea4a0b3e1a9330e4d2c8edb2a',
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
})

function App() {
  // Sign tab state
  const [signText, setSignText] = useState('')
  const [signLoading, setSignLoading] = useState(false)
  const [signResult, setSignResult] = useState<SignResponse | null>(null)
  const [signError, setSignError] = useState<string | null>(null)

  // Verify tab state
  const [verifyText, setVerifyText] = useState('')
  const [verifyManifest, setVerifyManifest] = useState('')
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyResult, setVerifyResult] = useState<{
    valid: boolean
    hashMatch: boolean
    signatureValid: boolean
  } | null>(null)
  const [verifyError, setVerifyError] = useState<string | null>(null)

  // Active tab
  const [activeTab, setActiveTab] = useState<'sign' | 'verify'>('sign')

  const handleSign = async () => {
    setSignLoading(true)
    setSignError(null)
    setSignResult(null)

    try {
      const result = await client.sign(signText)
      setSignResult(result)
    } catch (err: any) {
      setSignError(err.message || 'Failed to sign text')
    } finally {
      setSignLoading(false)
    }
  }

  const handleVerify = async () => {
    setVerifyLoading(true)
    setVerifyError(null)
    setVerifyResult(null)

    try {
      const manifest = JSON.parse(verifyManifest) as SignResponse
      const result = await client.verify(verifyText, manifest)
      setVerifyResult(result)
    } catch (err: any) {
      setVerifyError(err.message || 'Failed to verify text')
    } finally {
      setVerifyLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

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

        {/* Tab Navigation */}
        <div className="flex mb-6 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('sign')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'sign'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Text
          </button>
          <button
            onClick={() => setActiveTab('verify')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'verify'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Verify Text
          </button>
        </div>

        {/* Sign Tab */}
        {activeTab === 'sign' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Sign Text</h2>
            <p className="text-gray-600 mb-6">
              Generate a cryptographic signature for your text that proves its authenticity.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter text to sign
                </label>
                <textarea
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your text here..."
                  value={signText}
                  onChange={(e) => setSignText(e.target.value)}
                />
              </div>

              <button
                onClick={handleSign}
                disabled={!signText.trim() || signLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {signLoading ? 'Signing...' : 'Sign Text'}
              </button>

              {signError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">{signError}</p>
                </div>
              )}

              {signResult && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-green-900">✓ Text Signed Successfully</p>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(signResult, null, 2))}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Copy Manifest
                    </button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Hash:</span>{' '}
                      <code className="text-xs bg-white px-1 py-0.5 rounded">{signResult.hash.substring(0, 16)}...</code>
                    </div>
                    <div>
                      <span className="font-medium">Signature:</span>{' '}
                      <code className="text-xs bg-white px-1 py-0.5 rounded">{signResult.signature.substring(0, 16)}...</code>
                    </div>
                    <div>
                      <span className="font-medium">Timestamp:</span> {signResult.manifest.timestamp}
                    </div>
                    <details className="mt-2">
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-800">View Full Manifest</summary>
                      <pre className="mt-2 p-3 bg-white rounded text-xs overflow-x-auto">
                        {JSON.stringify(signResult, null, 2)}
                      </pre>
                    </details>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Verify Tab */}
        {activeTab === 'verify' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Verify Text</h2>
            <p className="text-gray-600 mb-6">
              Verify that text hasn't been modified since it was signed.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Text
                </label>
                <textarea
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Paste the original text..."
                  value={verifyText}
                  onChange={(e) => setVerifyText(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Signed Manifest (JSON)
                </label>
                <textarea
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder='Paste the signed manifest JSON (e.g., {"hash": "...", "signature": "...", ...})'
                  value={verifyManifest}
                  onChange={(e) => setVerifyManifest(e.target.value)}
                />
              </div>

              <button
                onClick={handleVerify}
                disabled={!verifyText.trim() || !verifyManifest.trim() || verifyLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {verifyLoading ? 'Verifying...' : 'Verify Text'}
              </button>

              {verifyError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">{verifyError}</p>
                </div>
              )}

              {verifyResult && (
                <div
                  className={`p-4 border rounded-lg ${
                    verifyResult.valid
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <p className={`font-semibold text-lg mb-3 ${verifyResult.valid ? 'text-green-900' : 'text-red-900'}`}>
                    {verifyResult.valid ? '✓ Text is Authentic' : '✗ Verification Failed'}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className={verifyResult.hashMatch ? 'text-green-700' : 'text-red-700'}>
                        {verifyResult.hashMatch ? '✓' : '✗'}
                      </span>
                      <span className="ml-2">Hash Match: {verifyResult.hashMatch ? 'Yes' : 'No (text was modified)'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={verifyResult.signatureValid ? 'text-green-700' : 'text-red-700'}>
                        {verifyResult.signatureValid ? '✓' : '✗'}
                      </span>
                      <span className="ml-2">Signature Valid: {verifyResult.signatureValid ? 'Yes' : 'No (manifest tampered)'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* How it works */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-xl font-semibold mb-4">How it works</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Signing</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Enter text and click "Sign Text"</li>
                <li>Provenix generates SHA-256 hash</li>
                <li>Creates Ed25519 signature</li>
                <li>Returns signed manifest instantly</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Verifying</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Paste original text and manifest</li>
                <li>Provenix recomputes text hash</li>
                <li>Verifies Ed25519 signature</li>
                <li>Confirms authenticity or detects tampering</li>
              </ol>
            </div>
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
