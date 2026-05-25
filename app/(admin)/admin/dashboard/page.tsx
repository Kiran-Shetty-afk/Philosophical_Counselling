import Link from "next/link";
import { ArrowRight, CalendarCheck2, Mail } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { MetricCard } from "@/components/admin/metric-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { adminStats, adminAppointments, adminEnquiries } from "@/lib/admin";

export default function AdminDashboardPage() {
  return (
    <AdminShell
      title="Dashboard overview"
      description="A central snapshot of the practice — bookings, enquiries, content, and testimonials in one place."
    >
      {/* Metric cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat) => (
          <MetricCard
            key={stat.label}
            detail={stat.detail}
            href={stat.href}
            icon={stat.icon}
            label={stat.label}
            trend={stat.trend}
            value={stat.value}
          />
        ))}
      </div>

      {/* Recent activity */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent appointments */}
        <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_14px_30px_rgba(44,62,80,0.04)]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-surface-highlight)] text-[var(--color-accent)]">
                <CalendarCheck2 className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-[var(--color-text-primary)]">
                Recent appointments
              </h3>
            </div>
            <Link
              href="/admin/appointments"
              className="flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)] transition hover:gap-2"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-5 grid gap-3">
            {adminAppointments.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-[var(--color-border)] bg-white/80 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {item.client}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                    {item.service} · {item.date}
                  </p>
                </div>
                <StatusBadge
                  label={item.status}
                  tone={
                    item.status === "Confirmed"
                      ? "success"
                      : "accent"
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent enquiries */}
        <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_14px_30px_rgba(44,62,80,0.04)]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-surface-highlight)] text-[var(--color-accent)]">
                <Mail className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-[var(--color-text-primary)]">
                Recent enquiries
              </h3>
            </div>
            <Link
              href="/admin/enquiries"
              className="flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)] transition hover:gap-2"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-5 grid gap-3">
            {adminEnquiries.map((item) => (
              <div
                key={`${item.name}-${item.subject}`}
                className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-[var(--color-border)] bg-white/80 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                    {item.subject}
                  </p>
                </div>
                <StatusBadge
                  label={item.status}
                  tone={
                    item.status === "Unread"
                      ? "warning"
                      : item.status === "Replied"
                        ? "success"
                        : "accent"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
        <p className="text-sm font-semibold text-[var(--color-text-primary)]">
          Quick actions
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            { label: "Review appointments", href: "/admin/appointments" },
            { label: "Check enquiries", href: "/admin/enquiries" },
            { label: "Write a blog post", href: "/admin/blog" },
            { label: "Moderate testimonials", href: "/admin/testimonials" },
            { label: "View public site", href: "/" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="inline-flex rounded-full border border-[var(--color-border-strong)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
