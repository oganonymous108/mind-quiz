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
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Load gtag script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    document.head.appendChild(script1)

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_TRACKING_ID)
  }
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
  }
}

// Track results page view
export const trackResultsView = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'results_view', {
      event_category: 'Quiz',
      event_label: 'Results Page Viewed',
    })
  }
}

// Track ClickBank redirect
export const trackClickBankRedirect = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'clickbank_redirect', {
      event_category: 'Conversion',
      event_label: 'ClickBank Redirect',
    })
  }
}

