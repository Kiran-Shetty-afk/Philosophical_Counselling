type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
        {description}
      </p>
    </div>
  );
}
