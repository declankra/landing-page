// lib/analytics/openpanel/client.ts
import type { OpenPanelClient } from './types';
import { OPENPANEL_CONFIG } from './config';

class AnalyticsClient implements OpenPanelClient {
  constructor(private clientId: string) {}

  event(eventName: string, properties: Record<string, unknown>): void {
    // Implementation of event tracking
    console.log(`Tracking event: ${eventName}`, properties);
  }
}

export const analyticsClient = new AnalyticsClient(OPENPANEL_CONFIG.CLIENT_ID);