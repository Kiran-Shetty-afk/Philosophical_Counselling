import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";

const benefits = [
  "Navigate change, loss, and uncertainty with steadier thinking.",
  "Clarify values when decisions feel emotionally crowded or morally complex.",
  "Understand recurring inner conflicts without harsh self-judgment.",
  "Build a more intentional relationship with work, identity, and purpose.",
];

export default function PersonalCounsellingPage() {
  return (
    <>
      <PageHero
        eyebrow="Personal Counselling"
        title="One-to-one sessions for clarity, perspective, and grounded change"
        description="Personal philosophical counselling offers a calm space to think deeply about the life you are living, the patterns you are carrying, and the choices you want to make next."
      />
      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-2">
          {benefits.map((benefit) => (
            <article
              key={benefit}
              className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/84 p-7 shadow-[0_16px_40px_rgba(44,62,80,0.06)]"
            >
              <p className="text-lg leading-8 text-[var(--color-text-primary)]">
                {benefit}
              </p>
            </article>
          ))}
        </div>
      </section>
      <CtaBanner
        title="Ready for a steadier way forward?"
        description="A first session can help us understand what kind of support would be most useful for you."
        primaryLabel="Request a Personal Session"
        primaryHref="/book-session"
      />
    </>
  );
}
