import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  label: string;
  tone?: "neutral" | "accent" | "warning" | "success";
};

export function StatusBadge({
  label,
  tone = "neutral",
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        tone === "neutral" &&
          "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]",
        tone === "accent" &&
          "bg-[rgba(255,193,7,0.14)] text-[var(--color-accent)]",
        tone === "warning" &&
          "bg-[rgba(217,119,6,0.12)] text-[#b45309]",
        tone === "success" &&
          "bg-[rgba(255,152,0,0.12)] text-[#c06c00]",
      )}
    >
      {label}
    </span>
  );
}
