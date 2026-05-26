"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Trash2,
  UserMinus,
  Loader2,
  Mail,
  CheckCircle2,
  XCircle,
  Users,
} from "lucide-react";

type Subscriber = {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
};

export function NewsletterPanel() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter");
      const data = await res.json();
      setSubscribers(data.subscribers ?? []);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  async function handleDeactivate(id: string) {
    setActionLoading(id);
    try {
      await fetch(`/api/newsletter/${id}`, { method: "PATCH" });
      setSubscribers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, active: false } : s)),
      );
    } catch {
      /* silent */
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(id: string) {
    setActionLoading(id);
    try {
      await fetch(`/api/newsletter/${id}`, { method: "DELETE" });
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
    } catch {
      /* silent */
    } finally {
      setActionLoading(null);
    }
  }

  const filtered = subscribers.filter((s) => {
    const matchesSearch = s.email
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && s.active) ||
      (filter === "inactive" && !s.active);
    return matchesSearch && matchesFilter;
  });

  const activeCount = subscribers.filter((s) => s.active).length;
  const inactiveCount = subscribers.length - activeCount;

  return (
    <div className="grid gap-6">
      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Total Subscribers",
            value: subscribers.length,
            icon: Users,
            accent: "text-[var(--color-accent)]",
          },
          {
            label: "Active",
            value: activeCount,
            icon: CheckCircle2,
            accent: "text-green-600",
          },
          {
            label: "Unsubscribed",
            value: inactiveCount,
            icon: XCircle,
            accent: "text-red-400",
          },
        ].map(({ label, value, icon: Icon, accent }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
          >
            <div className={`rounded-xl bg-white p-3 shadow-sm ${accent}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {value}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-secondary)]" />
          <input
            type="text"
            placeholder="Search by email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-2xl border border-[var(--color-border)] bg-white/88 pl-11 pr-4 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[rgba(255,193,7,0.14)]"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "inactive"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold capitalize transition ${
                filter === f
                  ? "border-[var(--color-accent)] bg-[rgba(255,193,7,0.12)] text-[var(--color-text-primary)]"
                  : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-[var(--color-text-secondary)]">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Loading subscribers…
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--color-border)] py-16 text-center">
          <Mail className="h-10 w-10 text-[var(--color-border-strong)]" />
          <p className="text-sm text-[var(--color-text-secondary)]">
            {subscribers.length === 0
              ? "No subscribers yet. Share your newsletter link!"
              : "No subscribers match your search."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
          {/* Desktop header */}
          <div className="hidden border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] px-6 py-3 sm:grid sm:grid-cols-[1fr_160px_100px_100px]">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
              Email
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
              Subscribed
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
              Status
            </p>
            <p className="text-right text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
              Actions
            </p>
          </div>

          {/* Rows */}
          {filtered.map((subscriber) => (
            <div
              key={subscriber.id}
              className="grid items-center gap-2 border-b border-[var(--color-border)] bg-white px-6 py-4 last:border-b-0 sm:grid-cols-[1fr_160px_100px_100px] sm:gap-4"
            >
              {/* Email */}
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(255,193,7,0.12)]">
                  <Mail className="h-4 w-4 text-[var(--color-accent)]" />
                </div>
                <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                  {subscriber.email}
                </p>
              </div>

              {/* Date */}
              <p className="text-sm text-[var(--color-text-secondary)]">
                {new Date(subscriber.subscribedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              {/* Status badge */}
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    subscriber.active
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      subscriber.active ? "bg-green-500" : "bg-red-400"
                    }`}
                  />
                  {subscriber.active ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                {subscriber.active && (
                  <button
                    onClick={() => handleDeactivate(subscriber.id)}
                    disabled={actionLoading === subscriber.id}
                    title="Unsubscribe"
                    className="rounded-xl border border-[var(--color-border)] p-2 text-[var(--color-text-secondary)] transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600 disabled:opacity-50"
                  >
                    {actionLoading === subscriber.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <UserMinus className="h-4 w-4" />
                    )}
                  </button>
                )}
                <button
                  onClick={() => handleDelete(subscriber.id)}
                  disabled={actionLoading === subscriber.id}
                  title="Delete"
                  className="rounded-xl border border-[var(--color-border)] p-2 text-[var(--color-text-secondary)] transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                >
                  {actionLoading === subscriber.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
