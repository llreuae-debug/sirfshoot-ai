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
  metadataBase: new URL("https://tameeros-shorts.vercel.app"),
  title: {
    default: "Tameeros Shorts — Just Shoot It, We Handle The Rest",
    template: "%s | Tameeros Shorts",
  },
  description:
    "The AI Content OS for video creators and real estate teams. 9-agent pipeline transforms 1 topic into research, scripts in your tone, storyboards, thumbnails, SEO, and shorts in ~3 minutes.",
  keywords: [
    "YouTube script generator",
    "AI YouTube scripts",
    "Tone Fingerprint",
    "YouTube thumbnail generator",
    "AI video studio",
    "Tameeros Shorts",
    "AI Content OS",
    "Pakistani creator AI",
    "Hinglish AI scriptwriter",
  ],
  authors: [{ name: "Tameeros Shorts Team" }],
  alternates: {
    canonical: "https://tameeros-shorts.vercel.app",
  },
  openGraph: {
    title: "Tameeros Shorts — Turn Video Ideas Into Scripts That Sound Like You",
    description: "9 AI agents handle research, scripts, fact-check, storyboards, thumbnails, SEO, and shorts. From PKR 499/mo.",
    url: "https://tameeros-shorts.vercel.app",
    siteName: "Tameeros Shorts",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tameeros Shorts — Just Shoot It, We Handle The Rest",
    description: "The AI Content OS for video creators. Research, scripts, thumbnails, and SEO in ~3 minutes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tameeros-shorts.vercel.app/#organization",
      "name": "Tameeros Shorts",
      "url": "https://tameeros-shorts.vercel.app",
      "logo": "https://tameeros-shorts.vercel.app/favicon.ico",
      "description": "AI Content Operating System for video creators and real estate professionals.",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@tameeros.com",
        "contactType": "customer support",
        "availableLanguage": ["English", "Urdu"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://tameeros-shorts.vercel.app/#website",
      "url": "https://tameeros-shorts.vercel.app",
      "name": "Tameeros Shorts",
      "description": "Turn your ideas into scripts that sound like you. 9 AI agents in one unified workflow.",
      "publisher": {
        "@id": "https://tameeros-shorts.vercel.app/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://tameeros-shorts.vercel.app/#application",
      "name": "Tameeros Shorts Content OS",
      "operatingSystem": "Web Browser",
      "applicationCategory": "MultimediaApplication",
      "offers": [
        {
          "@type": "Offer",
          "name": "Starter Plan",
          "price": "499",
          "priceCurrency": "PKR",
          "billingDuration": "P1M",
        },
        {
          "@type": "Offer",
          "name": "Creator Plan",
          "price": "999",
          "priceCurrency": "PKR",
          "billingDuration": "P1M",
        },
        {
          "@type": "Offer",
          "name": "Pro Plan",
          "price": "1999",
          "priceCurrency": "PKR",
          "billingDuration": "P1M",
        },
      ],
    },
  ],
};

import ClientAssistant from "@/components/ClientAssistant";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#0F172A] antialiased">
        {children}
        <ClientAssistant />
      </body>
    </html>
  );
}
