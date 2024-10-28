// src/components/UserSay.tsx
import { Card, Title, Text } from '@mantine/core';
import { SmilePlus, Handshake, Sunrise } from 'lucide-react';
import styles from '../styles/UserSay.module.css';

interface TestimonialCardProps {
  quote: string;
  icon: React.ElementType;
}

const TestimonialCard = ({ quote, icon: Icon }: TestimonialCardProps) => (
  <Card className={styles.testimonialCard}>
    <div className={styles.quoteIconWrapper}>
      <Icon className={styles.quoteIcon} size={24} />
    </div>
    <Text className={styles.quoteText}>{quote}</Text>
  </Card>
);

export default function UserSay() {
  const testimonials = [
    {
      quote: '"I always struggled, until {product} solved pain X!"',
      icon: Sunrise
    },
    {
      quote: '"No one else was able to until {product} improved desirable outcome Y!"',
      icon: Handshake
    },
    {
      quote: '"Something delightful because doing Z on {product} is so fun!"',
      icon: SmilePlus
    }
  ];

  return (
    <section className={styles.container}>
      <Title className={styles.title}>What Our Users Say</Title>
      <div className={styles.testimonialGrid}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={index} 
            quote={testimonial.quote}
            icon={testimonial.icon}
          />
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