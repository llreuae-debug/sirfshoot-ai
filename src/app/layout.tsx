import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientAssistant from "@/components/ClientAssistant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const CANONICAL_DOMAIN = "https://sirfshoot-ai.vercel.app";
const APP_TITLE = "SirfShoot AI — Just Shoot It, We Handle The Rest";
const APP_DESCRIPTION =
  "The AI Content OS for video creators and real estate teams. 9 autonomous AI tools turn 1 topic into research, tone-matched scripts, storyboards, thumbnails, SEO, and shorts in ~3 minutes.";

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_DOMAIN),
  title: {
    default: APP_TITLE,
    template: "%s | SirfShoot AI",
  },
  description: APP_DESCRIPTION,
  keywords: [
    "YouTube script generator",
    "AI YouTube scripts",
    "Tone Fingerprint",
    "YouTube thumbnail generator",
    "AI video studio",
    "SirfShoot AI",
    "Tameeros Shorts",
    "AI Content OS",
    "Pakistani creator AI",
    "Roman Urdu AI scriptwriter",
  ],
  authors: [{ name: "SirfShoot AI Team" }],
  alternates: {
    canonical: CANONICAL_DOMAIN,
  },
  openGraph: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    url: CANONICAL_DOMAIN,
    siteName: "SirfShoot AI",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_TITLE,
    description: APP_DESCRIPTION,
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
      "@id": `${CANONICAL_DOMAIN}/#organization`,
      "name": "SirfShoot AI",
      "url": CANONICAL_DOMAIN,
      "logo": `${CANONICAL_DOMAIN}/favicon.ico`,
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
      "@id": `${CANONICAL_DOMAIN}/#website`,
      "url": CANONICAL_DOMAIN,
      "name": "SirfShoot AI",
      "description": APP_DESCRIPTION,
      "publisher": {
        "@id": `${CANONICAL_DOMAIN}/#organization`,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${CANONICAL_DOMAIN}/#application`,
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
