// src/hooks/useScrollTracking.ts
import { useEffect, useRef } from 'react';
import Analytics, { AMPLITUDE_EVENTS } from '@/lib/analytics/amplitude/amplitude';

// Define scroll depth milestones
const SCROLL_DEPTHS = {
  QUARTER: 25,
  HALF: 50,
  THREE_QUARTERS: 75,
  COMPLETE: 100
} as const;

export const useScrollTracking = () => {
  // Track which milestones have been hit
  const milestonesRef = useRef(new Set<number>());
  
  useEffect(() => {
    const handleScroll = () => {
      // Calculate current scroll percentage
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / documentHeight) * 100;

      // Check each milestone
      Object.values(SCROLL_DEPTHS).forEach(milestone => {
        if (scrollPercentage >= milestone && !milestonesRef.current.has(milestone)) {
          // Track this milestone using Amplitude's event tracking
          Analytics.track(AMPLITUDE_EVENTS.SCROLL_DEPTH, {
            depth_percentage: milestone,
            page_url: window.location.pathname,
            page_title: document.title
          });
          
          milestonesRef.current.add(milestone);
        }
      });
    };

    // Throttle the scroll event
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
};