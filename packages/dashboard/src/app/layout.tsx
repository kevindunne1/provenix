import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PostHogProvider from '@/components/PostHogProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Provenix - Cryptographic Provenance for AI-Generated Text',
  description: 'A single API call adds verifiable trust to every output your tool generates. No guesswork. Just evidence.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PostHogProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  )
}
