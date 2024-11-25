'use client'

import { useAnalytics } from './useGoogleAnalytics'

export function AnalyticsProvider() {
  return useAnalytics()
}