// src/components/sections/SpotlightVideo.tsx
import { Button, Container, Mark } from '@mantine/core';
import HeroVideoDialog from '@/components/ui/hero-video-dialog';
import styles from '@/styles/components/SpotlightVideo.module.css';
import { cn } from "@/lib/utils";
import { IconArrowRight } from '@tabler/icons-react';
import { AMPLITUDE_EVENTS, Analytics } from '@/lib/analytics/amplitude/amplitude';

interface SpotlightVideoProps {
  // {{REPLACE_PROPS}} - Configure these based on your product needs
  title?: string;
  subtitle?: string;
  highlightedText?: string;
  highlightColor?: string;
  videoSrc?: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

/**
 * SpotlightVideo Component
 * 
 * A component that displays a prominent title with optional highlighted text,
 * followed by a CTA button and a full-width video dialog.
 * 
 * Tips for implementation:
 * 1. Video hosting: Use a CDN or video hosting service (e.g., Cloudflare Stream, Mux)
 * 2. Thumbnail: Generate a high-quality static image (16:9 ratio recommended)
 * 3. Video length: Keep under 60 seconds for better engagement
 * 4. Format recommendations:
 *    - Video: MP4 with H.264 codec
 *    - Thumbnail: WebP format for better performance
 * 5. Loading optimization:
 *    - Lazy load the video dialog
 *    - Preload thumbnail for immediate display
 */
export default function SpotlightVideo({
  // {{REPLACE_COPY}} - Replace these defaults with your product's copy
  title = 'Experience your problem solved with our solution',
  subtitle,
  highlightedText = 'problem solved',
  highlightColor = 'var(--mantine-primary)',
  videoSrc = "https://www.youtube.com/embed/QGIUa2sSYFI",
  thumbnailSrc = "/images/SteveJobs16x9.webp",
  thumbnailAlt = 'Product demo video thumbnail',
  ctaText = 'See it for yourself',
  onCtaClick,
}: SpotlightVideoProps) {
  // Process title to wrap highlighted text in Mark component if provided
  const renderTitle = () => {
    if (!highlightedText) return title;

    const parts = title.split(highlightedText);
    return (
      <>
        {parts[0]}
        <Mark color={highlightColor} className={styles.highlight}>
          {highlightedText}
        </Mark>
        {parts[1]}
      </>
    );
  };

  // Handle CTA button click by adding a tracking event`
  const handleCtaClick = () => {
    // Track the video button click
    Analytics.track(AMPLITUDE_EVENTS.VIDEO_CTA_CLICKED);
    
    // Call the original onCtaClick if provided
    onCtaClick?.();
  };

  return (
    <Container size="xl" className={styles.container}>
      {/* Header Section - Using consistent title styling */}
      <div className="text-center mb-10">
        {/* Subtitle */}
        <h3 className="!text-sm !font-semibold tracking-wide uppercase text-primary -mb-2 lg:-mb-8">
          {subtitle}
        </h3>
        
        {/* Main Title */}
        <h2 className={cn(
          // Use heading-2-fluid size from globals.css
          "text-[length:var(--heading-2-fluid)]",
          "leading-[var(--heading-2-line-height)]",
          "font-[var(--heading-2-weight)]",
          "tracking-[var(--heading-2-tracking)]",
          // Additional styling
          "mx-auto lg:max-w-[80%]", // Constrain width for readability
          "-mb-6 lg:-mb-6"
        )}>
          {renderTitle()}
        </h2>

        {/* CTA Button */}
        <Button
          variant="default"
          size="compact-lg"
          className={styles.ctaButton}
          onClick={handleCtaClick}  // Changed from onCtaClick to handleCtaClick
          rightSection={<IconArrowRight size={20}/>}
        >
          {ctaText}
        </Button>
      </div>

      {/* Video Section with aspect ratio container */}
      <div className={styles.videoContainer}>
        <div className={styles.aspectRatioBox}>
          <div className={styles.videoContent}>
            <HeroVideoDialog
              videoSrc={videoSrc}
              thumbnailSrc={thumbnailSrc}
              thumbnailAlt={thumbnailAlt}
              animationStyle="from-center"
              className={styles.video}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}