// src/components/UserSay.tsx
import { Card, Title, Text } from '@mantine/core';
import { Quote } from 'lucide-react';
import styles from '../styles/UserSay.module.css';

interface TestimonialCardProps {
  quote: string;
}

const TestimonialCard = ({ quote }: TestimonialCardProps) => (
  <Card className={styles.testimonialCard}>
    <div className={styles.quoteIconWrapper}>
      <Quote className={styles.quoteIcon} size={24} />
    </div>
    <Text className={styles.quoteText}>{quote}</Text>
  </Card>
);

export default function UserSay() {
  const testimonials = [
    'Solved pain X!',
    'Improved desirable outcome Y!',
    'Something delightful because Z is so fun!'
  ];

  return (
    <section className={styles.container}>
      <Title className={styles.title}>What Our Users Say</Title>
      <div className={styles.testimonialGrid}>
        {testimonials.map((quote, index) => (
          <TestimonialCard key={index} quote={quote} />
        ))}
      </div>
    </section>
  );
}





  {/* Testimonials frome prev design
  <div className={styles.testimonials}>
  <Title className={styles.testimonialsTitle}>
    What Our Users Say
  </Title>
  <SimpleGrid cols={1}>
    {['Solved pain X!', 'Improved desirable outcome Y!', 'Something delightful because Z is so fun!'].map((testimonial, index) => (
      <Card key={index} className={styles.testimonialCard}>
        <Text>{testimonial}</Text>
      </Card>
    ))}
  </SimpleGrid>
</div>
  */}