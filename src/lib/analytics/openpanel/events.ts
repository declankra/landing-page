// lib/analytics/openpanel/events.ts

// Centralized event names
export const ANALYTICS_EVENTS = {
  // Signup Flow Events
  SIGNUP_STARTED: 'signup_started',
  SIGNUP_STEP_VIEWED: 'signup_step_viewed',
  SIGNUP_STEP_COMPLETED: 'signup_step_completed',
  SIGNUP_COMPLETED: 'signup_completed',
  SIGNUP_ABANDONED: 'signup_abandoned',
    
  // Share Events
  SHARE_CLICKED: 'share_clicked',
    
  // Video Events
  VIDEO_PLAY: 'video_played'
  } as const;
  
  // Entry points for signup flow
  export enum SignupSourceOP {
    HERO = 'hero_cta',
    NAVIGATION = 'nav_cta',
    FINAL_SELL = 'final_sell_cta'
  }
  
// Interfaces for event properties
export interface SignupEventBase {
    source: SignupSourceOP;
    page_url: string;
    referrer?: string;
  }
  
  export interface SignupStartedProps extends SignupEventBase {
    time_to_signup: number;  // Time from page load to signup start in ms
  }
  
  export interface SignupStepProps extends SignupEventBase {
    step_number: number;
    step_name: string;
    time_spent: number;  // Time spent on step in ms
  }
  
  export interface SignupCompletedProps extends SignupEventBase {
    total_time: number;  // Total time from start to finish in ms
    steps_completed: string[];  // Array of completed step names
  }
  
  export interface SignupAbandonedProps extends SignupEventBase {
    step_abandoned: string;
    time_spent: number;
    reason?: string;
  }
  
  export interface ShareClickProps {
    platform: 'twitter' | 'facebook' | 'linkedin' | 'email' | 'copy';
    location: string;
  }
  
  export interface VideoPlayProps {
    video_id: string;
    timestamp: number;
    source_page: string;
  }
  
  // Analytics utility class for consistent event tracking
  interface AnalyticsInterface {
    track<T>(event: string, props?: T): void;
}
  export class AnalyticsTracker {
    constructor(private op: AnalyticsInterface) {}
  
    trackSignupStart(props: SignupStartedProps) {
      this.op.track(ANALYTICS_EVENTS.SIGNUP_STARTED, props);
    }

    // Signup Step Viewed
    trackSignupStepViewed(props: SignupStepProps) {
      this.op.track(ANALYTICS_EVENTS.SIGNUP_STEP_VIEWED, props);
    }

    // Signup Step Completed
    trackSignupStepCompleted(props: SignupStepProps) {
      this.op.track(ANALYTICS_EVENTS.SIGNUP_STEP_COMPLETED, props);
    }
  
    trackSignupComplete(props: SignupCompletedProps) {
      this.op.track(ANALYTICS_EVENTS.SIGNUP_COMPLETED, props);
    }
  
    trackSignupAbandoned(props: SignupAbandonedProps) {
      this.op.track(ANALYTICS_EVENTS.SIGNUP_ABANDONED, props);
    }
  
    trackShareClick(props: ShareClickProps) {
      this.op.track(ANALYTICS_EVENTS.SHARE_CLICKED, props);
    }
  
    trackVideoPlay(props: VideoPlayProps) {
      this.op.track(ANALYTICS_EVENTS.VIDEO_PLAY, props);
    }
}