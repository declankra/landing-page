// src/pages/_app.tsx
import '../styles/globals.css';
import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster'; // Import from shadcn
import { theme as mantineTheme } from '../styles/theme';
import { OpenPanelComponent } from '@openpanel/nextjs';


export default function App({ Component, pageProps }: AppProps) {
  return (
    // Using Mantine's provider on the outside to allow shadcn components to override when needed
    // set defaultTheme = "system" when ready for dark mode
    <>
      <ColorSchemeScript />
      <ThemeProvider attribute="class" defaultTheme="light">
        <MantineProvider theme={mantineTheme}>
        <OpenPanelComponent clientId={process.env.OPENPANEL_CLIENT_ID!}
        trackScreenViews={true} />
          <Component {...pageProps} />
          <Toaster /> {/* shadcn Toaster */}
        </MantineProvider>
      </ThemeProvider>
    </>
  );
}
