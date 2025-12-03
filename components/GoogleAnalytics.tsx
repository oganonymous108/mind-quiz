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

  if (!GA_TRACKING_ID) {
    console.warn('[GA Component] Google Analytics not initialized - NEXT_PUBLIC_GA_ID was not set')
    return null
  }

  return (
    <>
      {/* Initialize dataLayer and gtag BEFORE script loads */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
            console.log('[GA] Inline init script executed');
            console.log('[GA] DataLayer:', window.dataLayer);
          `,
        }}
      />
      {/* Load gtag.js script */}
      <Script
        id="google-analytics-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        onLoad={() => {
          console.log('[GA] gtag.js script loaded')
          console.log('[GA] DataLayer length:', window.dataLayer?.length || 0)
          console.log('[GA] Check Network tab for /g/collect requests')
        }}
        onError={() => {
          console.error('[GA] Failed to load gtag.js script')
        }}
      />
    </>
  )
}

