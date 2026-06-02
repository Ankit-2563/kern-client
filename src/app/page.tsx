import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import {
  SoftwareApplicationJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/json-ld";
import { SEO_CONFIG } from "@/lib/seo.config";

// Load the high-end Cormorant Garamond serif font for the elegant italic typography
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function Home() {
  return (
    <>
      {/* ── Structured Data for Homepage ──────────────────────────────── */}
      <SoftwareApplicationJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }]} />

      {/* Outer Border Frame (Beige/Sand luxury editorial feel) */}
      <div className="relative min-h-screen w-full flex flex-col justify-between border-[10px] sm:border-[16px] border-[#dfd3c3] overflow-hidden antialiased bg-[#dfd3c3]">
        
        {/* Full Viewport Background Image with 8px inner border radius */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 rounded-[8px] overflow-hidden">
          <Image
            src="/brand/hero-bg.png"
            alt="QuellDesk Abstract Artistic Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center select-none"
          />
          {/* Subtle contrast overlay to enhance readability */}
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        </div>

        {/* ── Header Navigation ────────────────────────────────────────── */}
        <header className="relative z-10 w-full px-6 py-6 sm:px-12 flex items-center justify-between">
          
          {/* Left Spacer to maintain balanced layout flow */}
          <div className="w-12 sm:w-16" />

          {/* Centered Elegant Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 select-none">
            <h1 className={`${cormorant.className} text-3xl sm:text-4xl font-normal tracking-wide text-white lowercase`}>
              {SEO_CONFIG.siteName.toLowerCase()}
            </h1>
            <span className="h-1.5 w-1.5 rounded-full bg-white/40 mt-2" />
          </div>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Capsule CTA button */}
            <a
              href="/register"
              className="bg-white hover:bg-zinc-100 text-zinc-950 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.15em] font-bold shadow-md transition-all duration-300 hover:scale-105 active:scale-95 text-center font-sans"
            >
              Register
            </a>
          </div>
        </header>

        {/* ── Main Hero Section ────────────────────────────────────────── */}
        <main className="relative z-10 w-full px-6 sm:px-16 flex-grow flex flex-col justify-center">
          
          {/* Main Slogan Container */}
          <div className="relative max-w-4xl pt-12 pb-16 flex flex-col items-start select-none">
            
            {/* Left Hand-drawn Geometric Accents (Styled inline-SVG) */}
            <div className="absolute -left-12 sm:-left-20 top-2 w-12 sm:w-16 h-16 sm:h-20 pointer-events-none opacity-85">
              <svg className="w-full h-full text-white/95" viewBox="0 0 80 80" fill="none">
                <path d="M15 15 L35 25 M15 35 L45 35 M15 55 L35 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M50 20 L60 40 L50 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40" />
              </svg>
            </div>

            {/* Title Line 1 (Modern Sans-serif) */}
            <h2 className="text-white text-5xl sm:text-8xl font-normal tracking-tight leading-none mb-1 sm:mb-2 font-sans select-none">
              LaTeX resumes in their
            </h2>

            {/* Title Line 2 (Luxury Serif Italic) */}
            <h3 className={`${cormorant.className} text-white text-6xl sm:text-9xl italic font-light leading-none select-none pl-6 sm:pl-16`}>
              purest form
            </h3>
          </div>
        </main>

        {/* ── Footer Elements ─────────────────────────────────────────── */}
        <footer className="relative z-10 w-full px-6 pb-6 sm:px-12 sm:pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          
          {/* Bottom Left: Quick copyright & builder tag */}
          <div className="flex flex-col gap-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-white/70 font-sans">
            <span>© {new Date().getFullYear()} QuellDesk</span>
            <span className="text-white/40">AI-Powered Resume compiler</span>
          </div>

          {/* Bottom Middle: Navigation Links for SEO & Sitelinks */}
          <nav className="flex items-center justify-center gap-4 sm:gap-6 text-[10px] uppercase tracking-[0.2em] font-semibold text-white/70 font-sans">
            <a href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <span className="text-white/20 select-none">•</span>
            <a href="/terms" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
          </nav>

          {/* Bottom Right: High-end explanatory copy paragraph */}
          <div className="max-w-xs md:max-w-md text-right text-white/95 text-[11px] sm:text-xs leading-relaxed font-sans pr-2">
            <p>
              We apply advanced AI to LaTeX compilation in order to elevate your professional narrative. Our system achieves unparalleled levels of visual precision and ATS parsing compatibility.
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
