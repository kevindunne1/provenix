'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initAnalytics, analytics } from '@/lib/analytics'

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize PostHog once on mount
    initAnalytics()
  }, [])

  useEffect(() => {
    // Track page views on route change
    if (pathname) {
      const pageName = pathname === '/' ? 'home' : pathname.slice(1).replace(/\//g, '_')
      analytics.pageView(pageName)
    }
  }, [pathname])

  return <>{children}</>
}
