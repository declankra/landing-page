// lib/analytics/openpanel/types.ts
export interface SignupEventProperties {
    entryPoint: 'nav' | 'hero' | 'final';
    timeToStart?: number;  // Time from page load to signup start
    completionTime?: number;  // Time from start to completion
  }
  
  export interface ShareEventProperties {
    platform: 'twitter' | 'linkedin' | 'email' | 'copy_link';
    successful: boolean;
  }
  
  export interface VideoEventProperties {
    videoId: string;
    timestamp: number;
    duration?: number;
    percentComplete?: number;
  }
  
  export type ScrollMilestone = 25 | 50 | 75 | 100;

  export interface ScrollMilestoneProperties {
    milestone: ScrollMilestone;
    timeToMilestone: number;
  }
  
  export interface OpenPanelClient {
  event(eventName: string, properties: Record<string, unknown>): void;
  }
  