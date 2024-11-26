// lib/analytics/openpanel/config.ts
export const OPENPANEL_CONFIG = {
    CLIENT_ID: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID || '',
    CLIENT_SECRET: process.env.OPENPANEL_CLIENT_SECRET || ''
  } as const;