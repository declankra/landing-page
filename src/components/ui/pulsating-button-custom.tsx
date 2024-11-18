// src/components/ui/pulsating-button-custom.tsx
"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define button variants using CVA for consistent styling patterns
const buttonVariants = cva(
  // Base styles
  "relative text-center cursor-pointer flex justify-center items-center rounded-lg transition-colors cursor-pointer",
  {
    variants: {
      // Size variants
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-1.5 text-sm",
        lg: "px-6 py-3 text-lg",
        icon: "size-10",
      },
      // Color variants - using Tailwind's color scheme
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        accent: "bg-accent text-accent-foreground hover:bg-accent/80",
      },
      // Pulse intensity variants
      pulseIntensity: {
        soft: "after:opacity-40",
        medium: "after:opacity-60",
        strong: "after:opacity-80",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "primary",
      pulseIntensity: "medium",
    },
  }
);

// Extended button props interface
interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  pulseColor?: string;
  duration?: string;
  children: React.ReactNode;
}

/**
 * PulsatingButton Component
 * 
 * A customizable button component with pulsing animation effect.
 * 
 * @param size - Button size variant ('default' | 'sm' | 'lg' | 'icon')
 * @param variant - Button color variant ('primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'accent')
 * @param pulseIntensity - Intensity of the pulse effect ('soft' | 'medium' | 'strong')
 * @param pulseColor - Custom color for the pulse effect (optional)
 * @param duration - Duration of the pulse animation (optional)
 * @param className - Additional CSS classes
 * @param children - Button content
 * 
 * @example
 * // Basic usage
 * <PulsatingButton>Click me</PulsatingButton>
 * 
 * // Custom variant and size
 * <PulsatingButton variant="accent" size="lg">
 *   Large Accent Button
 * </PulsatingButton>
 * 
 * // Custom pulse effect
 * <PulsatingButton 
 *   pulseColor="#FF0000"
 *   duration="2s"
 *   pulseIntensity="strong"
 * >
 *   Custom Pulse
 * </PulsatingButton>
 */
export function PulsatingButtonCustom({
  className,
  children,
  variant,
  size,
  pulseIntensity,
  pulseColor,
  duration = "1.5s",
  ...props
}: PulsatingButtonProps) {
  // Generate styles based on variants and custom props
  const buttonClasses = cn(
    buttonVariants({ variant, size, pulseIntensity }),
    // Add pulse animation styles
    "after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:size-full after:rounded-lg after:-translate-x-1/2 after:-translate-y-1/2 after:animate-[pulse_var(--duration)_cubic-bezier(0,0,0.2,1)_infinite]",
    className
  );

  // Custom styles for pulse color and duration
  const customStyles = {
    "--pulse-color": pulseColor,
    "--duration": duration,
  } as React.CSSProperties;

  return (
    <button 
      className={buttonClasses}
      style={pulseColor ? customStyles : undefined}
      {...props}
    >
      {/* Content wrapper to ensure it stays above the pulse effect */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}