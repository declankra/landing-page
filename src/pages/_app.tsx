// src/pages/_app.tsx
import '../styles/globals.css';
import '@mantine/core/styles.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster'; // Import from shadcn
import { theme as mantineTheme } from '../styles/theme'; // Custom Mantine Theme
import { AnalyticsProvider } from '@/lib/analytics/google/GoogleAnalyticsProvider'; // Google Analytics import
import PostHogPageview from '@/lib/analytics/posthog-simple/PostHogProvider'; // PostHog Analytics import
// Amplitude Analytics import
import { initAmplitude, Analytics } from '@/lib/analytics/amplitude/amplitude';
import { useScrollTracking } from '@/lib/analytics/amplitude/useScrollTracking';
import { OpenPanelProvider } from '@/lib/analytics/openpanel/OpenPanelProvider';



export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Initialize scroll tracking
  useScrollTracking();

  // Initialize Amplitude - do this as early as possible
  useEffect(() => {
    // Initialize Amplitude
    initAmplitude();

    // Set initial session properties
    Analytics.setSessionProperties({
      initial_referrer: document.referrer,
      initial_url: window.location.href,
      // Include any UTM parameters
      ...Object.fromEntries(new URLSearchParams(window.location.search))
    });

    // Setup route change handling for any custom tracking beyond autocapture
    const handleRouteChange = (url: string) => {
      // Add any custom properties you want to track with page views
      Analytics.trackPageView({
        previous_page: router.asPath,
        current_page: url,  // Added this line
        // Add any additional custom properties
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);


  return (
    // Using Mantine's provider on the outside to allow shadcn components to override when needed
    // set defaultTheme = "system" when ready for dark mode

    <>
      <ColorSchemeScript />
      <ThemeProvider attribute="class" defaultTheme="light">
        <MantineProvider theme={mantineTheme}>
          <PostHogPageview />
          <OpenPanelProvider>
            <Component {...pageProps} />
            <Toaster /> {/* shadcn Toaster */}
            <AnalyticsProvider /> {/* Google Analytics */}
          </OpenPanelProvider>
        </MantineProvider>
      </ThemeProvider>
    </>
  );
}
