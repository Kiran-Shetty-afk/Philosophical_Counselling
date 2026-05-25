import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-12 w-full appearance-none rounded-2xl border border-[var(--color-border)] bg-white/88 pl-4 pr-10 text-base text-[var(--color-text-primary)] shadow-[0_10px_24px_rgba(44,62,80,0.04)] outline-none transition duration-300 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[rgba(255,193,7,0.14)]",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-secondary)]"
        aria-hidden="true"
      />
    </div>
  );
}
