import { AboutSection } from "@/components/sections/about-section";
import { ApproachSection } from "@/components/sections/approach-section";
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
      <ContactSection />
    </>
  );
}
