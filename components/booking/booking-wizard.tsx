"use client";

import { useState, useCallback } from "react";
import {
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { appointmentServices } from "@/config/site";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type TimeSlot = {
  startTime: string;
  endTime: string;
  label: string;
  available: boolean;
  reason?: string;
};

type Step = "date" | "slot" | "details" | "confirm";

type BookingSuccess = {
  bookingReference: string;
  message: string;
  appointment: {
    date: string;
    startTime: string;
    endTime: string;
    service: string;
  };
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function toDateString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function getServiceLabel(value: string): string {
  return appointmentServices.find((s) => s.value === value)?.label ?? value;
}

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS: { id: Step; label: string }[] = [
  { id: "date",    label: "Date" },
  { id: "slot",    label: "Time" },
  { id: "details", label: "Details" },
  { id: "confirm", label: "Confirm" },
];

function StepIndicator({ current }: { current: Step }) {
  const currentIndex = STEPS.findIndex((s) => s.id === current);
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300",
                done  && "bg-[var(--color-accent)] text-white",
                active && "bg-[var(--color-text-primary)] text-white ring-4 ring-[rgba(255,193,7,0.2)]",
                !done && !active && "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]",
              )}>
                {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn(
                "text-xs font-medium",
                active ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]",
              )}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn(
                "mx-2 mb-5 h-0.5 w-8 sm:w-12 transition-all duration-300",
                i < currentIndex ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]",
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Calendar picker ──────────────────────────────────────────────────────────

