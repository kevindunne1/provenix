import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Provenix',
  description: 'Frequently asked questions about Provenix cryptographic provenance.',
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-neutral-600 mb-12">
          Common questions about provenance, API usage, security, billing, and compliance.
        </p>

        {/* Provenance Basics */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Provenance Basics</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">What is provenance?</h3>
              <p className="text-neutral-600">
                Provenance is cryptographic proof of text authorship and integrity. It proves who signed a piece of text and
                whether it has been modified since signing. Unlike AI detection (which guesses), provenance provides
                deterministic, tamper-evident proof.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Why not use AI detection?</h3>
              <p className="text-neutral-600">
                AI detection is probabilistic guesswork with high false positive rates. It can wrongly flag human-written text
                as AI-generated, causing unfair accusations. Provenix provides cryptographic proof instead—no guessing, just
                mathematical certainty that text hasn't been tampered with since signing.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Do you store content?</h3>
              <p className="text-neutral-600">
                No. We never store raw text. We only store SHA-256 hashes (irreversible) and signed manifests (metadata only).
                This ensures GDPR compliance and privacy by design. The original text remains with you.
              </p>
            </div>
          </div>
        </section>

        {/* Product Usage */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Product Usage</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">How do signatures work?</h3>
              <p className="text-neutral-600 mb-3">
                Provenix uses Ed25519 cryptographic signing:
              </p>
              <ol className="list-decimal list-inside text-neutral-600 space-y-1">
                <li>We compute a SHA-256 hash of your text</li>
                <li>We sign the hash with our Ed25519 private key</li>
                <li>We return a signed manifest (hash + signature + metadata)</li>
                <li>Anyone can verify the signature using our public key</li>
              </ol>
              <p className="text-neutral-600 mt-3">
                If even one character changes, the hash changes, and verification fails. This is cryptographically guaranteed.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Can I verify signatures offline?</h3>
              <p className="text-neutral-600">
                Yes. The manifest includes everything needed for verification. You can verify signatures client-side using
                our public key and any Ed25519 library. No API call required for verification.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">What's the difference between signing and verifying?</h3>
              <p className="text-neutral-600">
                <strong>Signing</strong> (requires API key): Creates a cryptographic signature for your text. This counts
                against your quota.<br /><br />
                <strong>Verifying</strong> (no API key needed): Checks if a signed text has been tampered with. Verification
                is always free and unlimited.
              </p>
            </div>
          </div>
        </section>

        {/* API */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">API</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">What's the API rate limit?</h3>
              <p className="text-neutral-600">
                There are no per-second rate limits. Your rate limit is your monthly quota. Once you hit your quota, you'll
                incur overage charges unless you upgrade. We'll send email notifications at 80% and 100% of quota.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Can I use the API in the browser?</h3>
              <p className="text-neutral-600">
                We recommend calling the API from your backend to protect your API key. If you must call from the browser,
                use a proxy endpoint on your server that validates the request before calling Provenix.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Do you have SDKs?</h3>
              <p className="text-neutral-600">
                Yes. We provide an official JavaScript/TypeScript SDK. Python, Go, and Ruby SDKs are planned.
                The REST API works with any language.
              </p>
            </div>
          </div>
        </section>

        {/* Billing */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Billing</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">When will I be charged?</h3>
              <p className="text-neutral-600">
                You're billed monthly on the anniversary of your signup. Overages are added to your next invoice.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-neutral-600">
                Yes. Cancel anytime from your dashboard. You'll retain access until the end of your billing period. Your
                signed manifests remain accessible for 90 days after cancellation.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Do you offer refunds?</h3>
              <p className="text-neutral-600">
                We offer pro-rated refunds within 7 days of signup if you're unsatisfied. After that, no refunds, but you
                can cancel to avoid future charges.
              </p>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Security</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">How secure are signatures?</h3>
              <p className="text-neutral-600">
                Ed25519 signatures are cryptographically secure and used by Signal, GPG, and SSH. Breaking an Ed25519
                signature would require computing power that doesn't exist. SHA-256 hashes are irreversible and collision-resistant.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">What if your private key leaks?</h3>
              <p className="text-neutral-600">
                We rotate keys regularly and use Hardware Security Modules (HSMs) for key storage. If a key is compromised,
                we'd revoke it and re-sign all affected manifests with a new key. You'd be notified immediately.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Is this GDPR compliant?</h3>
              <p className="text-neutral-600">
                Yes. We never store raw text—only irreversible hashes and metadata. This is privacy by design. We're also
                compliant with CCPA and SOC 2 Type II (in progress).
              </p>
            </div>
          </div>
        </section>

        {/* Data Retention */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Data Retention</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">How long do you store manifests?</h3>
              <p className="text-neutral-600">
                By default, manifests are stored indefinitely to enable long-term verification. Enterprise customers can
                request custom retention policies (e.g., 7 years for regulatory compliance or 90 days for ephemeral use cases).
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Can I delete manifests?</h3>
              <p className="text-neutral-600">
                Yes. You can delete manifests from your dashboard. Once deleted, verification URLs will return a "manifest
                not found" error. Deletion is permanent and cannot be undone.
              </p>
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Compliance</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Are you SOC 2 compliant?</h3>
              <p className="text-neutral-600">
                We're currently pursuing SOC 2 Type II certification. Expected completion: Q2 2026. Enterprise customers
                can request security questionnaires and audit reports.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Do you support SSO?</h3>
              <p className="text-neutral-600">
                SSO (SAML/OIDC) is available for Enterprise customers. Contact sales to enable SSO for your account.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
