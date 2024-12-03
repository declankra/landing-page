// src/components/ui/title.tsx

import React from 'react';
import { cn } from "@/lib/utils";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ArrowRightIcon } from "@radix-ui/react-icons";

interface TitleProps {
  /** Main title text */
  title: string;
  
  /** Optional subtitle text (appears above title in small text) */
  subtitle?: string;
  
  /** Optional action configuration */
  action?: {
    text: string;
    href?: string;
    type?: 'rainbow-button' | 'shiny-text' | 'link';
    /** Position of action element */
    position?: 'top' | 'bottom';
    onClick?: () => void;
  };
  
  /** Optional additional classes */
  className?: string;
  
  /** Optional title text alignment */
  align?: 'left' | 'center' | 'right';
}

/**
 * Title Component
 * 
 * A configurable title component that can include an optional subtitle
 * and action element (button or special text).
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Title title="Welcome to Our Product" />
 * 
 * // With subtitle and shiny text action
 * <Title
 *   title="Powerful Features"
 *   subtitle="WHAT WE OFFER"
 *   action={{
 *     text: "✨ View Examples",
 *     type: "shiny-text",
 *     href: "/examples"
 *   }}
 * />
 * ```
 */
export function Title({
  title,
  subtitle,
  action,
  className,
  align = 'center'
}: TitleProps) {
  // Render action element based on type
  const renderAction = () => {
    if (!action) return null;

    switch (action.type) {
      case 'rainbow-button':
        return (
          <RainbowButton
            onClick={action.onClick}
            className={cn(
              "mt-4",
              align === 'center' && "mx-auto"
            )}
          >
            {action.text}
          </RainbowButton>
        );
      
      case 'shiny-text':
        return (
          <a 
            href={action.href}
            onClick={action.onClick}
            className={cn(
              "group relative mt-4 inline-flex items-center rounded-full",
              "bg-neutral-100 dark:bg-neutral-900",
              "border border-black/5 dark:border-white/5",
              "px-2.5 py-0.5", // Even smaller padding
              "text-sm", // Smaller font size
              "transition-all ease-in",
              "hover:bg-neutral-200 dark:hover:bg-neutral-800",
              "no-underline", // Explicitly remove underline
              align === 'center' && "mx-auto"
            )}
          >
            {/* Animated background gradient */}
            <div 
              className={cn(
                "absolute inset-0 overflow-hidden rounded-full",
                "before:absolute before:inset-0",
                "before:bg-[linear-gradient(to_right,transparent,#fff,transparent)]",
                "before:translate-x-[-100%]",
                "group-hover:before:animate-[shimmer_1s_ease-in-out_infinite]",
                "dark:before:bg-[linear-gradient(to_right,transparent,#ffffff10,transparent)]"
              )}
            />
            
            <span className="relative flex items-center gap-1 text-neutral-700 transition-colors dark:text-neutral-200">
              {action.text}
              <ArrowRightIcon className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </a>
        );
      
      case 'link':
        return (
          <a
            href={action.href}
            onClick={action.onClick}
            className={cn(
              "text-primary hover:underline mt-4 inline-block",
              align === 'center' && "mx-auto"
            )}
          >
            {action.text}
          </a>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "w-full",
      {
        "text-center": align === 'center',
        "text-left": align === 'left',
        "text-right": align === 'right',
      },
      className
    )}>
      {/* Action element - top position */}
      {action?.position === 'top' && renderAction()}

      {/* Subtitle */}
      {subtitle && (
        <h3 className="!text-sm !font-semibold tracking-wide uppercase text-primary -mb-3 lg:-mb-7">
          {subtitle}
        </h3>
      )}

      {/* Main title */}
      <h2 className={cn(
        // Use heading-2-fluid size from globals.css
        "text-[length:var(--heading-2-fluid)]",
        "leading-[var(--heading-2-line-height)]",
        "font-[var(--heading-2-weight)]",
        "tracking-[var(--heading-2-tracking)]",
        // Additional styling
        "mx-auto", // Constrain width for readability
        "mb-1",
      )}>
        {title}
      </h2>

      {/* Action element - bottom position (default) */}
      {(!action?.position || action.position === 'bottom') && renderAction()}
    </div>
  );
}