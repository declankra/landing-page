import Marquee from '@/components/ui/marquee';
import { cn } from "@/lib/utils";
import { Quote, MessageCircleQuestion, AlertCircle } from 'lucide-react';

// Types for different card content
type TestimonialCard = {
  type: 'testimonial';
  quote: string;
  author?: string;
  role?: string;
};

type PainPointCard = {
  type: 'painPoint';
  question: string;
};

type ProblemCard = {
  type: 'problem';
  statement: string;
};

type MarqueeCard = TestimonialCard | PainPointCard | ProblemCard;

// Props interface with configuration options
interface MarqueeCardDisplayProps {
  // Content configuration
  testimonials?: TestimonialCard[];
  painPoints?: PainPointCard[];
  problems?: ProblemCard[];
  
  // Display configuration
  showTypes?: ('testimonial' | 'painPoint' | 'problem')[];
  direction?: 'horizontal' | 'vertical';
  speed?: number; // in seconds
  pauseOnHover?: boolean;
  reverse?: boolean;
  
  // Styling
  className?: string;
  cardClassName?: string;
}

// Individual card components for each type
const TestimonialCardView = ({ quote, author, role }: Omit<TestimonialCard, 'type'>) => (
  <div className={cn(
        // Base card styles using global tokens
    "bg-card p-6 rounded-xl shadow-md min-w-[300px] max-w-[400px] mx-4",
    "border border-border/50 hover:border-primary/50 transition-colors duration-[--transition-normal]",
    "flex flex-col gap-3"
  )}>
    <Quote className="text-primary/60 size-6" />
    <p className="text-card-foreground/80 text-sm italic">{quote}</p>
    {(author || role) && (
      <div className="text-muted-foreground text-xs mt-auto">
        {author && <span className="font-medium">{author}</span>}
        {role && <span className="opacity-70"> · {role}</span>}
      </div>
    )}
  </div>
);

const PainPointCardView = ({ question }: Omit<PainPointCard, 'type'>) => (
  <div className={cn(
    "bg-accent/5 p-6 rounded-xl shadow-md min-w-[300px] max-w-[400px] mx-4",
    "border border-border/50 hover:border-accent/50 transition-colors duration-[--transition-normal]",
    "flex flex-col gap-3"
  )}>
    <MessageCircleQuestion className="text-accent/60 size-6" />
    <p className="text-foreground text-sm font-normal mt-auto">{question}</p>
  </div>
);

const ProblemCardView = ({ statement }: Omit<ProblemCard, 'type'>) => (
  <div className={cn(
    "bg-destructive/5 p-6 rounded-xl shadow-md min-w-[300px] max-w-[400px] mx-4",
    "border border-border/50 hover:border-destructive/50 transition-colors",
    "flex flex-col gap-3"
  )}>
    <AlertCircle className="text-destructive/60 size-6" />
    <p className="text-foreground text-sm font-normal mt-auto">{statement}</p>
  </div>
);

// {{REPLACE_CONTENT}} - Replace these with your product's actual content
const defaultContent = {
  testimonials: [
    {
      type: 'testimonial' as const,  // Add 'as const' to ensure literal type
      quote: "This solved my biggest challenge with X!",
      author: "Sarah K.",
      role: "Product Manager"
    },
    {
      type: 'testimonial' as const,
      quote: "I never thought Y could be this easy",
      author: "Alex M.",
      role: "Team Lead"
    }
  ],
  painPoints: [
    {
      type: 'painPoint' as const,
      question: "Why do I always need to [common pain point]?"
    },
    {
      type: 'painPoint' as const,
      question: "Who knows a better way to [achieve desired outcome]?"
    }
  ],
  problems: [
    {
      type: 'problem' as const,
      statement: "Traditional solutions to [problem] are broken"
    },
    {
      type: 'problem' as const,
      statement: "[Industry] needs a better way to [do something]"
    }
  ]
};

export default function MarqueeCardDisplay({
  // Content props with defaults
  testimonials = defaultContent.testimonials,
  painPoints = defaultContent.painPoints,
  problems = defaultContent.problems,
  
  // Display configuration with defaults
  showTypes = ['testimonial', 'painPoint', 'problem'],
  direction = 'horizontal',
  speed = 40, // seconds
  pauseOnHover = true,
  reverse = false,
  
  // Styling props
  className,
  cardClassName,
}: MarqueeCardDisplayProps) {
  // Combine all enabled card types
  const allCards = [
    ...(showTypes.includes('testimonial') ? testimonials : []),
    ...(showTypes.includes('painPoint') ? painPoints : []),
    ...(showTypes.includes('problem') ? problems : []),
  ];

  // Render appropriate card component based on type
  const renderCard = (card: MarqueeCard) => {
    switch (card.type) {
      case 'testimonial':
        return <TestimonialCardView {...card} />;
      case 'painPoint':
        return <PainPointCardView {...card} />;
      case 'problem':
        return <ProblemCardView {...card} />;
    }
  };

  return (
    <Marquee
      vertical={direction === 'vertical'}
      className={cn("py-8", className)}
      pauseOnHover={pauseOnHover}
      reverse={reverse}
      style={{ '--duration': `${speed}s` } as React.CSSProperties}
    >
      {allCards.map((card, index) => (
        <div key={index} className={cn("mx-4", cardClassName)}>
          {renderCard(card)}
        </div>
      ))}
    </Marquee>
  );
}