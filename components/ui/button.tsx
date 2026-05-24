import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full border text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-[var(--gradient-brand)] px-6 py-3 text-[var(--color-surface)] shadow-[0_14px_30px_rgba(255,152,0,0.22)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(255,152,0,0.28)]",
        secondary:
          "border-[var(--color-border-strong)] bg-white/82 px-6 py-3 text-[var(--color-text-primary)] backdrop-blur hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-white",
        ghost:
          "border-transparent px-4 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
      },
      size: {
        default: "min-h-12",
        lg: "min-h-14 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
