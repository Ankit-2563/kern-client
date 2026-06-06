import type { Metadata, Viewport } from "next";
import { SEO_CONFIG } from "@/lib/seo.config";
import {
  WebSiteJsonLd,
  OrganizationJsonLd,
  SiteNavigationElementJsonLd,
} from "@/components/seo/json-ld";
import "./globals.css";
import { Toaster } from "sonner";

// ── Font Loading (preloaded automatically by next/font) ──────────────────────

import localFont from "next/font/local";

const layGrotesk = localFont({
  src: [
    {
      path: "../../public/font/laygrotesk-trial-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/laygrotesk-trial-semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/laygrotesk-trial-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-laygrotesk",
  display: "swap",
});

// ── Viewport Configuration ───────────────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: SEO_CONFIG.themeColor,
};

// ── Root Metadata ────────────────────────────────────────────────────────────
// This is the enterprise-grade metadata export that powers all SEO.
// Every page inherits these defaults and can override via its own metadata export.

export const metadata: Metadata = {
  // ── Base URL (required for resolving relative OG image paths) ────────
  metadataBase: new URL(SEO_CONFIG.domain),

  // ── Title Strategy ───────────────────────────────────────────────────
  // template: child pages export { title: "Privacy Policy" }
  //           → renders as "Privacy Policy | QuellDesk"
  // default: used when no child page overrides the title
  title: {
    default: `${SEO_CONFIG.siteName} | Free AI-Powered LaTeX Resume Builder`,
    template: `%s | ${SEO_CONFIG.siteName}`,
  },

  // ── Description ──────────────────────────────────────────────────────
  description: SEO_CONFIG.description,

  // ── Application Identity ─────────────────────────────────────────────
  applicationName: SEO_CONFIG.siteName,
  authors: [{ name: SEO_CONFIG.siteName, url: SEO_CONFIG.domain }],
  creator: SEO_CONFIG.siteName,
  publisher: SEO_CONFIG.siteName,
  generator: "Next.js",

  // ── Keywords ─────────────────────────────────────────────────────────
  keywords: [...SEO_CONFIG.keywords],

  // ── Robots ───────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph (Facebook, LinkedIn, Discord, Slack, iMessage) ────────
  openGraph: {
    type: "website",
    locale: SEO_CONFIG.locale,
    url: SEO_CONFIG.domain,
    siteName: SEO_CONFIG.siteName,
    title: `${SEO_CONFIG.siteName} — ${SEO_CONFIG.tagline}`,
    description: SEO_CONFIG.description,
    images: [
      {
        url: SEO_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SEO_CONFIG.siteName} — ${SEO_CONFIG.tagline}`,
        type: "image/png",
      },
    ],
  },

  // ── Twitter Card ─────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: `${SEO_CONFIG.siteName} — ${SEO_CONFIG.tagline}`,
    description: SEO_CONFIG.description,
    images: [SEO_CONFIG.ogImage],
    creator: SEO_CONFIG.twitterHandle,
    site: SEO_CONFIG.twitterHandle,
  },

  // ── Canonical & Alternate URLs ───────────────────────────────────────
  alternates: {
    canonical: SEO_CONFIG.domain,
  },

  // ── Icons ────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: SEO_CONFIG.favicon, type: "image/svg+xml" },
    ],
    apple: [
      { url: SEO_CONFIG.appleTouchIcon, sizes: "180x180", type: "image/png" },
    ],
  },

  // ── Verification ─────────────────────────────────────────────────────
  // TODO: Add Google Search Console verification code
  ...(SEO_CONFIG.googleVerification
    ? { verification: { google: SEO_CONFIG.googleVerification } }
    : {}),

  // ── Category ─────────────────────────────────────────────────────────
  category: "technology",
};

// ── Root Layout Component ────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SEO_CONFIG.language}
      className={`${layGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* ── DNS Prefetch & Preconnect for API microservices ─────────── */}
        {process.env.NEXT_PUBLIC_API_URL && (
          <>
            <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL} />
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL} crossOrigin="anonymous" />
          </>
        )}

        {/* ── Structured Data (JSON-LD) — renders on every page ──────── */}
        <WebSiteJsonLd />
        <OrganizationJsonLd />
        <SiteNavigationElementJsonLd />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
