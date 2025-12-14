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
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-[480px] mx-auto">
          {/* Header - Minimal */}
          <div className="flex items-center justify-center px-4 pt-4 pb-2">
            <div className="flex items-center gap-2">
              <div className="text-2xl">🧠</div>
              <span className="font-bold text-lg text-gray-900">Magnet Protocol</span>
            </div>
          </div>

          {/* Hero Section - Above the fold */}
          <div className="px-4 pt-6 pb-4">
            {/* Main Image */}
            <div className="mb-6">
              <div className="relative w-full h-[200px] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/main.jpg"
                  alt="Transform Your Life"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Headline - Conversion focused */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight text-center">
              Rewire Your Mind in Just <span className="text-orange-600">21 Days</span> and Attract the Life You Deserve
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
              Join thousands who've transformed limiting beliefs into unlimited abundance
            </p>

            {/* Social Proof - Trust Badge */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex text-yellow-400 text-lg">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                98% Success Rate
              </span>
            </div>

            {/* Primary CTA - Above the fold */}
            <button
              onClick={handleContinue}
              className="w-full py-5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xl shadow-2xl hover:from-orange-600 hover:to-orange-700 active:scale-[0.98] transition-all duration-200 mb-4"
            >
              Get Started Now →
            </button>

            {/* Trust Elements */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-2">
                🔒 Secure & Confidential • ✅ 30-Day Money-Back Guarantee
              </p>
              <p className="text-xs text-gray-500">
                No credit card required to start
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="px-4 py-6 bg-white">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">
              What You'll Get:
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl font-bold">✓</span>
                <p className="text-gray-700 text-base flex-1">
                  <span className="font-semibold">Attract wealth and success</span> effortlessly through subconscious reprogramming
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl font-bold">✓</span>
                <p className="text-gray-700 text-base flex-1">
                  <span className="font-semibold">Improved IQ & mental power</span> - Think clearer, make better decisions
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl font-bold">✓</span>
                <p className="text-gray-700 text-base flex-1">
                  <span className="font-semibold">Sharper memory retention</span> - Remember what matters most
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl font-bold">✓</span>
                <p className="text-gray-700 text-base flex-1">
                  <span className="font-semibold">Laser-focused concentration</span> - Eliminate distractions naturally
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl font-bold">✓</span>
                <p className="text-gray-700 text-base flex-1">
                  <span className="font-semibold">Deeper, healthier relationships</span> - Attract love and connection
                </p>
              </div>
            </div>

            {/* Secondary CTA */}
            <button
              onClick={handleContinue}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg shadow-xl hover:from-orange-600 hover:to-orange-700 active:scale-[0.98] transition-all duration-200"
            >
              Start Your Transformation →
            </button>
          </div>

          {/* Social Proof - Testimonials */}
          <div className="px-4 py-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">
              Real Results from Real People
            </h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
                <div className="flex text-yellow-400 mb-3">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-3 text-sm leading-relaxed">
                  &quot;After two weeks with Magnet Protocol, I booked this huge casting. It&apos;s like I dropped all those limiting beliefs that kept me small, and suddenly abundance just showed up.&quot;
                </p>
                <p className="text-gray-900 font-bold text-sm">Julien, 32 - Actor</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
                <div className="flex text-yellow-400 mb-3">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-3 text-sm leading-relaxed">
                  &quot;I kept falling into the same negative patterns in love. With Magnet Protocol, something finally shifted... and I met the person I&apos;d been dreaming about.&quot;
                </p>
                <p className="text-gray-900 font-bold text-sm">Sarah, 28 - Teacher</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
                <div className="flex text-yellow-400 mb-3">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-3 text-sm leading-relaxed">
                  &quot;Raising money felt impossible. Magnet Protocol rewired that, and out of nowhere, investors said yes. I unlocked a whole new level of abundance.&quot;
                </p>
                <p className="text-gray-900 font-bold text-sm">Lea, 35 - Startup Founder</p>
              </div>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="px-4 py-8 bg-gradient-to-b from-orange-50 to-white">
            <h2 className="text-2xl font-bold mb-3 text-gray-900 text-center">
              Ready to Transform Your Life?
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              Join thousands who've already started their journey to abundance
            </p>
            <button
              onClick={handleContinue}
              className="w-full py-5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xl shadow-2xl hover:from-orange-600 hover:to-orange-700 active:scale-[0.98] transition-all duration-200 mb-4"
            >
              Get Instant Access Now →
            </button>
            <p className="text-xs text-gray-500 text-center">
              ⚡ Limited spots available • 🔒 100% Secure • ✅ 30-Day Guarantee
            </p>
          </div>

          {/* Footer */}
          <div className="px-4 py-6 text-center text-xs text-gray-500 space-y-3 bg-gray-50">
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="text-gray-600 hover:text-orange-600 transition-colors">
                Contact Us
              </a>
              <a href="/privacy" className="text-gray-600 hover:text-orange-600 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-600 hover:text-orange-600 transition-colors">
                Terms & Conditions
              </a>
            </div>
            <p className="text-gray-500">© 2025 All rights reserved.</p>
            <p className="text-gray-400">Disclaimer: Results may vary from person to person</p>
          </div>
        </div>
      </div>
    </>
  )
}
