import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, HeartHandshake, Lightbulb, Compass, Shield } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Personal Counselling",
  description:
    "One-to-one philosophical counselling sessions for clarity, perspective, and grounded personal change.",
};

const benefits = [
  {
    icon: Compass,
    title: "Navigate life transitions",
    description:
      "Career changes, relationship shifts, loss, and uncertainty — examined with steadiness rather than urgency.",
  },
  {
    icon: Lightbulb,
    title: "Clarify values and decisions",
    description:
      "When choices feel emotionally crowded or morally complex, reflective dialogue helps you find your own ground.",
  },
  {
    icon: HeartHandshake,
    title: "Understand inner conflicts",
    description:
      "Recurring patterns, self-criticism, and contradictory impulses become clearer through careful philosophical inquiry.",
  },
  {
    icon: Shield,
    title: "Build intentional living",
    description:
      "Develop a more deliberate relationship with work, identity, purpose, and the boundaries that protect what matters.",
  },
];

const process = [
  {
    step: "01",
    title: "First conversation",
    description:
      "We begin by listening carefully to what brings you here — without rushing toward conclusions or advice.",
  },
  {
    step: "02",
    title: "Reflective inquiry",
    description:
      "Together we examine the assumptions, values, and interpretations shaping your experience and choices.",
  },
  {
    step: "03",
    title: "Grounded insight",
    description:
      "Clarity emerges not as a sudden answer, but as a steadier, more honest way of understanding your situation.",
  },
  {
    step: "04",
    title: "Practical forward movement",
    description:
      "Insights translate into clearer decisions, healthier boundaries, and a more intentional way of living.",
  },
];

export default function PersonalCounsellingPage() {
  return (
    <>
      <PageHero
        eyebrow="Personal Counselling"
        title="One-to-one sessions for clarity, perspective, and grounded change"
        description="Personal philosophical counselling offers a calm space to think deeply about the life you are living, the patterns you are carrying, and the choices you want to make next."
      />

      {/* Benefits */}
      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <AnimatedSection>
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
                What it addresses
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                The questions that sit beneath the surface
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)]">
                Personal counselling is most useful when a problem is not simply
                practical but existential — when the real question is about
                meaning, identity, or the kind of life you want to live.
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <article className="group flex gap-5 rounded-[1.5rem] border border-[var(--color-border)] bg-white/84 p-7 shadow-[0_16px_40px_rgba(44,62,80,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(44,62,80,0.10)]">
                    <div className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-surface-highlight)] text-[var(--color-accent)] transition duration-300 group-hover:bg-[rgba(255,193,7,0.2)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-base leading-8 text-[var(--color-text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <AnimatedSection>
          <div className="mx-auto w-full max-w-7xl rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,245,245,0.9))] p-8 shadow-[0_24px_60px_rgba(44,62,80,0.08)] sm:p-12">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
                How it works
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                A gentle but purposeful process
              </h2>
            </div>

            <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((item) => (
                <StaggerItem key={item.step}>
                  <div className="rounded-[1.5rem] border border-white/80 bg-white/92 p-6">
                    <p className="text-3xl font-semibold text-[var(--color-accent)] opacity-60">
                      {item.step}
                    </p>
                    <h3 className="mt-4 text-lg font-semibold text-[var(--color-text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-10 flex flex-col gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-6 text-sm text-[var(--color-text-secondary)]">
                {["60 or 90 minute sessions", "Online or in-person", "Fully confidential"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />
                      {item}
                    </div>
                  ),
                )}
              </div>
              <a
                href="/book-session"
                className={cn(buttonVariants({ size: "lg" }), "shrink-0")}
              >
                Book a session
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <TestimonialsSection />

      <CtaBanner
        title="Ready for a steadier way forward?"
        description="A first session can help us understand what kind of support would be most useful for you."
        primaryLabel="Request a Personal Session"
        primaryHref="/book-session"
        secondaryLabel="Read the FAQ"
        secondaryHref="/faq"
      />
    </>
  );
}
