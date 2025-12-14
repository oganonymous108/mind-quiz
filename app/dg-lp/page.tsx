'use client'

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
      
      <div className="min-h-screen bg-white text-gray-900 flex justify-center">
        <div className="w-full max-w-[480px]">
          {/* Main Image */}
          <div className="px-4 mb-[10px] mt-[10px]">
            <div className="relative w-full h-[180px] overflow-hidden" style={{ borderRadius: '20px' }}>
              <Image
                src="/main.jpg"
                alt="Magnet Protocol"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Program Description */}
          <div className="px-4 mb-8">
            <h1 className="text-3xl font-bold mb-4 text-left text-gray-900">
              A Revolutionary Way to Manifest Your Dream Life
            </h1>
            <p className="text-gray-700 text-left text-base leading-[23px] mb-4">
              Transform your life. Attract love, wealth, and abundance with ease.
            </p>
          </div>

          {/* Continue Button */}
          <div className="px-4 mb-8">
            <button
              onClick={handleContinue}
              className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              Get Started Now →
            </button>
          </div>

          {/* Social Proof */}
          <div className="px-4 mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Image
                src="/members.png"
                alt="Members"
                width={200}
                height={40}
                className="h-10 w-auto"
              />
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <span className="text-sm text-gray-700">
                  98% of satisfied users based on user interviews
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 pb-8 text-center text-xs text-gray-500 space-y-3">
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="text-gray-600 hover:text-orange-500 transition-colors">
                Contact Us
              </a>
              <a href="/privacy" className="text-gray-600 hover:text-orange-500 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-600 hover:text-orange-500 transition-colors">
                Terms & Conditions
              </a>
            </div>
            <p>© 2025 All rights reserved.</p>
            <p>Disclaimer: Results may vary from person to person</p>
          </div>
        </div>
      </div>
    </>
  )
}
