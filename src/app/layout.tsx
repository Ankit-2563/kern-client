import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SEO_CONFIG } from "@/lib/seo.config";
import {
  WebSiteJsonLd,
  OrganizationJsonLd,
} from "@/components/seo/json-ld";
import "./globals.css";

// ── Font Loading (preloaded automatically by next/font) ──────────────────────

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    default: SEO_CONFIG.siteName,
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
    title: SEO_CONFIG.siteName,
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
    title: SEO_CONFIG.siteName,
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
      { url: SEO_CONFIG.favicon16, sizes: "16x16", type: "image/png" },
      { url: SEO_CONFIG.favicon32, sizes: "32x32", type: "image/png" },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* ── DNS Prefetch & Preconnect for API microservices ─────────── */}
        {/* TODO: Add your API domain(s) when backend services are deployed */}
        {/* <link rel="dns-prefetch" href="https://api.quelldesk.online" /> */}
        {/* <link rel="preconnect" href="https://api.quelldesk.online" crossOrigin="anonymous" /> */}

        {/* ── Structured Data (JSON-LD) — renders on every page ──────── */}
        <WebSiteJsonLd />
        <OrganizationJsonLd />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
