'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { pageview, GA_TRACKING_ID } from '@/lib/analytics'

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && GA_TRACKING_ID && typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      pageview(url)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    // Initialize dataLayer and gtag BEFORE script loads (required by GA4)
    if (typeof window !== 'undefined' && GA_TRACKING_ID) {
      window.dataLayer = window.dataLayer || []
      window.gtag = window.gtag || function(...args: any[]) {
        window.dataLayer.push(args)
      }
      console.log('[GA Component] GA_TRACKING_ID:', GA_TRACKING_ID)
    }
  }, [])

  if (!GA_TRACKING_ID) {
    console.warn('[GA Component] Google Analytics not initialized - NEXT_PUBLIC_GA_ID was not set')
    return null
  }

  return (
    <>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        onLoad={() => {
          console.log('[GA] Script loaded via Next.js Script component')
          if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('js', new Date())
            window.gtag('config', GA_TRACKING_ID, {
              page_path: window.location.pathname,
              send_page_view: true,
            })
            
            console.log('[GA] Initialized with ID:', GA_TRACKING_ID)
            console.log('[GA] DataLayer length:', window.dataLayer?.length || 0)
            console.log('[GA] Check Network tab for /g/collect requests')
          }
        }}
        onError={() => {
          console.error('[GA] Failed to load script')
        }}
      />
    </>
  )
}

