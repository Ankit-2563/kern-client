// ============================================================================
// QUELLDESK — SEO CONFIGURATION
// Single source of truth for all SEO-related constants.
// Update these values and every meta tag, OG card, JSON-LD, sitemap,
// robots.txt, and llms.txt will automatically reflect the changes.
// ============================================================================

export const SEO_CONFIG = {
  // ── Core Identity ──────────────────────────────────────────────────────
  siteName: "QuellDesk",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://quelldesk.online",
  tagline: "AI-Powered LaTeX Resume Builder",
  description:
    "QuellDesk (Quell Desk) is a free AI-powered LaTeX resume builder. Paste a job description to get optimized LaTeX resumes. The ultimate Overleaf alternative.",
  locale: "en_US",
  language: "en",

  // ── Brand Name Variations (for structured data alternateName) ──────────
  alternateNames: [
    "Quell Desk",
    "quelldesk",
    "quelldesk.online",
    "Quelldesk",
  ],

  // ── Brand Assets (paths relative to /public) ───────────────────────────
  ogImage: "/og/og-img.png",
  logo: "/brand/logo.svg",
  logoPng512: "/brand/logo-512.png",
  logoPng192: "/brand/logo-192.png",
  appleTouchIcon: "/brand/logo-180.png",
  favicon: "/brand/icon.svg",

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
  // Brand-name variations (so Google matches "quell desk" → QuellDesk)
  // + generic high-intent keywords users actually search for
  keywords: [
    // Brand variations
    "quelldesk",
    "quell desk",
    "quelldesk.online",
    // Primary keywords
    "LaTeX resume builder",
    "AI resume builder",
    "AI LaTeX resume builder",
    "free resume builder",
    "LaTeX resume template",
    "resume from job description",
    "AI LaTeX writer",
    "ATS resume builder",
    "ATS friendly resume",
    "LaTeX CV builder",
    // Competitor alternatives
    "overleaf resume alternative",
    "overleaf alternative for resumes",
    "better than overleaf for resumes",
    // Long-tail keywords
    "AI resume generator",
    "professional resume maker",
    "LaTeX resume online",
    "online LaTeX resume editor",
    "job description to resume",
    "automated resume builder",
    "resume compiler online",
    "create LaTeX resume without knowing LaTeX",
    "paste job description get resume",
    "AI powered resume writer",
    "free LaTeX resume maker",
    "best resume builder 2025",
    "resume builder for software engineers",
    "AI CV generator",
  ],
} as const;

/**
 * Per-page SEO metadata.
 * Each page can import its metadata from here for consistency.
 */
export const PAGE_SEO = {
  home: {
    title: SEO_CONFIG.siteName,
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
  register: {
    title: "Join the Waitlist | Early Access",
    description: `Get early access to ${SEO_CONFIG.siteName}, the free AI-powered LaTeX resume builder. Sign up now to design outstanding professional resumes.`,
  },
} as const;
