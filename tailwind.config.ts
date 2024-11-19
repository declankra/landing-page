import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  // Enable dark mode
  darkMode: ["class"],

  // Content paths
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	// Container config
  	container: {
  		center: true,
  		padding: 'var(--layout-gutter)',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
			border: 'hsl(var(--color-base-300))',
			input: 'hsl(var(--color-base-200))',
			ring: 'hsl(var(--color-primary))',
			background: 'hsl(var(--color-base-100))',
			foreground: 'hsl(var(--color-base-content))',
			primary: {
				DEFAULT: 'hsl(var(--color-primary))',
				foreground: 'hsl(var(--color-base-100))'
			},
			  secondary: {
				DEFAULT: 'hsl(var(--color-accent))',
				foreground: 'hsl(var(--color-base-100))'
			},
			  destructive: {
				DEFAULT: 'hsl(var(--color-error))',
				foreground: 'hsl(var(--color-base-100))'
			},
			  muted: {
				DEFAULT: 'hsl(var(--color-base-200))',
				foreground: 'hsl(var(--color-base-content-secondary))'
			},
			  accent: {
				DEFAULT: 'hsl(var(--color-accent))',
				foreground: 'hsl(var(--color-base-100))'
			},
			  popover: {
				DEFAULT: 'hsl(var(--color-base-100))',
				foreground: 'hsl(var(--color-base-content))'
			  },
			  card: {
				DEFAULT: 'hsl(var(--color-base-100))',
				foreground: 'hsl(var(--color-base-content))'
			  },
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			'color-1': 'hsl(var(--color-1))',
  			'color-2': 'hsl(var(--color-2))',
  			'color-3': 'hsl(var(--color-3))',
  			'color-4': 'hsl(var(--color-4))',
  			'color-5': 'hsl(var(--color-5))'
  		},

		 // Using global border radius
		 borderRadius: {
			lg: 'var(--radius-lg)',
			md: 'var(--radius-md)',
			sm: 'var(--radius-sm)'
		},
		

      // Using global font families
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        heading: ['var(--font-heading)']
      },

      // Using global font sizes and line heights for headings
      fontSize: {
        // Heading styles
        'heading-1': [
          'var(--heading-1-fluid)',
          {
            lineHeight: 'var(--heading-1-line-height)',
            fontWeight: 'var(--heading-1-weight)',
            letterSpacing: 'var(--heading-1-tracking)'
          }
        ],
        'heading-2': [
          'var(--heading-2-fluid)',
          {
            lineHeight: 'var(--heading-2-line-height)',
            fontWeight: 'var(--heading-2-weight)',
            letterSpacing: 'var(--heading-2-tracking)'
          }
        ],
        'heading-3': [
          'var(--heading-3-fluid)',
          {
            lineHeight: 'var(--heading-3-line-height)',
            fontWeight: 'var(--heading-3-weight)',
            letterSpacing: 'var(--heading-3-tracking)'
          }
        ]
      },

  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'gradient-border': 'linear-gradient(to right, var(--tw-gradient-stops))'
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			gradient: 'gradient 6s linear infinite',
  			shimmer: 'shimmer 2s linear infinite',
  			spotlight: 'spotlight 2s ease .75s 1 forwards',
  			meteor: 'meteor 5s linear infinite',
  			flip: 'flip 6s infinite steps(2, end)',
  			rotate: 'rotate 1s linear infinite',
  			scale: 'scale 1s linear infinite',
  			'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
  			'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
  			rainbow: 'rainbow var(--speed, 2s) infinite linear',
  			pulse: 'pulse var(--duration) ease-out infinite',
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			gradient: {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-1000px 0'
  				},
  				'100%': {
  					backgroundPosition: '1000px 0'
  				}
  			},
  			spotlight: {
  				'0%': {
  					opacity: '0',
  					transform: 'translate(-72%, -62%) scale(0.5)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translate(-50%,-40%) scale(1)'
  				}
  			},
  			meteor: {
  				'0%': {
  					transform: 'rotate(215deg) translateX(0)',
  					opacity: '1'
  				},
  				'70%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'rotate(215deg) translateX(-500px)',
  					opacity: '0'
  				}
  			},
  			flip: {
  				from: {
  					transform: 'rotateX(0deg)'
  				},
  				to: {
  					transform: 'rotateX(360deg)'
  				}
  			},
  			rotate: {
  				from: {
  					transform: 'rotate(0deg)'
  				},
  				to: {
  					transform: 'rotate(360deg)'
  				}
  			},
  			scale: {
  				'0%, 100%': {
  					transform: 'scale(1)'
  				},
  				'50%': {
  					transform: 'scale(1.1)'
  				}
  			},
  			'shimmer-slide': {
  				to: {
  					transform: 'translate(calc(100cqw - 100%), 0)'
  				}
  			},
  			'spin-around': {
  				'0%': {
  					transform: 'translateZ(0) rotate(0)'
  				},
  				'15%, 35%': {
  					transform: 'translateZ(0) rotate(90deg)'
  				},
  				'65%, 85%': {
  					transform: 'translateZ(0) rotate(270deg)'
  				},
  				'100%': {
  					transform: 'translateZ(0) rotate(360deg)'
  				}
  			},
  			rainbow: {
  				'0%': {
  					'background-position': '0%'
  				},
  				'100%': {
  					'background-position': '200%'
  				}
  			},
  			pulse: {
  				'0%, 100%': {
  					boxShadow: '0 0 0 0 var(--pulse-color)'
  				},
  				'50%': {
  					boxShadow: '0 0 0 8px var(--pulse-color)'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			}
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],

  // This ensures Tailwind doesn't conflict with Mantine's styles
  important: true, // Ensures Tailwind styles take precedence when needed
  corePlugins: {
    preflight: false, // Prevents Tailwind from conflicting with Mantine
  },
};

export default config;