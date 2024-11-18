import React from "react";
import { cn } from "@/lib/utils";

type RainbowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium text-primary-foreground transition-colors",
        "[background-clip:padding-box,border-box,border-box] [background-origin:border-box]",
        "[border:calc(0.08*1rem)_solid_transparent]",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",

        // Rainbow shadow below
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-1/5 before:w-3/5 before:-translate-x-1/2",
        "before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]", 
        "before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",

        // Main button background with increased opacity for better visibility
        "bg-[linear-gradient(to_right,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
        "hover:opacity-90 active:opacity-95",

        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}