function CalendarPicker({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (date: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/92 p-5 shadow-[0_14px_30px_rgba(44,62,80,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <button onClick={prevMonth} type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] transition hover:border-[var(--color-accent)]">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="font-semibold text-[var(--color-text-primary)]">
          {MONTHS[viewMonth]} {viewYear}
        </p>
        <button onClick={nextMonth} type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] transition hover:border-[var(--color-accent)]">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {DAYS.map(d => (
          <div key={d} className="py-1 text-xs font-semibold text-[var(--color-text-secondary)]">{d}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const cellDate = new Date(dateStr + "T00:00:00");
          const isPast = cellDate < today;
          const isSelected = selected === dateStr;
          const isToday = toDateString(today) === dateStr;
          return (
            <button
              key={dateStr}
              type="button"
              disabled={isPast}
              onClick={() => !isPast && onSelect(dateStr)}
              className={cn(
                "flex h-9 w-full items-center justify-center rounded-xl text-sm font-medium transition",
                isPast && "cursor-not-allowed text-[var(--color-border-strong)] opacity-40",
                !isPast && !isSelected && "hover:bg-[rgba(255,193,7,0.12)] hover:text-[var(--color-text-primary)]",
                isToday && !isSelected && "border border-[var(--color-accent)] text-[var(--color-accent)]",
                isSelected && "bg-[var(--color-text-primary)] text-white",
                !isPast && !isSelected && !isToday && "text-[var(--color-text-secondary)]",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Slot grid ────────────────────────────────────────────────────────────────

function SlotGrid({
  slots,
  selected,
  onSelect,
  loading,
}: {
  slots: TimeSlot[];
  selected: string | null;
  onSelect: (startTime: string) => void;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-2xl bg-[var(--color-surface-muted)]" />
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-6 py-10 text-center">
        <AlertCircle className="h-8 w-8 text-[var(--color-text-secondary)]" />
        <p className="font-semibold text-[var(--color-text-primary)]">No slots available</p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          This date has no available sessions. Please choose a different date.
        </p>
      </div>
    );
  }

  const available = slots.filter((s) => s.available);
  const unavailable = slots.filter((s) => !s.available);

  return (
    <div className="grid gap-4">
      {available.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
            Available slots
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {available.map((slot) => (
              <button
                key={slot.startTime}
                type="button"
                onClick={() => onSelect(slot.startTime)}
                className={cn(
                  "flex flex-col items-center justify-center rounded-2xl border px-3 py-3.5 text-sm font-semibold transition duration-200",
                  selected === slot.startTime
                    ? "border-[var(--color-text-primary)] bg-[var(--color-text-primary)] text-white shadow-[0_8px_20px_rgba(44,62,80,0.18)]"
                    : "border-[var(--color-border)] bg-white/88 text-[var(--color-text-primary)] hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[0_8px_20px_rgba(255,193,7,0.15)]",
                )}
              >
                <Clock className="mb-1 h-3.5 w-3.5 opacity-60" />
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {unavailable.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
            Unavailable
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {unavailable.map((slot) => (
              <div
                key={slot.startTime}
                className="flex flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-3.5 text-sm text-[var(--color-text-secondary)] opacity-50"
              >
                <Clock className="mb-1 h-3.5 w-3.5" />
                <span className="line-through">{slot.label}</span>
                <span className="mt-0.5 text-xs capitalize">{slot.reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main wizard ──────────────────────────────────────────────────────────────

export function BookingWizard() {
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [service, setService] = useState("personal");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<BookingSuccess | null>(null);

  const fetchSlots = useCallback(async (date: string) => {
    setSlotsLoading(true);
    setSlotsError(null);
    setSlots([]);
    try {
      const res = await fetch(`/api/slots?date=${date}`);
      const data = await res.json() as { slots?: TimeSlot[]; error?: string };
      if (!res.ok) { setSlotsError(data.error ?? "Unable to load slots."); return; }
      setSlots(data.slots ?? []);
    } catch {
      setSlotsError("Unable to load slots. Please try again.");
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  function handleDateSelect(date: string) {
    setSelectedDate(date);
    setSelectedSlot(null);
    fetchSlots(date);
  }

  function handleDateContinue() {
    if (selectedDate) setStep("slot");
  }

  function handleSlotSelect(startTime: string) {
    const slot = slots.find((s) => s.startTime === startTime) ?? null;
    setSelectedSlot(slot);
  }

  function handleSlotContinue() {
    if (selectedSlot) setStep("details");
  }

  function validateDetails(): boolean {
    const errors: Record<string, string> = {};
    if (name.trim().length < 2) errors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
    if (notes.trim().length < 12) errors.notes = "Please add a short note about what support you need.";
    if (notes.trim().length > 1000) errors.notes = "Please keep your note under 1000 characters.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleDetailsContinue() {
    if (validateDetails()) setStep("confirm");
  }

  async function handleConfirm() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          service,
          date: selectedDate,
          startTime: selectedSlot?.startTime,
          notes: notes.trim(),
        }),
      });
      const data = await res.json() as BookingSuccess & { error?: string };
      if (!res.ok) { setSubmitError(data.error ?? "Unable to confirm booking."); setSubmitting(false); return; }
      setSuccess(data);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setStep("date"); setSelectedDate(null); setSlots([]); setSelectedSlot(null);
    setService("personal"); setName(""); setEmail(""); setNotes("");
    setFieldErrors({}); setSubmitError(null); setSuccess(null);
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="rounded-[2rem] border border-[var(--color-border)] bg-white/92 p-8 shadow-[0_24px_64px_rgba(44,62,80,0.08)] sm:p-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(22,163,74,0.1)]">
            <CalendarCheck2 className="h-8 w-8 text-[#15803d]" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Booking received
          </h2>
          <p className="max-w-md text-base leading-8 text-[var(--color-text-secondary)]">
            {success.message}
          </p>
          <div className="mt-2 w-full max-w-sm rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">Booking details</p>
            <p className="mt-3 text-sm font-semibold text-[var(--color-text-primary)]">Reference: {success.bookingReference}</p>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{formatDisplayDate(success.appointment.date)}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">{success.appointment.startTime} – {success.appointment.endTime}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">{getServiceLabel(success.appointment.service)}</p>
          </div>
          <Button onClick={handleReset} variant="secondary" className="mt-2">
            Book another session
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-[var(--color-border)] bg-white/92 p-8 shadow-[0_24px_64px_rgba(44,62,80,0.08)] sm:p-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Book a session
          </h2>
          <p className="mt-2 text-base leading-7 text-[var(--color-text-secondary)]">
            45-minute sessions · Confidential · Online or in-person
          </p>
        </div>
        <StepIndicator current={step} />
      </div>

      <div className="mt-8">
        {/* ── Step 1: Date ── */}
        {step === "date" && (
          <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">Select a date</p>
              <CalendarPicker selected={selectedDate} onSelect={handleDateSelect} />
            </div>
            <div className="flex flex-col justify-end gap-3">
              {selectedDate && (
                <div className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm">
                  <p className="font-semibold text-[var(--color-text-primary)]">{formatDisplayDate(selectedDate)}</p>
                  <p className="mt-1 text-[var(--color-text-secondary)]">
                    {slotsLoading ? "Loading slots…" : `${slots.filter(s => s.available).length} slots available`}
                  </p>
                </div>
              )}
              <Button onClick={handleDateContinue} disabled={!selectedDate || slotsLoading} className="w-full sm:w-auto">
                {slotsLoading ? <><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Loading</> : "Continue"}
              </Button>
            </div>
          </div>
        )}

        {/* ── Step 2: Slot ── */}
        {step === "slot" && (
          <div className="grid gap-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setStep("date")} type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] transition hover:border-[var(--color-accent)]">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="font-semibold text-[var(--color-text-primary)]">{selectedDate ? formatDisplayDate(selectedDate) : ""}</p>
            </div>
            {slotsError ? (
              <div className="rounded-[1.5rem] border border-[rgba(207,91,76,0.2)] bg-[rgba(207,91,76,0.08)] px-5 py-4 text-sm text-[#b14638]">{slotsError}</div>
            ) : (
              <SlotGrid slots={slots} selected={selectedSlot?.startTime ?? null} onSelect={handleSlotSelect} loading={slotsLoading} />
            )}
            <div className="flex justify-end">
              <Button onClick={handleSlotContinue} disabled={!selectedSlot}>Continue</Button>
            </div>
          </div>
        )}

        {/* ── Step 3: Details ── */}
        {step === "details" && (
          <div className="grid gap-5">
            <div className="flex items-center gap-3">
              <button onClick={() => setStep("slot")} type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] transition hover:border-[var(--color-accent)]">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {selectedDate ? formatDisplayDate(selectedDate) : ""} · {selectedSlot?.label}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">Your name</span>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Daniel Matthews" autoComplete="name" />
                {fieldErrors.name && <span className="text-sm text-[#cf5b4c]">{fieldErrors.name}</span>}
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--color-text-primary)]">Email address</span>
                <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="daniel@example.com" type="email" autoComplete="email" />
                {fieldErrors.email && <span className="text-sm text-[#cf5b4c]">{fieldErrors.email}</span>}
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">Session type</span>
              <div className="grid gap-3 sm:grid-cols-3">
                {appointmentServices.map((s) => (
                  <button key={s.value} type="button" onClick={() => setService(s.value)}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-left text-sm transition",
                      service === s.value
                        ? "border-[var(--color-text-primary)] bg-[var(--color-text-primary)] text-white"
                        : "border-[var(--color-border)] bg-white/88 text-[var(--color-text-primary)] hover:border-[var(--color-accent)]",
                    )}>
                    <p className="font-semibold">{s.label}</p>
                    <p className={cn("mt-1 text-xs leading-5", service === s.value ? "text-white/75" : "text-[var(--color-text-secondary)]")}>{s.description}</p>
                  </button>
                ))}
              </div>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">Notes</span>
              <Textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Tell us what you would like to work through, and any preferences for the first session." />
              {fieldErrors.notes && <span className="text-sm text-[#cf5b4c]">{fieldErrors.notes}</span>}
            </label>

            <div className="flex justify-end">
              <Button onClick={handleDetailsContinue}>Review booking</Button>
            </div>
          </div>
        )}

        {/* ── Step 4: Confirm ── */}
        {step === "confirm" && (
          <div className="grid gap-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setStep("details")} type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] transition hover:border-[var(--color-accent)]">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="font-semibold text-[var(--color-text-primary)]">Review your booking</p>
            </div>

            <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6">
              <div className="grid gap-3 text-sm">
                {[
                  { label: "Date", value: selectedDate ? formatDisplayDate(selectedDate) : "" },
                  { label: "Time", value: selectedSlot?.label ?? "" },
                  { label: "Session", value: getServiceLabel(service) },
                  { label: "Name", value: name },
                  { label: "Email", value: email },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4">
                    <span className="font-semibold text-[var(--color-text-secondary)]">{label}</span>
                    <span className="text-right text-[var(--color-text-primary)]">{value}</span>
                  </div>
                ))}
                <div className="border-t border-[var(--color-border)] pt-3">
                  <span className="font-semibold text-[var(--color-text-secondary)]">Notes</span>
                  <p className="mt-1 leading-7 text-[var(--color-text-primary)]">{notes}</p>
                </div>
              </div>
            </div>

            {submitError && (
              <div className="rounded-[1.5rem] border border-[rgba(207,91,76,0.2)] bg-[rgba(207,91,76,0.08)] px-5 py-4 text-sm text-[#b14638]">
                {submitError}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button variant="secondary" onClick={() => setStep("details")} disabled={submitting}>Edit details</Button>
              <Button onClick={handleConfirm} disabled={submitting}>
                {submitting ? <><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Confirming…</> : "Confirm booking"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
