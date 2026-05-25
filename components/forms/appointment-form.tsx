"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck2, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { appointmentServices } from "@/config/site";
import {
  appointmentFormSchema,
  type AppointmentFormInputValues,
  type AppointmentFormValues,
} from "@/lib/validation";

type AppointmentApiSuccess = {
  bookingReference: string;
  message: string;
};

type AppointmentApiError = {
  error?: string;
};

export function AppointmentForm() {
  const [submission, setSubmission] = useState<AppointmentApiSuccess | null>(
    null,
  );
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const form = useForm<AppointmentFormInputValues, undefined, AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "personal",
      time: "",
      duration: "60",
      notes: "",
    },
  });

  const onSubmit = async (values: AppointmentFormValues) => {
    setSubmission(null);
    setSubmissionError(null);

    const payload = {
      ...values,
      date: values.date.toISOString(),
    };

    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as
      | AppointmentApiSuccess
      | AppointmentApiError;

    if (!response.ok) {
      setSubmissionError(
        "error" in data ? data.error ?? "Unable to book the appointment." : "Unable to book the appointment.",
      );
      return;
    }

    if (!("bookingReference" in data) || !("message" in data)) {
      setSubmissionError("Unable to book the appointment.");
      return;
    }

    setSubmission(data);
    form.reset({
      name: "",
      email: "",
      service: "personal",
      time: "",
      duration: "60",
      notes: "",
    });
  };

  return (
    <div className="rounded-[2rem] border border-[var(--color-border)] bg-white/88 p-8 shadow-[0_24px_64px_rgba(44,62,80,0.08)]">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
          Reserve a session request
        </h2>
        <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)]">
          Choose the kind of session you need, select a preferred date and time,
          and share a little context. We will follow up to confirm your booking.
        </p>
      </div>

      <form
        className="mt-8 grid gap-5"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field error={form.formState.errors.name?.message} label="Your name">
            <Input
              autoComplete="name"
              placeholder="Daniel Matthews"
              {...form.register("name")}
            />
          </Field>
          <Field
            error={form.formState.errors.email?.message}
            label="Email address"
          >
            <Input
              autoComplete="email"
              placeholder="daniel@example.com"
              type="email"
              {...form.register("email")}
            />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Field
            error={form.formState.errors.service?.message}
            label="Session type"
          >
            <Select {...form.register("service")}>
              {appointmentServices.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field error={form.formState.errors.date?.message} label="Date">
            <Input type="date" {...form.register("date")} />
          </Field>
          <Field error={form.formState.errors.time?.message} label="Time">
            <Select defaultValue="" {...form.register("time")}>
              <option disabled value="">
                Select a slot
              </option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="05:30 PM">05:30 PM</option>
            </Select>
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-[0.4fr_1fr]">
          <Field
            error={form.formState.errors.duration?.message}
            label="Duration"
          >
            <Select {...form.register("duration")}>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
            </Select>
          </Field>
          <Field error={form.formState.errors.notes?.message} label="Notes">
            <Textarea
              placeholder="Tell us what you would like to work through, and any preferences for the first session."
              {...form.register("notes")}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
            Appointment requests are reviewed manually in this MVP phase. You
            will receive a confirmation follow-up after review.
          </p>
          <Button
            className="min-w-48"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Sending request
              </>
            ) : (
              "Request appointment"
            )}
          </Button>
        </div>

        {submission ? (
          <div className="flex items-start gap-3 rounded-[1.5rem] border border-[rgba(217,119,6,0.22)] bg-[rgba(255,152,0,0.08)] px-5 py-4 text-sm text-[var(--color-text-primary)]">
            <CalendarCheck2 className="mt-0.5 h-5 w-5 text-[var(--color-success)]" />
            <div>
              <p className="font-semibold">{submission.message}</p>
              <p className="mt-1 text-[var(--color-text-secondary)]">
                Reference: {submission.bookingReference}
              </p>
            </div>
          </div>
        ) : null}

        {submissionError ? (
          <div className="rounded-[1.5rem] border border-[rgba(207,91,76,0.2)] bg-[rgba(207,91,76,0.08)] px-5 py-4 text-sm text-[#b14638]">
            {submissionError}
          </div>
        ) : null}
      </form>
    </div>
  );
}

type FieldProps = {
  children: React.ReactNode;
  error?: string;
  label: string;
};

function Field({ children, error, label }: FieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[var(--color-text-primary)]">
        {label}
      </span>
      {children}
      {error ? <span className="text-sm text-[#cf5b4c]">{error}</span> : null}
    </label>
  );
}
