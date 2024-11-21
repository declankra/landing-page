// src/theme/theme.ts
import { createTheme, MantineThemeOverride} from '@mantine/core';

// Define custom colors type
type ExtendedCustomColors = 'neutral' | 'accent';

// {{REPLACE_THEME}} - Update these values for your project
export const theme: MantineThemeOverride = createTheme({
  
  // Primary color configuration
  primaryColor: 'primary',

  colors: {
    // Custom colors need to be arrays of exactly 10 values
    // Using CSS custom properties for colors
    primary: [
      'hsl(var(--color-primary) / 0.1)',  // 0
      'hsl(var(--color-primary) / 0.2)',  // 1
      'hsl(var(--color-primary) / 0.3)',  // 2
      'hsl(var(--color-primary) / 0.4)',  // 3
      'hsl(var(--color-primary) / 0.5)',  // 4
      'hsl(var(--color-primary))',        // 5 (default)
      'hsl(var(--color-primary-bold))',   // 6
      'hsl(var(--color-primary-bold) / 0.8)', // 7
      'hsl(var(--color-primary-bold) / 0.9)', // 8
      'hsl(var(--color-primary-bold))'    // 9
    ],
    // previous neutral and accent colors
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

  fontFamily: 'var(--font-sans)',
  fontFamilyMonospace: 'var(--font-mono)',
  headings: {
    fontFamily: 'var(--font-heading)',
    sizes: {
      h1: { 
        fontSize: 'var(--heading-1-fluid)',
        lineHeight: 'var(--heading-1-line-height)',
        fontWeight: 'var(--heading-1-weight)'
      },
      h2: { 
        fontSize: 'var(--heading-2-fluid)',
        lineHeight: 'var(--heading-2-line-height)',
        fontWeight: 'var(--heading-2-weight)'
      },
      h3: { 
        fontSize: 'var(--heading-3-fluid)',
        lineHeight: 'var(--heading-3-line-height)',
        fontWeight: 'var(--heading-3-weight)'
      }
    }
  },


  // Consistent with CSS custom properties 

  fontSizes: {
      xs: 'var(--text-xs)',
      sm: 'var(--text-sm)',
      md: 'var(--text-base)',
      lg: 'var(--text-lg)',
      xl: 'var(--text-xl)'
  },
  
  spacing: {
    xs: 'var(--space-xs)',
    sm: 'var(--space-sm)',
    md: 'var(--space-md)',
    lg: 'var(--space-lg)',
    xl: 'var(--space-xl)'
  },

  radius: {
    xs: 'var(--radius-sm)',
    sm: 'var(--radius-md)',
    md: 'var(--radius-lg)',
    lg: 'var(--radius-xl)',
    xl: 'var(--radius-2xl)'
  },

  shadows: {
    xs: 'var(--shadow-sm)',
    sm: 'var(--shadow-md)',
    md: 'var(--shadow-lg)',
    lg: 'var(--shadow-xl)',
    xl: 'var(--shadow-2xl)'
  },


  // Component-specific overrides
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          transition: 'var(--transition-normal)',
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
          backgroundColor: 'hsl(var(--color-base-100))',
          transition: 'var(--transition-normal)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 'var(--shadow-md)',
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
          transition: 'var(--transition-normal)',
          '&:focus': {
            borderColor: 'hsl(var(--color-base-300))',
          },
        },
      },
    },
      // Add other component overrides as needed
    },

    // Other theme properties
    other: {
      transition: 'var(--transition-normal)',
      borderWidth: '1px',
    }
  });

// Type augmentation for custom colors
declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, string[]>;
  }
}