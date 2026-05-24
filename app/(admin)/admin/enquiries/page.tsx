import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTable } from "@/components/admin/admin-table";
import { adminEnquiries } from "@/lib/admin";

export default function AdminEnquiriesPage() {
  return (
    <AdminShell
      title="Enquiries"
      description="Monitor new outreach, track response status, and keep client communication visible without mixing it into the public-facing experience."
    >
      <AdminTable
        columns={["Name", "Subject", "Received", "Status"]}
        rows={adminEnquiries.map((item) => [
          item.name,
          item.subject,
          item.received,
          item.status,
        ])}
      />
    </AdminShell>
  );
}
