import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTable } from "@/components/admin/admin-table";
import { adminTestimonials } from "@/lib/admin";

export default function AdminTestimonialsPage() {
  return (
    <AdminShell
      title="Testimonials"
      description="Keep social proof moderated before it reaches the public site, with a dedicated moderation surface separate from the main visitor experience."
    >
      <AdminTable
        columns={["Name", "Role", "Quote", "Status"]}
        rows={adminTestimonials.map((item) => [
          item.name,
          item.role,
          item.quote,
          item.status,
        ])}
      />
    </AdminShell>
  );
}
