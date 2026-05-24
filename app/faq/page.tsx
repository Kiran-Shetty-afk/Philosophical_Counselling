import { PageHero } from "@/components/sections/page-hero";
import { faqs } from "@/config/site";

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="A few clear answers before you begin"
        description="These questions address the nature of the work, who it can help, and what you can expect from an initial conversation."
      />
      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid w-full max-w-4xl gap-4">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/88 p-7 shadow-[0_16px_40px_rgba(44,62,80,0.05)]"
            >
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                {faq.question}
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)]">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
