import { useState } from 'react';
import { Container, Title, Text, UnstyledButton, Stack } from '@mantine/core';
import { Lightbulb, Zap, Target, Clock, Shield, Heart } from 'lucide-react';
import styles from '../styles/Features.module.css';

// {{REPLACE_FEATURES}} - Replace these with your product's actual features
const features = [
  {
    icon: Lightbulb,
    title: "Effortless Ideation",
    description: "Quickly convey why your idea matters to test early interest.",
    colorIndex: 4 // Using accent[4] - #38BDF8
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Experience blazing fast performance with industry-leading tech stack.",
    colorIndex: 5 // Using accent[5] - #0EA5E9
  },
  {
    icon: Target,
    title: "Precision Targeting",
    description: "Customize to reach your target audience based on next-level feedback.",
    colorIndex: 6 // Using accent[6] - #0284C7
  },
  {
    icon: Clock,
    title: "Rapid Validation",
    description: "Spend more time gathering insights and validating your concept.",
    colorIndex: 4 // Using accent[4] - #38BDF8
  },
  {
    icon: Shield,
    title: "Built for Security",
    description: "Production-ready from the start with secure handling.",
    colorIndex: 5 // Using accent[5] - #0EA5E9
    },
  {
    icon: Heart,
    title: "User Friendly",
    description: "Intuitive interface that anyone can master in minutes.",
    colorIndex: 6 // Using accent[6] - #0284C7
  }
];

interface FeaturesProps {
  title?: string;
  subtitle?: string;
}

export default function Features({ 
  title = "Features" ,
  subtitle = "How our features will solve your problem" 
}: FeaturesProps) {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <Container size="lg" className={styles.container}>
      <Stack className={styles.header}>
        <Title className={styles.title}>{title}</Title>
        <Text className={styles.subtitle}>{subtitle}</Text>
      </Stack>

      <div className={styles.grid}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <UnstyledButton
              key={index}
              className={`${styles.feature} ${activeFeature === index ? styles.active : ''}`}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
              onClick={() => setActiveFeature(index === activeFeature ? null : index)}
            >
              <div 
                className={`${styles.iconWrapper} ${activeFeature === index ? styles.activeIcon : ''}`}
                style={{ 
                  '--feature-color': `var(--mantine-color-accent-${feature.colorIndex})`
                } as React.CSSProperties}
              >
                <Icon size={24} />
              </div>
              <Stack gap="xs">
                <Text className={styles.featureTitle}>{feature.title}</Text>
                <Text className={styles.featureDescription}>
                  {feature.description}
                </Text>
              </Stack>
            </UnstyledButton>
          );
        })}
      </div>
    </Container>
  );
}