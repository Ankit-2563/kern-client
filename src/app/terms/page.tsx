import type { Metadata } from "next";
import { SEO_CONFIG, PAGE_SEO } from "@/lib/seo.config";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

// ── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: PAGE_SEO.terms.title,
  description: PAGE_SEO.terms.description,
  alternates: {
    canonical: `${SEO_CONFIG.domain}/terms`,
  },
  openGraph: {
    title: `${PAGE_SEO.terms.title} | ${SEO_CONFIG.siteName}`,
    description: PAGE_SEO.terms.description,
    url: `${SEO_CONFIG.domain}/terms`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Page Component ───────────────────────────────────────────────────────────

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms" },
        ]}
      />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-16 sm:px-8 sm:py-24">
        <article>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Terms of Service
          </h1>

          <p className="mt-4 text-sm text-zinc-500">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="mt-10 prose prose-zinc max-w-none">
            {/* TODO: Replace with your actual terms of service content */}
            <p>
              These terms of service (&quot;Terms&quot;) govern your use of {SEO_CONFIG.siteName} and
              its services, available at {SEO_CONFIG.domain}. By using our services, you
              agree to be bound by these Terms.
            </p>

            <h2>Use of Service</h2>
            <p>
              {SEO_CONFIG.siteName} provides an AI-powered LaTeX resume building service.
              You may use our service to create, edit, and compile LaTeX resumes for
              personal and professional purposes.
            </p>

            <h2>User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account
              credentials and for all activities that occur under your account.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              You retain ownership of all content you create using {SEO_CONFIG.siteName},
              including your resume content and LaTeX source files.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              {SEO_CONFIG.siteName} is provided &quot;as is&quot; without warranty of any kind.
              We are not liable for any damages arising from the use of our service.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the service
              after changes constitutes acceptance of the new Terms.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
