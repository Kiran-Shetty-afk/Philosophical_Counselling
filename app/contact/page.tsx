import { ContactForm } from "@/components/forms/contact-form";
import { ContactSection } from "@/components/sections/contact-section";
import { PageHero } from "@/components/sections/page-hero";

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
      <ContactSection />
    </>
  );
}
