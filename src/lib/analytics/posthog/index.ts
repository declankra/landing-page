// lib/analytics/posthog/index.ts
import posthog from 'posthog-js';

// PostHog environment variables
export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

// Event Names - Centralized for consistency
export const ANALYTICS_EVENTS = {
  // Signup Flow Events
  SIGNUP_STARTED: 'signup_started',
  SIGNUP_COMPLETED: 'signup_completed',
  SIGNUP_ABANDONED: 'signup_abandoned',
  
  // Conversion Events by Source
  NAV_CTA_CLICKED: 'nav_cta_clicked',
  HERO_CTA_CLICKED: 'hero_cta_clicked',
  FINAL_CTA_CLICKED: 'final_cta_clicked',
  
  // Share Events
  SHARE_CLICKED: 'share_clicked',
  
  // Engagement Events
  PAGE_VIEW: 'page_view',
  LEARN_MORE_CLICKED: 'learn_more_clicked',
  FAQ_INTERACTION: 'faq_interaction',
  FEATURE_INTERACTION: 'feature_interaction',
  SCROLL_MILESTONE: 'scroll_milestone',
  VIDEO_PLAYED: 'video_played',
  VIDEO_COMPLETED: 'video_completed',
} as const;

// Event Property Types
export type SignupSource = 'nav' | 'hero' | 'final';
export type SharePlatform = 'twitter' | 'linkedin' | 'facebook' | 'copy_link';
export type ScrollDepth = 25 | 50 | 75 | 100;

// Initialize PostHog
export const initPostHog = () => {
  if (!POSTHOG_KEY) {
    console.warn('PostHog key not found');
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    },
    capture_pageview: false, // We'll handle this manually
    persistence: 'localStorage',
    autocapture: true,
  });
};

// Analytics Functions
export const Analytics = {
  // Track page views with engagement time
  trackPageView: (url: string, referrer?: string) => {
    posthog.capture(ANALYTICS_EVENTS.PAGE_VIEW, {
      url,
      referrer,
      timestamp: new Date().toISOString(),
    });
  },

  // Signup Flow Tracking
  trackSignupStarted: (source: SignupSource, timeToStart: number) => {
    posthog.capture(ANALYTICS_EVENTS.SIGNUP_STARTED, {
      source,
      time_to_start: timeToStart,
    });
  },

  trackSignupCompleted: (source: SignupSource, timeToComplete: number) => {
    posthog.capture(ANALYTICS_EVENTS.SIGNUP_COMPLETED, {
      source,
      time_to_complete: timeToComplete,
    });
  },

  trackSignupAbandoned: (source: SignupSource, timeSpent: number, step: number) => {
    posthog.capture(ANALYTICS_EVENTS.SIGNUP_ABANDONED, {
      source,
      time_spent: timeSpent,
      abandoned_at_step: step,
    });
  },

  // Share Tracking
  trackShare: (platform: SharePlatform) => {
    posthog.capture(ANALYTICS_EVENTS.SHARE_CLICKED, {
      platform,
      timestamp: new Date().toISOString(),
    });
  },

  // Feature Engagement
  trackFeatureInteraction: (featureId: string, interactionType: 'hover' | 'click') => {
    posthog.capture(ANALYTICS_EVENTS.FEATURE_INTERACTION, {
      feature_id: featureId,
      interaction_type: interactionType,
    });
  },

  // FAQ Interaction
  trackFAQInteraction: (questionId: string) => {
    posthog.capture(ANALYTICS_EVENTS.FAQ_INTERACTION, {
      question_id: questionId,
    });
  },

  // Scroll Depth
  trackScrollMilestone: (depth: ScrollDepth) => {
    posthog.capture(ANALYTICS_EVENTS.SCROLL_MILESTONE, {
      depth,
      timestamp: new Date().toISOString(),
    });
  },

  // Video Engagement
  trackVideoEngagement: (
    eventType: 'play' | 'complete',
    duration?: number,
    watchTime?: number
  ) => {
    const event = eventType === 'play' 
      ? ANALYTICS_EVENTS.VIDEO_PLAYED 
      : ANALYTICS_EVENTS.VIDEO_COMPLETED;

    posthog.capture(event, {
      duration,
      watch_time: watchTime,
      timestamp: new Date().toISOString(),
    });
  },
};
