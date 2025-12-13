'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import Script from 'next/script'
import { trackQuizStart, trackClickBankRedirect, trackFunnelStep } from '@/lib/analytics'
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

export default function DCLandingPage() {
  const router = useRouter()

  useEffect(() => {
    // Initialize rtkcid from URL on page load
    initRtkcid()
    // Track funnel step 1 (landing page)
    trackFunnelStep(1)
    
    // Track Facebook Pixel ViewContent event
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent')
    }
  }, [])

  const handleGenderSelect = (gender: 'male' | 'female') => {
    // Track quiz start
    trackQuizStart(gender)
    
    // Store gender in localStorage
    localStorage.setItem('quizGender', gender)
    
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
          fbq('track', 'PageView');
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
        {/* Header */}
        <div className="flex items-center justify-center px-4 pt-2 pb-1">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🧠</div>
            <span className="font-bold text-lg text-gray-900">Magnet Protocol</span>
          </div>
        </div>

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

        {/* Gender Selection */}
        <div className="px-4 mb-8">
          <h2 className="text-xl font-bold mb-4 text-left text-gray-900">
            Start by selecting your gender:
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => handleGenderSelect('male')}
              className="flex-1 py-4 px-8 rounded-full font-bold text-lg bg-purple-600 text-white hover:scale-105 transition-all"
            >
              Male
            </button>
            <button
              onClick={() => handleGenderSelect('female')}
              className="flex-1 py-4 px-8 rounded-full font-bold text-lg bg-pink-600 text-white hover:scale-105 transition-all"
            >
              Female
            </button>
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

