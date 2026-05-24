import { AdminShell } from "@/components/admin/admin-shell";
import { EnquiriesPanel } from "@/components/admin/enquiries-panel";
import { adminEnquiries } from "@/lib/admin";

export default function AdminEnquiriesPage() {
  return (
    <AdminShell
      title="Enquiries"
      description="Monitor new outreach, track response status, and keep client communication visible without mixing it into the public-facing experience."
    >
      <EnquiriesPanel initialEnquiries={[...adminEnquiries]} />
    </AdminShell>
  );
}
