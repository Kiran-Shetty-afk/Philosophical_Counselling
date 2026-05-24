type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
};

export function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_14px_30px_rgba(44,62,80,0.04)]">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
        {label}
      </p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-text-primary)]">
        {value}
      </p>
      <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
        {detail}
      </p>
    </article>
  );
}
