import type { Metadata } from "next";
import { SEO_CONFIG, PAGE_SEO } from "@/lib/seo.config";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

// ── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: PAGE_SEO.privacy.title,
  description: PAGE_SEO.privacy.description,
  alternates: {
    canonical: `${SEO_CONFIG.domain}/privacy`,
  },
  openGraph: {
    title: `${PAGE_SEO.privacy.title} | ${SEO_CONFIG.siteName}`,
    description: PAGE_SEO.privacy.description,
    url: `${SEO_CONFIG.domain}/privacy`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Page Component ───────────────────────────────────────────────────────────

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" },
        ]}
      />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-16 sm:px-8 sm:py-24">
        <article>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-zinc-500">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="mt-10 prose prose-zinc max-w-none">
            {/* TODO: Replace with your actual privacy policy content */}
            <p>
              This privacy policy describes how {SEO_CONFIG.siteName} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects,
              uses, and protects your personal information when you use our website
              and services at {SEO_CONFIG.domain}.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when
              you create an account, upload files, or contact us for support.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve
              our services, including our AI-powered LaTeX resume builder.
            </p>

            <h2>Data Storage</h2>
            <p>
              Your files and resume data are stored securely on AWS infrastructure.
              We use industry-standard encryption and security practices.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us
              through our website.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
