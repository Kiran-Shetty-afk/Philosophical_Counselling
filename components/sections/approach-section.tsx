import { CheckCircle2 } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  "Begin with the question that feels most urgent or difficult to name.",
  "Examine assumptions, emotions, and values with care rather than pressure.",
  "Translate insight into clearer decisions, steadier habits, and healthier perspective.",
];

export function ApproachSection() {
  return (
    <section id="approach" className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,245,245,0.9))] p-8 shadow-[0_24px_60px_rgba(44,62,80,0.08)] sm:p-12">
        <SectionHeading
          eyebrow="Approach"
          title="A calm structure for thoughtful transformation"
          description="Sessions move gently but purposefully. The goal is not simply to feel heard, but to arrive at a clearer, more grounded way of living."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-[1.5rem] border border-white/80 bg-white/92 p-6"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-[var(--color-success)]" />
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  Step {index + 1}
                </span>
              </div>
              <p className="mt-4 text-base leading-8 text-[var(--color-text-primary)]">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
