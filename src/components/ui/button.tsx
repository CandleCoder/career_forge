// =============================================================================
// CareerForge — Button Component
// Premium button with multiple variants and sizes
// =============================================================================

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium rounded-[var(--radius-sm)]
      transition-all duration-200 ease-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      focus-visible:ring-offset-[hsl(var(--color-bg-primary))]
      disabled:opacity-50 disabled:pointer-events-none
      active:scale-[0.98]
      cursor-pointer
    `;

    const variants: Record<string, string> = {
      default: `
        bg-[hsl(var(--color-primary))] text-white
        hover:bg-[hsl(var(--color-primary-hover))]
        focus-visible:ring-[hsl(var(--color-primary))]
        shadow-lg shadow-[hsla(var(--color-primary),0.25)]
      `,
      secondary: `
        bg-[hsl(var(--color-bg-tertiary))] text-[hsl(var(--color-text-primary))]
        border border-[hsl(var(--color-border))]
        hover:bg-[hsl(var(--color-bg-elevated))] hover:border-[hsl(var(--color-border-hover))]
      `,
      outline: `
        border border-[hsl(var(--color-border))]
        text-[hsl(var(--color-text-primary))]
        hover:bg-[hsl(var(--color-bg-tertiary))]
        hover:border-[hsl(var(--color-border-hover))]
      `,
      ghost: `
        text-[hsl(var(--color-text-secondary))]
        hover:text-[hsl(var(--color-text-primary))]
        hover:bg-[hsl(var(--color-bg-tertiary))]
      `,
      destructive: `
        bg-[hsl(var(--color-error))] text-white
        hover:bg-[hsl(var(--color-error))]/90
        shadow-lg shadow-[hsla(var(--color-error),0.25)]
      `,
      gradient: `
        gradient-bg text-white font-semibold
        shadow-lg shadow-[hsla(var(--color-primary),0.3)]
        hover:shadow-xl hover:shadow-[hsla(var(--color-primary),0.4)]
        hover:brightness-110
      `,
    };

    const sizes: Record<string, string> = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
