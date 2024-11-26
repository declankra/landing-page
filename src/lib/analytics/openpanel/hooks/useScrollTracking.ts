// lib/analytics/openpanel/hooks/useScrollTracking.ts
/* import { useEffect, useRef } from 'react';
import { analyticsClient } from '../client';
import { ANALYTICS_EVENTS } from '../events';
import type { ScrollMilestoneProperties as LocalScrollMilestoneProperties, ScrollMilestone } from '../types';

export function useScrollTracking() {
  const milestones = useRef(new Set<ScrollMilestone>());
  const startTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      ([25, 50, 75, 100] as const).forEach(milestone => {
        if (scrollPercent >= milestone && !milestones.current.has(milestone)) {
          milestones.current.add(milestone);
          
          const properties: LocalScrollMilestoneProperties = {
            milestone,
            timeToMilestone: Date.now() - startTime.current
          };

          analyticsClient.event(ANALYTICS_EVENTS.SCROLL_MILESTONE, properties);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

*/