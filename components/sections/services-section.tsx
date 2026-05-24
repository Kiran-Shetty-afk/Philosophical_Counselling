import { HeartHandshake, Leaf, Users } from "lucide-react";

import { services } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = [HeartHandshake, Users, Leaf];

export function ServicesSection() {
  return (
    <section id="services" className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title="Support designed for the questions beneath the surface"
          description="Each offering is built around spacious conversation, careful listening, and practical reflection tailored to your context."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index];

            return (
              <article
                key={service.title}
                className="group rounded-[1.75rem] border border-[var(--color-border)] bg-white/80 p-7 shadow-[0_16px_40px_rgba(44,62,80,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(44,62,80,0.12)]"
              >
                <div className="inline-flex rounded-2xl bg-[var(--color-surface-highlight)] p-3 text-[var(--color-accent)] transition duration-300 group-hover:scale-105 group-hover:bg-[rgba(255,193,7,0.18)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-[var(--color-text-primary)]">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)]">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
