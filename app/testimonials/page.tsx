import type { Metadata } from "next";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what clients say about philosophical counselling — stories of greater clarity, steadiness, and meaningful change.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Stories of greater clarity, steadiness, and meaningful change"
        description="Clients often describe the work as both spacious and practical, giving them room to reflect while moving toward clearer action."
      />
      <TestimonialsSection />
      <CtaBanner
        title="Ready to begin your own journey?"
        description="A first session is always calm, exploratory, and without pressure. It is simply a chance to see if this kind of support feels right for you."
        primaryLabel="Book a Session"
        primaryHref="/book-session"
        secondaryLabel="Send an enquiry"
        secondaryHref="/contact"
      />
    </>
  );
}
