// src/lib/analytics/openpanel/signup-tracking.ts
import { ANALYTICS_EVENTS, SignupSourceOP } from './events';

interface OpenPanel {
  track: (eventName: string, properties: Record<string, unknown>) => void;
}

export class SignupTracking {
  private startTime: number;
  private stepStartTime: number;
  private completedSteps: string[];
  private op: OpenPanel;
  private source: SignupSourceOP;

  constructor(op: OpenPanel, source: SignupSourceOP) {
    this.op = op;
    this.source = source;
    this.startTime = 0;
    this.stepStartTime = 0;
    this.completedSteps = [];
  }

  trackStart() {
    const now = Date.now();
    this.startTime = now;
    this.stepStartTime = now;
    const w = window as Window & { pageLoadTime: number };

    this.op.track(ANALYTICS_EVENTS.SIGNUP_STARTED, {
      source: this.source,
      time_to_signup: now - w.pageLoadTime,
      page_url: window.location.pathname,
      referrer: document.referrer
    });
  }

  trackStepView(stepNumber: number, stepName: string) {
    this.op.track(ANALYTICS_EVENTS.SIGNUP_STEP_VIEWED, {
      source: this.source,
      step_number: stepNumber,
      step_name: stepName,
      time_spent: Date.now() - this.stepStartTime,
      page_url: window.location.pathname
    });
    this.stepStartTime = Date.now();
  }

  trackStepComplete(stepNumber: number, stepName: string) {
    this.op.track(ANALYTICS_EVENTS.SIGNUP_STEP_COMPLETED, {
      source: this.source,
      step_number: stepNumber,
      step_name: stepName,
      time_spent: Date.now() - this.stepStartTime,
      page_url: window.location.pathname
    });
    this.completedSteps.push(stepName);
    this.stepStartTime = Date.now();
  }

  trackCompletion() {
    this.op.track(ANALYTICS_EVENTS.SIGNUP_COMPLETED, {
      source: this.source,
      total_time: Date.now() - this.startTime,
      steps_completed: this.completedSteps,
      page_url: window.location.pathname,
      referrer: document.referrer
    });
  }

  trackAbandonment(stepName: string, reason = 'modal_closed') {
    this.op.track(ANALYTICS_EVENTS.SIGNUP_ABANDONED, {
      source: this.source,
      step_abandoned: stepName,
      time_spent: Date.now() - this.startTime,
      reason,
      page_url: window.location.pathname
    });
  }
}
