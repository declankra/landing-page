// src/components/UserSayCarousel.tsx
import { useState } from 'react';
import { Title, Text, Card, UnstyledButton } from '@mantine/core';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '../styles/UserSayCarousel.module.css';

interface TestimonialCard {
  quote: string;
  name?: string;
  archetype: string;
  backgroundImage?: string;
}

interface UserSayCarouselProps {
  title?: string;
  subtitle?: string;
}

// {{REPLACE_TESTIMONIALS}} - Replace these testimonials with your product's actual user feedback
const testimonials: TestimonialCard[] = [
  {
    quote: "This solution completely transformed how we handle our workflow!",
    name: "Anonymous",
    archetype: "Product Manager",
    // backgroundImage: "/testimonial-bg-1.webp" // Uncomment and add your image path
  },
  {
    quote: "I never thought this could be so simple and effective.",
    archetype: "Tech Lead"
  },
  {
    quote: "Game-changing results for our team's productivity.",
    name: "Jane Doe",
    archetype: "Engineering Manager",
    // backgroundImage: "/testimonial-bg-2.webp" // Uncomment and add your image path
  }
];

export default function UserSayCarousel({ 
  title = "What Our Users Say", // Default title if none provided
  subtitle = "Don't just take our word, hear it from them in a carousel" // optional subtitle
}: UserSayCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((current) => {
      const newIndex = current - 1;
      if (newIndex < 0) {
        // Jump to the end when going backwards from start
        return testimonials.length - 1;
      }
      return newIndex;
    });
  };

  const handleNext = () => {
    setActiveIndex((current) => {
      const newIndex = current + 1;
      if (newIndex >= testimonials.length) {
        // Jump to start when going forwards from end
        return 0;
      }
      return newIndex;
    });
  };

  // Calculate indices for visible cards in circular manner
  const getVisibleCards = () => {
    const totalCards = testimonials.length;
    // Using modulo to handle circular indexing
    return [
      (activeIndex - 1 + totalCards) % totalCards, // previous
      activeIndex, // current
      (activeIndex + 1) % totalCards // next
    ].map(index => testimonials[index]);
  };

  const visibleCards = getVisibleCards();

  return (
    <section className={styles.container}>
      <Title className={styles.title}>{title}</Title>
      {subtitle && (
        <Text className={styles.subtitle}>{subtitle}</Text>
      )}

      <div className={styles.carouselWrapper}>
        <UnstyledButton
          onClick={handlePrevious}
          className={styles.navigationButton}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </UnstyledButton>

        <div className={styles.carouselTrack}>
          {visibleCards.map((card, position) => (
            <Card
              key={`${position}-${card.quote}`}
              className={`${styles.testimonialCard} ${
                position === 1 ? styles.activeCard : styles.inactiveCard
              }`}
              style={{
                backgroundImage: card.backgroundImage
                  ? `url(${card.backgroundImage})`
                  : 'none'
              }}
            >
              <Text className={styles.quote}>{card.quote}</Text>
              {card.name && (
                <Text className={styles.name}>{card.name}</Text>
              )}
              <Text className={styles.archetype}>
                {card.archetype}
              </Text>
            </Card>
          ))}
        </div>

        <UnstyledButton
          onClick={handleNext}
          className={styles.navigationButton}
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </UnstyledButton>
      </div>
    </section>
  );
}