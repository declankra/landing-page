// src/lib/gtag.ts
// Configure your GA Measurement ID
export const GA_MEASUREMENT_ID = 'G-12GW5RLXXD'

// Extend Window object to include gtag
declare global {
    interface Window {
      dataLayer: Array<Record<string, unknown>>
      gtag: (
        command: string,
        targetId: string,
        config?: Record<string, unknown>
      ) => void
    }
  }

// Log page views
export const pageview = (url: string) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

// Log specific events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}