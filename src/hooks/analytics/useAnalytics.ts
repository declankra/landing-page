// src/hooks/analytics/useAnalytics.ts
import { useEffect, useRef } from 'react';
import { useOpenPanel } from '@openpanel/nextjs';
import { ANALYTICS_EVENTS, ANALYTICS_PROPERTIES } from '@/lib/analytics/OpenPanelProvider';

// Custom hook for tracking time-to-signup
export function useTimeToSignup() {
  const op = useOpenPanel();
  const startTime = useRef(Date.now());

  const trackSignupStart = () => {
    op.track(ANALYTICS_EVENTS.SIGNUP_START, {
      [ANALYTICS_PROPERTIES.TIME_TO_SIGNUP]: Date.now() - startTime.current
    });
  };

  const trackSignupComplete = () => {
    op.track(ANALYTICS_EVENTS.SIGNUP_COMPLETE, {
      [ANALYTICS_PROPERTIES.TIME_TO_SIGNUP]: Date.now() - startTime.current
    });
  };

  const trackSignupAbandon = () => {
    op.track(ANALYTICS_EVENTS.SIGNUP_ABANDON, {
      [ANALYTICS_PROPERTIES.TIME_TO_SIGNUP]: Date.now() - startTime.current
    });
  };

  return { trackSignupStart, trackSignupComplete, trackSignupAbandon };
}

// Custom hook for tracking scroll depth
export function useScrollDepthTracking() {
  const op = useOpenPanel();
  const milestones = useRef(new Set([25, 50, 75, 100]));
  const lastTrackedMilestone = useRef(0);

  useEffect(() => {
    const calculateScrollDepth = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      milestones.current.forEach(milestone => {
        if (scrollPercentage >= milestone && milestone > lastTrackedMilestone.current) {
          op.track(ANALYTICS_EVENTS.SCROLL_MILESTONE, {
            [ANALYTICS_PROPERTIES.SCROLL_DEPTH]: milestone
          });
          lastTrackedMilestone.current = milestone;
          milestones.current.delete(milestone);
        }
      });
    };

    window.addEventListener('scroll', calculateScrollDepth);
    return () => window.removeEventListener('scroll', calculateScrollDepth);
  }, [op]);
}

// Custom hook for tracking feature interactions
export function useFeatureTracking(featureName: string) {
  const op = useOpenPanel();

  const trackFeatureHover = () => {
    op.track(ANALYTICS_EVENTS.FEATURE_HOVER, {
      [ANALYTICS_PROPERTIES.FEATURE_NAME]: featureName
    });
  };

  return { trackFeatureHover };
}

// Custom hook for tracking video interactions
export function useVideoTracking() {
  const op = useOpenPanel();
  const videoStartTime = useRef<number>();

  const trackVideoPlay = () => {
    videoStartTime.current = Date.now();
    op.track(ANALYTICS_EVENTS.VIDEO_PLAY);
  };

  const trackVideoComplete = () => {
    if (videoStartTime.current) {
      op.track(ANALYTICS_EVENTS.VIDEO_COMPLETE, {
        [ANALYTICS_PROPERTIES.VIDEO_DURATION]: Date.now() - videoStartTime.current
      });
    }
  };

  return { trackVideoPlay, trackVideoComplete };
}

// Custom hook for tracking share interactions
export function useShareTracking() {
  const op = useOpenPanel();

  const trackShareClick = (platform: string) => {
    op.track(ANALYTICS_EVENTS.SHARE_CLICK, {
      [ANALYTICS_PROPERTIES.SHARE_PLATFORM]: platform
    });
  };

  const trackShareComplete = (platform: string) => {
    op.track(ANALYTICS_EVENTS.SHARE_COMPLETE, {
      [ANALYTICS_PROPERTIES.SHARE_PLATFORM]: platform
    });
  };

  return { trackShareClick, trackShareComplete };
}