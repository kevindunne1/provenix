import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { ProvenixClient } from '@provenix/sdk'
import type { SignResponse } from '@provenix/shared'
import { Loader2 } from 'lucide-react'

// UI Components
import { Button } from './components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card'
import { Textarea } from './components/ui/textarea'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs'
import { ManifestViewer } from './components/ui/manifest-viewer'
import { SuccessCard } from './components/ui/success-card'
import { ErrorCard } from './components/ui/error-card'
import { VerificationResult } from './components/ui/verification-result'

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
  const [verifyManifest, setVerifyManifest] = useState('')
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyResult, setVerifyResult] = useState<{
    valid: boolean
    hashMatch: boolean
    signatureValid: boolean
    originalText?: string
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
      const originalText = manifest.manifest.content
      const result = await client.verify(originalText, manifest)
      setVerifyResult({ ...result, originalText })
    } catch (err: any) {
      setVerifyError(err.message || 'Failed to verify text')
    } finally {
      setVerifyLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-h1 text-neutral-900 mb-4">Provenix</h1>
          <p className="text-h3 text-neutral-700 mb-3">
            AI detection is guesswork. Provenance is evidence.
          </p>
          <p className="text-body text-neutral-500">
            Sign and verify text with cryptographic proof in under 60 seconds.
          </p>
        </header>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'sign' | 'verify')}>
          <TabsList>
            <TabsTrigger value="sign">Sign Text</TabsTrigger>
            <TabsTrigger value="verify">Verify Text</TabsTrigger>
          </TabsList>

          {/* Sign Tab */}
          <TabsContent value="sign">
            <Card>
              <CardHeader>
                <CardTitle>Sign Text</CardTitle>
                <CardDescription>
                  Generate a cryptographic signature for your text that proves its authenticity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-body-sm font-medium text-neutral-900 mb-2">
                      Enter text to sign
                    </label>
                    <Textarea
                      placeholder="Enter your text here..."
                      value={signText}
                      onChange={(e) => setSignText(e.target.value)}
                      className="min-h-[160px]"
                    />
                  </div>

                  <Button
                    onClick={handleSign}
                    disabled={!signText.trim() || signLoading}
                    className="w-full"
                  >
                    {signLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing...
                      </>
                    ) : (
                      'Sign Text'
                    )}
                  </Button>

                  {signError && (
                    <ErrorCard title="Error" description={signError} />
                  )}

                  {signResult && (
                    <SuccessCard title="Text Signed Successfully">
                      <div className="mt-4">
                        <ManifestViewer manifest={signResult} />
                      </div>
                    </SuccessCard>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verify Tab */}
          <TabsContent value="verify">
            <Card>
              <CardHeader>
                <CardTitle>Verify Text</CardTitle>
                <CardDescription>
                  Paste a signed manifest to verify its authenticity. The original text is extracted from the manifest.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-body-sm font-medium text-neutral-900 mb-2">
                      Signed Manifest (JSON)
                    </label>
                    <Textarea
                      placeholder='Paste the signed manifest JSON here...'
                      value={verifyManifest}
                      onChange={(e) => setVerifyManifest(e.target.value)}
                      className="min-h-[200px] font-mono text-code"
                    />
                  </div>

                  <Button
                    onClick={handleVerify}
                    disabled={!verifyManifest.trim() || verifyLoading}
                    className="w-full"
                  >
                    {verifyLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Manifest'
                    )}
                  </Button>

                  {verifyError && (
                    <ErrorCard title="Verification Error" description={verifyError} />
                  )}

                  {verifyResult && (
                    <VerificationResult
                      valid={verifyResult.valid}
                      hashMatch={verifyResult.hashMatch}
                      signatureValid={verifyResult.signatureValid}
                      originalText={verifyResult.originalText}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* How it works */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How it works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-body-lg font-semibold text-primary mb-3">Signing</h4>
                <ol className="list-decimal list-inside space-y-2 text-body text-neutral-700">
                  <li>Enter text and click "Sign Text"</li>
                  <li>Provenix generates SHA-256 hash</li>
                  <li>Creates Ed25519 signature</li>
                  <li>Returns signed manifest instantly</li>
                </ol>
              </div>
              <div>
                <h4 className="text-body-lg font-semibold text-primary mb-3">Verifying</h4>
                <ol className="list-decimal list-inside space-y-2 text-body text-neutral-700">
                  <li>Paste signed manifest (contains text)</li>
                  <li>Provenix extracts and recomputes hash</li>
                  <li>Verifies Ed25519 signature</li>
                  <li>Confirms authenticity or detects tampering</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-12 text-center text-body-sm text-neutral-500 space-y-2">
          <p>
            Provenix is deterministic provenance, not probabilistic detection.
          </p>
          <p>
            Built with Ed25519 cryptography • GDPR-compliant • No raw text stored
          </p>
        </footer>
      </div>
      <Analytics />
    </div>
  )
}

export default App
