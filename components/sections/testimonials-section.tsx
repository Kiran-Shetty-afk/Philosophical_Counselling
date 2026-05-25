import { Quote, Star } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/config/site";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated-section";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Testimonials"
            title="What clients often describe after the work begins"
            description="The experience is reflective and practical at the same time, offering spacious support without losing direction."
            centered
          />
        </AnimatedSection>

        <StaggerContainer className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <StaggerItem key={item.name}>
              <article className="flex h-full flex-col rounded-[1.75rem] border border-[var(--color-border)] bg-white/84 p-7 shadow-[0_18px_40px_rgba(44,62,80,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(44,62,80,0.11)]">
                <div className="flex items-center justify-between">
                  <Quote className="h-6 w-6 text-[var(--color-accent)]" />
                  <div className="flex items-center gap-1 text-[var(--color-accent)]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="mt-6 flex-1 text-base leading-8 text-[var(--color-text-primary)]">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-[var(--color-border)] pt-5">
                  <p className="font-semibold text-[var(--color-text-primary)]">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {item.role}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
