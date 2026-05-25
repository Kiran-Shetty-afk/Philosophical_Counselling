import type { Metadata } from "next";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { AnimatedSection } from "@/components/ui/animated-section";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { faqs } from "@/config/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about philosophical counselling — what it is, who it helps, and what to expect.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="A few clear answers before you begin"
        description="These questions address the nature of the work, who it can help, and what you can expect from an initial conversation."
      />
      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <AnimatedSection>
          <div className="mx-auto w-full max-w-4xl">
            <FaqAccordion items={faqs} />
          </div>
        </AnimatedSection>
      </section>
      <CtaBanner
        title="Still have questions?"
        description="The best way to understand if this practice is right for you is a calm first conversation. There is no pressure and no commitment required."
        primaryLabel="Send an Enquiry"
        primaryHref="/contact"
        secondaryLabel="Book a session"
        secondaryHref="/book-session"
      />
    </>
  );
}
