// src/lib/analytics/amplitude.ts
import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";

// Simple localhost detection
const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

// Initialize Amplitude based on environment
export const initAmplitude = () => {
  // Select appropriate API key based on environment
  const apiKey = isLocalhost 
    ? process.env.NEXT_PUBLIC_AMPLITUDE_DEV_KEY 
    : process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

  if (!apiKey) {
    console.warn('Amplitude API key not configured');
    return;
  }

  if (typeof window !== 'undefined') {
    amplitude.init(apiKey, {
      defaultTracking: {
        pageViews: true,
        sessions: true,
        formInteractions: true,
        fileDownloads: true,
      }
    });

    // Add session replay plugin
    const sessionReplay = sessionReplayPlugin({
      sampleRate: 1
    });
    amplitude.add(sessionReplay);
  }
};

// Event Names - Centralized constants for consistency
export const AMPLITUDE_EVENTS = {
  // Page View Events
  PAGE_VIEW: '$pageview',
  
  // Signup Flow Events
  SIGNUP_STARTED: 'signup_started',
  SIGNUP_STEP_VIEWED: 'signup_step_viewed',
  SIGNUP_STEP_COMPLETED: 'signup_step_completed',
  SIGNUP_COMPLETED: 'signup_completed',
  SIGNUP_ABANDONED: 'signup_abandoned',
  
  // CTA Events
  CTA_CLICKED: 'cta_clicked',
  LEARN_MORE_CLICKED: 'learn_more_clicked',
  
  // Share Events
  SHARE_INITIATED: 'share_initiated',
  SHARE_COMPLETED: 'share_completed',
  
  // Feature Events
  FEATURE_VIEWED: 'feature_viewed',
  FEATURE_HOVER: 'feature_hover',
  
  // FAQ Events
  FAQ_EXPANDED: 'faq_expanded',
  FAQ_COLLAPSED: 'faq_collapsed',
  
  // Video Events
  VIDEO_STARTED: 'video_playback_started',
  VIDEO_PROGRESS: 'video_playback_progress',
  VIDEO_COMPLETED: 'video_playback_completed',
  VIDEO_PLAY_CLICKED: 'video_play_clicked',
  VIDEO_CTA_CLICKED: 'video_cta_clicked',
  
  // Scroll Depth Events
  SCROLL_DEPTH: 'scroll_depth',
} as const;

type ValidPropertyType = string | number | boolean;

// Helper function to identify users
export const identifyUser = (userId: string, userProperties?: Record<string, string | number | boolean>) => {
  amplitude.setUserId(userId);
  if (userProperties) {
    const identify = new amplitude.Identify();
    Object.entries(userProperties).forEach(([key, value]) => {
      identify.set(key, value);
    });
    amplitude.identify(identify);
  }
};

// Analytics wrapper
export const Analytics = {
  track: (eventName: string, eventProperties?: Record<string, unknown>) => {
    amplitude.track(eventName, eventProperties);
  },

  trackPageView: (additionalProperties?: Record<string, unknown>) => {
    amplitude.track(AMPLITUDE_EVENTS.PAGE_VIEW, {
      ...additionalProperties,
      url: window.location.href,
      referrer: document.referrer,
      ...Object.fromEntries(new URLSearchParams(window.location.search))
    });
  },

  trackSignupStep: (stepNumber: number, stepName: string, isComplete: boolean) => {
    const eventName = isComplete 
      ? AMPLITUDE_EVENTS.SIGNUP_STEP_COMPLETED 
      : AMPLITUDE_EVENTS.SIGNUP_STEP_VIEWED;

    amplitude.track(eventName, {
      step_number: stepNumber,
      step_name: stepName,
      ...Object.fromEntries(new URLSearchParams(window.location.search))
    });
  },

  trackVideoEvent: (eventName: string, videoProperties: {
    title: string,
    position: number,
    duration: number,
    percent_complete?: number,
    is_play_click?: boolean
  }) => {
    amplitude.track(eventName, {
      ...videoProperties,
      event_type: videoProperties.is_play_click ? 'play_click' : 'video_progress',
      timestamp: new Date().toISOString(),
      ...Object.fromEntries(new URLSearchParams(window.location.search))
    });
  },

  trackScrollDepth: (depth: number) => {
    amplitude.track(AMPLITUDE_EVENTS.SCROLL_DEPTH, {
      depth_percentage: depth,
      page_url: window.location.pathname
    });
  },

  setUserProperties: (properties: Record<string, ValidPropertyType>) => {
    const identify = new amplitude.Identify();
    Object.entries(properties).forEach(([key, value]) => {
      identify.set(key, value);
    });
    amplitude.identify(identify);
  },

  setSessionProperties: (properties: Record<string, ValidPropertyType>) => {
    const identify = new amplitude.Identify();
    Object.entries(properties).forEach(([key, value]) => {
      identify.set(key, value);
    });
    amplitude.identify(identify);
  },

  trackLearnMoreClick: (properties: {
    location: string;
    destination_url: string;
    [key: string]: string | number | boolean;
  }) => {
    amplitude.track(AMPLITUDE_EVENTS.LEARN_MORE_CLICKED, {
      ...properties,
      timestamp: new Date().toISOString(),
      ...Object.fromEntries(new URLSearchParams(window.location.search))
    });
  },
};

export default Analytics;