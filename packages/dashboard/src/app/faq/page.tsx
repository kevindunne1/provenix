import type { Metadata} from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Provenix',
  description: 'Frequently asked questions about Provenix.',
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-neutral-600 mb-12">
          Common questions about Provenix.
        </p>

        <div className="space-y-6">
          {/* Question 1 */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Does Provenix store the text I send?</h3>
            <p className="text-neutral-600">
              No. Provenix does not store or retain any customer text. Only cryptographic hashes are processed.
            </p>
          </div>

          {/* Question 2 */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">What happens if a manifest is tampered with?</h3>
            <p className="text-neutral-600">
              Verification will fail. The signature is tied to the original hash.
            </p>
          </div>

          {/* Question 3 */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Can I use Provenix with large documents?</h3>
            <p className="text-neutral-600">
              Yes. The service accepts text up to your configured request limit.
            </p>
          </div>

          {/* Question 4 */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Is Provenix compliant with GDPR?</h3>
            <p className="text-neutral-600">
              Yes. Provenix does not store personal data from your text submissions. Account metadata is stored securely.
            </p>
          </div>

          {/* Question 5 */}
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">How fast is the API?</h3>
            <p className="text-neutral-600">
              Signing typically completes within 150 milliseconds. Verification is faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
