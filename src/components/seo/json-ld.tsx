// ============================================================================
// QUELLDESK — JSON-LD STRUCTURED DATA COMPONENTS
// Renders <script type="application/ld+json"> for Google rich results.
// Schema.org types: WebSite, Organization, SoftwareApplication, BreadcrumbList
// ============================================================================

import { SEO_CONFIG } from "@/lib/seo.config";

// ── Types ────────────────────────────────────────────────────────────────────

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

// ── Base Component ───────────────────────────────────────────────────────────

/**
 * Renders a JSON-LD script tag in the document head.
 * Uses React Server Components — no client JS shipped.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...data,
        }),
      }}
    />
  );
}

// ── WebSite Schema ───────────────────────────────────────────────────────────

/**
 * WebSite schema — enables Google Sitelinks Searchbox.
 * Should be placed in root layout (renders on every page).
 */
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@type": "WebSite",
        name: SEO_CONFIG.siteName,
        alternateName: [
          SEO_CONFIG.tagline,
          ...SEO_CONFIG.alternateNames,
        ],
        url: SEO_CONFIG.domain,
        description: SEO_CONFIG.description,
        inLanguage: SEO_CONFIG.language,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SEO_CONFIG.domain}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

// ── Organization Schema ──────────────────────────────────────────────────────

/**
 * Organization schema — powers brand Knowledge Panel in Google.
 * Includes logo, social profiles (sameAs), and contact info.
 */
export function OrganizationJsonLd() {
  const sameAs = Object.values(SEO_CONFIG.social).filter(Boolean);

  return (
    <JsonLd
      data={{
        "@type": "Organization",
        name: SEO_CONFIG.siteName,
        alternateName: [...SEO_CONFIG.alternateNames],
        url: SEO_CONFIG.domain,
        logo: {
          "@type": "ImageObject",
          url: `${SEO_CONFIG.domain}${SEO_CONFIG.logoPng512}`,
          width: 512,
          height: 512,
        },
        image: `${SEO_CONFIG.domain}${SEO_CONFIG.logoPng512}`,
        description: SEO_CONFIG.description,
        sameAs,
      }}
    />
  );
}

// ── SoftwareApplication Schema ───────────────────────────────────────────────

/**
 * SoftwareApplication schema — app listing in search results.
 * Shows Quelldesk as a free web-based tool with a rich snippet.
 */
export function SoftwareApplicationJsonLd() {
  return (
    <JsonLd
      data={{
        "@type": "SoftwareApplication",
        name: SEO_CONFIG.siteName,
        alternateName: [...SEO_CONFIG.alternateNames],
        description: SEO_CONFIG.description,
        url: SEO_CONFIG.domain,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Resume Builder",
        operatingSystem: "Web",
        browserRequirements: "Requires a modern web browser",
        keywords: SEO_CONFIG.keywords.join(", "),
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        featureList: [
          "AI-powered LaTeX resume generation from job descriptions",
          "Real-time LaTeX editor with live preview",
          "Upload existing LaTeX .zip files",
          "Cloud-based LaTeX compilation to PDF",
          "ATS-friendly resume output",
          "No LaTeX knowledge required",
        ],
        screenshot: `${SEO_CONFIG.domain}${SEO_CONFIG.ogImage}`,
      }}
    />
  );
}

// ── BreadcrumbList Schema ────────────────────────────────────────────────────

/**
 * BreadcrumbList schema — breadcrumb trail in search results.
 * @param items - Array of { name, url } breadcrumb items
 */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url.startsWith("http")
            ? item.url
            : `${SEO_CONFIG.domain}${item.url}`,
        })),
      }}
    />
  );
}

// ── SiteNavigationElement Schema ─────────────────────────────────────────────

interface NavigationItem {
  name: string;
  url: string;
}

/**
 * SiteNavigationElement schema — tells Google about key navigation paths on the site.
 * Helps in generating sitelinks.
 */
export function SiteNavigationElementJsonLd() {
  const navItems: NavigationItem[] = [
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy" },
    { name: "Terms of Service", url: "/terms" },
  ];

  return (
    <JsonLd
      data={{
        "@graph": navItems.map((item, index) => ({
          "@type": "SiteNavigationElement",
          "@id": `${SEO_CONFIG.domain}/#nav-${index}`,
          name: item.name,
          url: item.url.startsWith("http") ? item.url : `${SEO_CONFIG.domain}${item.url}`,
        })),
      }}
    />
  );
}

// ── FAQPage Schema ───────────────────────────────────────────────────────────

interface FAQItem {
  question: string;
  answer: string;
}

/**
 * FAQPage schema — enables FAQ rich snippets in Google search results.
 * Shows expandable Q&A directly in the SERP, increasing click-through rate.
 * @param items - Array of { question, answer } FAQ entries
 */
export function FAQPageJsonLd({ items }: { items: FAQItem[] }) {
  return (
    <JsonLd
      data={{
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}
