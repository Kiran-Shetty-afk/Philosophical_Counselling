import { AdminShell } from "@/components/admin/admin-shell";
import { AppointmentsPanel } from "@/components/admin/appointments-panel";
import { adminAppointments } from "@/lib/admin";

export default function AdminAppointmentsPage() {
  return (
    <AdminShell
      title="Appointments"
      description="Review booking requests, confirm or cancel sessions, and keep notes on each client from a single organised queue."
    >
      <AppointmentsPanel initialAppointments={[...adminAppointments]} />
    </AdminShell>
  );
}
