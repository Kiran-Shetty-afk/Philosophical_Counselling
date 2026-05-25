import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  label: string;
  tone?: "neutral" | "accent" | "warning" | "success" | "error";
};

export function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        tone === "neutral" &&
          "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]",
        tone === "accent" &&
          "bg-[rgba(255,193,7,0.14)] text-[#b45309]",
        tone === "warning" &&
          "bg-[rgba(217,119,6,0.12)] text-[#92400e]",
        tone === "success" &&
          "bg-[rgba(22,163,74,0.1)] text-[#15803d]",
        tone === "error" &&
          "bg-[rgba(207,91,76,0.1)] text-[#b14638]",
      )}
    >
      {label}
    </span>
  );
}
