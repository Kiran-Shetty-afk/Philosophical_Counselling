import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, MessageCircle, Users, Heart, Scale } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Family Counselling",
  description:
    "Reflective family counselling sessions that support healthier dialogue, reduce reactivity, and restore mutual respect.",
};

const focusAreas = [
  {
    icon: MessageCircle,
    title: "Healthier dialogue",
    description:
      "Support conversations that move beyond blame and defensiveness toward genuine understanding and care.",
  },
  {
    icon: Scale,
    title: "Values and expectations",
    description:
      "Explore how unspoken assumptions, roles, and inherited beliefs are shaping tension inside the home.",
  },
  {
    icon: Heart,
    title: "Conflict and repair",
    description:
      "Navigate recurring disagreements with more patience, less reactivity, and a clearer sense of what each person needs.",
  },
  {
    icon: Users,
    title: "Shared transitions",
    description:
      "Support families through change — new dynamics, loss, separation, or the shifting needs of different life stages.",
  },
];

const differentiators = [
  {
    title: "Not about taking sides",
    description:
      "The counsellor holds space for all perspectives without judgment, helping each person feel genuinely heard.",
  },
  {
    title: "Focused on meaning, not just behavior",
    description:
      "Rather than only managing conflict, sessions explore the beliefs and interpretations that keep tension alive.",
  },
  {
    title: "Practical and reflective",
    description:
      "Insights from sessions translate into clearer communication, steadier boundaries, and more honest conversations.",
  },
];

export default function FamilyCounsellingPage() {
  return (
    <>
      <PageHero
        eyebrow="Family Counselling"
        title="Reflective support for stronger, calmer family conversations"
        description="Family counselling creates room for honesty, patience, and thoughtful communication when the relationships that matter most begin to feel strained."
      />

      {/* Focus areas */}
      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <AnimatedSection>
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
                What it covers
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                When family conversations become difficult
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)]">
                Families often need more than conflict resolution. They need
                better language for care, boundaries, and responsibility — and a
                space where everyone can speak without fear of judgment.
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2">
            {focusAreas.map((item) => {
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

      {/* What makes it different */}
      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <AnimatedSection>
          <div className="mx-auto w-full max-w-7xl rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,245,245,0.9))] p-8 shadow-[0_24px_60px_rgba(44,62,80,0.08)] sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <span className="inline-flex rounded-full border border-[var(--color-border)] bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
                  The approach
                </span>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                  Philosophical rather than prescriptive
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)]">
                  Rather than offering scripts or techniques, family counselling
                  here works by helping each person understand the meanings,
                  values, and assumptions driving their reactions.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="/book-session"
                    className={cn(buttonVariants({ size: "lg" }))}
                  >
                    Enquire about family sessions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>

              <StaggerContainer className="grid gap-5">
                {differentiators.map((item) => (
                  <StaggerItem key={item.title}>
                    <div className="rounded-[1.5rem] border border-white/80 bg-white/92 p-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-success)]" />
                        <div>
                          <h3 className="font-semibold text-[var(--color-text-primary)]">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <CtaBanner
        title="Make space for a better conversation"
        description="When families feel stuck, reflective dialogue can create new understanding without turning the process into a battle."
        primaryLabel="Enquire About Family Sessions"
        primaryHref="/book-session"
        secondaryLabel="Learn about the approach"
        secondaryHref="/about"
      />
    </>
  );
}
