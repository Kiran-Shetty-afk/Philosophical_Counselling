import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";

const familyFocus = [
  "Support healthier dialogue during conflict, transition, or misunderstanding.",
  "Explore how values, roles, and expectations shape tension inside the home.",
  "Create more patient, reflective conversations without blame dominating the process.",
];

export default function FamilyCounsellingPage() {
  return (
    <>
      <PageHero
        eyebrow="Family Counselling"
        title="Reflective support for stronger, calmer family conversations"
        description="Family counselling creates room for honesty, patience, and thoughtful communication when the relationships that matter most begin to feel strained."
      />
      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-3">
          {familyFocus.map((item) => (
            <article
              key={item}
              className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/84 p-7 shadow-[0_16px_40px_rgba(44,62,80,0.06)]"
            >
              <p className="text-lg leading-8 text-[var(--color-text-primary)]">
                {item}
              </p>
            </article>
          ))}
        </div>
      </section>
      <CtaBanner
        title="Make space for a better conversation"
        description="When families feel stuck, reflective dialogue can create new understanding without turning the process into a battle."
        primaryLabel="Enquire About Family Sessions"
        primaryHref="/book-session"
      />
    </>
  );
}
