// lib/analytics/openpanel/hooks/useSignupTracking.ts
import { useCallback, useRef } from 'react';
import { analyticsClient } from '../client';
import { ANALYTICS_EVENTS } from '../events';

interface SignupEventProperties {
  [key: string]: unknown;
}

export function useSignupTracking() {
  const startTime = useRef<number>();

  const trackSignupStart = useCallback((entryPoint: SignupEventProperties['entryPoint']) => {
    startTime.current = Date.now();
    
    const properties: SignupEventProperties = {
      entryPoint,
      timeToStart: startTime.current - performance.timing.navigationStart
    };
    
    analyticsClient.event(ANALYTICS_EVENTS.SIGNUP_START, properties);
  }, []);
  const trackSignupComplete = useCallback((entryPoint: SignupEventProperties['entryPoint']) => {
    if (!startTime.current) return;
    
    const properties: SignupEventProperties = {
      entryPoint,
      completionTime: Date.now() - startTime.current
    };
    
    analyticsClient.event(ANALYTICS_EVENTS.SIGNUP_COMPLETE, properties);
  }, []);

  const trackSignupAbandoned = useCallback((entryPoint: SignupEventProperties['entryPoint']) => {
    if (!startTime.current) return;
    
    const properties: SignupEventProperties = {
      entryPoint,
      completionTime: Date.now() - startTime.current
    };
    
    analyticsClient.event(ANALYTICS_EVENTS.SIGNUP_ABANDONED, properties);
  }, []);

  return {
    trackSignupStart,
    trackSignupComplete,
    trackSignupAbandoned
  };
}