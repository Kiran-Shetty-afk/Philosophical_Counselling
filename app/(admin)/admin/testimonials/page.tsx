import { AdminShell } from "@/components/admin/admin-shell";
import { TestimonialsPanel } from "@/components/admin/testimonials-panel";
import { adminTestimonials } from "@/lib/admin";

export default function AdminTestimonialsPage() {
  return (
    <AdminShell
      title="Testimonials"
      description="Keep social proof moderated before it reaches the public site, with a dedicated moderation surface separate from the main visitor experience."
    >
      <TestimonialsPanel initialTestimonials={[...adminTestimonials]} />
    </AdminShell>
  );
}
