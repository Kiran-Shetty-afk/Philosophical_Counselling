import { PageHero } from "@/components/sections/page-hero";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Stories of greater clarity, steadiness, and meaningful change"
        description="Clients often describe the work as both spacious and practical, giving them room to reflect while moving toward clearer action."
      />
      <TestimonialsSection />
    </>
  );
}
