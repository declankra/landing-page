// src/components/SpotlightVideo.tsx
import { Title, Button, Container, Mark } from '@mantine/core';
import HeroVideoDialog from '@/components/ui/hero-video-dialog';
import styles from '../styles/SpotlightVideo.module.css';
import { IconArrowRight } from '@tabler/icons-react';

interface SpotlightVideoProps {
  // {{REPLACE_PROPS}} - Configure these based on your product needs
  title: string;
  highlightedText?: string;
  highlightColor?: string;
  videoSrc: string;
  thumbnailSrc: string;
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
  title,
  highlightedText,
  highlightColor, // Default highlight color
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = 'Product demo video thumbnail',
  ctaText = 'Try Now',
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

  return (
    <Container size="xl" className={styles.container}>
      {/* Title Section */}
      <div className={styles.header}>
        <Title order={2} className={styles.title}>
          {renderTitle()}
        </Title>

        {/* CTA Button */}
        <Button
          variant="default"
          size="compact-lg"
          className={styles.ctaButton}
          onClick={onCtaClick}
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