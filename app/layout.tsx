/**
 * Root Layout — Dounia's Birthday & Ramadan Gift
 * ================================================
 * Loads Google Fonts (Inter for body text, Amiri for Arabic calligraphy),
 * sets up metadata, and wraps the app in the base HTML structure.
 */

import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";

/* ─── Font Configuration ─── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

/* ─── Metadata for SEO ─── */
export const metadata: Metadata = {
  title: "عيد ميلاد سعيد يا دنيا 🤍 ورمضان مبارك",
  description:
    "A romantic birthday and Ramadan surprise for Dounia Mecili — with all my love, forever.",
  keywords: ["Dounia Mecili", "Birthday", "Ramadan", "Love", "Gift"],
  authors: [{ name: "Your Loving Husband" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="ltr" className={`${inter.variable} ${amiri.variable}`}>
      <body
        className={`${inter.className} bg-[rgb(10,10,46)] text-[#faf3e0] antialiased custom-scrollbar`}
      >
        {children}
      </body>
    </html>
  );
}
