import type { Metadata } from "next";
import { CheckCircle2, GraduationCap, Sparkles } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { AnimatedSection } from "@/components/ui/animated-section";
import { counsellorProfile } from "@/config/site";

export const metadata: Metadata = {
  title: "Meet the Counsellor",
  description:
    "Learn about Dr. Benna — philosophical counsellor, qualifications, specializations, and approach to reflective practice.",
};

export default function CounsellorPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet Your Counsellor"
        title="A reflective practice led with warmth, rigor, and care"
        description="The counselling relationship is built on trust, thoughtful listening, and a genuine commitment to helping you find a more grounded perspective."
      />

      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          {/* Profile card */}
          <AnimatedSection>
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div className="rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(145deg,rgba(255,248,225,0.94),rgba(255,255,255,0.96))] p-8 shadow-[0_24px_60px_rgba(44,62,80,0.08)]">
                {/* Avatar placeholder */}
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--gradient-brand)] shadow-[0_12px_32px_rgba(255,193,7,0.3)]">
                  <span className="text-3xl font-bold text-white">B</span>
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  {counsellorProfile.role}
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-[var(--color-text-primary)]">
                  {counsellorProfile.name}
                </h2>
                <p className="mt-5 text-base leading-8 text-[var(--color-text-secondary)]">
                  {counsellorProfile.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {counsellorProfile.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full border border-[var(--color-border)] bg-white/80 px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-6">
                {/* Qualifications */}
                <article className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/88 p-7 shadow-[0_16px_40px_rgba(44,62,80,0.05)]">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-surface-highlight)] text-[var(--color-accent)]">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                      Qualifications
                    </h3>
                  </div>
                  <ul className="mt-5 grid gap-3">
                    {counsellorProfile.qualifications.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" />
                        <span className="text-base leading-7 text-[var(--color-text-secondary)]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>

                {/* Specializations */}
                <article className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/88 p-7 shadow-[0_16px_40px_rgba(44,62,80,0.05)]">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-surface-highlight)] text-[var(--color-accent)]">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                      Specializations
                    </h3>
                  </div>
                  <ul className="mt-5 grid gap-3">
                    {counsellorProfile.specializations.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" />
                        <span className="text-base leading-7 text-[var(--color-text-secondary)]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>

                {/* Philosophy note */}
                <div className="rounded-[1.5rem] border border-[rgba(255,193,7,0.3)] bg-[rgba(255,193,7,0.07)] p-6">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    A note on the practice
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                    Sessions are not about being told what to do. They are about
                    thinking more clearly, understanding yourself more honestly,
                    and finding a way forward that is genuinely yours.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CtaBanner
        title="Begin with a conversation"
        description="The first session is always calm, exploratory, and without pressure. It is simply a chance to see if this kind of support feels right for you."
        primaryLabel="Book a Session"
        primaryHref="/book-session"
        secondaryLabel="Send an enquiry"
        secondaryHref="/contact"
      />
    </>
  );
}
