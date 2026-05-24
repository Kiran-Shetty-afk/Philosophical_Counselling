import { AppointmentForm } from "@/components/forms/appointment-form";
import { PageHero } from "@/components/sections/page-hero";
import {
  appointmentServices,
  appointmentSlots,
  sessionPackages,
} from "@/config/site";

export default function BookSessionPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Session"
        title="A clear and calming way to request your first appointment"
        description="Choose the kind of support you need, review available windows, and send a guided appointment request through a validated booking flow."
      />

      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <AppointmentForm />

          <div className="grid gap-6">
            <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-7 shadow-[0_16px_40px_rgba(44,62,80,0.05)]">
              <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                Session options
              </h2>
              <div className="mt-5 grid gap-4">
                {appointmentServices.map((service) => (
                  <div
                    key={service.value}
                    className="rounded-[1.25rem] border border-[var(--color-border)] bg-white/80 p-4"
                  >
                    <p className="font-semibold text-[var(--color-text-primary)]">
                      {service.label}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-[var(--color-border)] bg-white/88 p-7 shadow-[0_16px_40px_rgba(44,62,80,0.05)]">
              <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                Weekly availability
              </h2>
              <div className="mt-5 grid gap-4">
                {appointmentSlots.map((slot) => (
                  <div
                    key={slot.day}
                    className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
                  >
                    <p className="font-semibold text-[var(--color-text-primary)]">
                      {slot.day}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                      {slot.times.join(" • ")}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-[var(--color-border)] bg-white/88 p-7 shadow-[0_16px_40px_rgba(44,62,80,0.05)]">
              <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                Session packages
              </h2>
              <div className="mt-5 grid gap-4">
                {sessionPackages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold text-[var(--color-text-primary)]">
                        {pkg.name}
                      </p>
                      <p className="text-lg font-semibold text-[var(--color-accent)]">
                        {pkg.price}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                      {pkg.note}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
