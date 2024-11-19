import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowDown } from "lucide-react";
import Image from 'next/image';

// Step interface definition
interface Step {
  number: number;
  title: string;
  description: string;
  imagePath?: string; // Recommended image size: 400x240px (5:3 aspect ratio) --- enforced size
  imageAlt?: string;
}

interface HowItWorksProps {
  // {{REPLACE_PROPS}} - Configure these based on your product needs
  title?: string;
  subtitle?: string;
  steps?: Step[];
  className?: string;
}

/**
 * HowItWorksHorizontal Component
 * 
 * A section component that displays a 3-step process with numbered cards,
 * images, and descriptions laid out horizontally.
 * 
 * @param title - Main section title
 * @param subtitle - Optional subtitle text
 * @param steps - Array of step objects containing content
 * @param className - Optional additional styling
 */
export default function HowItWorksHorizontal({
  // {{REPLACE_COPY}} - Replace these defaults with your product's copy
  title = "Find {benefit opportunities} in 3 steps",
  subtitle = "HOW IT WORKS?",
  steps = [
    {
      number: 1,
      title: "Quick Start",
      description: "Simple first step that is painless and frictionless.",
      imagePath: "/step1-placeholder.webp",
      imageAlt: "Step 1 visualization"
    },
    {
      number: 2,
      title: "See Aha",
      description: "This is when you can see the value in the tool. Optimize the experience to get to this key point as soon as possible.",
      imagePath: "/step2-placeholder.webp",
      imageAlt: "Step 2 visualization"
    },
    {
      number: 3,
      title: "See Results",
      description: "After understanding value, see the value realized into something tangible that solves the problem.",
      imagePath: "/step3-placeholder.webp",
      imageAlt: "Step 3 visualization"
    }
  ],
  className
}: HowItWorksProps) {
  return (
    <section className={cn("py-12 md:py-20", className)}>
      {/* Header Section */}
      <div className="text-center mb-12">
        <h3 className="!text-sm !font-semibold tracking-wide uppercase text-primary mb-2">
          {subtitle}
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {title}
        </h2>
      </div>

      {/* Cards Container */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="w-full md:w-1/3 max-w-md">
                <Card className="overflow-hidden hover:shadow-xl border-solid transition-shadow duration-300 h-[420px] flex flex-col"> {/* Fixed total height */}
                  {/* ImageContainer with relative positioning - fixed height */}
                  <div className="relative w-[400px] h-[240px] bg-muted mx-auto flex-shrink-0"> {/* flex-shrink-0 prevents image compression */}
                    {/* Number Badge - Absolutely positioned */}
                    <div 
                      className="absolute left-4 top-4 z-10 size-9 rounded-full bg-[hsl(var(--color-base-100))] text-[hsl(var(--color-base-content))] flex items-center justify-center font-medium shadow-lg"
                      style={{ transform: 'translateZ(10px)' }} // Ensure it's above the image
                    >
                      {step.number}
                    </div>
                    
                    {/* Image */}
                    <div className="relative w-full h-full">
                      {step.imagePath && (
                        <Image
                          src={step.imagePath}
                          alt={step.imageAlt || `Step ${step.number}`}
                          fill
                          className="object-cover rounded-t-lg"
                          sizes="(max-width: 768px) 400px, 400px"
                        />
                      )}
                    </div>
                  </div>

                  {/* Card Content - flex-grow to fill remaining space */}
                  <CardContent className="pb-8 px-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-semibold mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-4"> {/* Limit to 4 lines */}
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Arrow - Show between cards but not after the last one */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-4 md:py-0 md:px-6">
                  <ArrowDown className="h-8 w-8 text-muted-foreground md:hidden" />
                  <ArrowRight className="hidden md:block h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}