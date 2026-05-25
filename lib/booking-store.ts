/**
 * booking-store.ts
 *
 * Server-side in-memory store for the booking system.
 * This is the correct Phase 1 pattern — all logic and validation
 * is real and production-grade. Swap the store maps for Prisma
 * calls in Phase 2 without changing any API or UI code.
 *
 * NOTE: In-memory state resets on server restart. For persistence
 * before a database is added, the store can be serialised to a
 * JSON file. For production, replace with Prisma + Neon PostgreSQL.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export type Appointment = {
  id: string;
  bookingReference: string;
  name: string;
  email: string;
  service: "personal" | "family" | "meaning";
  date: string;        // ISO date string YYYY-MM-DD
  startTime: string;   // "HH:MM" 24-hour
  endTime: string;     // "HH:MM" 24-hour
  durationMinutes: number;
  notes: string;
  status: AppointmentStatus;
  adminNotes: string;
  createdAt: string;   // ISO datetime
};

export type DayAvailability = {
  /** 0 = Sunday … 6 = Saturday */
  dayOfWeek: number;
  enabled: boolean;
  startTime: string;  // "HH:MM"
  endTime: string;    // "HH:MM"
  breakStart?: string;
  breakEnd?: string;
};

export type BlockedSlot = {
  id: string;
  date: string;       // YYYY-MM-DD
  startTime: string;  // "HH:MM"
  reason?: string;
};

export type HolidayDate = {
  date: string;       // YYYY-MM-DD
  reason?: string;
};

export type AvailabilityConfig = {
  sessionDurationMinutes: number;
  bufferMinutes: number;
  schedule: DayAvailability[];
  holidays: HolidayDate[];
};

// ─── Default availability config ──────────────────────────────────────────────

const defaultConfig: AvailabilityConfig = {
  sessionDurationMinutes: 45,
  bufferMinutes: 15,
  schedule: [
    { dayOfWeek: 1, enabled: true,  startTime: "09:00", endTime: "17:00" }, // Mon
    { dayOfWeek: 2, enabled: false, startTime: "09:00", endTime: "17:00" }, // Tue
    { dayOfWeek: 3, enabled: true,  startTime: "10:00", endTime: "17:00", breakStart: "13:00", breakEnd: "14:00" }, // Wed
    { dayOfWeek: 4, enabled: false, startTime: "09:00", endTime: "17:00" }, // Thu
    { dayOfWeek: 5, enabled: true,  startTime: "09:00", endTime: "16:00" }, // Fri
    { dayOfWeek: 6, enabled: true,  startTime: "10:00", endTime: "13:00" }, // Sat
    { dayOfWeek: 0, enabled: false, startTime: "09:00", endTime: "17:00" }, // Sun
  ],
  holidays: [],
};

// ─── Global store (module-level singleton) ────────────────────────────────────

const appointments = new Map<string, Appointment>();
const blockedSlots = new Map<string, BlockedSlot>();
let availabilityConfig: AvailabilityConfig = { ...defaultConfig, schedule: defaultConfig.schedule.map(d => ({ ...d })), holidays: [] };

// Seed with the existing mock appointments so the admin panel still shows data
const seedAppointments: Appointment[] = [
  {
    id: "seed-1",
    bookingReference: "BPC-483920",
    name: "Asha Sharma",
    email: "asha@example.com",
    service: "personal",
    date: "2026-05-27",
    startTime: "09:00",
    endTime: "09:45",
    durationMinutes: 45,
    notes: "Looking for support with a career transition.",
    status: "Pending",
    adminNotes: "",
    createdAt: new Date("2026-05-20").toISOString(),
  },
  {
    id: "seed-2",
    bookingReference: "BPC-483921",
    name: "Daniel Matthews",
    email: "daniel@example.com",
    service: "family",
    date: "2026-05-29",
    startTime: "10:00",
    endTime: "10:45",
    durationMinutes: 45,
    notes: "Family communication has been difficult recently.",
    status: "Confirmed",
    adminNotes: "Confirmed via email.",
    createdAt: new Date("2026-05-21").toISOString(),
  },
  {
    id: "seed-3",
    bookingReference: "BPC-483922",
    name: "Priya S.",
    email: "priya@example.com",
    service: "meaning",
    date: "2026-05-30",
    startTime: "11:00",
    endTime: "11:45",
    durationMinutes: 45,
    notes: "Exploring questions of purpose and direction.",
    status: "Pending",
    adminNotes: "",
    createdAt: new Date("2026-05-22").toISOString(),
  },
];

for (const appt of seedAppointments) {
  appointments.set(appt.id, appt);
}

// ─── Store API ─────────────────────────────────────────────────────────────────

export function getAvailabilityConfig(): AvailabilityConfig {
  return availabilityConfig;
}

export function updateAvailabilityConfig(config: AvailabilityConfig): void {
  availabilityConfig = config;
}

export function getAllAppointments(): Appointment[] {
  return Array.from(appointments.values()).sort(
    (a, b) => new Date(a.date + "T" + a.startTime).getTime() - new Date(b.date + "T" + b.startTime).getTime(),
  );
}

export function getAppointmentById(id: string): Appointment | undefined {
  return appointments.get(id);
}

export function getAppointmentsForDate(date: string): Appointment[] {
  return getAllAppointments().filter(
    (a) => a.date === date && a.status !== "Cancelled",
  );
}

export function createAppointment(data: Omit<Appointment, "id" | "bookingReference" | "createdAt" | "adminNotes">): Appointment {
  const id = `appt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const bookingReference = `BPC-${Date.now().toString().slice(-6)}`;
  const appointment: Appointment = {
    ...data,
    id,
    bookingReference,
    adminNotes: "",
    createdAt: new Date().toISOString(),
  };
  appointments.set(id, appointment);
  return appointment;
}

export function updateAppointment(id: string, updates: Partial<Appointment>): Appointment | null {
  const existing = appointments.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...updates };
  appointments.set(id, updated);
  return updated;
}

export function getAllBlockedSlots(): BlockedSlot[] {
  return Array.from(blockedSlots.values());
}

export function getBlockedSlotsForDate(date: string): BlockedSlot[] {
  return getAllBlockedSlots().filter((s) => s.date === date);
}

export function addBlockedSlot(slot: Omit<BlockedSlot, "id">): BlockedSlot {
  const id = `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const blocked: BlockedSlot = { ...slot, id };
  blockedSlots.set(id, blocked);
  return blocked;
}

export function removeBlockedSlot(id: string): boolean {
  return blockedSlots.delete(id);
}

/**
 * Check if a slot is already taken by an active appointment.
 * Used for double-booking prevention.
 */
export function isSlotTaken(date: string, startTime: string): boolean {
  return getAppointmentsForDate(date).some((a) => a.startTime === startTime);
}

/**
 * Check if a slot is manually blocked by admin.
 */
export function isSlotBlocked(date: string, startTime: string): boolean {
  return getBlockedSlotsForDate(date).some((s) => s.startTime === startTime);
}
