// src/lib/analytics/signup-analytics.ts
import Analytics, { AMPLITUDE_EVENTS } from './amplitude';

// Enum for different signup entry points
export enum SignupSource {
  NAVIGATION = 'navigation_cta',
  HERO = 'hero_cta',
  FINAL_SELL = 'final_sell_cta'
}

// Interface for tracking signup attempts
interface SignupAttempt {
  source: SignupSource;
  timestamp: number;
}

// Class to manage signup analytics state
class SignupAnalytics {
  private static instance: SignupAnalytics;
  private pageLoadTimestamp: number;
  private currentAttempt: SignupAttempt | null;

  private constructor() {
    this.pageLoadTimestamp = Date.now();
    this.currentAttempt = null;
  }

  // Singleton pattern to ensure consistent tracking across the app
  public static getInstance(): SignupAnalytics {
    if (!SignupAnalytics.instance) {
      SignupAnalytics.instance = new SignupAnalytics();
    }
    return SignupAnalytics.instance;
  }

  // Track when user starts signup flow
  public trackSignupStart(source: SignupSource) {
    const timeToSignup = Date.now() - this.pageLoadTimestamp;
    
    this.currentAttempt = {
      source,
      timestamp: Date.now()
    };

    // Track signup initiated
    Analytics.track(AMPLITUDE_EVENTS.SIGNUP_STARTED, {
      signup_source: source,
      time_to_signup_ms: timeToSignup,
      page_url: window.location.pathname,
      referrer: document.referrer,
    });
  }

  // Track individual steps in the signup flow
  public trackSignupStep(stepNumber: number, stepName: string, isComplete: boolean) {
    if (!this.currentAttempt) return;

    const stepDuration = Date.now() - this.currentAttempt.timestamp;
    
    Analytics.track(
      isComplete ? AMPLITUDE_EVENTS.SIGNUP_STEP_COMPLETED : AMPLITUDE_EVENTS.SIGNUP_STEP_VIEWED,
      {
        step_number: stepNumber,
        step_name: stepName,
        signup_source: this.currentAttempt.source,
        step_duration_ms: stepDuration,
      }
    );
  }

  // Track successful signup completion
  public trackSignupComplete() {
    if (!this.currentAttempt) return;

    const completionTime = Date.now() - this.currentAttempt.timestamp;

    Analytics.track(AMPLITUDE_EVENTS.SIGNUP_COMPLETED, {
      signup_source: this.currentAttempt.source,
      total_time_ms: completionTime,
      steps_completed: true, // You can make this dynamic based on your needs
    });

    // Reset current attempt after completion
    this.currentAttempt = null;
  }

  // Track signup abandonment
  public trackSignupAbandoned(reason?: string) {
    if (!this.currentAttempt) return;

    const abandonmentTime = Date.now() - this.currentAttempt.timestamp;

    Analytics.track(AMPLITUDE_EVENTS.SIGNUP_ABANDONED, {
      signup_source: this.currentAttempt.source,
      time_spent_ms: abandonmentTime,
      abandonment_reason: reason || 'unknown',
    });

    // Reset current attempt after abandonment
    this.currentAttempt = null;
  }

  // Reset tracking (useful for testing or error cases)
  public reset() {
    this.pageLoadTimestamp = Date.now();
    this.currentAttempt = null;
  }
}

export const signupAnalytics = SignupAnalytics.getInstance();