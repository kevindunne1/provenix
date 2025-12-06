'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-neutral-300">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold text-neutral-900">
            Provenix
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <Link href="/pricing" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              Docs
            </Link>
            <Link href="/help" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              Help
            </Link>
            <Link
              href="/login"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors font-medium"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-neutral-700 hover:text-neutral-900 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-300">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-neutral-700 hover:text-neutral-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/pricing"
                className="text-neutral-700 hover:text-neutral-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/docs"
                className="text-neutral-700 hover:text-neutral-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/help"
                className="text-neutral-700 hover:text-neutral-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Help
              </Link>
              <Link
                href="/login"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover transition-colors font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
