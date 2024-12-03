// src/components/sections/Features.tsx
import { useState } from 'react';
import { Container, Text, UnstyledButton, Stack } from '@mantine/core';
import {Zap, Puzzle, Eye, Rocket, ChartBar, Users } from 'lucide-react';
import styles from '@/styles/components/Features.module.css';
import { cn } from '@/lib/utils';

// {{REPLACE_FEATURES}} - Replace these with your product's actual features
const features = [
  {
    icon: Rocket,
    title: "Rapid Deployment",
    description: "Launch your landing page in minutes with our pre-configured starter kit.",
    colorIndex: 8 // Using accent[4] - #38BDF8
  },
  {
    icon: Users,
    title: "Product-Led Signup Flow",
    description: "Capture user interest and understand their needs.",
    colorIndex: 8 // Using accent[4] - #38BDF8
  },
  {
    icon: ChartBar,
    title: "Pre-built Analytics",
    description: "Know instantly if people care about your idea with built-in user engagement analytics.",
    colorIndex: 8 // Using accent[6] - #0284C7
  },
  {
    icon: Zap,
    title: "Modern Tech Stack",
    description: "Experience blazing fast performance with industry-leading tech stack.",
    colorIndex: 8 // Using accent[5] - #0EA5E9
  },
  {
    icon: Puzzle,
    title: "Seamless Integrations",
    description: "Connect with your favorite tools like Supabase, Vercel, and Resend effortlessly.",
    colorIndex: 8 // Using accent[5] - #0EA5E9
  },
  {
    icon: Eye,
    title: "Clarity and Focus",
    description: "A clean, intuitive design that highlights your idea, making it easy for visitors to understand and engage",
    colorIndex: 8 // Using accent[6] - #0284C7
  }
];

interface FeaturesProps {
  title?: string;
  subtitle?: string;
}

export default function Features({ 
  title = "Tagline that simplifies the solution" ,
  subtitle = "Features" 
}: FeaturesProps) {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <Container size="lg" className={styles.container}>
      {/* Header Section */}
      <div className="w-full text-center mb-20">
        <h3 className="!text-sm !font-semibold tracking-wide uppercase text-primary -mb-2 lg:-mb-8">
          {subtitle}
        </h3>
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
      {title}
      </h2>
    </div>

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
                  '--feature-color': `var(--mantine-color-neutral-${feature.colorIndex})`
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