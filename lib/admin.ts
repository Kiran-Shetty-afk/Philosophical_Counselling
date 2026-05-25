import { CalendarCheck2, Mail, FileText, Star } from "lucide-react";

import { getAllBlogPosts } from "@/lib/blog";
import { testimonials } from "@/config/site";

export const adminStats = [
  {
    label: "Appointment Requests",
    value: "18",
    detail: "4 pending review",
    icon: CalendarCheck2,
    href: "/admin/appointments",
    trend: "up" as const,
  },
  {
    label: "Open Enquiries",
    value: "12",
    detail: "3 unread",
    icon: Mail,
    href: "/admin/enquiries",
    trend: "up" as const,
  },
  {
    label: "Published Posts",
    value: String(getAllBlogPosts().length),
    detail: "1 featured article live",
    icon: FileText,
    href: "/admin/blog",
    trend: "neutral" as const,
  },
  {
    label: "Testimonials",
    value: String(testimonials.length),
    detail: "2 awaiting moderation",
    icon: Star,
    href: "/admin/testimonials",
    trend: "neutral" as const,
  },
] as const;

export const adminAppointments = [
  {
    id: "BPC-483920",
    client: "Asha Sharma",
    service: "Personal Counselling",
    date: "May 27, 2026",
    status: "Pending",
  },
  {
    id: "BPC-483921",
    client: "Daniel Matthews",
    service: "Family Counselling",
    date: "May 29, 2026",
    status: "Confirmed",
  },
  {
    id: "BPC-483922",
    client: "Priya S.",
    service: "Meaning and Direction",
    date: "May 30, 2026",
    status: "Pending",
  },
] as const;

export const adminEnquiries = [
  {
    name: "Nikhil Rao",
    subject: "Finding support during burnout",
    received: "2 hours ago",
    status: "Unread",
  },
  {
    name: "Maya Thomas",
    subject: "Family session availability",
    received: "Yesterday",
    status: "Replied",
  },
  {
    name: "R. Fernandes",
    subject: "Question about philosophical counselling",
    received: "2 days ago",
    status: "In review",
  },
] as const;

export const adminTestimonials = testimonials.map((item, index) => ({
  ...item,
  status: index === 0 ? "Published" : "Pending",
}));

export const adminNavItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Appointments", href: "/admin/appointments" },
  { label: "Enquiries", href: "/admin/enquiries" },
  { label: "Blog", href: "/admin/blog" },
  { label: "Testimonials", href: "/admin/testimonials" },
] as const;
