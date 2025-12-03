'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initGA, pageview, GA_TRACKING_ID } from '@/lib/analytics'

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Debug: Log the tracking ID (this is the value embedded at build time)
    console.log('[GA Component] GA_TRACKING_ID:', GA_TRACKING_ID || '(empty - not set at build time)')
    
    // Only initialize if GA_TRACKING_ID is available
    if (GA_TRACKING_ID) {
      console.log('[GA Component] Initializing GA...')
      initGA()
    } else {
      console.warn('[GA Component] Google Analytics not initialized - NEXT_PUBLIC_GA_ID was not set in Vercel environment variables during build')
      console.warn('[GA Component] Please set NEXT_PUBLIC_GA_ID=G-J6YXGVTQBV in Vercel and redeploy')
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

