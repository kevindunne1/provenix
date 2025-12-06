import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions - Provenix',
  description: 'Service Agreement governing the use of the Provenix API.',
}

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Terms & Conditions (Service Agreement)</h1>
        <p className="text-neutral-600 mb-8">Effective Date: 1 December 2025</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <p className="text-neutral-600">
            These Terms & Conditions ("Agreement") govern your use of the Provenix API and related services ("Service").
            By creating an account or using the API, you agree to these terms.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">1. API Usage Rights</h2>
            <div className="text-neutral-600 space-y-2">
              <p>Subject to your compliance with this Agreement, Provenix grants you a limited, non-exclusive,
              non-transferable license to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Access the API using your API key(s)</li>
                <li>Integrate the Service into your applications</li>
                <li>Use signed manifests for verification purposes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">2. Rate Limits and Quotas</h2>
            <div className="text-neutral-600 space-y-2">
              <p>Your usage is subject to the limits of your subscription plan:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Sign requests count against your monthly quota</li>
                <li>Verification requests are unlimited and free</li>
                <li>Exceeding your quota results in overage charges per your plan</li>
                <li>We reserve the right to rate-limit requests to prevent abuse</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">3. Abuse Policy</h2>
            <div className="text-neutral-600 space-y-2">
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Use the Service for illegal activities</li>
                <li>Attempt to reverse-engineer the API or bypass rate limits</li>
                <li>Share your API keys with unauthorized parties</li>
                <li>Use the Service to sign malicious or fraudulent content</li>
                <li>Overload our systems with excessive requests</li>
                <li>Resell API access without written permission</li>
              </ul>
              <p className="mt-3 font-semibold">Violation may result in immediate account suspension without refund.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">4. Data Handling</h2>
            <div className="text-neutral-600 space-y-2">
              <p><strong>What we store:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>SHA-256 hashes of signed text (irreversible)</li>
                <li>Signed manifests (metadata only)</li>
                <li>API usage logs (endpoint, timestamp, status)</li>
              </ul>
              <p className="mt-3"><strong>What we never store:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Raw text content submitted to /sign</li>
                <li>Plain-text API keys or passwords</li>
              </ul>
              <p className="mt-3">See our <a href="/privacy-policy" className="text-primary hover:text-primary-hover">Privacy Policy</a> for full details.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">5. Service Level Agreements (SLAs)</h2>
            <div className="text-neutral-600 space-y-2">
              <h3 className="text-lg font-semibold text-neutral-900">5.1 Availability (Enterprise Only)</h3>
              <p>Enterprise plans include a 99.9% uptime SLA. If we fail to meet this threshold, you are entitled to
              service credits as specified in your Enterprise agreement.</p>

              <h3 className="text-lg font-semibold text-neutral-900 mt-4">5.2 No SLA for Other Plans</h3>
              <p>Starter, Growth, and Pro plans are provided "as is" without uptime guarantees. We strive for high
              availability but do not offer SLAs or refunds for downtime.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">6. Billing and Payment</h2>
            <div className="text-neutral-600 space-y-2">
              <p><strong>6.1 Subscription Fees:</strong> You will be billed monthly or annually based on your chosen plan.</p>
              <p><strong>6.2 Overage Charges:</strong> If you exceed your monthly quota, overage fees apply per your plan's rate.</p>
              <p><strong>6.3 Payment Method:</strong> You must provide valid payment information. Payments are processed by Stripe.</p>
              <p><strong>6.4 Failed Payments:</strong> If payment fails, we will retry for 7 days. After that, your account may be suspended.</p>
              <p><strong>6.5 Refunds:</strong> Pro-rated refunds available within 7 days of signup. No refunds thereafter, but you may cancel to avoid future charges.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">7. Termination</h2>
            <div className="text-neutral-600 space-y-2">
              <p><strong>7.1 By You:</strong> You may cancel your subscription at any time from your dashboard. Cancellation
              takes effect at the end of your billing period.</p>
              <p><strong>7.2 By Us:</strong> We may suspend or terminate your account if you:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Violate this Agreement</li>
                <li>Fail to pay outstanding fees</li>
                <li>Engage in abusive or fraudulent behavior</li>
              </ul>
              <p><strong>7.3 Effect of Termination:</strong> Upon termination:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Your API keys will be revoked immediately</li>
                <li>Signed manifests remain accessible for 90 days</li>
                <li>You remain responsible for outstanding fees</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">8. Limitation of Liability</h2>
            <div className="bg-neutral-100 border border-neutral-300 p-6 rounded">
              <p className="text-neutral-900 uppercase font-semibold mb-2">Liability Cap</p>
              <p className="text-neutral-700">
                To the maximum extent permitted by law, Provenix's total liability for any claims arising from this
                Agreement shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
              <p className="text-neutral-700 mt-3">
                We are not liable for indirect, incidental, consequential, or punitive damages, including loss of data,
                revenue, or profits.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">9. Indemnification</h2>
            <p className="text-neutral-600">
              You agree to indemnify and hold harmless Provenix from any claims, damages, or expenses arising from:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-neutral-600">
              <li>Your use of the Service</li>
              <li>Your violation of this Agreement</li>
              <li>Content you sign or verify using the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">10. Modifications to Service</h2>
            <p className="text-neutral-600">
              We may modify, suspend, or discontinue the Service at any time. We will provide 30 days' notice for
              material changes that negatively impact functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">11. Governing Law and Disputes</h2>
            <div className="text-neutral-600 space-y-2">
              <p>This Agreement is governed by the laws of Western Australia.</p>
              <p>Any disputes shall be resolved through binding arbitration in Perth, Western Australia, except that
              either party may seek injunctive relief in court.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">12. Changes to This Agreement</h2>
            <p className="text-neutral-600">
              We may update this Agreement from time to time. Material changes will be communicated via email 30 days
              before taking effect. Your continued use of the Service constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">13. Contact</h2>
            <p className="text-neutral-600">
              For legal inquiries: <a href="mailto:legal@provenix.dev" className="text-primary hover:text-primary-hover">legal@provenix.dev</a>
            </p>
            <p className="text-neutral-600 mt-2">
              Provenix Pty Ltd<br />
              ABN: [Pending registration]<br />
              Perth, Western Australia
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
