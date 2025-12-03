'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initGA, pageview, GA_TRACKING_ID } from '@/lib/analytics'

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Debug: Log the tracking ID
    console.log('[GA Component] GA_TRACKING_ID:', GA_TRACKING_ID)
    console.log('[GA Component] NEXT_PUBLIC_GA_ID from env:', process.env.NEXT_PUBLIC_GA_ID)
    
    // Only initialize if GA_TRACKING_ID is available
    if (GA_TRACKING_ID) {
      console.log('[GA Component] Initializing GA...')
      initGA()
    } else {
      console.warn('[GA Component] Google Analytics not initialized - NEXT_PUBLIC_GA_ID is missing')
      console.warn('[GA Component] GA_TRACKING_ID value:', GA_TRACKING_ID)
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

