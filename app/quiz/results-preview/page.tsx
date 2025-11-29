'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { trackResultsView, trackClickBankRedirect } from '@/lib/analytics'

export default function ResultsPreviewPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user has completed quiz
    const storedAnswers = localStorage.getItem('quizAnswers')
    if (!storedAnswers) {
      router.push('/')
    } else {
      // Track results page view
      trackResultsView()
    }
  }, [router])

  const handleGetStarted = () => {
    // Track ClickBank redirect
    trackClickBankRedirect()
    
    // Redirect to ClickBank affiliate page
    const clickbankUrl = process.env.NEXT_PUBLIC_CLICKBANK_URL || 'https://your-clickbank-affiliate-link.com'
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
        <div className="px-4 mb-8 mt-8">
          <div className="bg-gray-800/50 rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Brain Before */}
              <div className="text-center">
                <div className="relative w-full aspect-square mb-3 bg-gradient-to-br from-purple-900 via-blue-800 to-green-700 rounded-full flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                  <div className="w-2 h-2 bg-black rounded-full absolute top-1/4 left-1/4"></div>
                  <div className="w-2 h-2 bg-black rounded-full absolute top-1/3 right-1/4"></div>
                  <div className="w-2 h-2 bg-black rounded-full absolute bottom-1/4 left-1/3"></div>
                  <div className="w-2 h-2 bg-black rounded-full absolute bottom-1/3 right-1/3"></div>
                </div>
                <p className="text-sm text-gray-300">Brain before session</p>
              </div>

              {/* Brain After */}
              <div className="text-center">
                <div className="relative w-full aspect-square mb-3 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 rounded-full flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_50%)]"></div>
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.2),transparent_50%)]"></div>
                  <div className="w-2 h-2 bg-black rounded-full absolute top-1/4 left-1/4"></div>
                  <div className="w-2 h-2 bg-black rounded-full absolute top-1/3 right-1/4"></div>
                  <div className="w-2 h-2 bg-black rounded-full absolute bottom-1/4 left-1/3"></div>
                  <div className="w-2 h-2 bg-black rounded-full absolute bottom-1/3 right-1/3"></div>
                </div>
                <p className="text-sm text-gray-300">Brain after session</p>
              </div>
            </div>
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

