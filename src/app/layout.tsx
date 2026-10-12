import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SirfShoot AI — Just Shoot It, We Handle The Rest",
  description:
    "The AI Content OS for video creators and real estate teams. 9-agent pipeline transforms 1 topic into research, scripts in your tone, storyboards, thumbnails, SEO, and shorts in ~3 minutes.",
  keywords: [
    "YouTube script generator",
    "AI YouTube scripts",
    "Tone Fingerprint",
    "YouTube thumbnail generator",
    "AI video studio",
    "SirfShoot",
    "AI Content OS",
  ],
  authors: [{ name: "SirfShoot AI Team" }],
  openGraph: {
    title: "SirfShoot AI — Turn Video Ideas Into Scripts That Sound Like You",
    description: "9 AI agents handle research, scripts, fact-check, storyboards, thumbnails, SEO, and shorts. From PKR 499/mo.",
    siteName: "SirfShoot AI",
    locale: "en_PK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#0F172A] antialiased">
        {children}
      </body>
    </html>
  );
}
