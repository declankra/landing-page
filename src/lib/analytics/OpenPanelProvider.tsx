// src/lib/analytics/OpenPanelProvider.tsx
import { OpenPanelComponent } from '@openpanel/nextjs';

// Filtering function to exclude unwanted events
const opFilter = (() => {
  // Add any event filtering logic here
  return true;
}).toString();

// Analytics event names - centralized for consistency
export const ANALYTICS_EVENTS = {
  // Signup Flow Events
  SIGNUP_START: 'signup_flow_start',
  SIGNUP_COMPLETE: 'signup_flow_complete',
  SIGNUP_ABANDON: 'signup_flow_abandon',
  
  // Share Events
  SHARE_CLICK: 'share_click',
  SHARE_COMPLETE: 'share_complete',
  
  // Engagement Events
  PAGE_VIEW: 'page_view',
  FAQ_INTERACTION: 'faq_interaction',
  FEATURE_HOVER: 'feature_hover',
  VIDEO_PLAY: 'video_play',
  VIDEO_COMPLETE: 'video_complete',
  SCROLL_MILESTONE: 'scroll_milestone',
  
  // Navigation Events
  NAV_CTA_CLICK: 'nav_cta_click',
  MAIN_CTA_CLICK: 'main_cta_click',
  FINAL_CTA_CLICK: 'final_cta_click'
} as const;

// Analytics property names
export const ANALYTICS_PROPERTIES = {
  TIME_TO_SIGNUP: 'time_to_signup',
  SCROLL_DEPTH: 'scroll_depth',
  SHARE_PLATFORM: 'share_platform',
  VIDEO_DURATION: 'video_duration',
  FEATURE_NAME: 'feature_name',
  FAQ_QUESTION: 'faq_question',
  PAGE_PATH: 'page_path',
  ENGAGEMENT_TIME: 'engagement_time'
} as const;

export function OpenPanelProvider({ children }: { children: React.ReactNode }) {
    return (
      <>
        <OpenPanelComponent
          clientId="c479259f-9aa6-4613-97ce-30c44a74c81f"
          apiUrl="/api/analytics"
          trackScreenViews={true}
          trackAttributes={true}
          filter={opFilter}
          globalProperties={{
            app_version: '1.0.0',
            environment: process.env.NODE_ENV
          }}
        />
        {children}
      </>
    );
  }