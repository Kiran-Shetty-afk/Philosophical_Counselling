import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTable } from "@/components/admin/admin-table";
import { adminAppointments } from "@/lib/admin";

export default function AdminAppointmentsPage() {
  return (
    <AdminShell
      title="Appointments"
      description="Review booking requests, confirm sessions, and keep the Phase 1 booking workflow organized from a single queue."
    >
      <AdminTable
        columns={["Reference", "Client", "Service", "Date", "Status"]}
        rows={adminAppointments.map((item) => [
          item.id,
          item.client,
          item.service,
          item.date,
          item.status,
        ])}
      />
    </AdminShell>
  );
}
