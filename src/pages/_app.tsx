// src/pages/_app.tsx
import '../styles/globals.css';
import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster'; // Import from shadcn
import { theme as mantineTheme } from '../theme/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Using Mantine's provider on the outside to allow shadcn components to override when needed
    <>
      <ColorSchemeScript />
      <ThemeProvider attribute="class" defaultTheme="system">
        <MantineProvider theme={mantineTheme}>
          <Component {...pageProps} />
          <Toaster /> {/* shadcn Toaster */}
        </MantineProvider>
      </ThemeProvider>
    </>
  );
}
