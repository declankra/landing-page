// src/components/sections/WhyProductWorks.tsx
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Zap, Target, Clock } from "lucide-react";

// Types for benefit cards
interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  accentColor?: string;
}

interface WhyProductWorksProps {
  title?: string;
  subtitle?: string;
  benefits?: Benefit[];
  className?: string;
}

/**
 * WhyProductWorks Component
 * 
 * A section that displays three cards highlighting key benefits or problems solved.
 * Features:
 * - Configurable benefits with icons and descriptions
 * - Responsive grid layout
 * - Hover animations
 * - Customizable accent colors using global variables
 * 
 * @param title - Main section title
 * @param subtitle - Optional subtitle/description
 * @param benefits - Array of benefit objects with icons and content
 * @param className - Optional additional styling
 */
export default function WhyProductWorks({
  // {{REPLACE_COPY}} - Replace with your product's value propositions
  title = "Why Our Product Works",
  subtitle = "VALUE PROPOSITION",
  benefits = [
    {
      icon: Zap,
      title: "Lightning Fast Results",
      description: "Get immediate value with our streamlined approach that delivers results from day one.",
      accentColor: "var(--color-primary)" // Using global color variables
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Reach exactly who you need with our focused methodology that eliminates waste.",
      accentColor: "var(--color-accent)"
    },
    {
      icon: Clock,
      title: "Time Efficiency",
      description: "Save valuable time with our optimized processes that maximize productivity.",
      accentColor: "var(--color-success)"
    }
  ],
  className
}: WhyProductWorksProps) {
  return (
    <section className={cn("w-full py-12 md:py-24 lg:py-32", className)}>
      <div className="container px-4 md:px-6">
        {/* Header Section - Similar to Features.tsx */}
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
            // Use global colors for gradient
            "bg-clip-text text-transparent",
            "bg-gradient-to-r from-foreground to-muted-foreground"
          )}>
            {title}
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
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
                      backgroundColor: `color-mix(in srgb, ${benefit.accentColor} 15%, transparent)`,
                      color: benefit.accentColor
                    }}
                  >
                    <Icon className="size-6" />
                  </div>

                  {/* Benefit Title */}
                  <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                    {benefit.title}
                  </h3>

                  {/* Benefit Description */}
                  <p className="text-muted-foreground max-w-[85%]">
                    {benefit.description}
                  </p>
                </CardContent>

                {/* Decorative gradient border on hover */}
                <div className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-300",
                  "hover:opacity-100 pointer-events-none",
                  "bg-gradient-to-r from-transparent via-muted to-transparent",
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