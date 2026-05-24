import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  subject: z.string().min(3, "Please add a short subject."),
  message: z
    .string()
    .min(20, "Please share a little more so we can respond thoughtfully."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

const today = new Date();
today.setHours(0, 0, 0, 0);

export const appointmentFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  service: z.enum(["personal", "family", "meaning"], {
    error: "Please choose a session type.",
  }),
  date: z.coerce.date().refine((value) => value >= today, {
    message: "Please choose a future date.",
  }),
  time: z.string().min(1, "Please choose a time."),
  duration: z.enum(["60", "90"], {
    error: "Please choose a session duration.",
  }),
  notes: z
    .string()
    .min(12, "Please add a short note about what support you need.")
    .max(1000, "Please keep your note under 1000 characters."),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;
export type AppointmentFormInputValues = z.input<typeof appointmentFormSchema>;
