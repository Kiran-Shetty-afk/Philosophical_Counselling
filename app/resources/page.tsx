import { PageHero } from "@/components/sections/page-hero";
import { resources } from "@/config/site";

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Curated material for reflection, resilience, and practical wisdom"
        description="A growing set of readings and prompts designed to support the work between sessions and encourage deeper self-understanding."
      />
      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-3">
          {resources.map((resource) => (
            <article
              key={resource.title}
              className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/84 p-7 shadow-[0_16px_40px_rgba(44,62,80,0.06)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                {resource.category}
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                {resource.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)]">
                {resource.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
