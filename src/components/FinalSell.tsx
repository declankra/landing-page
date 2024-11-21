// src/components/FinalSell.tsx
import { Container, Title, Text } from '@mantine/core';
import { PulsatingButtonCustom } from '@/components/ui/pulsating-button-custom';
import { cn } from "@/lib/utils";

interface FinalSellProps {
  // {{REPLACE_PROPS}} - Configure these based on your product needs
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

/**
 * FinalSell Component
 * 
 * A final call-to-action component that appears at the bottom of the landing page,
 * designed to create urgency and capture last-minute conversions.
 * 
 * @param title - Main headline text
 * @param subtitle - Optional supporting text
 * @param ctaText - Button text
 * @param onCtaClick - Button click handler
 * @param className - Additional CSS classes
 */
export default function FinalSell({
  // {{REPLACE_COPY}} - Replace these defaults with your product's copy
  title="Your compelling final pitch",
  subtitle="The clear value-add of using product",
  ctaText="Start {JTBD} Now",
  onCtaClick,
  className,
}: FinalSellProps) {
  return (
    <section 
      className={cn(
        // Base layout styles with added padding for spacing
        "relative w-full py-20 px-4 mx-auto my-16",
        // Container styles with rounded corners and max width
        "max-w-[90%] rounded-2xl",
        // Updated gradient background
        "bg-gradient-to-b from-accent/5 via-background to-accent/50",
        // Shadow for depth
        "shadow-xl",
        // Optional custom classes
        className
      )}
    >
      {/* Centered content container */}
      <Container 
        size="md" 
        className="relative z-10 flex flex-col items-center text-center space-y-8"
      >
        {/* Main title with increased line height and padding */}
        <Title 
          className={cn(
            "text-4xl font-bold md:text-5xl lg:text-6xl",
            "leading-tight pb-2", // Added padding and increased line height
            "bg-gradient-to-b from-foreground via-foreground/50 to-foreground bg-clip-text text-transparent",
            "animate-rainbow [--speed:4s]"
          )}
        >
          {title}
        </Title>

        {/* Subtitle with muted color */}
        {subtitle && (
          <Text 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle}
          </Text>
        )}

        {/* CTA Button with pulsing effect */}
        <div className="pt-4"> {/* Added top padding */}
          <PulsatingButtonCustom
            size="lg"
            variant="primary"
            pulseIntensity="medium"
            pulseColor="hsl(var(--primary))"
            duration="2s"
            onClick={onCtaClick}
            className="text-lg font-semibold px-8 py-4"
          >
            {ctaText}
          </PulsatingButtonCustom>
        </div>
      </Container>
    </section>
  );
}