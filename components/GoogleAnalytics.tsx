'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initGA, pageview, GA_TRACKING_ID } from '@/lib/analytics'

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Only initialize if GA_TRACKING_ID is available
    if (GA_TRACKING_ID) {
      initGA()
    } else {
      console.warn('[GA] Google Analytics not initialized - NEXT_PUBLIC_GA_ID is missing')
    }
  }, [])

  useEffect(() => {
    if (pathname && GA_TRACKING_ID) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      pageview(url)
    }
  }, [pathname, searchParams])

  return null
}

