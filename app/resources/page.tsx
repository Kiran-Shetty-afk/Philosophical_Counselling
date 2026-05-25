import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated-section";
import { resources } from "@/config/site";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Curated guides, essays, and exercises for reflection, resilience, and practical philosophical wisdom.",
};

const categoryColors: Record<string, string> = {
  Stoicism: "bg-[rgba(255,193,7,0.12)] text-[#b45309]",
  Existentialism: "bg-[rgba(255,152,0,0.12)] text-[#c06c00]",
  Relationships: "bg-[rgba(44,62,80,0.08)] text-[var(--color-text-secondary)]",
  "Decision-Making": "bg-[rgba(255,193,7,0.12)] text-[#b45309]",
  "Self-Inquiry": "bg-[rgba(255,152,0,0.12)] text-[#c06c00]",
  Wellbeing: "bg-[rgba(44,62,80,0.08)] text-[var(--color-text-secondary)]",
};

export default function ResourcesPage() {
  const categories = Array.from(new Set(resources.map((r) => r.category)));

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Curated material for reflection, resilience, and practical wisdom"
        description="A growing set of guides, essays, and exercises designed to support the work between sessions and encourage deeper self-understanding."
      />

      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          {/* Category filter pills */}
          <AnimatedSection>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-[var(--color-accent)] bg-[rgba(255,193,7,0.1)] px-4 py-2 text-sm font-semibold text-[var(--color-accent)]">
                All
              </span>
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-[var(--color-border)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
                >
                  {cat}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* Resource cards */}
          <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <StaggerItem key={resource.title}>
                <article className="group flex h-full flex-col rounded-[1.5rem] border border-[var(--color-border)] bg-white/84 p-7 shadow-[0_16px_40px_rgba(44,62,80,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(44,62,80,0.10)]">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${categoryColors[resource.category] ?? "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]"}`}
                    >
                      {resource.category}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {resource.type}
                    </span>
                  </div>

                  <h2 className="mt-5 text-xl font-semibold text-[var(--color-text-primary)]">
                    {resource.title}
                  </h2>
                  <p className="mt-3 flex-1 text-base leading-8 text-[var(--color-text-secondary)]">
                    {resource.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-5">
                    <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                      <BookOpen className="h-4 w-4" />
                      {resource.readTime}
                    </div>
                    <span className="flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)] transition group-hover:gap-2">
                      Read
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CtaBanner
        title="Looking for more personalised guidance?"
        description="Resources are a starting point. Sessions go deeper — exploring the questions that matter most to you with care and attention."
        primaryLabel="Book a Session"
        primaryHref="/book-session"
        secondaryLabel="Read the Blog"
        secondaryHref="/blog"
      />
    </>
  );
}
