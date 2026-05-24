"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/admin/status-badge";

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

export function AppointmentsPanel({
  initialAppointments,
}: AppointmentsPanelProps) {
  const [appointments, setAppointments] = useState(
    initialAppointments.map((item) => ({ ...item, note: "" })),
  );
  const [message, setMessage] = useState<string | null>(null);

  function updateStatus(id: string, status: string) {
    setAppointments((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );
    setMessage(`Appointment ${id} updated to ${status.toLowerCase()}.`);
  }

  function updateNote(id: string, note: string) {
    setAppointments((current) =>
      current.map((item) => (item.id === id ? { ...item, note } : item)),
    );
  }

  return (
    <div className="grid gap-6">
      {message ? (
        <div className="rounded-[1.5rem] border border-[rgba(217,119,6,0.22)] bg-[rgba(255,152,0,0.08)] px-5 py-4 text-sm text-[var(--color-text-primary)]">
          {message}
        </div>
      ) : null}

      {appointments.map((item) => (
        <article
          key={item.id}
          className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_14px_30px_rgba(44,62,80,0.04)]"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  {item.client}
                </h3>
                <StatusBadge
                  label={item.status}
                  tone={
                    item.status === "Confirmed"
                      ? "success"
                      : item.status === "Cancelled"
                        ? "warning"
                        : "accent"
                  }
                />
              </div>
              <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
                {item.id} • {item.service} • {item.date}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="default"
                onClick={() => updateStatus(item.id, "Confirmed")}
                variant="primary"
              >
                Confirm
              </Button>
              <Button
                size="default"
                onClick={() => updateStatus(item.id, "Pending")}
                variant="secondary"
              >
                Mark pending
              </Button>
              <Button
                className="border-[rgba(217,119,6,0.28)] text-[#b45309] hover:border-[#b45309]"
                size="default"
                onClick={() => updateStatus(item.id, "Cancelled")}
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            <label className="text-sm font-semibold text-[var(--color-text-primary)]">
              Admin notes
            </label>
            <Textarea
              className="min-h-28"
              placeholder="Add internal notes for follow-up, preparation, or status context."
              value={item.note}
              onChange={(event) => updateNote(item.id, event.target.value)}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
