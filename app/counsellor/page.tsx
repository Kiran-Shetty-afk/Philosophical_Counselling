import { PageHero } from "@/components/sections/page-hero";
import { counsellorProfile } from "@/config/site";

export default function CounsellorPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet Your Counsellor"
        title="A reflective practice led with warmth, rigor, and care"
        description="The counselling relationship is built on trust, thoughtful listening, and a genuine commitment to helping you find a more grounded perspective."
      />
      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8 shadow-[0_16px_40px_rgba(44,62,80,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
              {counsellorProfile.role}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--color-text-primary)]">
              {counsellorProfile.name}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-text-secondary)]">
              {counsellorProfile.bio}
            </p>
          </div>

          <div className="grid gap-6">
            <article className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/88 p-7 shadow-[0_16px_40px_rgba(44,62,80,0.05)]">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                Qualifications
              </h3>
              <ul className="mt-4 grid gap-3 text-base leading-8 text-[var(--color-text-secondary)]">
                {counsellorProfile.qualifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/88 p-7 shadow-[0_16px_40px_rgba(44,62,80,0.05)]">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                Specializations
              </h3>
              <ul className="mt-4 grid gap-3 text-base leading-8 text-[var(--color-text-secondary)]">
                {counsellorProfile.specializations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
