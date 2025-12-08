'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export const dynamic = 'force-dynamic'

interface QuizAnswer {
  questionId: number
  answer: string | string[]
}

export default function ResultsPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [gender, setGender] = useState<string>('')

  useEffect(() => {
    // Load answers and gender
    const storedAnswers = localStorage.getItem('quizAnswers')
    const storedGender = localStorage.getItem('quizGender')
    
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers))
    }
    if (storedGender) {
      setGender(storedGender)
    }

    // If no answers, redirect to start
    if (!storedAnswers) {
      router.push('/')
    }
  }, [router])

  const handleGetResults = () => {
    // Redirect to ClickBank affiliate page
    window.location.href = 'https://get.magnetprotocol.com/click'
  }

  // Calculate personalized results based on answers
  const getResultsSummary = () => {
    if (answers.length === 0) return null

    const allAnswers = answers.flatMap(a => 
      Array.isArray(a.answer) ? a.answer : [a.answer]
    )

    const themes = {
      financial: allAnswers.filter(a => a.includes('financial') || a.includes('finances')).length,
      love: allAnswers.filter(a => a.includes('love') || a.includes('relationships')).length,
      career: allAnswers.filter(a => a.includes('career') || a.includes('success')).length,
      confidence: allAnswers.filter(a => a.includes('confidence') || a.includes('esteem')).length,
    }

    const topTheme = Object.entries(themes).reduce((a, b) => 
      themes[a[0] as keyof typeof themes] > themes[b[0] as keyof typeof themes] ? a : b
    )[0]

    return {
      topTheme,
      completionRate: Math.round((answers.length / 9) * 100),
    }
  }

  const results = getResultsSummary()

  if (!results) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Loading your results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex justify-center">
      <div className="w-full max-w-[480px] px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold mb-4">
              Your Personalized Results Are Ready!
            </h1>
            <p className="text-gray-300 text-lg">
              Based on your answers, we&apos;ve created a customized program just for you
            </p>
          </motion.div>
        </div>

        {/* Results Summary */}
        <motion.div
          className="bg-gradient-to-br from-orange-500/20 to-orange-700/20 border border-orange-500/30 rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Your Focus Areas</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
              <span className="text-lg">Quiz Completion</span>
              <span className="text-2xl font-bold text-orange-400">{results.completionRate}%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
              <span className="text-lg">Primary Focus</span>
              <span className="text-xl font-semibold text-orange-400 capitalize">
                {results.topTheme.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* What You'll Get */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4">What You&apos;ll Get:</h2>
          <div className="space-y-3">
            {[
              '21-day personalized hypnosis program',
              'Neuroscience-backed techniques',
              'Money psychology insights',
              'Daily guided sessions',
              'Progress tracking tools',
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <span className="text-2xl">✓</span>
                <span className="text-gray-200">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={handleGetResults}
            className="w-full py-5 px-8 rounded-xl font-bold text-xl bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg hover:scale-105 transition-transform mb-4"
          >
            Get Your Personalized Program Now
          </button>
          <p className="text-center text-sm text-gray-400">
            Limited time: Get your FREE $19.99 gift when you start today
          </p>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-500 space-y-1">
          <p>© 2025 All rights reserved.</p>
          <p>Disclaimer: Results may vary from person to person</p>
        </div>
      </div>
    </div>
  )
}

