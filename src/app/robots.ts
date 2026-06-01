import type { MetadataRoute } from "next";
import { PRIVATE_ROUTE_PATTERNS } from "@/lib/routes";
import { SEO_CONFIG } from "@/lib/seo.config";

/**
 * Generates robots.txt with enterprise-grade crawler rules.
 *
 * Key strategy:
 * - Block auth/app pages from all crawlers
 * - EXPLICITLY ALLOW all AI model crawlers (GPTBot, ClaudeBot, etc.)
 *   Most sites block these — allowing them gives Kern a GEO advantage.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Default: allow everything, block private routes ──────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: [...PRIVATE_ROUTE_PATTERNS],
      },

      // ── AI Crawlers: explicitly welcome them ─────────────────────────
      // ChatGPT / OpenAI
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: [...PRIVATE_ROUTE_PATTERNS],
      },
      // OpenAI browsing
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: [...PRIVATE_ROUTE_PATTERNS],
      },
      // Claude / Anthropic
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: [...PRIVATE_ROUTE_PATTERNS],
      },
      // Gemini / Google AI
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: [...PRIVATE_ROUTE_PATTERNS],
      },
      // Common Crawl (used by most LLM training)
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: [...PRIVATE_ROUTE_PATTERNS],
      },
      // Perplexity
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: [...PRIVATE_ROUTE_PATTERNS],
      },
      // Apple Intelligence
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: [...PRIVATE_ROUTE_PATTERNS],
      },
      // ByteDance / TikTok AI
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: [...PRIVATE_ROUTE_PATTERNS],
      },
    ],
    sitemap: `${SEO_CONFIG.domain}/sitemap.xml`,
  };
}
