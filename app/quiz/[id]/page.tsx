'use client'

import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { trackQuestionView, trackQuestionAnswer, trackQuizAbandon } from '@/lib/analytics'

interface QuizAnswer {
  questionId: number
  answer: string | string[]
}

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which type of abundance do you most desire right now?",
    type: 'single',
    options: [
      { id: 'financial', label: 'Financial abundance', icon: '💰' },
      { id: 'love', label: 'Love & connection', icon: '💖' },
      { id: 'career', label: 'Career & success boost', icon: '💼' },
      { id: 'confidence', label: 'Positivity & high confidence', icon: '😊' },
      { id: 'everything', label: 'A bit of everything', icon: '🤲' },
    ]
  },
  {
    id: 2,
    question: "What else can we help you with?",
    type: 'multiple',
    options: [
      { id: 'resilience', label: 'Resilience', icon: '🔥' },
      { id: 'motivation', label: 'Motivation', icon: '🚀' },
      { id: 'calm', label: 'Inner calm', icon: '🌿' },
      { id: 'esteem', label: 'Self-esteem', icon: '💗' },
      { id: 'all', label: 'Honestly, all these would help', icon: '🌀' },
    ]
  },
  {
    id: 3,
    question: "How happy are you with your life right now?",
    type: 'single',
    options: [
      { id: 'fully', label: 'Fully', icon: '' },
      { id: 'somewhat', label: 'Somewhat', icon: '' },
      { id: 'not_really', label: 'Not really', icon: '' },
      { id: 'not_at_all', label: 'Not at all', icon: '' },
    ]
  },
  {
    id: 4,
    question: "Are you currently going through a phase where you deeply need to amplify abundance in your life?",
    type: 'single',
    options: [
      { id: 'yes', label: 'Yes', sublabel: "It feels like the right moment to shift and expand", icon: '' },
      { id: 'kind_of', label: 'Kind of', sublabel: "I feel the need, but it's still vague", icon: '' },
      { id: 'not_really', label: 'Not really', sublabel: "I'm just curious for now", icon: '' },
    ]
  },
  {
    id: 5,
    question: "Are you familiar with subconscious reprogramming?",
    type: 'single',
    options: [
      { id: 'yes_explored', label: "Yes - I've explored it before", icon: '' },
      { id: 'heard_never_tried', label: "I've heard about it, but never tried", icon: '' },
      { id: 'not_really_interested', label: "Not really, but I'm interested", icon: '' },
    ]
  },
  {
    id: 6,
    question: "Is there a very specific goal or dream you want to unlock abundance for?",
    type: 'single',
    options: [
      { id: 'yes', label: 'Yes', sublabel: "There's something I really want to make happen", icon: '' },
      { id: 'kind_of', label: 'Kind of', sublabel: "I have a lot of desires", icon: '' },
      { id: 'not_really', label: 'Not really', sublabel: "I mostly want to allow myself to grow", icon: '' },
    ]
  },
  {
    id: 7,
    question: "Do you feel like something is blocking you deep down?",
    type: 'multiple',
    options: [
      { id: 'stuck', label: "I feel stuck and can't explain why", icon: '' },
      { id: 'patterns', label: 'I repeat the same patterns over and over', icon: '' },
      { id: 'overthinking', label: "I'm constantly overthinking or doubting myself", icon: '' },
      { id: 'want_more', label: "I don't feel blocked, but I want more - and faster", icon: '' },
      { id: 'other', label: 'Other', icon: '' },
    ]
  },
  {
    id: 8,
    question: "Right now, how do you feel when you think about your future?",
    type: 'single',
    options: [
      { id: 'calm', label: 'Calm', sublabel: "I trust everything will unfold", icon: '' },
      { id: 'slightly_anxious', label: 'Slightly anxious', sublabel: "There's uncertainty, but I try to stay positive", icon: '' },
      { id: 'often_stressed', label: 'Often stressed', sublabel: "I worry things won't go as planned", icon: '' },
      { id: 'overwhelmed', label: 'Overwhelmed', sublabel: "I feel lost or scared about what's coming", icon: '' },
      { id: 'other', label: 'Other', icon: '' },
    ]
  },
  {
    id: 9,
    question: "Which limiting belief still holds power over you?",
    type: 'multiple',
    options: [
      { id: 'fail', label: "I'll probably fail", icon: '' },
      { id: 'not_competent', label: "I'm not competent enough", icon: '' },
      { id: 'wrong_background', label: "I didn't come from the right background", icon: '' },
      { id: 'dont_deserve', label: "I don't deserve this to happen to me", icon: '' },
      { id: 'success_others', label: 'Success only happens to others', icon: '' },
      { id: 'not_worthy_loved', label: "I'm not worthy of being loved", icon: '' },
      { id: 'not_lucky', label: "I'm just not lucky in life", icon: '' },
      { id: 'other', label: 'Other', icon: '' },
    ]
  },
  {
    id: 10,
    question: "How would you describe your self-confidence right now?",
    type: 'single',
    options: [
      { id: 'strong', label: 'Strong', sublabel: 'I feel grounded and capable', icon: '' },
      { id: 'fair', label: 'Fair', sublabel: 'But I still question myself often', icon: '' },
      { id: 'low', label: 'Low', sublabel: 'I struggle to trust myself', icon: '' },
      { id: 'hard_to_say', label: 'Hard to say', sublabel: 'I feel a bit lost', icon: '' },
    ]
  },
  {
    id: 11,
    question: "How often do you feel genuinely grateful for your life as it is?",
    type: 'single',
    options: [
      { id: 'daily', label: 'Daily', sublabel: "It's a core part of who I am", icon: '' },
      { id: 'sometimes', label: 'Sometimes', sublabel: 'When I take a moment to pause', icon: '' },
      { id: 'rarely', label: "I rarely feel it", sublabel: "I'm often focused on what's missing", icon: '' },
      { id: 'know_should', label: 'I know I should', sublabel: "But right now I struggle to connect with it", icon: '' },
    ]
  },
  {
    id: 12,
    question: "Do you deeply and sincerely want to shift your current situation?",
    type: 'single',
    options: [
      { id: 'yes', label: 'Yes', icon: '' },
      { id: 'kind_of', label: 'Kind of', icon: '' },
      { id: 'not_really', label: 'Not really', icon: '' },
    ]
  },
  {
    id: 13,
    question: "What is your age?",
    type: 'number',
    options: []
  },
  {
    id: 14,
    question: "Are you ready to step into the life you've been waiting for?",
    type: 'single',
    options: [
      { id: 'yes_ready', label: "Yes – I'm ready to begin", icon: '' },
      { id: 'not_yet', label: 'Not yet', icon: '' },
    ]
  },
]

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const questionId = parseInt(params.id as string)
  const currentQuestion = QUIZ_QUESTIONS.find(q => q.id === questionId)
  
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [storedAnswers, setStoredAnswers] = useState<QuizAnswer[]>([])
  const [numberInput, setNumberInput] = useState<string>('')

  useEffect(() => {
    // Load stored answers
    const stored = localStorage.getItem('quizAnswers')
    if (stored) {
      setStoredAnswers(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    // Load current question's answer if exists
    const currentAnswer = storedAnswers.find(a => a.questionId === questionId)
    if (currentAnswer) {
      if (Array.isArray(currentAnswer.answer)) {
        setSelectedAnswers(currentAnswer.answer as string[])
      } else {
        if (currentQuestion?.type === 'number') {
          setNumberInput(currentAnswer.answer as string)
        } else {
          setSelectedAnswers([currentAnswer.answer as string])
        }
      }
    } else {
      setSelectedAnswers([])
      setNumberInput('')
    }

    // Track question view
    if (currentQuestion) {
      trackQuestionView(currentQuestion.id, currentQuestion.question)
    }
  }, [questionId, storedAnswers, currentQuestion])

  if (!currentQuestion) {
    router.push('/quiz/1')
    return null
  }

  const progress = (questionId / QUIZ_QUESTIONS.length) * 100

  const handleAnswerSelect = (optionId: string) => {
    if (currentQuestion.type === 'single') {
      setSelectedAnswers([optionId])
      
      // Track answer
      trackQuestionAnswer(questionId, optionId, currentQuestion.type)
      
      // Auto-save and redirect for single choice questions
      const answer: QuizAnswer = {
        questionId,
        answer: optionId
      }

      const updatedAnswers = [
        ...storedAnswers.filter(a => a.questionId !== questionId),
        answer
      ]
      
      localStorage.setItem('quizAnswers', JSON.stringify(updatedAnswers))
      setStoredAnswers(updatedAnswers)

      // Navigate to next question, info page, or results
      setTimeout(() => {
        if (questionId === 5) {
          // After question 5, go to info page
          router.push('/quiz/info')
        } else if (questionId < QUIZ_QUESTIONS.length) {
          router.push(`/quiz/${questionId + 1}`)
        } else {
          router.push('/quiz/calculating')
        }
      }, 300) // Small delay for visual feedback
    } else {
      setSelectedAnswers(prev => 
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      )
    }
  }

  const handleNext = () => {
    if (currentQuestion.type === 'number') {
      if (!numberInput || numberInput === '0') return
    } else {
      if (selectedAnswers.length === 0) return
    }

    // Track answer
    const answerValue = currentQuestion.type === 'number' 
      ? numberInput 
      : currentQuestion.type === 'single' 
        ? selectedAnswers[0] 
        : selectedAnswers
    
    trackQuestionAnswer(questionId, answerValue, currentQuestion.type)

    // Save answer
    const answer: QuizAnswer = {
      questionId,
      answer: answerValue
    }

    const updatedAnswers = [
      ...storedAnswers.filter(a => a.questionId !== questionId),
      answer
    ]
    
    localStorage.setItem('quizAnswers', JSON.stringify(updatedAnswers))
    setStoredAnswers(updatedAnswers)

    // Navigate to next question, info page, or results
    if (questionId === 5) {
      // After question 5, go to info page
      router.push('/quiz/info')
    } else if (questionId < QUIZ_QUESTIONS.length) {
      router.push(`/quiz/${questionId + 1}`)
    } else {
      router.push('/quiz/calculating')
    }
  }

  const handleBack = () => {
    if (questionId === 6) {
      // From question 6, go back to info page
      router.push('/quiz/info')
    } else if (questionId > 1) {
      router.push(`/quiz/${questionId - 1}`)
    } else {
      // Track abandonment when leaving quiz to go back to landing page
      trackQuizAbandon(questionId, QUIZ_QUESTIONS.length)
      router.push('/')
    }
  }

  // Track abandonment when user closes/navigates away from quiz
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (questionId < QUIZ_QUESTIONS.length) {
        trackQuizAbandon(questionId, QUIZ_QUESTIONS.length)
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [questionId])

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex justify-center">
      <div className="w-full max-w-[480px]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button
            onClick={handleBack}
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
          <div className="text-sm text-gray-400">
            {questionId} of {QUIZ_QUESTIONS.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 mb-6">
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="px-4 mb-8">
          <h1 className="text-2xl font-bold text-center mb-8">
            {currentQuestion.question}
          </h1>

          {/* Number Input */}
          {currentQuestion.type === 'number' && (
            <div className="max-w-xs mx-auto mb-8">
              <input
                type="number"
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value)}
                placeholder="0"
                className="w-full py-4 px-6 rounded-xl bg-gray-800/50 border border-gray-700 text-white text-center text-2xl focus:outline-none focus:border-orange-500/50"
                min="0"
                max="120"
              />
            </div>
          )}

          {/* Options */}
          {currentQuestion.type !== 'number' && (
          <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswers.includes(option.id)
            return (
              <motion.button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg'
                    : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-orange-500/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 flex-1">
                  {option.icon && <span className="text-2xl">{option.icon}</span>}
                  <div className="flex flex-col text-left">
                    <span className="font-medium">{option.label}</span>
                    {option.sublabel && (
                      <span className={`text-sm font-normal ${
                        isSelected ? 'text-white' : 'text-gray-400'
                      }`}>{option.sublabel}</span>
                    )}
                  </div>
                </div>
                {currentQuestion.type === 'single' ? (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                ) : (
                  <div
                    className={`w-5 h-5 border-2 rounded ${
                      isSelected
                        ? 'bg-white border-white'
                        : 'border-gray-500'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-full h-full text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                )}
              </motion.button>
            )
          })}
          </div>
          )}
        </div>

        {/* Next Button - Only show for multiple choice and number input questions */}
        {currentQuestion.type !== 'single' && (
          <div className="px-4 pb-8">
            <button
              onClick={handleNext}
              disabled={currentQuestion.type === 'number' ? (!numberInput || numberInput === '0') : selectedAnswers.length === 0}
              className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all ${
                (currentQuestion.type === 'number' ? (numberInput && numberInput !== '0') : selectedAnswers.length > 0)
                  ? 'bg-gradient-to-r from-orange-500 to-orange-700 text-white shadow-lg hover:scale-105'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {questionId === QUIZ_QUESTIONS.length ? 'See Results' : 'Next'}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 pb-8 text-center text-xs text-gray-500 space-y-1">
          <p>© 2025 All rights reserved.</p>
          <p>Disclaimer: Results may vary from person to person</p>
        </div>
      </div>
    </div>
  )
}

