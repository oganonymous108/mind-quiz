'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import { trackClickBankRedirect, trackFunnelStep } from '@/lib/analytics'
import { initRtkcid, appendRtkcidToUrl } from '@/lib/rtkcid'

export const dynamic = 'force-dynamic'

// Facebook Pixel ID
const FB_PIXEL_ID = '2167613367378834'

// Declare fbq function for TypeScript
declare global {
  interface Window {
    fbq: (...args: any[]) => void
    _fbq: any
  }
}

export default function DGLandingPage() {
  const router = useRouter()
  const pageViewFired = useRef(false)

  useEffect(() => {
    // Initialize rtkcid from URL on page load
    initRtkcid()
    // Track funnel step 1 (landing page)
    trackFunnelStep(1)
    
    // Track Facebook Pixel PageView event (only once, prevent double-firing in React Strict Mode)
    if (typeof window !== 'undefined' && window.fbq && !pageViewFired.current) {
      window.fbq('track', 'PageView')
      pageViewFired.current = true
    }
  }, [])

  const handleContinue = () => {
    // Track Facebook Pixel ViewContent event on button click
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent')
    }
    
    // Track ClickBank redirect
    trackClickBankRedirect()
    
    // Redirect directly to ClickBank with rtkcid
    const clickbankUrl = appendRtkcidToUrl('https://get.magnetprotocol.com/click')
    window.location.href = clickbankUrl
  }

  return (
    <>
      {/* Facebook Pixel Code */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="w-full max-w-[480px] px-6 py-12">
          {/* Header - Minimal Apple Style */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🧠</div>
              <span className="font-semibold text-xl text-gray-900 tracking-tight">Magnet Protocol</span>
            </div>
          </div>

          {/* Main Image - Elegant spacing */}
          <div className="mb-16">
            <div className="relative w-full h-[240px] overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/main.jpg"
                alt="Magnet Protocol"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content - Apple typography style */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-semibold mb-6 text-gray-900 leading-tight tracking-tight">
              A Revolutionary Way to Manifest Your Dream Life
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md mx-auto">
              Transform your life. Attract love, wealth, and abundance with ease.
            </p>
          </div>

          {/* Continue Button - Apple style */}
          <div className="mb-12">
            <button
              onClick={handleContinue}
              className="w-full py-5 px-8 rounded-2xl bg-gray-900 text-white font-medium text-lg shadow-lg hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 ease-out"
            >
              Continue
            </button>
          </div>

          {/* Footer - Minimal */}
          <div className="text-center text-xs text-gray-400 space-y-4">
            <div className="flex flex-wrap justify-center gap-6">
              <a href="/contact" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
                Contact Us
              </a>
              <a href="/privacy" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
                Terms & Conditions
              </a>
            </div>
            <p className="text-gray-400">© 2025 All rights reserved.</p>
            <p className="text-gray-400">Disclaimer: Results may vary from person to person</p>
          </div>
        </div>
      </div>
    </>
  )
}
