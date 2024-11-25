// Get Measurement ID from environment variables
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

// Validation to ensure GA ID is configured
if (!GA_MEASUREMENT_ID) {
  console.warn(
    'Google Analytics Measurement ID is not configured. Please add NEXT_PUBLIC_GA_ID to your environment variables.'
  )
}

// Type definitions
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

// Log page views - now with validation
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID) return // Skip if GA not configured
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

// Log events - now with validation
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  if (!GA_MEASUREMENT_ID) return // Skip if GA not configured
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}