// src/theme/theme.ts
import { createTheme, MantineThemeOverride, rem } from '@mantine/core';

// Define custom colors type
type ExtendedCustomColors = 'neutral' | 'accent';

export const theme: MantineThemeOverride = createTheme({
  primaryColor: 'dark',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    sizes: {
      h1: { fontSize: rem(44), lineHeight: '1.3', fontWeight: '700' },
      h2: { fontSize: rem(32), lineHeight: '1.35', fontWeight: '600' },
      h3: { fontSize: rem(24), lineHeight: '1.4', fontWeight: '600' },
    },
  },
  colors: {
    // Custom colors need to be arrays of exactly 10 values
    neutral: [
      '#FFFFFF',
      '#F5F5F5',
      '#E5E5E5',
      '#D4D4D4',
      '#A3A3A3',
      '#737373',
      '#525252',
      '#404040',
      '#262626',
      '#171717',
    ],
    accent: [
      '#F0F9FF',
      '#E0F2FE',
      '#BAE6FD',
      '#7DD3FC',
      '#38BDF8',
      '#0EA5E9',
      '#0284C7',
      '#0369A1',
      '#075985',
      '#0C4A6E',
    ],
  },
  radius: {
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },
  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.05)',
  },
  other: {
    transition: 'all 150ms ease',
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          transition: 'all 150ms ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        padding: 'lg',
      },
      styles: {
        root: {
          backgroundColor: 'var(--mantine-color-white)',
          transition: 'all 150ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 'var(--mantine-shadow-md)',
          },
        },
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        input: {
          transition: 'all 150ms ease',
          '&:focus': {
            borderColor: 'var(--mantine-color-accent-6)',
          },
        },
      },
    },
  },
});

// Type augmentation for custom colors
declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, string[]>;
  }
}