// =============================================================================
// CareerForge — Badge Component
// =============================================================================

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "outline";
}

const badgeVariants: Record<string, string> = {
  default: "bg-[hsl(var(--color-primary))]/15 text-[hsl(var(--color-primary))] border-[hsl(var(--color-primary))]/20",
  success: "bg-[hsl(var(--color-success))]/15 text-[hsl(var(--color-success))] border-[hsl(var(--color-success))]/20",
  warning: "bg-[hsl(var(--color-warning))]/15 text-[hsl(var(--color-warning))] border-[hsl(var(--color-warning))]/20",
  error: "bg-[hsl(var(--color-error))]/15 text-[hsl(var(--color-error))] border-[hsl(var(--color-error))]/20",
  info: "bg-[hsl(var(--color-info))]/15 text-[hsl(var(--color-info))] border-[hsl(var(--color-info))]/20",
  outline: "bg-transparent text-[hsl(var(--color-text-secondary))] border-[hsl(var(--color-border))]",
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border",
        "transition-colors duration-200",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge };
