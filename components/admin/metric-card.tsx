import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  href?: string;
  trend?: "up" | "down" | "neutral";
};

export function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  href,
  trend = "neutral",
}: MetricCardProps) {
  const trendColor =
    trend === "up"
      ? "text-[#15803d]"
      : trend === "down"
        ? "text-[#b14638]"
        : "text-[var(--color-text-secondary)]";

  const card = (
    <article
      className={`group rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_14px_30px_rgba(44,62,80,0.04)] transition duration-300 ${href ? "hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[0_20px_40px_rgba(44,62,80,0.08)]" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
          {label}
        </p>
        <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-highlight)] text-[var(--color-accent)] transition duration-300 group-hover:bg-[rgba(255,193,7,0.2)]">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-text-primary)]">
        {value}
      </p>
      <p className={`mt-3 text-sm leading-7 ${trendColor}`}>{detail}</p>
    </article>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }

  return card;
}
