'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { trackResultsView, trackClickBankRedirect } from '@/lib/analytics'
import { initRtkcid, appendRtkcidToUrl } from '@/lib/rtkcid'

export const dynamic = 'force-dynamic'

export default function ResultsPreviewPage() {
  const router = useRouter()

  useEffect(() => {
    // Initialize rtkcid from URL on page load
    initRtkcid()
    
    // Check if user has completed quiz
    const storedAnswers = localStorage.getItem('quizAnswers')
    if (!storedAnswers) {
      router.push(appendRtkcidToUrl('/'))
    } else {
      // Track results page view
      trackResultsView()
    }
  }, [router])

  const handleGetStarted = () => {
    // Track ClickBank redirect
    trackClickBankRedirect()
    
    // Redirect to ClickBank affiliate page with rtkcid
    const clickbankUrl = appendRtkcidToUrl('https://get.magnetprotocol.com/click')
    window.location.href = clickbankUrl
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex justify-center">
      <div className="w-full max-w-[480px]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🧠</div>
            <span className="font-bold text-lg">Magnet Protocol</span>
          </div>
        </div>

        {/* Brain Activity Visuals */}
        <div className="px-4 mb-[15px] mt-[15px]">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
            <Image
              src="/brains.png"
              alt="Brain before and after session"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Progress Update Text */}
        <div className="px-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center leading-tight">
              Based on your answers, you&apos;re on track to rewire{' '}
              <span className="text-orange-400">80%</span> of your{' '}
              <span className="text-orange-400 font-bold">limiting beliefs</span> in just{' '}
              <span className="font-bold">21 days.</span>
            </h2>
            <p className="text-gray-400 text-center text-sm">
              Here&apos;s what we predict based on 27,000+ users with similar self-limiting patterns.
            </p>
          </motion.div>
        </div>

        {/* Get Started Button */}
        <div className="px-4 pb-8">
          <motion.button
            onClick={handleGetStarted}
            className="w-full py-5 px-8 rounded-2xl font-bold text-xl bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Get started
          </motion.button>
        </div>
      </div>
    </div>
  )
}

