'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { trackQuizComplete } from '@/lib/analytics'

export default function CalculatingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentTask, setCurrentTask] = useState(0)

  const tasks = [
    { id: 0, label: "Analysing your answers", completed: false },
    { id: 1, label: "Calculating your abundance forecast", completed: false },
    { id: 2, label: "Creating your personalized self-hypnosis Program", completed: false },
  ]

  useEffect(() => {
    // Track quiz completion when page loads
    trackQuizComplete(14) // Total number of questions
    
    // Animate progress from 0 to 100
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          // Redirect to results page after animation completes
          setTimeout(() => {
            router.push('/quiz/results-preview')
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    // Update task completion based on progress
    const taskInterval = setInterval(() => {
      setCurrentTask(prev => {
        if (progress >= 33 && prev === 0) return 1
        if (progress >= 66 && prev === 1) return 2
        return prev
      })
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(taskInterval)
    }
  }, [router, progress])

  const circumference = 2 * Math.PI * 90
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex justify-center">
      <div className="w-full max-w-[480px] px-4 py-8">
        {/* Header Text */}
        <motion.h1
          className="text-2xl md:text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          All set! Just a moment while we process your data...
        </motion.h1>

        {/* Circular Progress */}
        <div className="flex justify-center mb-8">
          <div className="relative w-64 h-64">
            <svg className="transform -rotate-90 w-64 h-64">
              {/* Background circle */}
              <circle
                cx="128"
                cy="128"
                r="90"
                stroke="#2d2d2d"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <motion.circle
                cx="128"
                cy="128"
                r="90"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 0.1 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFB380" />
                  <stop offset="100%" stopColor="#CC6600" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-4xl font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {progress}%
              </motion.div>
            </div>
          </div>
        </div>

        {/* Processing Tasks List */}
        <div className="mb-8 space-y-3">
          {tasks.map((task, index) => {
            const isCompleted = index < currentTask
            const isActive = index === currentTask && progress < 100
            
            return (
              <motion.div
                key={task.id}
                className="flex items-center gap-3 text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {isCompleted ? (
                  <span className="text-orange-500 text-xl">✓</span>
                ) : isActive ? (
                  <span className="text-orange-500 text-xl">•••</span>
                ) : (
                  <span className="text-gray-600 text-xl">○</span>
                )}
                <span className={isCompleted || isActive ? 'text-white' : 'text-gray-500'}>
                  {task.label}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Testimonial Box */}
        <motion.div
          className="border border-orange-500/50 rounded-xl p-6 bg-gray-800/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Star Rating */}
          <div className="flex text-yellow-400 mb-3">
            {'★★★★★'.split('').map((star, i) => (
              <span key={i}>{star}</span>
            ))}
          </div>
          
          {/* Testimonial Text */}
          <p className="text-white italic mb-4 text-sm leading-relaxed">
            &quot;I stopped chasing. I started attracting. The moment my energy shifted, everything else did too - opportunities, people, income. For the first time, I wasn&apos;t just visualizing my future self. I was living it.&quot;
          </p>
          
          {/* Verified User Badge */}
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-xs font-semibold uppercase">VERIFIED USER</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

