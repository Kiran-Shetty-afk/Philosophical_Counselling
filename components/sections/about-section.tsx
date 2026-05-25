import { pillars } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated-section";

export function AboutSection() {
  return (
    <section id="about" className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <AnimatedSection direction="left">
          <SectionHeading
            eyebrow="About"
            title="A practice rooted in reflective dialogue and lived wisdom"
            description="Philosophical counselling is not abstract theory. It is a grounded and compassionate way of thinking with someone through the pressures, doubts, and turning points of life."
          />
        </AnimatedSection>

        <StaggerContainer className="grid gap-5">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <article className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_14px_30px_rgba(44,62,80,0.05)]">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-base leading-8 text-[var(--color-text-secondary)]">
                  {pillar.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
