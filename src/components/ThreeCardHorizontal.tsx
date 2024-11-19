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
        {/* Override global H3 styles while maintaining semantic value */}
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
              {/* Card */}
              <div className="w-full md:w-1/3 max-w-md">
              
            <Card 
              key={step.number}
              className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Step Number */}
              <div className="absolute top-4 left-4 size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg">
                {step.number}
              </div>

              {/* Card Content */}
              <CardHeader className="p-0">
                {step.imagePath && (
                  <div className="relative w-[400px] h-[240px] bg-muted mx-auto">
                    <Image
                      src={step.imagePath}
                      alt={step.imageAlt || `Step ${step.number}`}
                      width={400}
                      height={240}
                      className="object-cover rounded-t-lg"
                      sizes="(max-width: 768px) 400px, 400px"
                    />
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="pt-6 pb-8 px-6">
                <h3 className="text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
              </div>

              {/* Arrow - Show between cards but not after the last one */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-4 md:py-0 md:px-6">
                  {/* Down arrow for mobile, Right arrow for desktop */}
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