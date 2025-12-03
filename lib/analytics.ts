// Google Analytics tracking utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') {
    return
  }

  if (!GA_TRACKING_ID) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[GA] Not initialized - GA_TRACKING_ID is missing')
    }
    return
  }

  // Check if already initialized
  if (window.gtag && window.dataLayer) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA] Already initialized')
    }
    return
  }

  // Initialize dataLayer and gtag function first
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args)
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA Debug]', ...args)
    }
  }

  // Load gtag script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  
  script.onload = () => {
    window.gtag('js', new Date())
    window.gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
    })
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA] Initialized with ID:', GA_TRACKING_ID)
    }
  }

  script.onerror = () => {
    console.error('[GA] Failed to load Google Analytics script')
  }

  document.head.appendChild(script)
}

// Track page view
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track quiz start
export const trackQuizStart = (gender: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_start', {
      event_category: 'Quiz',
      event_label: 'Quiz Started',
      gender: gender,
    })
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA Event] quiz_start', { gender })
    }
  }
}

// Track question view
export const trackQuestionView = (questionId: number, questionText: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'question_view', {
      event_category: 'Quiz',
      event_label: `Question ${questionId}`,
      question_id: questionId,
      question_text: questionText,
    })
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA Event] question_view', { questionId, questionText })
    }
  }
}

// Track question answer
export const trackQuestionAnswer = (
  questionId: number,
  answer: string | string[],
  questionType: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'question_answer', {
      event_category: 'Quiz',
      event_label: `Question ${questionId} Answered`,
      question_id: questionId,
      answer: Array.isArray(answer) ? answer.join(', ') : answer,
      question_type: questionType,
    })
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA Event] question_answer', { questionId, answer, questionType })
    }
  }
}

// Track quiz completion
export const trackQuizComplete = (totalQuestions: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_complete', {
      event_category: 'Quiz',
      event_label: 'Quiz Completed',
      total_questions: totalQuestions,
    })
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA Event] quiz_complete', { totalQuestions })
    }
  }
}

// Track quiz abandonment
export const trackQuizAbandon = (lastQuestionId: number, totalQuestions: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_abandon', {
      event_category: 'Quiz',
      event_label: `Abandoned at Question ${lastQuestionId}`,
      last_question_id: lastQuestionId,
      total_questions: totalQuestions,
      completion_percentage: Math.round((lastQuestionId / totalQuestions) * 100),
    })
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA Event] quiz_abandon', { lastQuestionId, totalQuestions })
    }
  }
}

// Track results page view
export const trackResultsView = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'results_view', {
      event_category: 'Quiz',
      event_label: 'Results Page Viewed',
    })
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA Event] results_view')
    }
  }
}

// Track ClickBank redirect
export const trackClickBankRedirect = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'clickbank_redirect', {
      event_category: 'Conversion',
      event_label: 'ClickBank Redirect',
    })
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA Event] clickbank_redirect')
    }
  }
}

