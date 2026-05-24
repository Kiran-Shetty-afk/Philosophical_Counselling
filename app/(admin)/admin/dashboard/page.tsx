import { AdminShell } from "@/components/admin/admin-shell";
import { MetricCard } from "@/components/admin/metric-card";
import { adminStats } from "@/lib/admin";

export default function AdminDashboardPage() {
  return (
    <AdminShell
      title="Dashboard overview"
      description="A central snapshot of the practice, designed to bring content, bookings, and communication into one management surface."
    >
      <div className="grid gap-6 lg:grid-cols-4">
        {adminStats.map((stat) => (
          <MetricCard
            key={stat.label}
            detail={stat.detail}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>
    </AdminShell>
  );
}
