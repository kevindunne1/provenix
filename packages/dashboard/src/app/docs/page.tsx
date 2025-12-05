export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Provenix Developer Guide</h1>
          <p className="text-xl text-slate-600">
            Add cryptographic provenance to your AI-generated content in under 5 minutes.
          </p>
        </header>

        {/* Quick Start */}
        <section className="mb-12 bg-white rounded-2xl shadow-md border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Start</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">1. Install the SDK</h3>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                <code>npm install @provenix/sdk</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">2. Sign Your Content</h3>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { ProvenixClient } from '@provenix/sdk'

const client = new ProvenixClient({
  apiKey: 'prov_live_...',
  baseUrl: 'https://provenixapi-production.up.railway.app'
})

// Sign text
const result = await client.sign('Your AI-generated content here', {
  model: 'gpt-4',
  userId: 'user_123'
})

// Save manifestId and verificationUrl
console.log(result.manifestId)         // UUID
console.log(result.verificationUrl)    // https://provenix.dev/verify/{id}`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">3. Embed the Widget</h3>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<!-- Add widget script -->
<script src="https://cdn.provenix.dev/widget.js"></script>

<!-- Display verification badge -->
<provenix-widget manifest='{"hash":"...","timestamp":"...","signature":"..."}'></provenix-widget>`}
              </pre>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="mb-12 bg-white rounded-2xl shadow-md border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">API Reference</h2>

          {/* Sign Endpoint */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">POST /api/v1/sign</h3>
            <p className="text-slate-600 mb-4">Generate a cryptographic signature for text.</p>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-slate-900 mb-2">Headers</p>
                <pre className="bg-slate-50 p-3 rounded text-sm">
{`Authorization: Bearer prov_live_...
Content-Type: application/json`}
                </pre>
              </div>

              <div>
                <p className="font-semibold text-slate-900 mb-2">Request Body</p>
                <pre className="bg-slate-50 p-3 rounded text-sm overflow-x-auto">
{`{
  "text": "Your content here",
  "metadata": {
    "model": "gpt-4",
    "userId": "user_123"
  }
}`}
                </pre>
              </div>

              <div>
                <p className="font-semibold text-slate-900 mb-2">Response</p>
                <pre className="bg-slate-50 p-3 rounded text-sm overflow-x-auto">
{`{
  "manifestId": "a1b2c3d4-...",
  "hash": "sha256:9d3c...",
  "signature": "ed25519:ab390f...",
  "manifest": {
    "content": "Your content here",
    "hash": "sha256:9d3c...",
    "timestamp": "2025-01-23T12:40:12.581Z",
    "metadata": { "model": "gpt-4" },
    "version": "1.0"
  },
  "publicKey": "ed25519:9bbd...",
  "verificationUrl": "https://provenix.dev/verify/a1b2c3d4-..."
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Verify Endpoint */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">POST /api/v1/verify</h3>
            <p className="text-slate-600 mb-4">Verify a signed manifest.</p>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-slate-900 mb-2">Request Body</p>
                <pre className="bg-slate-50 p-3 rounded text-sm overflow-x-auto">
{`{
  "text": "Your content here",
  "signature": "ed25519:ab390f...",
  "manifest": {
    "content": "Your content here",
    "hash": "sha256:9d3c...",
    "timestamp": "2025-01-23T12:40:12.581Z",
    "version": "1.0"
  }
}`}
                </pre>
              </div>

              <div>
                <p className="font-semibold text-slate-900 mb-2">Response</p>
                <pre className="bg-slate-50 p-3 rounded text-sm overflow-x-auto">
{`{
  "valid": true,
  "hashMatch": true,
  "signatureValid": true,
  "timestamp": "2025-01-23T12:40:12.581Z",
  "metadata": { "model": "gpt-4" }
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Public Manifest Endpoint */}
          <div>
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">GET /api/v1/manifests/:id</h3>
            <p className="text-slate-600 mb-4">Fetch a signed manifest for public verification (no auth required).</p>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-slate-900 mb-2">Example</p>
                <pre className="bg-slate-50 p-3 rounded text-sm">
{`GET https://provenixapi-production.up.railway.app/api/v1/manifests/a1b2c3d4-...`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Authentication */}
        <section className="mb-12 bg-white rounded-2xl shadow-md border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Authentication</h2>
          <p className="text-slate-600 mb-4">
            All API requests (except public manifest lookup) require an API key in the Authorization header:
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg">
            <code>Authorization: Bearer prov_live_your_key_here</code>
          </pre>
          <p className="text-slate-500 text-sm mt-4">
            API keys start with <code className="bg-slate-100 px-2 py-1 rounded">prov_live_</code> for production
            or <code className="bg-slate-100 px-2 py-1 rounded">prov_test_</code> for testing.
          </p>
        </section>

        {/* Widget Integration */}
        <section className="mb-12 bg-white rounded-2xl shadow-md border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Widget Integration</h2>

          <p className="text-slate-600 mb-4">
            The Provenix widget is a drop-in web component that displays verification status.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Include the Script</h3>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm">
{`<script src="https://cdn.provenix.dev/widget.js"></script>`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Add the Widget</h3>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<provenix-widget
  manifest='${JSON.stringify({
    content: "Your text",
    hash: "sha256:9d3c...",
    timestamp: "2025-01-23T12:40:12.581Z",
    signature: "ed25519:ab390f..."
  }, null, 2)}'
