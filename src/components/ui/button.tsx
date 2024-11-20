import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// !! BASE Button variants (applied to all variants) using Tailwind classes and global design tokens
const buttonVariants = cva(
  [
    // Base styles - using global tokens where possible
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-md text-sm font-medium",
    "ring-offset-background transition-all duration-200",  // Using global transition duration
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-ring focus-visible:ring-offset-2",
    "border-0", // Add explicit no border by default, so it can be added by each variant if needed
    // Cursor handling
    "cursor-pointer disabled:cursor-not-allowed",
    // Disabled state
    "disabled:pointer-events-none disabled:opacity-50",
    // Icon styles
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",

    // Base styles - I added these
    "rounded-lg",      // Consistent rounding
    "[border-image:none]", // Reset any border image


  ],
  {
    variants: {
      variant: {
        default: [
          // Base Styles - using global tokens where possible
          "bg-background text-foreground", // Color
          "border-3", // size
          "border-border", // color -- being ovewritten
          // "border-solid border-border/50", // Explicitly set solid border with opacity

          // Hover
          "hover:translate-y-[-2px]", // shift up
          "hover:bg-foreground hover:text-background", // color invert

          // Active/Click state
          "active:scale-[0.98]",

        ],

        nonKeyCTA: [
          // Base Styles - using global tokens where possible
          "bg-primary text-primary-foreground", // Color
          "border-3", // size
          "border border-border/80", //  Border

          // Hover
          "hover:translate-y-[-2px]", // shift up
          "hover:bg-primary/85", // light color slightly
          
          // Active/Click state
          "active:scale-[0.98] active:bg-primary/95",
        ],

        // Core button variant for key actions across the sight
        /* EXAMPLE USAGE
          <Button variant="keyCTA">
            Get Started
          </Button>

          // With leading icon
          <Button variant="keyCTA">
            <ArrowRight className="size-5" />
            Start Now
          </Button>

          // With trailing icon
          <Button variant="keyCTA">
            Launch App
            <ArrowRight className="size-5" />
          </Button>
        */
        keyCTA: [
          // Base styles using design tokens
          "bg-primary text-primary-foreground font-extrabold",
          "text-[1.125rem]", // Slightly larger than default
          "px-8 py-6",       // Generous padding
          "rounded-lg",      // Consistent rounding
          "shadow-md",       // Subtle initial shadow
          "border border-primary/10", // Subtle outline
          
          // Icon handling
          "[&>svg]:mr-2 [&>svg]:size-5", // Icon sizing and spacing
          "[&>svg:last-child]:mr-0 [&>svg:last-child]:ml-2", // Handle trailing icons
          
          // Interactive states with smooth transitions
          "transition-all duration-200 ease-out",
          
          // Hover state
          "hover:bg-primary/90",
          "hover:shadow-lg",
          "hover:scale-[1.02]", // Subtle grow effect
          "hover:border-primary/20",
          
          // Active/Click state
          "active:scale-[0.98]",
          "active:shadow-md",
          "active:bg-primary/95",
          
          // Focus state
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-primary/50 focus-visible:ring-offset-2",
          
          // Disabled state
          "disabled:opacity-50",
          "disabled:pointer-events-none",
          "disabled:shadow-none",
        ],

        destructive: [
          "bg-destructive text-destructive-foreground",
          // Hover - lift effect with color change
          "hover:translate-y-[-2px] hover:bg-destructive/85",
          // Active state
          "active:translate-y-[0px] active:bg-destructive/95"
        ],
        outline: [
          "border border-border bg-background",
          // Hover - lift effect with subtle background
          "hover:translate-y-[-2px] hover:bg-accent hover:text-accent-foreground",
          // Active state
          "active:translate-y-[0px] active:bg-accent/90"
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          // Hover - lift effect with color change
          "hover:translate-y-[-2px] hover:bg-secondary/85",
          // Active state
          "active:translate-y-[0px] active:bg-secondary/95"
        ],
        ghost: [
          "hover:bg-accent hover:text-accent-foreground",
          // Hover - just background change, no lift
          "hover:bg-accent/50",
          // Active state
          "active:bg-accent/70"
        ],
        link: [
          "text-primary underline-offset-4",
          // Link specific cursor
          "cursor-pointer",
          // Hover - underline and opacity
          "hover:underline hover:opacity-90",
          // Active state
          "active:opacity-80"
        ],
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }