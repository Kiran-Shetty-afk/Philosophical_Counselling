import type { Metadata } from "next";

import { AboutSection } from "@/components/sections/about-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about philosophical counselling — a grounded, compassionate approach to clarity, meaning, and reflective living.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Philosophical Counselling"
        title="Thoughtful support for people who want more than quick answers"
        description="This practice offers a reflective space where philosophy becomes practical, compassionate, and deeply relevant to the questions shaping everyday life."
      />
      <AboutSection />
      <ApproachSection />
      <TestimonialsSection />
      <CtaBanner
        title="Begin with a conversation that meets you where you are"
        description="Whether you are carrying uncertainty, conflict, or a sense of inner drift, the first step can be quiet, clear, and grounded."
        primaryLabel="Contact the Practice"
        primaryHref="/contact"
        secondaryLabel="Book a session"
        secondaryHref="/book-session"
      />
    </>
  );
}
