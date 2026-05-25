import type { Metadata } from "next";

import { BookingWizard } from "@/components/booking/booking-wizard";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { sessionPackages, appointmentServices } from "@/config/site";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Request a philosophical counselling session — choose your date, pick an available slot, and confirm your booking.",
};

export default function BookSessionPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Session"
        title="A calm and clear way to request your first appointment"
        description="Choose a date, select an available 45-minute slot, and confirm your booking in a few simple steps."
      />

      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <BookingWizard />

          <div className="grid gap-6 lg:self-start">
            <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-7 shadow-[0_16px_40px_rgba(44,62,80,0.05)]">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                Session types
              </h2>
              <div className="mt-5 grid gap-3">
                {appointmentServices.map((service) => (
                  <div key={service.value}
                    className="rounded-[1.25rem] border border-[var(--color-border)] bg-white/80 p-4">
                    <p className="font-semibold text-[var(--color-text-primary)]">{service.label}</p>
                    <p className="mt-1.5 text-sm leading-7 text-[var(--color-text-secondary)]">{service.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-[var(--color-border)] bg-white/88 p-7 shadow-[0_16px_40px_rgba(44,62,80,0.05)]">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                Session packages
              </h2>
              <div className="mt-5 grid gap-3">
                {sessionPackages.map((pkg) => (
                  <div key={pkg.name}
                    className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold text-[var(--color-text-primary)]">{pkg.name}</p>
                      <p className="text-lg font-semibold text-[var(--color-accent)]">{pkg.price}</p>
                    </div>
                    <p className="mt-1.5 text-sm leading-7 text-[var(--color-text-secondary)]">{pkg.note}</p>
                  </div>
                ))}
              </div>
            </article>

            <div className="rounded-[1.5rem] border border-[rgba(255,193,7,0.3)] bg-[rgba(255,193,7,0.07)] p-5">
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">How it works</p>
              <ul className="mt-3 grid gap-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                <li>· All sessions are 45 minutes</li>
                <li>· Slots update in real time as bookings are made</li>
                <li>· You will receive a confirmation after admin review</li>
                <li>· Online and in-person options available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Not sure which session is right for you?"
        description="Send a short enquiry and we will help you find the most useful starting point — without any pressure or commitment."
        primaryLabel="Send an Enquiry"
        primaryHref="/contact"
        secondaryLabel="Read the FAQ"
        secondaryHref="/faq"
      />
    </>
  );
}
