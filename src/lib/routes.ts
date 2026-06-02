// ============================================================================
// QUELLDESK — ROUTE CONSTANTS
// Single source of truth for all application routes.
// Used by: sitemap.ts, robots.ts, layout.tsx, navigation, breadcrumbs
// ============================================================================

export const ROUTES = {
  // Public pages (indexed by search engines)
  HOME: "/",
  PRIVACY: "/privacy",
  TERMS: "/terms",

  // Auth pages (not indexed)
  LOGIN: "/login",
  SIGNUP: "/signup",

  // App pages (behind auth, not indexed)
  EDITOR: "/editor",
  DASHBOARD: "/dashboard",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

/**
 * Routes that should appear in sitemap.xml and be indexed by search engines.
 * These are public-facing pages with valuable content for SEO.
 */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.PRIVACY,
  ROUTES.TERMS,
] as const;

/**
 * Routes that should be blocked in robots.txt.
 * Auth pages, app pages, and API endpoints.
 */
export const PRIVATE_ROUTE_PATTERNS = [
  "/dashboard/",
  "/editor/",
  "/api/",
  "/login",
  "/signup",
] as const;
