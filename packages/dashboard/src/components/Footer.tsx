import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-300">
      <div className="max-w-[1280px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Product */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm">
                  Docs
                </Link>
              </li>
              <li>
                <Link href="/release-notes" className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm">
                  Release Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Company */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <a href="mailto:hello@provenix.dev" className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Security */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Security</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/security" className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm">
                  Security Overview
                </Link>
              </li>
              <li>
                <Link href="/security/data-handling" className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm">
                  Data Handling
                </Link>
              </li>
              <li>
                <Link href="/security/responsible-disclosure" className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm">
                  Responsible Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-neutral-300 text-center md:text-left">
          <p className="text-neutral-500 text-sm">
            Copyright © Provenix 2025. Built in Perth. Forged in mild panic.
          </p>
        </div>
      </div>
    </footer>
  )
}
