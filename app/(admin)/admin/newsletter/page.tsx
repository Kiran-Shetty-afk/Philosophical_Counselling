import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/admin-shell";
import { NewsletterPanel } from "@/components/admin/newsletter-panel";

export const metadata: Metadata = {
  title: "Newsletter — Admin",
  robots: { index: false, follow: false },
};

export default function AdminNewsletterPage() {
  return (
    <AdminShell
      title="Newsletter"
      description="View and manage newsletter subscribers. Track growth and engagement from here."
    >
      <NewsletterPanel />
    </AdminShell>
  );
}
