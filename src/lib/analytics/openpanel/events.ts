// lib/analytics/openpanel/events.ts

// Centralized event names
export const ANALYTICS_EVENTS = {
    // Signup Flow Events
    SIGNUP_START: 'signup_started',
    SIGNUP_COMPLETE: 'signup_completed',
    SIGNUP_ABANDONED: 'signup_abandoned',
    
    // Share Events
    SHARE_CLICKED: 'share_clicked',
    
    // Video Events
    VIDEO_PLAY: 'video_played'
  } as const;
  
  // Entry points for signup flow
  export enum SignupSource {
    HERO = 'hero',
    NAV = 'navigation',
    FINAL = 'final_cta'
  }
  
  // Type definitions for event properties
  export interface SignupStartProps {
    source: SignupSource;
    time_to_signup: number;  // Time from page load to signup start
  }
  
  export interface SignupCompleteProps {
    source: SignupSource;
    completion_time: number; // Time from start to completion
  }
  
  export interface SignupAbandonProps {
    source: SignupSource;
    reason?: string;
    time_spent: number; // Time spent before abandonment
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
  export class AnalyticsTracker {
    constructor(private op: any) {}
  
    trackSignupStart(props: SignupStartProps) {
      this.op.track(ANALYTICS_EVENTS.SIGNUP_START, props);
    }
  
    trackSignupComplete(props: SignupCompleteProps) {
      this.op.track(ANALYTICS_EVENTS.SIGNUP_COMPLETE, props);
    }
  
    trackSignupAbandoned(props: SignupAbandonProps) {
      this.op.track(ANALYTICS_EVENTS.SIGNUP_ABANDONED, props);
    }
  
    trackShareClick(props: ShareClickProps) {
      this.op.track(ANALYTICS_EVENTS.SHARE_CLICKED, props);
    }
  
    trackVideoPlay(props: VideoPlayProps) {
      this.op.track(ANALYTICS_EVENTS.VIDEO_PLAY, props);
    }
}