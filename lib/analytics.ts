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

  // Prevent double initialization by checking if script already exists
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}"]`)) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA] Already initialized - script exists')
    }
    return
  }

  // Initialize dataLayer first (required by gtag.js)
  window.dataLayer = window.dataLayer || []
  
  // Define gtag function BEFORE script loads (standard GA4 pattern)
  // This queues commands before the script loads
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  window.gtag = gtag

  // Load gtag script - this will replace our placeholder function with the real one
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  
  script.onload = () => {
    // Wait for the script to fully execute and replace our placeholder function
    // Use a small delay to ensure gtag.js has processed
    setTimeout(() => {
      // Verify the real gtag function is available (it should be different from our placeholder)
      const originalGtag = window.gtag
      
      // Send initialization commands
      window.gtag('js', new Date())
      window.gtag('config', GA_TRACKING_ID, {
        page_path: window.location.pathname,
        send_page_view: true,
      })
      
      console.log('[GA] Script loaded and initialized with ID:', GA_TRACKING_ID)
      console.log('[GA] DataLayer length:', window.dataLayer.length)
      console.log('[GA] gtag function type:', typeof window.gtag)
      
      // Check if collect requests are being sent
      setTimeout(() => {
        console.log('[GA] After 1s - DataLayer length:', window.dataLayer.length)
        console.log('[GA] Check Network tab for requests to google-analytics.com/g/collect')
      }, 1000)
    }, 200)
  }

  script.onerror = () => {
    console.error('[GA] Failed to load Google Analytics script')
  }

  document.head.appendChild(script)
}

// Track page view
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      send_page_view: true,
    })
    console.log('[GA] Pageview tracked:', url)
  } else {
    console.warn('[GA] Cannot track pageview - gtag not available or GA_TRACKING_ID missing')
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

// Track funnel page views with unique event names
export const trackFunnelPageView = (pageName: string, stepNumber?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const eventData: any = {
      event_category: 'Funnel',
      event_label: pageName,
      page_name: pageName,
    }
    
    if (stepNumber !== undefined) {
      eventData.step_number = stepNumber
    }
    
    window.gtag('event', `funnel_${pageName.toLowerCase().replace(/\s+/g, '_')}`, eventData)
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[GA Event] funnel_${pageName.toLowerCase().replace(/\s+/g, '_')}`, eventData)
    }
  }
}

// Specific funnel page tracking functions
export const trackLandingPageView = () => trackFunnelPageView('landing_page', 1)
export const trackQuizQ1View = () => trackFunnelPageView('quiz_question_1', 2)
export const trackQuizQ2View = () => trackFunnelPageView('quiz_question_2', 3)
export const trackQuizQ3View = () => trackFunnelPageView('quiz_question_3', 4)
export const trackQuizQ4View = () => trackFunnelPageView('quiz_question_4', 5)
export const trackQuizQ5View = () => trackFunnelPageView('quiz_question_5', 6)
export const trackInfoPageView = () => trackFunnelPageView('info_page', 7)
export const trackQuizQ6View = () => trackFunnelPageView('quiz_question_6', 8)
export const trackQuizQ7View = () => trackFunnelPageView('quiz_question_7', 9)
export const trackInfo2PageView = () => trackFunnelPageView('info2_page', 10)
export const trackQuizQ8View = () => trackFunnelPageView('quiz_question_8', 11)
export const trackQuizQ9View = () => trackFunnelPageView('quiz_question_9', 12)
export const trackQuizQ10View = () => trackFunnelPageView('quiz_question_10', 13)
export const trackQuizQ11View = () => trackFunnelPageView('quiz_question_11', 14)
export const trackQuizQ12View = () => trackFunnelPageView('quiz_question_12', 15)
export const trackQuizQ13View = () => trackFunnelPageView('quiz_question_13', 16)
export const trackQuizQ14View = () => trackFunnelPageView('quiz_question_14', 17)
export const trackCalculatingPageView = () => trackFunnelPageView('calculating_page', 18)
export const trackResultsPreviewPageView = () => trackFunnelPageView('results_preview_page', 19)

