// src/components/providers/PostHogProvider.tsx 
// handles default autocapture settings for posthog and page leave
// more info: https://posthog.com/docs/libraries/next-js?tab=Pages+router 
'use client';

import posthog from 'posthog-js'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

export default function PostHogPageview() {
  const router = useRouter()
  const oldUrlRef = useRef(typeof window !== 'undefined' ? window.location.href : '')

  useEffect(() => {
    // Initialize PostHog
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      loaded: (posthog) => {
        // Enable debug mode in development
        if (process.env.NODE_ENV === 'development') posthog.debug()
      },
      bootstrap: {
        distinctID: posthog.get_distinct_id(),
        isIdentifiedID: posthog.has_opted_out_capturing(),
      },
      // Capture additional context with every event
      capture_pageview: false, // We'll handle this manually
      autocapture: true,
    })

    // Track page views and exits
    const handleRouteChange = () => {
      posthog?.capture('$pageview')
      // Update the old URL after navigation
      oldUrlRef.current = window.location.href
    }

    const handleRouteChangeStart = () => {
      posthog?.capture('$pageleave', {
        $current_url: oldUrlRef.current,
        time_on_page: Date.now() - (window as any).pageLoadTime,
      })
    }

    // Track initial page load
    if (typeof window !== 'undefined') {
      (window as any).pageLoadTime = Date.now()
      posthog?.capture('$pageview')
    }

    // Set up route change listeners
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('routeChangeStart', handleRouteChangeStart)

    // Track page exit when user leaves the site
    const handleBeforeUnload = () => {
      posthog?.capture('$pageleave', {
        $current_url: window.location.href,
        time_on_page: Date.now() - (window as any).pageLoadTime,
        exit_type: 'site_exit'
      })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('routeChangeStart', handleRouteChangeStart)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [router.events])

  return null
}