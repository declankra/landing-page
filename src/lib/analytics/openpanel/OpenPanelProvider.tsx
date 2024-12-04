// src/lib/analytics/openpanel/OpenPanelProvider.tsx
import { OpenPanelComponent } from '@openpanel/nextjs';

// Simple localhost detection
const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

// Select appropriate client ID based on environment
const clientId = isLocalhost 
  ? process.env.NEXT_PUBLIC_OPENPANEL_DEV_CLIENT_ID 
  : process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID;

// OpenPanel Provider Component
export function OpenPanelProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  if (!clientId) {
    console.warn('OpenPanel client ID not configured');
    return <>{children}</>;
  }

  return (
    <>
      <OpenPanelComponent
        clientId={clientId}
        trackScreenViews={true}  // Automatically track page views
        trackOutgoingLinks={true} // Track external link clicks
        trackAttributes={true}
      />
      {children}
    </>
  );
}

// Hook for using OpenPanel in components
export { useOpenPanel } from '@openpanel/nextjs';