import { ImageResponse } from "next/og";
import { SEO_CONFIG } from "@/lib/seo.config";

// ── OG Image Configuration ──────────────────────────────────────────────────

export const alt = `${SEO_CONFIG.siteName} — ${SEO_CONFIG.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ── Dynamic OG Image Generator ──────────────────────────────────────────────
// This generates a branded OG image at build time using Next.js ImageResponse.
// It serves as a fallback if public/og/og-default.png doesn't exist yet,
// and as the dynamic OG image for the homepage.

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            zIndex: 1,
          }}
        >
          {/* Site name */}
          <div
            style={{
              fontSize: "80px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: 1,
              display: "flex",
            }}
          >
            {SEO_CONFIG.siteName}
          </div>

          {/* Divider */}
          <div
            style={{
              width: "80px",
              height: "4px",
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
              borderRadius: "2px",
              display: "flex",
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "#a1a1aa",
              letterSpacing: "0.5px",
              display: "flex",
            }}
          >
            {SEO_CONFIG.tagline}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "18px",
              fontWeight: 300,
              color: "#71717a",
              maxWidth: "700px",
              textAlign: "center",
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            Paste a job description → AI writes LaTeX → Download a pixel-perfect PDF
          </div>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "16px",
            fontWeight: 500,
            color: "#52525b",
            letterSpacing: "2px",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          {new URL(SEO_CONFIG.domain).hostname}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
