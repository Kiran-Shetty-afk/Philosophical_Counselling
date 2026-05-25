"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, MailCheck } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validation";

type ContactApiSuccess = {
  enquiryReference: string;
  message: string;
};

type ContactApiError = {
  error?: string;
};

export function ContactForm() {
  const [submission, setSubmission] = useState<ContactApiSuccess | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmission(null);
    setSubmissionError(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = (await response.json()) as
      | ContactApiSuccess
      | ContactApiError;

    if (!response.ok) {
      setSubmissionError(
        "error" in data
          ? (data.error ?? "Unable to send your enquiry.")
          : "Unable to send your enquiry.",
      );
      return;
    }

    if (!("enquiryReference" in data)) {
      setSubmissionError("Unable to send your enquiry.");
      return;
    }

    setSubmission(data);
    form.reset();
  };

  return (
    <div className="rounded-[2rem] border border-[var(--color-border)] bg-white/88 p-8 shadow-[0_24px_64px_rgba(44,62,80,0.08)]">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
          Send a thoughtful enquiry
        </h2>
        <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)]">
          Share a little about what brings you here and we will reply with care,
          clarity, and the next best step.
        </p>
      </div>

      <form
        className="mt-8 grid gap-5"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            error={form.formState.errors.name?.message}
            label="Your name"
          >
            <Input
              autoComplete="name"
              placeholder="Asha Sharma"
              {...form.register("name")}
            />
          </Field>
          <Field
            error={form.formState.errors.email?.message}
            label="Email address"
          >
            <Input
              autoComplete="email"
              placeholder="asha@example.com"
              type="email"
              {...form.register("email")}
            />
          </Field>
        </div>

        <Field
          error={form.formState.errors.subject?.message}
          label="Subject"
        >
          <Input
            placeholder="I would like to explore personal counselling"
            {...form.register("subject")}
          />
        </Field>

        <Field
          error={form.formState.errors.message?.message}
          label="Message"
        >
          <Textarea
            placeholder="Tell us a little about what you are navigating and what kind of support you are looking for."
            {...form.register("message")}
          />
        </Field>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-7 text-[var(--color-text-secondary)]">
            Your message is treated with discretion and used only to respond to
            your enquiry.
          </p>
          <Button
            className="min-w-44"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Sending
              </>
            ) : (
              "Send enquiry"
            )}
          </Button>
        </div>

        {submission ? (
          <div className="flex items-start gap-3 rounded-[1.5rem] border border-[rgba(217,119,6,0.22)] bg-[rgba(255,152,0,0.08)] px-5 py-4 text-sm text-[var(--color-text-primary)]">
            <MailCheck className="mt-0.5 h-5 w-5 text-[var(--color-success)]" />
            <div>
              <p className="font-semibold">{submission.message}</p>
              <p className="mt-1 text-[var(--color-text-secondary)]">
                Reference: {submission.enquiryReference}
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
      {error ? (
        <span className="text-sm text-[#cf5b4c]">{error}</span>
      ) : null}
    </label>
  );
}
