import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PostHogProvider from '@/components/PostHogProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { RadialGlowBackground } from '@/components/ui/RadialGlowBackground'

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen relative font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <RadialGlowBackground />
          <PostHogProvider>
            <div className="relative z-0">
              <Navigation />
              <main>{children}</main>
              <Footer />
            </div>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
