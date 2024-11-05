import { useEffect, useRef, useState } from 'react';
import { Container, Stepper, Title, Text, Stack } from '@mantine/core';
import Image from 'next/image';
import styles from '../styles/HowItWorksVertical.module.css';

interface Section {
  title: string;
  description: string;
  imagePath?: string;
}

// {{REPLACE_CONTENT}} - Replace these with your product's actual steps
const sections: Section[] = [
  {
    title: "Start onboarding to solve problem",
    description: "You know you have the problem. So lets gather the mininum required information from you in the quickest way possible. ",
    imagePath: "/ProjectLogo.webp" // {{REPLACE_IMAGE_PATH}}
  },
  {
    title: "Aha moment",
    description: "Be amazed as you interact with the key feature and realize why this product is a must. See immediate results.",
    imagePath: "/ExStep2.webp" // {{REPLACE_IMAGE_PATH}}
  },
  {
    title: "Achieve Your Goals",
    description: "Reach your goals faster than ever before. Highlight how the product continually delivers results.",
    // imagePath: "/step3-placeholder.webp" // {{REPLACE_IMAGE_PATH}}
  }
];

interface HowItWorksVerticalProps {
  title?: string;
  subtitle?: string;
}

export default function HowItWorksVertical({
  // {{REPLACE_COPY}} - Replace these default strings with your product's copy
  title = "How It Works",
  subtitle = "Beauty in simplicity & min(time_to_value)"
}: HowItWorksVerticalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        },
        {
          root: null,
          rootMargin: '-50% 0px',
          threshold: 0
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const renderSection = (section: Section, index: number) => {
    const isEven = index % 2 === 0;
    const imageContent = section.imagePath && (
      <div className={styles.imageContainer}>
        <Image
          src={section.imagePath}
          alt={section.title}
          width={400}
          height={300}
          className={styles.sectionImage}
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    );

    const textContent = (
      <Stack className={styles.textContent}>
        <Title order={2} className={styles.sectionTitle}>
          {section.title}
        </Title>
        <Text className={styles.sectionDescription}>
          {section.description}
        </Text>
      </Stack>
    );

    return (
      <div
        key={index}
        ref={el => { sectionRefs.current[index] = el }}
        className={`${styles.section} ${index === activeStep ? styles.active : ''}`}
      >
        {isEven ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    );
  };

  return (
    <Container size="lg" className={styles.container} ref={containerRef}>
      <div className={styles.header}>
        <Title className={styles.title}>{title}</Title>
        <Text className={styles.subtitle}>{subtitle}</Text>
      </div>

      <div className={styles.content}>
        <div className={styles.stepperContainer}>
          <Stepper
            active={activeStep}
            orientation="vertical"
            size="lg"
            iconSize={60}
            className={styles.stepper}
          >
            {sections.map((_, index) => (
              <Stepper.Step key={index} />
            ))}
          </Stepper>
        </div>

        <div className={styles.sections}>
          {sections.map((section, index) => renderSection(section, index))}
        </div>
      </div>
    </Container>
  );
}