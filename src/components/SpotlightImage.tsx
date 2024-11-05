// src/components/SpotlightImage.tsx
import { useIntersection } from '@mantine/hooks';
import { Title, Container } from '@mantine/core';
import Image from 'next/image';
import styles from '../styles/SpotlightImage.module.css';

interface SpotlightImageProps {
    // {{REPLACE_PROPS}} - Configure these based on your product needs
    title: string;
    imagePath: string;
    imageAlt: string;
    // Optional configurations for more flexibility
    imageHeight?: number; // in pixels
    priority?: boolean;  // for image loading priority
  }

/**
 * SpotlightImage Component
 * 
 * A component that displays a prominent title followed by a full-width image,
 * with smooth fade-in animations triggered on scroll.
 * 
 * Usage tips:
 * 1. Image should be high resolution (recommend min width: 1920px)
 * 2. Image should have 16:9 or similar landscape aspect ratio (recommended min height: 1080p)
 * 3. Use priority prop for above-the-fold images
 * 4. Format: .webp
 */
export default function SpotlightImage({
    title,
    imagePath,
    imageAlt,
    // imageHeight = 600, // Default height
    priority = false,
}: SpotlightImageProps) {
   // Use Mantine's intersection observer hook for visibility detection
   const { ref, entry } = useIntersection({
    root: null,
    threshold: 0.2, // Trigger when 20% of element is visible
  });

  // Check if component is in viewport
  const isVisible = entry?.isIntersecting;

  return (
    <Container 
      size="xl" 
      ref={ref}
      className={styles.container}
    >
      {/* Title Section */}
      <div className={`${styles.titleWrapper} ${isVisible ? styles.visible : ''}`}>
        <Title 
          order={2}
          className={styles.title}
        >
          {title}
        </Title>
      </div>

      {/* Image Section */}
      <div className={`${styles.imageWrapper} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.imageContainer}>
          <Image
            src={imagePath}
            alt={imageAlt}
            priority={priority}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            className={styles.image}
          />
        </div>
      </div>
    </Container>
  );
}