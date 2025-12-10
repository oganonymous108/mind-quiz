/**
 * Utility functions to handle rtkcid parameter preservation across pages
 */

const RTKCID_STORAGE_KEY = 'rtkcid'

/**
 * Extract rtkcid from URL query parameters
 */
export const getRtkcidFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null
  
  const params = new URLSearchParams(window.location.search)
  return params.get('rtkcid')
}

/**
 * Store rtkcid in localStorage
 */
export const storeRtkcid = (rtkcid: string | null): void => {
  if (typeof window === 'undefined') return
  
  if (rtkcid) {
    localStorage.setItem(RTKCID_STORAGE_KEY, rtkcid)
  }
}

/**
 * Get rtkcid from localStorage
 */
export const getStoredRtkcid = (): string | null => {
  if (typeof window === 'undefined') return null
  
  return localStorage.getItem(RTKCID_STORAGE_KEY)
}

/**
 * Initialize rtkcid: extract from URL and store if present
 * Call this on page load to capture rtkcid from initial URL
 */
export const initRtkcid = (): string | null => {
  const rtkcid = getRtkcidFromUrl()
  if (rtkcid) {
    storeRtkcid(rtkcid)
  }
  return rtkcid || getStoredRtkcid()
}

/**
 * Append rtkcid to a URL if it exists
 */
export const appendRtkcidToUrl = (url: string): string => {
  const rtkcid = getStoredRtkcid()
  if (!rtkcid) return url
  
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}rtkcid=${encodeURIComponent(rtkcid)}`
}



