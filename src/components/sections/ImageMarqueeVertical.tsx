import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Marquee from '@/components/ui/marquee';
import { cn } from "@/lib/utils";

// Types for component props
interface ImageMarqueeVerticalProps {
    // Left side content
    title: string;
    subtitle?: string;
    actionText?: string;
    actionUrl?: string;
    // Right side content
    images: Array<{
        src: string;
        alt: string;
    }>;
    // Optional styling
    className?: string;
    // Optional configuration
    vertical?: boolean;
    reverse?: boolean;
    pauseOnHover?: boolean;
    speed?: number; // Controls animation duration
}

/**
 * ImageMarqueeVertical Component
 * 
 * A split-view component featuring content on the left and a scrolling image marquee on the right.
 * Uses the existing Marquee component for consistent animation behavior.
 * Features a fade effect at the top and bottom of the scrolling images for a cleaner look.
 * 
 * @example
 * ```tsx
 * <ImageMarqueeVertical
 *   title="Our Happy Customers"
 *   subtitle="Join thousands of satisfied users"
 *   actionText="View Success Stories"
 *   actionUrl="/stories"
 *   images={[
 *     { src: "/images/customer1.jpg", alt: "Customer 1" },
 *     { src: "/images/customer2.jpg", alt: "Customer 2" },
 *   ]}
 * />
 * ```
 */
export default function ImageMarqueeVertical({
    // {{REPLACE_COPY}} - Replace these defaults with your product's copy
    title = "Title that sells key outcome",
    subtitle,
    actionText,
    actionUrl,
    images,
    className,
    vertical = true,
    reverse = false,
    pauseOnHover = false,
    speed = 40, // seconds for one complete cycle
}: ImageMarqueeVerticalProps) {
    // Optional loading state for images
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const totalImages = images.length;

    // Handler for image load completion
    const handleImageLoad = () => {
        setImagesLoaded(prev => prev + 1);
    };

    return (
        <section className={cn(
            // Base section styling
            "w-full overflow-hidden",
            // Responsive padding
            "py-8 sm:py-12 md:py-16 lg:py-24",
            className
        )}>
            <div className="container px-4 md:px-6 mx-auto">
                {/* Split view container with improved mobile layout */}
                <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                    {/* Left side - Content */}
                    <div className="flex flex-col space-y-4 md:space-y-6">
                        {/* Title with mobile-first typography */}
                        <h2 className={cn(
                            // Base title styles
                            "text-balance", // Prevent awkward line breaks
                            "text-3xl md:text-4xl lg:text-[length:var(--heading-2-fluid)]", // Responsive font size
                            "leading-tight md:leading-[var(--heading-2-line-height)]",
                            "font-[var(--heading-2-weight)]",
                            "tracking-[var(--heading-2-tracking)]",
                            // Mobile optimization
                            "max-w-[20ch]", // Limit line length for readability
                            "break-words", // Ensure long words don't overflow
                        )}>
                            {title}
                        </h2>

                        {/* Subtitle with improved mobile readability */}
                        {subtitle && (
                            <p className={cn(
                                "text-muted-foreground",
                                "text-base md:text-lg",
                                "max-w-prose", // Limit width for readability
                                "break-words"
                            )}>
                                {subtitle}
                            </p>
                        )}

                        {/* Action button with proper spacing */}
                        {actionText && actionUrl && (
                            <div className="pt-2">
                                <Button
                                    variant="link"
                                    className="p-0 text-primary font-medium hover:underline"
                                    asChild
                                >
                                    <Link href={actionUrl}>
                                        {actionText} →
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Right side - Image Marquee with responsive height */}
                    <div className={cn(
                        "relative w-full",
                        // Responsive height adjustments
                        "h-[50vh] sm:h-[60vh] lg:h-[70vh]",
                        // Add min/max height constraints
                        "min-h-[400px] max-h-[800px]"
                    )}>
                        {/* Improved gradient overlays */}
                        <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-background via-background/80 to-transparent z-10" />
                        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

                        {/* Marquee container */}
                        <div className="relative h-full overflow-hidden">
                            <Marquee
                                vertical={vertical}
                                reverse={reverse}
                                pauseOnHover={pauseOnHover}
                                className="w-full h-full"
                                style={{ '--duration': `${speed}s` } as React.CSSProperties}
                            >
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            // Responsive image container
                                            "relative aspect-[4/3]",
                                            "w-72 sm:w-80 md:w-96", // Responsive width
                                            "shrink-0",
                                            // Styling
                                            "rounded-lg overflow-hidden",
                                            "border border-border/50",
                                            "mx-2 my-3 sm:mx-3", // Adjusted spacing
                                            // Hover effects
                                            "transition-all duration-300",
                                            "hover:scale-[1.02] hover:shadow-lg",
                                            // Loading state
                                            "bg-muted/25",
                                        )}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 33vw"
                                            onLoad={handleImageLoad}
                                            priority={index < 4}
                                        />
                                    </div>
                                ))}
                            </Marquee>
                        </div>

                        {/* Loading overlay with improved visibility */}
                        {imagesLoaded < totalImages && (
                            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-20">
                                <div className="animate-pulse text-base sm:text-lg font-medium">
                                    Loading images...
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}