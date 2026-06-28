import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Andra & Kalya — Undangan Pernikahan",
  description:
    "Dengan penuh rasa syukur, kami mengundang Anda untuk hadir merayakan hari pernikahan kami.",
  openGraph: {
    title: "Andra & Kalya — Undangan Pernikahan",
    description: "Sabtu, 14 Februari 2027 — Bersama merayakan cinta kami.",
    images: ["/images/og-cover.jpg"],
    type: "website",
  },
  robots: { index: false, follow: false }, // private invitation by default
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
