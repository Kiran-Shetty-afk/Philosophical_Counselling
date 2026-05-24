import { AboutSection } from "@/components/sections/about-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ApproachSection />
      <TestimonialsSection />
      <CtaBanner
        title="Thoughtful guidance starts with one honest conversation"
        description="Whether you are seeking personal clarity or healthier family dialogue, the practice begins with careful listening and a steady first step."
        primaryLabel="Contact the Practice"
        primaryHref="/book-session"
        secondaryLabel="Read the Blog"
        secondaryHref="/blog"
      />
      <ContactSection />
    </>
  );
}
