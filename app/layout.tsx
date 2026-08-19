import type { Metadata } from "next";
import { Pinyon_Script, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const pinyon = Pinyon_Script({
  subsets: ['latin-ext'],
  weight: '400',
  variable: '--font-pinyon',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin-ext'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: "Mania & Kacper | 24.10.2026",
  description: "Zaproszenie ślubne Mani i Kacpra — 24 października 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html
  lang="pl"
  className={`${pinyon.variable} ${cormorant.variable}`}
>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
