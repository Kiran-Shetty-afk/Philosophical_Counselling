import { FaqAccordion } from "@/components/ui/faq-accordion";
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
        <div className="mx-auto w-full max-w-4xl">
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
