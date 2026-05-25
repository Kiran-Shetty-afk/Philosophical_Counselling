import { Mail, ShieldCheck } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

export function ContactSection() {
  return (
    <section id="contact" className="px-5 py-20 sm:px-8 lg:px-10">
      <AnimatedSection>
        <div className="mx-auto grid w-full max-w-7xl gap-8 rounded-[2rem] border border-[var(--color-border)] bg-white/88 p-8 shadow-[0_24px_64px_rgba(44,62,80,0.08)] sm:p-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Contact"
            title="Begin with a calm first conversation"
            description="Share what brings you here, and we will respond with care, clarity, and the next best step."
          />

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6">
              <div className="flex items-center gap-3 text-[var(--color-text-primary)]">
                <Mail className="h-5 w-5 text-[var(--color-accent)]" />
                <p className="font-semibold">Start with a thoughtful enquiry</p>
              </div>
              <p className="mt-3 text-base leading-8 text-[var(--color-text-secondary)]">
                Introduce your concern, what kind of support you are looking for,
                and whether you are seeking personal or family counselling.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/book-session"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  Request a Session
                </a>
                <a
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                  )}
                >
                  Send an Enquiry
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <div className="flex items-center gap-3 text-[var(--color-text-primary)]">
                <ShieldCheck className="h-5 w-5 text-[var(--color-success)]" />
                <p className="font-semibold">Confidentiality comes first</p>
              </div>
              <p className="mt-3 text-base leading-8 text-[var(--color-text-secondary)]">
                Your reflections are held with discretion, respect, and a clear
                commitment to privacy from the first message onward.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
