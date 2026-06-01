import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── URL Strategy ─────────────────────────────────────────────────────────
  trailingSlash: false,

  // ── Security ─────────────────────────────────────────────────────────────
  poweredByHeader: false,

  // ── Compression ──────────────────────────────────────────────────────────
  compress: true,

  // ── Image Optimization ───────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    // TODO: Add S3 bucket pattern when file upload service is deployed
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "your-bucket.s3.amazonaws.com",
    //   },
    // ],
  },

  // ── Security Headers ─────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME-type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Control referrer information
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Enable DNS prefetching for faster external resource loading
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Restrict browser features
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // Force HTTPS (enable after SSL is confirmed on Amplify)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
