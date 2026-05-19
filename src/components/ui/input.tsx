// =============================================================================
// CareerForge — Input Component
// =============================================================================

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, type, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="text-[0.8125rem] font-medium text-[hsl(var(--color-text-secondary))] mb-1.5 block">{label}</label>}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--color-text-muted))]">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "w-full bg-[hsl(var(--color-bg-tertiary))] border border-[hsl(var(--color-border))]",
              "rounded-[var(--radius-sm)] px-3.5 py-2.5 text-sm",
              "text-[hsl(var(--color-text-primary))] placeholder:text-[hsl(var(--color-text-muted))]",
              "outline-none transition-all duration-200",
              "focus:border-[hsl(var(--color-primary))] focus:shadow-[0_0_0_3px_hsla(var(--color-primary),0.15)]",
              icon && "pl-10",
              error && "border-[hsl(var(--color-error))] focus:border-[hsl(var(--color-error))] focus:shadow-[0_0_0_3px_hsla(var(--color-error),0.15)]",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-[hsl(var(--color-error))] mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
