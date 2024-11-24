// src/components/sections/Testimonials.tsx
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Lightbulb, CheckCircle, Rocket } from "lucide-react";
import { Mark } from '@mantine/core';
import React from "react";

// Types for testimonial cards
interface Testimonial {
  icon: React.ElementType;
  quote: string;
  author?: string;
  role?: string;
  accentColor?: string;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  highlightedWord?: string;    // New highlighted word prop
  highlightColor?: string;     // Optional highlight color prop
  testimonials?: Testimonial[];
  className?: string;
}

/**
 * Testimonials Component
 * 
 * A section that displays three testimonial cards highlighting user feedback.
 * Features:
 * - Configurable testimonials with optional author and role
 * - Support for highlighted words in title using Mark component
 * - Responsive grid layout
 * - Hover animations
 * - Customizable accent colors using global variables
 * 
 * @param title - Main section title
 * @param subtitle - Optional subtitle/description
 * @param highlightedWord - Word to highlight in the title
 * @param highlightColor - Custom color for highlighted word
 * @param testimonials - Array of testimonial objects with quotes and details
 * @param className - Optional additional styling
 */
export default function Testimonials({
  // {{REPLACE_COPY}} - Replace with your product's actual testimonials
  title = "What your product will do for customer",
  subtitle = "TESTIMONIALS",
  highlightedWord,              // Optional highlighted word
  highlightColor = "var(--mantine-primary)", // Default highlight color
  testimonials = [
    {
      icon: Lightbulb,
      quote: "Finally turned my idea backlog into real success. This made the difference between dreaming and doing.",
      author: "Collin Scott",
      role: "Founder - EDM Gym",
      accentColor: "var(--color-primary)"
    },
    {
      icon: CheckCircle,
      quote: "Unlike other starter-kits, this actually helped me understand what users cared about in my idea. The focus was game-changing.",
      author: "Erik Wilson",
      role: "Software Engineer",
      accentColor: "var(--color-accent)"
    },
    {
      icon: Rocket,
      quote: "Validated and launched my product in days, not months. Speed meets confidence - exactly what I needed.",
      author: "Daniel Furry",
      role: "Founder - ClimbCapital",
      accentColor: "var(--color-success)"
    }
  ],
  className
}: TestimonialsProps) {
  // Function to render title with optional highlighted word
  const renderTitle = () => {
    if (!highlightedWord) return title;

    const parts = title.split(highlightedWord);
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <Mark 
                color={highlightColor}
                style={{ 
                  padding: '0 0.5rem', 
                  borderRadius: 'var(--mantine-radius-sm)'
                }}
              >
                {highlightedWord}
              </Mark>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <section className={cn("w-full py-12 md:py-24 lg:py-32", className)}>
      <div className="container px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h3 className="!text-sm !font-semibold tracking-wide uppercase text-primary -mb-2 lg:-mb-8">
            {subtitle}
          </h3>
          <h2 className={cn(
            // Use heading-2-fluid size from globals.css
            "text-[length:var(--heading-2-fluid)]",
            "leading-[var(--heading-2-line-height)]",
            "font-[var(--heading-2-weight)]",
            "tracking-[var(--heading-2-tracking)]",
            // Additional styling
            "mx-auto", // Constrain width for readability
            "-mb-6 lg:-mb-6",
            // Use global colors for gradient if no highlighted word
            !highlightedWord && "bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground"
          )}>
            {renderTitle()}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => {
            const Icon = testimonial.icon;
            return (
              <Card 
                key={index} 
                className={cn(
                  "relative overflow-hidden",
                  "transition-all duration-300",
                  "hover:shadow-lg hover:-translate-y-1",
                  "border-border", // Using global border color
                  "bg-card dark:bg-card" // Using global card background color
                )}
              >
                <CardContent className="p-6 pt-6 flex flex-col items-center text-center">
                  {/* Icon with colored background */}
                  <div 
                    className="rounded-lg p-2 w-12 h-12 flex items-center justify-center"
                    style={{ 
                      backgroundColor: `color-mix(in srgb, ${testimonial.accentColor} 15%, transparent)`,
                      color: testimonial.accentColor
                    }}
                  >
                    <Icon className="size-6" />
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-card-foreground mb-4 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Author Info */}
                  {(testimonial.author || testimonial.role) && (
                    <div className="mt-auto">
                      {testimonial.author && (
                        <h4 className="font-semibold text-sm">
                          {testimonial.author}
                        </h4>
                      )}
                      {testimonial.role && (
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>

                {/* Decorative gradient border on hover */}
                <div className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-300",
                  "hover:opacity-100 pointer-events-none",
                  "bg-gradient-to-b from-transparent via-muted to-transparent",
                  "-z-10"
                )} />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}