// lib/analytics/posthog/hooks/useSignupTracking.ts
import { useEffect, useRef, useCallback } from 'react';
import { Analytics } from '../index';
import type { SignupSource } from '../index';

export const useSignupTracking = (source: SignupSource) => {
  const startTime = useRef<number>(Date.now());
  const hasStarted = useRef<boolean>(false);

  const trackStart = () => {
    if (!hasStarted.current) {
      const timeToStart = Date.now() - startTime.current;
      Analytics.trackSignupStarted(source, timeToStart);
      hasStarted.current = true;
    }
  };

  const trackComplete = () => {
    if (hasStarted.current) {
      const timeToComplete = Date.now() - startTime.current;
      Analytics.trackSignupCompleted(source, timeToComplete);
    }
  };

const trackAbandon = useCallback((step: number) => {
    if (hasStarted.current) {
      const timeSpent = Date.now() - startTime.current;
      Analytics.trackSignupAbandoned(source, timeSpent, step);
    }
  }, [source]);

  // Reset tracking on unmount if incomplete
  useEffect(() => {
    return () => {
      if (hasStarted.current) {
        trackAbandon(-1); // -1 indicates component unmount
      }
    };
  }, [trackAbandon]);

  return { trackStart, trackComplete, trackAbandon };
};