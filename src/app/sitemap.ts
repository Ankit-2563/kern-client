import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES } from "@/lib/routes";
import { SEO_CONFIG } from "@/lib/seo.config";

/**
 * Generates sitemap.xml for search engine crawlers.
 * Only includes public, indexable routes.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return PUBLIC_ROUTES.map((route) => {
    const isHome = route === "/";

    return {
      url: `${SEO_CONFIG.domain}${route}`,
      lastModified: currentDate,
      changeFrequency: isHome ? "weekly" : "yearly",
      priority: isHome ? 1.0 : 0.3,
    };
  });
}
