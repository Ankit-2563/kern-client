// ============================================================================
// QUELLDESK — SEO CONFIGURATION
// Single source of truth for all SEO-related constants.
// Update these values and every meta tag, OG card, JSON-LD, sitemap,
// robots.txt, and llms.txt will automatically reflect the changes.
// ============================================================================

export const SEO_CONFIG = {
  // ── Core Identity ──────────────────────────────────────────────────────
  siteName: "Quelldesk",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://quelldesk.online",
  tagline: "AI-Powered LaTeX Resume Builder",
  description:
    "Build stunning LaTeX resumes in minutes. Paste a job description, let AI write the LaTeX, compile and download — no LaTeX knowledge needed.",
  locale: "en_US",
  language: "en",

  // ── Brand Assets (paths relative to /public) ───────────────────────────
  ogImage: "/og/og-default.png",
  logo: "/brand/logo.svg",
  logoPng512: "/brand/logo-512.png",
  logoPng192: "/brand/logo-192.png",
  appleTouchIcon: "/brand/logo-180.png",
  favicon32: "/brand/favicon-32.png",
  favicon16: "/brand/favicon-16.png",

  // ── Brand Colors ───────────────────────────────────────────────────────
  // TODO: Replace with your actual brand colors
  themeColor: "#0A0A0A",
  backgroundColor: "#000000",

  // ── Social Links ───────────────────────────────────────────────────────
  social: {
    instagram: "https://instagram.com/kairos.artifex",
    twitter: "https://x.com/kairosartifex",
    pinterest: "https://pinterest.com/kairosartifex",
    website: "https://www.kairosagency.xyz",
  },

  // ── Twitter/X Card ─────────────────────────────────────────────────────
  // TODO: Update when Quelldesk has its own Twitter/X handle
  twitterHandle: "@kairosartifex",

  // ── Google Search Console ──────────────────────────────────────────────
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,

  // ── SEO Keywords ───────────────────────────────────────────────────────
  keywords: [
    "LaTeX resume builder",
    "AI resume builder",
    "LaTeX resume template",
    "resume from job description",
    "AI LaTeX writer",
    "ATS resume builder",
    "LaTeX CV builder",
    "professional resume maker",
    "overleaf resume alternative",
    "AI resume generator",
    "LaTeX resume online",
    "job description to resume",
    "automated resume builder",
    "LaTeX resume editor",
    "resume compiler online",
  ],
} as const;

/**
 * Per-page SEO metadata.
 * Each page can import its metadata from here for consistency.
 */
export const PAGE_SEO = {
  home: {
    title: `${SEO_CONFIG.siteName} — ${SEO_CONFIG.tagline}`,
    description: SEO_CONFIG.description,
  },
  privacy: {
    title: "Privacy Policy",
    description: `Learn how ${SEO_CONFIG.siteName} collects, uses, and protects your personal information. We respect your privacy and are committed to safeguarding your data.`,
  },
  terms: {
    title: "Terms of Service",
    description: `Read the terms and conditions for using ${SEO_CONFIG.siteName}. By using our AI-powered LaTeX resume builder, you agree to these terms.`,
  },
} as const;
