// src/components/ui/scroll-velocity-wrapper.tsx

import React from 'react';
import { VelocityScroll } from '@/components/ui/scroll-based-velocity';
import { cn } from "@/lib/utils";

interface ScrollVelocityWrapperProps {
  /** The text content to be scrolled */
  text: string;
  
  /** Optional custom styling */
  className?: string;

  /** Base velocity for scroll animation */
  velocity?: number;
}

/**
 * ScrollVelocityWrapper Component
 * 
 * A simple wrapper for the VelocityScroll component that maintains the original
 * styling and behavior while making it easy to customize colors and basic styles.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ScrollVelocityWrapper text="Your scrolling text here" />
 * 
 * // With custom background and text color
 * <ScrollVelocityWrapper 
 *   text="Custom colored text" 
 *   className="bg-blue-500 text-white"
 * />
 * 
 * // Plain background
    className="bg-blue-500 text-white"

    // Gradient background
    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"

    // Neutral theme
    className="bg-gray-100 text-gray-900"

 * ```

* Style Examples:
 * 
 * // 1. Primary Brand Gradient
 * // Creates a centered gradient effect using your primary brand colors with a subtle animation
 * className="bg-gradient-radial from-primary via-accent to-primary text-white"
 * 
 * // 2. Dark Mode Optimized Chart Colors
 * //  Uses your chart color palette for a vibrant effect that works in both light/dark modes
 * className="bg-black text-transparent bg-clip-text bg-gradient-radial from-chart-1 via-chart-3 to-chart-5"
 * 
 * // 3. Muted Rainbow Animation
 * // Applies your rainbow animation variables for a subtle, professional effect
 * className="bg-muted/80 animate-rainbow [--speed:4s] text-foreground"
 * 
 * // 4. Color Accent Pulse
 * // Creates a pulsing effect using your color variables with opacity transitions
 * className="bg-background text-color-3 animate-pulse shadow-[0_0_15px_rgba(var(--color-3),0.5)]"
 * 
 * // 5. Spotlight Effect
 * // Uses your spotlight animation with accent colors for an attention-grabbing section
 * className="bg-gradient-radial from-accent/20 via-background to-background animate-spotlight text-accent-foreground"
 * 
 */
export default function ScrollVelocityWrapper({
        text,
        className,
        velocity = 5
      }: ScrollVelocityWrapperProps) {
        return (
          <div className={cn("w-full overflow-hidden relative my-8 py-4", className)}>
            <VelocityScroll
              text={text}
              default_velocity={velocity}
              // Match the exact className from the original component
              className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
            />
          </div>
        );
    }


    