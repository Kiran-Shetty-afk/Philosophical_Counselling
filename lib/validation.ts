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
