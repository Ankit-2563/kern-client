import type { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/seo.config";

/**
 * Web App Manifest — makes Quelldesk installable as a PWA.
 * Provides app identity, icons, and theme configuration.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SEO_CONFIG.siteName} — ${SEO_CONFIG.tagline}`,
    short_name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.description,
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: SEO_CONFIG.backgroundColor,
    theme_color: SEO_CONFIG.themeColor,
    categories: ["productivity", "utilities", "business"],
    icons: [
      {
        src: SEO_CONFIG.favicon,
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: SEO_CONFIG.logo,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: SEO_CONFIG.logoPng192,
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: SEO_CONFIG.logoPng512,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
