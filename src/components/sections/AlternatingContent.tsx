import React, { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import AnimatedShinyText from '@/components/ui/animated-shiny-text';

// Type for content section - either text or image
type ContentSection = {
  type: 'text' | 'image';
  side: 'left' | 'right';
  // For text sections - now supporting ReactNode for styled content
  title?: ReactNode;
  description?: ReactNode;
  shinyText?: boolean;
  // For image sections
  imagePath?: string;
  imageAlt?: string;
};

interface AlternatingContentProps {
  sections: ContentSection[];
  className?: string;
}

/**
 * AlternatingContent Component
 * 
 * A responsive component that displays content sections alternating between sides.
 * Each section contains either text or an image, never both.
 * 
 * Features:
 * - Single-sided content (text or image)
 * - Left/right positioning
 * - Engaging text effects
 * - Subtle image shadows
 * - Mobile-responsive
 * 
 * @param sections - Array of content sections specifying type and side
 * @param className - Optional additional styling
 */
export default function AlternatingContent({
  // {{REPLACE_CONTENT}} - Replace these with your product's content
  sections = [
    {
      type: 'text',
      side: 'left',
      title: "Engaging headline that hooks attention",
      description: "Persuasive description that builds interest and creates desire for your solution.",
      shinyText: true
    },
    {
      type: 'image',
      side: 'right',
      imagePath: "/images/content1.webp",
      imageAlt: "Feature visualization"
    },
    {
      type: 'text',
      side: 'left',
      title: "Another compelling headline",
      description: "More engaging copy that reinforces your value proposition.",
    },
    {
      type: 'image',
      side: 'right',
      imagePath: "/images/content2.webp",
      imageAlt: "Benefit visualization"
    },
  ],
  className
}: AlternatingContentProps) {
  return (
    <div className={cn("w-full py-12 md:py-24", className)}>
      <div className="container mx-auto px-4">
        {/* Map through sections */}
        {sections.map((section, index) => (
          <div
            key={index}
            className={cn(
              // Base styles
              "flex flex-col mb-60 last:mb-0",
              // Desktop: Position based on side property
              "md:flex-row",
              // Center content
              "items-center justify-center"
            )}
          >
            {/* Content Container */}
            <div
              className={cn(
                // Base styles
                "w-full",
                // Desktop: Half width and positioning
                "md:w-1/2",
                // Position based on side
                section.side === 'right' && "md:ml-auto",
                section.side === 'left' && "md:mr-auto"
              )}
            >
              {section.type === 'text' ? (
                // Text Content
                <div className="space-y-0">
                  {/* Title with optional shiny effect */}
                  {section.shinyText ? (
                    <AnimatedShinyText>
                      <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                        {section.title}
                      </h2>
                    </AnimatedShinyText>
                  ) : (
                    <motion.h2
                      className="text-3xl font-bold md:text-4xl lg:text-5xl"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {section.title}
                    </motion.h2>
                  )}

                  {/* Description with wavy underline */}
                  <p className={cn(
                    "text-lg text-muted-foreground",
                    "relative inline-block",
                  )}>
                    {section.description}
                  </p>
                </div>
              ) : (
                // Image Content
                <div className={cn(
                  "relative w-full aspect-[4/3]",
                  "rounded-lg overflow-hidden",
                  "shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                )}>
                  <Image
                    src={section.imagePath || ''}
                    alt={section.imageAlt || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}