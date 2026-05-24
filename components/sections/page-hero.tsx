type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="px-5 pb-10 pt-16 sm:px-8 sm:pt-20 lg:px-10">
      <div className="mx-auto w-full max-w-7xl rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(250,247,241,0.94))] px-8 py-12 shadow-[0_24px_64px_rgba(44,62,80,0.08)] sm:px-12 sm:py-16">
        <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
          {eyebrow}
        </span>
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
          {description}
        </p>
      </div>
    </section>
  );
}
