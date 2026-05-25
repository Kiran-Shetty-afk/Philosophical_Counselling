import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin — Benna Philosophical Counselling",
  robots: { index: false, follow: false },
};

export default function AdminRouteGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/*
        Override the public site body background so admin pages use their own
        flat gradient instead of the warm cream radial gradient from globals.css.
      */}
      <body
        className="min-h-full"
        style={{ background: "linear-gradient(180deg, #f7f4ec 0%, #f5efe4 100%)" }}
      >
        {children}
      </body>
    </html>
  );
}