></provenix-widget>`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Features</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Expandable verification badge</li>
                <li>Shows hash, timestamp, signature</li>
                <li>Displays metadata if provided</li>
                <li>Branded with Provenix link</li>
                <li>No dependencies required</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-12 bg-white rounded-2xl shadow-md border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Complete Example</h2>

          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { ProvenixClient } from '@provenix/sdk'

const provenix = new ProvenixClient({
  apiKey: process.env.PROVENIX_API_KEY,
  baseUrl: 'https://provenixapi-production.up.railway.app'
})

// When user generates content
async function handleContentGeneration(text: string, userId: string) {
  try {
    // Sign the content
    const result = await provenix.sign(text, {
      model: 'gpt-4',
      userId,
      timestamp: new Date().toISOString()
    })

    // Store manifestId with the document
    await db.documents.create({
      content: text,
      userId,
      manifestId: result.manifestId,
      verificationUrl: result.verificationUrl
    })

    return result
  } catch (error) {
    console.error('Failed to sign content:', error)
    throw error
  }
}

// When displaying content to users
function DocumentViewer({ document }: { document: Document }) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: document.content }} />

      {/* Show verification badge */}
      <provenix-widget
        manifest={JSON.stringify(document.manifest)}
      />

      {/* Link to public verification */}
      <a href={document.verificationUrl} target="_blank">
        Verify Authenticity
      </a>
    </div>
  )
}`}
          </pre>
        </section>

        {/* Rate Limits */}
        <section className="mb-12 bg-white rounded-2xl shadow-md border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Rate Limits</h2>
          <div className="space-y-3 text-slate-600">
            <p><strong>Free Tier:</strong> 100 requests/month</p>
            <p><strong>Paid Tier:</strong> Unlimited (fair use applies)</p>
            <p className="text-sm text-slate-500 mt-4">
              Rate limit errors return <code className="bg-slate-100 px-2 py-1 rounded">429 Too Many Requests</code>
            </p>
          </div>
        </section>

        {/* Support */}
        <section className="bg-indigo-50 rounded-2xl border border-indigo-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Need Help?</h2>
          <p className="text-slate-600 mb-6">
            Questions about integration? Want to discuss your use case?
          </p>
          <div className="space-y-3">
            <p className="text-slate-700">
              <strong>Email:</strong>{' '}
              <a href="mailto:founder@provenix.dev" className="text-indigo-600 hover:text-indigo-700">
                founder@provenix.dev
              </a>
            </p>
            <p className="text-slate-700">
              <strong>Demo:</strong>{' '}
              <a href="https://provenix-eight.vercel.app" className="text-indigo-600 hover:text-indigo-700" target="_blank" rel="noopener">
                Try it live
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
