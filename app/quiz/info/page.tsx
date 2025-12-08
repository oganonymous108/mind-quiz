'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { initRtkcid, appendRtkcidToUrl } from '@/lib/rtkcid'
import { trackInfoPageView } from '@/lib/analytics'

export const dynamic = 'force-dynamic'

export default function InfoPage() {
  const router = useRouter()

  useEffect(() => {
    // Initialize rtkcid from URL on page load
    initRtkcid()
    // Track info page view
    trackInfoPageView()
  }, [])

  const handleGotIt = () => {
    // Continue to question 6
    router.push(appendRtkcidToUrl('/quiz/6'))
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex justify-center">
      <div className="w-full max-w-[480px]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button
            onClick={() => router.push(appendRtkcidToUrl('/quiz/5'))}
            className="text-white hover:text-orange-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="text-2xl">🧠</div>
            <span className="font-bold text-lg">Magnet Protocol</span>
          </div>
          <div className="w-6"></div>
        </div>

        {/* Neuron Image */}
        <div className="px-4 mb-6 mt-4">
          <div className="relative w-full h-[300px] overflow-hidden" style={{ borderRadius: '20px' }}>
            <Image
              src="/info1.jpg"
              alt="Neuron illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="px-4">
          <h1 className="text-2xl font-bold mb-4 text-left">
            Neuroscience shows that your subconscious controls 95% of your life
          </h1>
          
          <p className="text-white text-left text-base leading-[23px] mb-4">
            ...without you realizing it. And most of it was shaped long ago - in childhood.
          </p>

          <p className="text-white text-left text-base leading-[23px] mb-4">
            If it&apos;s filled with fear, doubt, or scarcity... It quietly <span className="font-bold text-orange-500">sabotages your success, your joy, and everything you&apos;re trying to attract.</span>
          </p>

          <p className="text-white text-left text-base leading-[23px] mb-4">
            You can work harder. Think more positively. Try again and again. But nothing truly changes - because the block is deeper.
          </p>

          <p className="text-white text-left text-base leading-[23px] mb-0">
            This is why you still feel stuck, even when you&apos;re doing your best. <span className="font-bold text-orange-500">And that&apos;s exactly what Magnet Protocol is about to change.</span>
          </p>
        </div>

        {/* Got It Button */}
        <div className="px-4 pb-8 mt-[15px]">
          <button
            onClick={handleGotIt}
            className="w-full py-4 px-8 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg hover:scale-105 transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}

