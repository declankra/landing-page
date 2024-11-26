// lib/analytics/openpanel/events.ts
/**
 * Centralized analytics event names to ensure consistency
 */
export const ANALYTICS_EVENTS = {
    // Signup Flow Events
    SIGNUP_START: 'signup_started',
    SIGNUP_COMPLETE: 'signup_completed',
    SIGNUP_ABANDONED: 'signup_abandoned',
    
    // CTA Events by Location
    NAV_CTA_CLICK: 'nav_cta_clicked',
    HERO_CTA_CLICK: 'hero_cta_clicked',
    FINAL_CTA_CLICK: 'final_cta_clicked',
    LEARN_MORE_CLICK: 'learn_more_clicked',
    
    // Share Events
    SHARE_INITIATED: 'share_initiated',
    SHARE_COMPLETED: 'share_completed',
    
    // Video Events
    VIDEO_PLAY: 'video_played',
    VIDEO_COMPLETE: 'video_completed',
    VIDEO_PROGRESS: 'video_progress',
    
    // FAQ Events
    FAQ_OPENED: 'faq_opened',
    
    // Feature Engagement
    FEATURE_HOVER: 'feature_hovered',
    FEATURE_CLICK: 'feature_clicked',
    
    // Page Engagement
    PAGE_VIEW: 'page_viewed',
    SCROLL_MILESTONE: 'scroll_milestone_reached'
  } as const;
  