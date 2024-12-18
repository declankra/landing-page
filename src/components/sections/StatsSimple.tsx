// src/components/sections/StatsSimple.tsx
import { cn } from "@/lib/utils";
import styles from '@/styles/components/StatsSimple.module.css';
import { useIntersection } from '@mantine/hooks';

/**
 * Internal type definition for stat items
 */
interface Stat {
  value: string;
  label: string;
}

/**
 * Props interface for the StatsSimple component
 */
interface StatsSimpleProps {
  className?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  stats?: Stat[];
}

/**
 * Default configuration object for the StatsSimple component.
 * {{REPLACE_STATS}} - Replace these stats with your product's actual metrics
 */
const defaultConfig = {
  title: "Why people trust us",
  subtitle: "These numbers show our scale of impact and importance",
  stats: [
    { value: "$1T", label: "Assets under holding" },
    { value: "69M+", label: "Daily users" },
    { value: "0.1%", label: "Flat subscription fee" },
    
    // Optional 4th stat - uncomment if needed
    // { value: "24/7", label: "Customer support" },
  ] as Stat[]
};

/**
 * StatsSimple Component
 * 
 * A responsive stats display component with an optional header section
 * and a grid of statistics with accompanying labels. 
 * Uses Mantine's useIntersection hook for scroll-triggered animations.
 */
export default function StatsSimple({
    className,
    title: propTitle,
    subtitle: propSubtitle,
    stats: propStats,
  }: StatsSimpleProps) {
    
    // Use provided props or fall back to default values
    const title = propTitle ?? defaultConfig.title;
    const subtitle = propSubtitle ?? defaultConfig.subtitle;
    const stats = propStats ?? defaultConfig.stats;
    
    // Use Mantine's intersection hook for scroll animations
    const { ref, entry } = useIntersection({
      root: null,
      threshold: 0.1,
      rootMargin: '50px',
    });
  
    // Check if component is in viewport
    const isVisible = entry?.isIntersecting;
  
    return (
      <section 
        ref={ref}
        className={cn(
          "w-full py-12 md:py-24 lg:py-32 bg-background",
          className
        )}
      >
        <div className="container px-4 md:px-6">
          {/* Header Section with condensed width */}
          <div className={cn(
            "flex flex-col items-center justify-center text-center mb-12",
            styles.header,
            isVisible && styles.headerVisible
          )}>
            <h2 className={cn(
              "text-3xl font-bold tracking-tighter md:text-heading-2 mb-2",
              "max-w-[20ch]" // Limit title width
            )}>
              {title}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed dark:text-gray-400">
              {subtitle}
            </p>
          </div>
  
          {/* Stats Grid */}
          <div className={cn(
            "grid gap-8 md:gap-12",
            stats.length === 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-3",
            styles.statsGrid
          )}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  styles.statItem,
                  isVisible && styles.visible,
                  "flex flex-col items-center text-center", // Ensure centered alignment
                  "space-y-2 border-gray-200 p-4 rounded-lg",
                  "transition-colors hover:bg-muted/50"
                )}
                style={{ 
                  '--animation-delay': `${index * 100}ms`,
                } as React.CSSProperties}
              >
                {/* Stat Value */}
                <div className={cn(
                  styles.stat,
                  "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                )}>
                  {stat.value}
                </div>
                {/* Stat Label - now explicitly centered */}
                <p className={cn(
                  styles.label,
                  "text-sm font-medium text-muted-foreground md:text-base",
                  "text-center w-full" // Ensure text centering
                )}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }