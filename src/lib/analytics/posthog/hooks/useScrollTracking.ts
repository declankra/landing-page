
// lib/analytics/posthog/hooks/useScrollTracking.ts
import { useEffect, useRef } from 'react';
import { Analytics } from '../index';
import type { ScrollDepth } from '../index';

export const useScrollTracking = () => {
  const trackedMilestones = useRef<Set<ScrollDepth>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      const milestones: ScrollDepth[] = [25, 50, 75, 100];

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !trackedMilestones.current.has(milestone)) {
          trackedMilestones.current.add(milestone);
          Analytics.trackScrollMilestone(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};