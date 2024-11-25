// src/pages/api/analytics.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createNextRouteHandler } from '@openpanel/nextjs/server';
import { OpenPanel } from '@openpanel/nextjs';

// Initialize server-side OpenPanel instance
export const opServer = new OpenPanel({
  clientId: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID!,
  clientSecret: process.env.OPENPANEL_CLIENT_SECRET!,
});

// Create the API route handler
const handler = createNextRouteHandler({
    apiUrl: process.env.NEXT_PUBLIC_OPENPANEL_API_URL
  });

// Export the handler for Pages Router
export default async function analyticsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const request = new Request(req.url!, {
        method: req.method,
        headers: new Headers(req.headers as HeadersInit),
        body: req.body ? JSON.stringify(req.body) : undefined
      });
    // Forward the request to OpenPanel's handler
    return await handler(request);
  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Helper function for server-side event tracking
export async function logServerEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  try {
    await opServer.track(eventName, properties);
  } catch (error) {
    console.error('Failed to log server event:', error);
  }
}