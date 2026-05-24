import * as React from "react";

import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-36 w-full rounded-3xl border border-[var(--color-border)] bg-white/88 px-4 py-3 text-base text-[var(--color-text-primary)] shadow-[0_10px_24px_rgba(44,62,80,0.04)] outline-none transition duration-300 placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[rgba(255,193,7,0.14)]",
        className,
      )}
      {...props}
    />
  );
}
