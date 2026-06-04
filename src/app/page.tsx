import {
  SoftwareApplicationJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/json-ld";

export default function Home() {
  return (
    <>
      {/* ── Structured Data for Homepage ──────────────────────────────── */}
      <SoftwareApplicationJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }]} />

      {/* Hero Section Container */}
      <div 
        className="relative w-full h-screen flex flex-col justify-between overflow-hidden text-white font-sans antialiased"
        style={{
          backgroundImage: "url('/assets/gradient-background.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Header navigation containing brand logo */}
        <header className="relative z-10 w-full pt-8 px-4 lg:pt-8 lg:pr-16 flex justify-end">
          <div className="text-[20px] lg:text-[24px] font-bold tracking-tight select-none">
            QuellDesk
          </div>
        </header>

        {/* Main Hero content positioned at the bottom */}
        <main className="relative z-10 w-full pb-8 px-4 lg:pb-32 lg:px-16 flex flex-col mt-auto">
          {/* CTA Link */}
          <div className="mb-8 lg:mb-13">
            <a 
              href="/register" 
              className="inline-flex items-center gap-2 text-[20px] lg:text-[24px] font-semibold hover:opacity-80 transition-opacity"
            >
              Get Early Access <span className="font-light">→</span>
            </a>
          </div>

          {/* Title Line 1: Governed AI, */}
          <h2 className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[128px] font-normal tracking-tight leading-none select-none">
            Governed AI,
          </h2>

          {/* Subheading row containing description and Title Line 2 */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 lg:gap-12 mt-4 lg:mt-16">
            
            {/* Subheading Paragraph & Circle Indicator */}
            <div className="order-2 lg:order-1 flex flex-col items-start lg:pl-32">
              <p className="text-[16px] lg:text-[20px] font-normal leading-[1.4] opacity-95 lg:max-w-112.5">
                A Professional Resume Editor<br className="hidden lg:inline" />
                That Combines AI Writing<br className="hidden lg:inline" />
                Assistance With The Precision Of<br className="hidden lg:inline" />
                LaTeX To Help You Stand Out In<br className="hidden lg:inline" />
                Every Application.
              </p>
              <div className="w-4 h-4 bg-white rounded-full mt-6 lg:mt-8" />
            </div>

            {/* Title Line 2: Driven By Data */}
            <div className="order-1 lg:order-2">
              <h2 className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[128px] font-normal tracking-tight leading-none lg:leading-[0.9] select-none text-left lg:text-right">
                Driven By Data
              </h2>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
