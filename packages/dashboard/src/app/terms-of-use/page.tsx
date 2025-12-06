import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use - Provenix',
  description: 'Terms governing the use of the Provenix website.',
}

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Terms of Use</h1>
        <p className="text-neutral-600 mb-8">Effective Date: 1 December 2025</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <p className="text-neutral-600">
            These Terms of Use govern your access to and use of the Provenix website (provenix.dev). By accessing this
            website, you agree to these terms.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">1. Acceptable Use</h2>
            <div className="text-neutral-600 space-y-2">
              <p>You may use this website for lawful purposes only. You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Transmit malware, viruses, or malicious code</li>
                <li>Scrape, crawl, or index the website without permission</li>
                <li>Impersonate Provenix or falsely claim affiliation</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">2. Restrictions</h2>
            <div className="text-neutral-600 space-y-2">
              <p>You may not:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Modify, reverse-engineer, or decompile any part of the website</li>
                <li>Use automated systems (bots, scrapers) without written consent</li>
                <li>Frame or mirror the website on another domain</li>
                <li>Remove copyright or proprietary notices</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">3. Content Rights</h2>
            <div className="text-neutral-600 space-y-2">
              <p>All content on this website (text, graphics, logos, code) is owned by Provenix or its licensors and
              protected by copyright and trademark laws.</p>
              <p>You may not reproduce, distribute, or create derivative works without written permission.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">4. Warranty Disclaimer</h2>
            <div className="bg-neutral-100 border border-neutral-300 p-6 rounded">
              <p className="text-neutral-900 uppercase font-semibold mb-2">No Warranty</p>
              <p className="text-neutral-700">
                This website is provided "AS IS" without warranties of any kind, express or implied. We do not warrant that
                the website will be uninterrupted, error-free, or secure.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">5. Limitation of Liability</h2>
            <div className="text-neutral-600 space-y-2">
              <p>To the maximum extent permitted by law, Provenix is not liable for:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of data, revenue, or profits</li>
                <li>Damages arising from website downtime or errors</li>
              </ul>
              <p className="mt-4">Our total liability shall not exceed AUD $100.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">6. Links to Third-Party Sites</h2>
            <p className="text-neutral-600">
              This website may contain links to third-party websites. We are not responsible for the content or practices
              of those sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">7. Changes to These Terms</h2>
            <p className="text-neutral-600">
              We may update these Terms of Use at any time. Changes will be posted on this page with an updated effective
              date. Continued use of the website constitutes acceptance of changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">8. Governing Law</h2>
            <p className="text-neutral-600">
              These terms are governed by the laws of Western Australia. Any disputes shall be resolved in the courts of
              Western Australia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">9. Contact</h2>
            <p className="text-neutral-600">
              For questions about these terms: <a href="mailto:legal@provenix.dev" className="text-primary hover:text-primary-hover">legal@provenix.dev</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
