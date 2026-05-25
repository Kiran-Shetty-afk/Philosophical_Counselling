"use client";

import { useState, useEffect, useMemo } from "react";
import { LoaderCircle, CheckCircle2, Clock, XCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/admin/status-badge";

type AppointmentStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

type Appointment = {
  id: string;
  bookingReference: string;
  name: string;
  email: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  notes: string;
  status: AppointmentStatus;
  adminNotes: string;
  createdAt: string;
};

type AppointmentRecord = {
  id: string;
  client: string;
  service: string;
  date: string;
  status: string;
};

type AppointmentsPanelProps = {
  initialAppointments: AppointmentRecord[];
};

const STATUS_FILTERS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"] as const;

function statusTone(status: string): "accent" | "success" | "neutral" | "error" | "warning" {
  if (status === "Confirmed") return "success";
  if (status === "Cancelled") return "error";
  if (status === "Completed") return "neutral";
  return "accent";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const hour = h ?? 0;
  const period = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:${String(m ?? 0).padStart(2, "0")} ${period}`;
}

function serviceLabel(s: string): string {
  if (s === "personal") return "Personal Counselling";
  if (s === "family") return "Family Counselling";
  if (s === "meaning") return "Meaning & Direction";
  return s;
}

export function AppointmentsPanel({ initialAppointments }: AppointmentsPanelProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  // Load from API on mount; fall back to initial prop data shape
  useEffect(() => {
    fetch("/api/admin/appointments")
      .then((r) => r.json())
      .then((d: { appointments?: Appointment[] }) => {
        if (d.appointments) {
          setAppointments(d.appointments);
        } else {
          // Fallback: convert prop shape to Appointment shape
          setAppointments(
            initialAppointments.map((a, i) => ({
              id: a.id ?? `prop-${i}`,
              bookingReference: a.id ?? `BPC-${i}`,
              name: a.client,
              email: "",
              service: a.service.toLowerCase().includes("family") ? "family"
                : a.service.toLowerCase().includes("meaning") ? "meaning" : "personal",
              date: a.date,
              startTime: "09:00",
              endTime: "09:45",
              durationMinutes: 45,
              notes: "",
              status: a.status as AppointmentStatus,
              adminNotes: "",
              createdAt: new Date().toISOString(),
            })),
          );
        }
      })
      .catch(() => {
        setAppointments(
          initialAppointments.map((a, i) => ({
            id: a.id ?? `prop-${i}`,
            bookingReference: a.id ?? `BPC-${i}`,
            name: a.client,
            email: "",
            service: "personal",
            date: a.date,
            startTime: "09:00",
            endTime: "09:45",
            durationMinutes: 45,
            notes: "",
            status: a.status as AppointmentStatus,
            adminNotes: "",
            createdAt: new Date().toISOString(),
          })),
        );
      })
      .finally(() => setLoading(false));
  }, [initialAppointments]);

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      if (statusFilter !== "All" && a.status !== statusFilter) return false;
      if (dateFilter && !a.date.includes(dateFilter)) return false;
      return true;
    });
  }, [appointments, statusFilter, dateFilter]);

  async function updateStatus(id: string, status: AppointmentStatus) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json() as { appointment?: Appointment; error?: string };
      if (res.ok && data.appointment) {
        setAppointments((prev) => prev.map((a) => a.id === id ? data.appointment! : a));
        setMessage(`Appointment updated to ${status.toLowerCase()}.`);
      } else {
        // Optimistic update for demo mode
        setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
        setMessage(`Status updated to ${status.toLowerCase()}.`);
      }
    } catch {
      setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
      setMessage(`Status updated to ${status.toLowerCase()}.`);
    } finally {
      setUpdating(null);
    }
  }

  async function updateNotes(id: string, adminNotes: string) {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, adminNotes } : a));
    try {
      await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes }),
      });
    } catch { /* silent — UI already updated */ }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-10 text-[var(--color-text-secondary)]">
        <LoaderCircle className="h-5 w-5 animate-spin" />
        <span>Loading appointments…</span>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <button key={f} type="button" onClick={() => setStatusFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                statusFilter === f
                  ? "bg-[var(--color-text-primary)] text-white"
                  : "border border-[var(--color-border)] bg-white/80 text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
              }`}>
              {f}
            </button>
          ))}
        </div>
        <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}
          className="w-44" />
        {dateFilter && (
          <button onClick={() => setDateFilter("")} type="button"
            className="text-sm text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]">
            Clear date
          </button>
        )}
        <span className="ml-auto text-sm text-[var(--color-text-secondary)]">
          {filtered.length} appointment{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {message && (
        <div className="rounded-[1.5rem] border border-[rgba(217,119,6,0.22)] bg-[rgba(255,152,0,0.08)] px-5 py-4 text-sm text-[var(--color-text-primary)]">
          {message}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-6 py-10 text-center text-sm text-[var(--color-text-secondary)]">
          No appointments match the current filters.
        </div>
      )}

      {filtered.map((item) => (
        <article key={item.id}
          className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_14px_30px_rgba(44,62,80,0.04)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{item.name}</h3>
                <StatusBadge label={item.status} tone={statusTone(item.status)} />
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {item.bookingReference} · {serviceLabel(item.service)}
              </p>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                {typeof item.date === "string" && item.date.match(/^\d{4}-\d{2}-\d{2}$/)
                  ? formatDate(item.date)
                  : item.date}
                {item.startTime && ` · ${formatTime(item.startTime)} – ${formatTime(item.endTime)}`}
              </p>
              {item.email && <p className="text-sm text-[var(--color-text-secondary)]">{item.email}</p>}
              {item.notes && (
                <p className="mt-2 max-w-lg text-sm leading-7 text-[var(--color-text-secondary)]">
                  &ldquo;{item.notes}&rdquo;
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="default" variant="primary" disabled={updating === item.id || item.status === "Confirmed"}
                onClick={() => updateStatus(item.id, "Confirmed")}>
                {updating === item.id ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-1.5 h-4 w-4" />}
                Confirm
              </Button>
              <Button size="default" variant="secondary" disabled={updating === item.id || item.status === "Completed"}
                onClick={() => updateStatus(item.id, "Completed")}>
                <RefreshCw className="mr-1.5 h-4 w-4" />Complete
              </Button>
              <Button size="default" variant="secondary" disabled={updating === item.id || item.status === "Pending"}
                onClick={() => updateStatus(item.id, "Pending")}>
                <Clock className="mr-1.5 h-4 w-4" />Pending
              </Button>
              <Button size="default" variant="secondary"
                className="border-[rgba(207,91,76,0.3)] text-[#b14638] hover:border-[#b14638]"
                disabled={updating === item.id || item.status === "Cancelled"}
                onClick={() => updateStatus(item.id, "Cancelled")}>
                <XCircle className="mr-1.5 h-4 w-4" />Cancel
              </Button>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">Admin notes</label>
            <Textarea className="min-h-24" placeholder="Add internal notes for follow-up or preparation."
              value={item.adminNotes}
              onChange={(e) => updateNotes(item.id, e.target.value)} />
          </div>
        </article>
      ))}
    </div>
  );
}
