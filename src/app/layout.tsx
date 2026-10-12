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
  metadataBase: new URL("https://sirfshoot-ai.vercel.app"),
  title: {
    default: "SirfShoot AI — Just Shoot It, We Handle The Rest",
    template: "%s | SirfShoot AI",
  },
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
    "Pakistani creator AI",
    "Hinglish AI scriptwriter",
  ],
  authors: [{ name: "SirfShoot AI Team" }],
  alternates: {
    canonical: "https://sirfshoot-ai.vercel.app",
  },
  openGraph: {
    title: "SirfShoot AI — Turn Video Ideas Into Scripts That Sound Like You",
    description: "9 AI agents handle research, scripts, fact-check, storyboards, thumbnails, SEO, and shorts. From PKR 499/mo.",
    url: "https://sirfshoot-ai.vercel.app",
    siteName: "SirfShoot AI",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SirfShoot AI — Just Shoot It, We Handle The Rest",
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
      "@id": "https://sirfshoot-ai.vercel.app/#organization",
      "name": "SirfShoot AI",
      "url": "https://sirfshoot-ai.vercel.app",
      "logo": "https://sirfshoot-ai.vercel.app/favicon.ico",
      "description": "AI Content Operating System for video creators and real estate professionals.",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@sirfshoot.ai",
        "contactType": "customer support",
        "availableLanguage": ["English", "Urdu"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://sirfshoot-ai.vercel.app/#website",
      "url": "https://sirfshoot-ai.vercel.app",
      "name": "SirfShoot AI",
      "description": "Turn your ideas into scripts that sound like you. 9 AI agents in one unified workflow.",
      "publisher": {
        "@id": "https://sirfshoot-ai.vercel.app/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://sirfshoot-ai.vercel.app/#application",
      "name": "SirfShoot AI Content OS",
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
