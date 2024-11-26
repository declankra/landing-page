import { useCallback, useRef } from 'react';
import { analyticsClient } from '../client';
import { ANALYTICS_EVENTS } from '../events';

interface VideoEventProperties {
  [key: string]: unknown;
}

export function useVideoTracking(videoId: string) {
  const progressIntervals = useRef(new Set<number>());
  
  const trackVideoPlay = useCallback(() => {
    const properties: VideoEventProperties = {
      videoId,
      timestamp: Date.now()
    };
    
    analyticsClient.event(ANALYTICS_EVENTS.VIDEO_PLAY, properties);
  }, [videoId]);

  const trackVideoProgress = useCallback((currentTime: number, duration: number) => {
    const percent = Math.floor((currentTime / duration) * 100);
    
    // Track progress at 25%, 50%, 75%
    [25, 50, 75].forEach(milestone => {
      if (percent >= milestone && !progressIntervals.current.has(milestone)) {
        progressIntervals.current.add(milestone);
        
        const properties: VideoEventProperties = {
          videoId,
          timestamp: Date.now(),
          percentComplete: milestone,
          duration: Math.round(currentTime)
        };
        
        analyticsClient.event(ANALYTICS_EVENTS.VIDEO_PROGRESS, properties);
      }
    });
  }, [videoId]);

  const trackVideoComplete = useCallback(() => {
    const properties: VideoEventProperties = {
      videoId,
      timestamp: Date.now()
    };
    
    analyticsClient.event(ANALYTICS_EVENTS.VIDEO_COMPLETE, properties);
  }, [videoId]);

  return {
    trackVideoPlay,
    trackVideoProgress,
    trackVideoComplete
  };
}