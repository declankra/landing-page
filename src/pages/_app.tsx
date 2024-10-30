// src/pages/_app.tsx
import '../styles/globals.css';
import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { theme as mantineTheme } from '../theme/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Using Mantine's provider on the outside to allow shadcn components to override when needed
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      <Component {...pageProps} />
    </MantineProvider>
  );
}
