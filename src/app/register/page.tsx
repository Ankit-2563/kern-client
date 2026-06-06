import type { Metadata } from "next";
import { SEO_CONFIG, PAGE_SEO } from "@/lib/seo.config";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import RegisterForm from "./RegisterForm";

// ── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: PAGE_SEO.register.title,
  description: PAGE_SEO.register.description,
  alternates: {
    canonical: `${SEO_CONFIG.domain}/register`,
  },
  openGraph: {
    title: `${PAGE_SEO.register.title} | ${SEO_CONFIG.siteName}`,
    description: PAGE_SEO.register.description,
    url: `${SEO_CONFIG.domain}/register`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Page Component ───────────────────────────────────────────────────────────

export default function RegisterPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Register", url: "/register" },
        ]}
      />
      <RegisterForm />
    </>
  );
}
