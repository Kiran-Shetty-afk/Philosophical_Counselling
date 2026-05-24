import { AdminShell } from "@/components/admin/admin-shell";
import { AppointmentsPanel } from "@/components/admin/appointments-panel";
import { adminAppointments } from "@/lib/admin";

export default function AdminAppointmentsPage() {
  return (
    <AdminShell
      title="Appointments"
      description="Review booking requests, confirm sessions, and keep the Phase 1 booking workflow organized from a single queue."
    >
      <AppointmentsPanel initialAppointments={[...adminAppointments]} />
    </AdminShell>
  );
}
