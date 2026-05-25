"use client";

import { useState, useEffect } from "react";
import { LoaderCircle, Plus, Trash2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

type DayAvailability = {
  dayOfWeek: number;
  enabled: boolean;
  startTime: string;
  endTime: string;
  breakStart?: string;
  breakEnd?: string;
};

type HolidayDate = { date: string; reason?: string };

type AvailabilityConfig = {
  sessionDurationMinutes: number;
  bufferMinutes: number;
  schedule: DayAvailability[];
  holidays: HolidayDate[];
};

export function AvailabilityPanel() {
  const [config, setConfig] = useState<AvailabilityConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [newHoliday, setNewHoliday] = useState({ date: "", reason: "" });

  useEffect(() => {
    fetch("/api/admin/availability")
      .then((r) => r.json())
      .then((d: { config: AvailabilityConfig }) => { setConfig(d.config); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function updateDay(dayOfWeek: number, field: keyof DayAvailability, value: string | boolean) {
    if (!config) return;
    setConfig({
      ...config,
      schedule: config.schedule.map((d) =>
        d.dayOfWeek === dayOfWeek ? { ...d, [field]: value } : d,
      ),
    });
  }

  function addHoliday() {
    if (!config || !newHoliday.date) return;
    setConfig({ ...config, holidays: [...config.holidays, { ...newHoliday }] });
    setNewHoliday({ date: "", reason: "" });
  }

  function removeHoliday(date: string) {
    if (!config) return;
    setConfig({ ...config, holidays: config.holidays.filter((h) => h.date !== date) });
  }

  async function save() {
    if (!config) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json() as { config?: AvailabilityConfig; error?: string };
      if (!res.ok) { setMessage({ type: "error", text: data.error ?? "Failed to save." }); return; }
      setConfig(data.config ?? config);
      setMessage({ type: "success", text: "Availability saved successfully." });
    } catch {
      setMessage({ type: "error", text: "Failed to save. Please try again." });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-10 text-[var(--color-text-secondary)]">
        <LoaderCircle className="h-5 w-5 animate-spin" />
        <span>Loading availability settings…</span>
      </div>
    );
  }

  if (!config) return <p className="text-[var(--color-text-secondary)]">Unable to load configuration.</p>;

  return (
    <div className="grid gap-8">
      {message && (
        <div className={`rounded-[1.5rem] border px-5 py-4 text-sm ${
          message.type === "success"
            ? "border-[rgba(22,163,74,0.2)] bg-[rgba(22,163,74,0.08)] text-[#15803d]"
            : "border-[rgba(207,91,76,0.2)] bg-[rgba(207,91,76,0.08)] text-[#b14638]"
        }`}>
          {message.text}
        </div>
      )}

      {/* Session settings */}
      <section className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h3 className="font-semibold text-[var(--color-text-primary)]">Session settings</h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">Session duration (minutes)</span>
            <Input type="number" min={15} max={180} value={config.sessionDurationMinutes}
              onChange={(e) => setConfig({ ...config, sessionDurationMinutes: Number(e.target.value) })} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">Buffer between sessions (minutes)</span>
            <Input type="number" min={0} max={60} value={config.bufferMinutes}
              onChange={(e) => setConfig({ ...config, bufferMinutes: Number(e.target.value) })} />
          </label>
        </div>
      </section>

      {/* Weekly schedule */}
      <section className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h3 className="font-semibold text-[var(--color-text-primary)]">Weekly schedule</h3>
        <div className="mt-5 grid gap-4">
          {config.schedule.map((day) => (
            <div key={day.dayOfWeek} className={`rounded-[1.25rem] border p-4 transition ${
              day.enabled ? "border-[var(--color-border)] bg-white/80" : "border-[var(--color-border)] bg-[var(--color-surface-muted)] opacity-60"
            }`}>
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2.5 min-w-[120px]">
                  <input type="checkbox" checked={day.enabled}
                    onChange={(e) => updateDay(day.dayOfWeek, "enabled", e.target.checked)}
                    className="h-4 w-4 rounded accent-[var(--color-accent)]" />
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">{DAY_NAMES[day.dayOfWeek]}</span>
                </label>
                {day.enabled && (
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--color-text-secondary)]">From</span>
                      <input type="time" value={day.startTime}
                        onChange={(e) => updateDay(day.dayOfWeek, "startTime", e.target.value)}
                        className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm outline-none focus:border-[var(--color-accent)]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--color-text-secondary)]">To</span>
                      <input type="time" value={day.endTime}
                        onChange={(e) => updateDay(day.dayOfWeek, "endTime", e.target.value)}
                        className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm outline-none focus:border-[var(--color-accent)]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--color-text-secondary)]">Break</span>
                      <input type="time" value={day.breakStart ?? ""}
                        onChange={(e) => updateDay(day.dayOfWeek, "breakStart", e.target.value)}
                        className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm outline-none focus:border-[var(--color-accent)]" />
                      <span className="text-[var(--color-text-secondary)]">–</span>
                      <input type="time" value={day.breakEnd ?? ""}
                        onChange={(e) => updateDay(day.dayOfWeek, "breakEnd", e.target.value)}
                        className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm outline-none focus:border-[var(--color-accent)]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Holidays */}
      <section className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h3 className="font-semibold text-[var(--color-text-primary)]">Holiday / unavailable dates</h3>
        <div className="mt-5 grid gap-3">
          {config.holidays.length === 0 && (
            <p className="text-sm text-[var(--color-text-secondary)]">No holidays set.</p>
          )}
          {config.holidays.map((h) => (
            <div key={h.date} className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-[var(--color-border)] bg-white/80 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">{h.date}</p>
                {h.reason && <p className="text-xs text-[var(--color-text-secondary)]">{h.reason}</p>}
              </div>
              <button onClick={() => removeHoliday(h.date)} type="button"
                className="text-[var(--color-text-secondary)] transition hover:text-[#b14638]">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <div className="flex flex-wrap items-end gap-3 pt-2">
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Date</span>
              <Input type="date" value={newHoliday.date}
                onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })} className="w-44" />
            </label>
            <label className="grid gap-1.5 flex-1">
              <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Reason (optional)</span>
              <Input value={newHoliday.reason}
                onChange={(e) => setNewHoliday({ ...newHoliday, reason: e.target.value })}
                placeholder="e.g. Public holiday" />
            </label>
            <Button onClick={addHoliday} variant="secondary" disabled={!newHoliday.date}>
              <Plus className="mr-2 h-4 w-4" />Add
            </Button>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving}>
          {saving ? <><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Saving…</> : <><Save className="mr-2 h-4 w-4" />Save availability</>}
        </Button>
      </div>
    </div>
  );
}
