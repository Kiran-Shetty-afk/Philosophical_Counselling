import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to Benna Philosophical Counselling for a confidential first enquiry. We respond with care and without pressure.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach out for a confidential first enquiry"
        description="If you are wondering whether this practice is the right fit, start with a message. We can take the next step thoughtfully and without pressure."
      />
      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <ContactForm />
        </div>
      </section>
      <CtaBanner
        title="Prefer to book directly?"
        description="If you already know what kind of support you need, you can request a session straight away. No pressure, no commitment required."
        primaryLabel="Book a Session"
        primaryHref="/book-session"
        secondaryLabel="Read the FAQ"
        secondaryHref="/faq"
      />
    </>
  );
}
