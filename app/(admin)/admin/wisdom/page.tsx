import { AdminShell } from "@/components/admin/admin-shell";
import { WisdomPanel } from "@/components/admin/wisdom-panel";

export default function AdminWisdomPage() {
  return (
    <AdminShell
      title="Daily Wisdom"
      description="Manage the rotating wisdom quotes shown on the homepage. Pin a featured quote to override random rotation, or toggle quotes active and inactive."
    >
      <WisdomPanel />
    </AdminShell>
  );
}
