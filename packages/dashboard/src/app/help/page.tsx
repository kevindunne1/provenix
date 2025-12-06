import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Help - Provenix',
  description: 'Get help integrating Provenix and troubleshooting common issues.',
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Help Center</h1>
        <p className="text-lg text-neutral-600 mb-12">
          Quick troubleshooting, common integration issues, and how to contact support.
        </p>

        {/* Quick Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Quick Troubleshooting</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">API Key Not Working</h3>
              <p className="text-neutral-600 mb-3">
                Ensure your API key is correctly formatted and included in the request headers:
              </p>
              <pre className="bg-neutral-900 text-neutral-50 p-4 rounded text-sm overflow-x-auto font-mono">
{`Authorization: Bearer prov_live_your_key_here`}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Signature Verification Failing</h3>
              <p className="text-neutral-600 mb-3">
                Common causes:
              </p>
              <ul className="list-disc list-inside text-neutral-600 space-y-1">
                <li>Text has been modified after signing</li>
                <li>Whitespace changes (trailing spaces, line endings)</li>
                <li>Manifest doesn't match the signed text</li>
                <li>Signature format is incorrect</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Rate Limit Exceeded</h3>
              <p className="text-neutral-600 mb-3">
                You've hit your monthly quota. Options:
              </p>
              <ul className="list-disc list-inside text-neutral-600 space-y-1">
                <li>Upgrade your plan</li>
                <li>Wait for quota reset (1st of each month)</li>
                <li>Contact sales for temporary quota increase</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">CORS Errors</h3>
              <p className="text-neutral-600 mb-3">
                The Provenix API requires proper CORS headers. If calling from the browser:
              </p>
              <ul className="list-disc list-inside text-neutral-600 space-y-1">
                <li>Make requests from your registered domain</li>
                <li>Contact support to whitelist additional domains</li>
                <li>Or call the API from your backend instead</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Common Integration Issues */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Common Integration Issues</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">SDK Installation</h3>
              <p className="text-neutral-600 mb-3">Install via npm or yarn:</p>
              <pre className="bg-neutral-900 text-neutral-50 p-4 rounded text-sm overflow-x-auto font-mono">
{`npm install @provenix/sdk
# or
yarn add @provenix/sdk`}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Basic Integration Example</h3>
              <pre className="bg-neutral-900 text-neutral-50 p-4 rounded text-sm overflow-x-auto font-mono">
{`import { ProvenixClient } from '@provenix/sdk'

const client = new ProvenixClient({
  apiKey: process.env.PROVENIX_API_KEY
})

const result = await client.sign('Your text here')
console.log(result.verificationUrl)`}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Environment Variables</h3>
              <p className="text-neutral-600 mb-3">
                Store your API key securely in environment variables. Never commit keys to version control.
              </p>
              <pre className="bg-neutral-900 text-neutral-50 p-4 rounded text-sm overflow-x-auto font-mono">
{`# .env
PROVENIX_API_KEY=prov_live_your_key_here`}
              </pre>
            </div>
          </div>
        </section>

        {/* Why is Verification Failing? */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Why is Verification Failing?</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <p className="text-neutral-600 mb-4">
              Verification fails when the text or manifest has been tampered with. Here's the verification process:
            </p>
            <ol className="list-decimal list-inside text-neutral-600 space-y-2">
              <li>Compute SHA-256 hash of submitted text</li>
              <li>Compare hash against manifest.hash</li>
              <li>Verify Ed25519 signature against manifest</li>
              <li>All three must match for verification to succeed</li>
            </ol>
            <p className="text-neutral-600 mt-4">
              Even a single character change will cause verification to fail. This is intentional cryptographic behavior.
            </p>
          </div>
        </section>

        {/* Contact Support */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Contact Support</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <p className="text-neutral-600 mb-4">
              Still stuck? We're here to help.
            </p>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-neutral-900">Email:</p>
                <a href="mailto:hello@provenix.dev" className="text-primary hover:text-primary-hover">
                  hello@provenix.dev
                </a>
              </div>
              <div>
                <p className="font-semibold text-neutral-900">Documentation:</p>
                <Link href="/docs" className="text-primary hover:text-primary-hover">
                  Visit our full documentation
                </Link>
              </div>
              <div>
                <p className="font-semibold text-neutral-900">Response Time:</p>
                <p className="text-neutral-600">
                  Starter: Within 48 hours<br />
                  Growth/Pro: Within 24 hours<br />
                  Enterprise: Priority support with SLA
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
