// src/lib/analytics/amplitude.ts
import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";


// Initialize Amplitude only on the client side
// Should be called as early as possible in the app lifecycle
export const initAmplitude = () => {

    // Create and configure Session Replay plugin
    const sessionReplay = sessionReplayPlugin({
        sampleRate: 1
      });

      if (typeof window !== 'undefined') {
        amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || '', {
            autocapture: true,
            defaultTracking: {
                pageViews: true,
                sessions: true,
                formInteractions: true,
                fileDownloads: true,
            },
        });
        
        // Add session replay plugin inside the if block
        amplitude.add(sessionReplay);
    }
};

// Event Names - Centralized constants for consistency
export const AMPLITUDE_EVENTS = {
  // Page View Events (although autocaptured, we might want to add custom properties)
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
  
  // Feature Interaction Events (using Amplitude's autocapture for clicks)
  FEATURE_VIEWED: 'feature_viewed',
  FEATURE_HOVER: 'feature_hover',
  
  // FAQ Events (some will be autocaptured)
  FAQ_EXPANDED: 'faq_expanded',
  FAQ_COLLAPSED: 'faq_collapsed',
  
  // Video Events
  VIDEO_STARTED: 'video_playback_started',
  VIDEO_PROGRESS: 'video_playback_progress',
  VIDEO_COMPLETED: 'video_playback_completed',
  
  // Scroll Depth Events
  SCROLL_DEPTH: 'scroll_depth'
} as const;

// Create a type for user properties
type UserProperties = Record<string, string | number | boolean>;  // removed null

// Helper function to identify users
export const identifyUser = (userId: string, userProperties?: UserProperties) => {
    amplitude.setUserId(userId);
    if (userProperties) {
      const identify = new amplitude.Identify();
      Object.entries(userProperties).forEach(([key, value]) => {
        identify.set(key, value);
      });
      amplitude.identify(identify);
    }
  };


// Analytics tracking functions - simplified to use Amplitude's built-in functionality
export const Analytics = {
    // Track events with properties
    track: (eventName: string, eventProperties?: UserProperties) => {
      amplitude.track(eventName, eventProperties);
    },

  // Page View with custom properties (in addition to autocapture)
  trackPageView: (additionalProperties?: UserProperties) => {
    amplitude.track(AMPLITUDE_EVENTS.PAGE_VIEW, {
      ...additionalProperties,
      url: window.location.href,
      referrer: document.referrer,
      // Add UTM parameters if present
      ...Object.fromEntries(new URLSearchParams(window.location.search))
    });
  },

  // Signup Flow - simplified to match Amplitude's recommended event structure
  trackSignupStep: (stepNumber: number, stepName: string, isComplete: boolean) => {
    const eventName = isComplete 
      ? AMPLITUDE_EVENTS.SIGNUP_STEP_COMPLETED 
      : AMPLITUDE_EVENTS.SIGNUP_STEP_VIEWED;

    amplitude.track(eventName, {
      step_number: stepNumber,
      step_name: stepName,
      // Include UTM parameters for attribution
      ...Object.fromEntries(new URLSearchParams(window.location.search))
    });
  },

  // Video tracking with standardized properties
  trackVideoEvent: (eventName: string, videoProperties: {
    title: string,
    position: number,
    duration: number,
    percent_complete?: number
  }) => {
    amplitude.track(eventName, videoProperties);
  },

  // Scroll depth tracking
  trackScrollDepth: (depth: number) => {
    amplitude.track(AMPLITUDE_EVENTS.SCROLL_DEPTH, {
      depth_percentage: depth,
      page_url: window.location.pathname
    });
  },

  // User Properties
  setUserProperties: (properties: UserProperties) => {
    const identify = new amplitude.Identify();
    Object.entries(properties).forEach(([key, value]) => {
      identify.set(key, value);
    });
    amplitude.identify(identify);
  },

  // Session Properties (can be used to add properties that persist for the session)
  setSessionProperties: (properties: UserProperties) => {
    const identify = new amplitude.Identify();
    Object.entries(properties).forEach(([key, value]) => {
      identify.set(key, value);
    });
    amplitude.identify(identify);
  }
};

export default Analytics;