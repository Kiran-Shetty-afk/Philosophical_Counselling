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
      <ContactSection />
    </>
  );
}
