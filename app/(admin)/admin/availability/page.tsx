import { AdminShell } from "@/components/admin/admin-shell";
import { AvailabilityPanel } from "@/components/admin/availability-panel";

export default function AdminAvailabilityPage() {
  return (
    <AdminShell
      title="Availability management"
      description="Set your working days, hours, break times, and holiday dates. Slots are generated automatically from these settings."
    >
      <AvailabilityPanel />
    </AdminShell>
  );
}
