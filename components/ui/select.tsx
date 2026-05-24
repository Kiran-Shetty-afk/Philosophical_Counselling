import * as React from "react";

import { cn } from "@/lib/utils";

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "flex h-12 w-full appearance-none rounded-2xl border border-[var(--color-border)] bg-white/88 px-4 text-base text-[var(--color-text-primary)] shadow-[0_10px_24px_rgba(44,62,80,0.04)] outline-none transition duration-300 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[rgba(255,193,7,0.14)]",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
