import React from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import AnimatedShinyText from '@/components/ui/animated-shiny-text';

// Types for content items
interface ContentItem {
  title: string;
  description: string;
  imagePath: string;
  imageAlt: string;
  shinyText?: boolean; // Optional flag for shiny text effect
}

interface TwoColumnContentProps {
  items: ContentItem[];
  className?: string;
}

/**
 * TwoColumnContent Component
 * 
 * A responsive component that displays alternating content sections with images.
 * Features:
 * - Alternating left/right layout on desktop
 * - Stacked layout on mobile
 * - Engaging text effects
 * - Subtle image shadows
 * 
 * @param items - Array of content objects with titles, descriptions, and images
 * @param className - Optional additional styling
 */
export default function TwoColumnContent({
  // {{REPLACE_CONTENT}} - Replace these with your product's content
  items = [
    {
      title: "Engaging headline that hooks attention",
      description: "Persuasive description that builds interest and creates desire for your solution. Focus on benefits and outcomes.",
      imagePath: "/images/BellCurveMeme.webp",
      imageAlt: "Feature visualization"
    },
    {
      title: "Another compelling headline",
      description: "More engaging copy that reinforces your value proposition and addresses potential concerns or objections.",
      imagePath: "/images/content2.webp", 
      imageAlt: "Benefit visualization",
      shinyText: true // Enable shiny text effect for variety
    },
  ],
  className
}: TwoColumnContentProps) {
  return (
    <div className={cn("w-full py-12 md:py-24", className)}>
      <div className="container mx-auto px-4">
        {/* Map through content items */}
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              // Base styles
              "flex flex-col gap-8 mb-20 last:mb-0",
              // Desktop: Alternate layout direction
              "md:flex-row md:items-center md:justify-between",
              // Reverse every other item on desktop
              index % 2 === 1 && "md:flex-row-reverse"
            )}
          >
            {/* Text Content Section */}
            <div className="w-full md:w-1/2 space-y-4">
              {/* Title with motion and optional shiny effect */}
              {item.shinyText ? (
                <AnimatedShinyText>
                  <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                    {item.title}
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
                  {item.title}
                </motion.h2>
              )}

              {/* Description with wavy underline decoration */}
              <p className={cn(
                "text-lg text-muted-foreground",
                "relative inline-block",
              )}>
                {item.description}
              </p>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <div className={cn(
                "relative w-full aspect-[4/3]", // Maintain aspect ratio
                "rounded-lg overflow-hidden", // Rounded corners
                "shadow-[0_8px_30px_rgb(0,0,0,0.12)]" // Subtle shadow for 3D effect
              )}>
                <Image
                  src={item.imagePath}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0} // Prioritize loading first image
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}