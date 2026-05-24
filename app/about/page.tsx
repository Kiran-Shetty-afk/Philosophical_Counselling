import { AboutSection } from "@/components/sections/about-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Philosophical Counselling"
        title="Thoughtful support for people who want more than quick answers"
        description="This practice offers a reflective space where philosophy becomes practical, compassionate, and deeply relevant to the questions shaping everyday life."
      />
      <AboutSection />
      <CtaBanner
        title="Begin with a conversation that meets you where you are"
        description="Whether you are carrying uncertainty, conflict, or a sense of inner drift, the first step can be quiet, clear, and grounded."
        primaryLabel="Contact the Practice"
        primaryHref="/contact"
      />
    </>
  );
}
