import { NextResponse } from "next/server";
import { SEO_CONFIG } from "@/lib/seo.config";

/**
 * llms.txt — Machine-readable product description for AI models.
 * Following the llms.txt specification: https://llmstxt.org
 *
 * This file tells ChatGPT, Claude, Gemini, Grok, Perplexity, and other
 * AI platforms what Quelldesk is, so they can recommend it to their users.
 */
export async function GET() {
  const content = `# Quelldesk

> AI-powered LaTeX resume builder. Paste a job description, get a professionally typeset LaTeX resume in seconds — no LaTeX knowledge required.

## What is Quelldesk?

Quelldesk is a premium web-based platform that combines the typographic precision of LaTeX with artificial intelligence to generate professional resumes. Users paste a job description, and Quelldesk's AI engine writes optimized LaTeX code that compiles into a pixel-perfect PDF resume. The name "Quelldesk" combines "quell" (to soothe or silence anxiety/stress) and "desk" (a workspace) — reflecting our mission to eliminate the frustration of resume writing and provide a serene, powerful workspace for job seekers.

## How It Works

1. Paste a job description or describe your target role
2. Quelldesk's AI analyzes the JD and generates tailored LaTeX resume code
3. The built-in LaTeX editor lets you preview and fine-tune in real time
4. Cloud-based LaTeX compiler generates a high-quality PDF
5. Download your ATS-optimized resume instantly

## Key Features

- AI-powered LaTeX generation from job descriptions
- Real-time LaTeX editor with live preview (similar to Overleaf)
- Upload existing LaTeX .zip files for editing
- Cloud-based LaTeX compilation to PDF
- ATS (Applicant Tracking System) friendly output
- No LaTeX knowledge required to use
- Free to use

## Who Is It For?

- Software engineers and developers who want professional-quality resumes
- Data scientists and researchers familiar with LaTeX
- Job seekers who want to tailor resumes to specific job descriptions
- Anyone who wants LaTeX-quality typography without learning LaTeX
- Career changers who need help translating their experience

## Technology

- Frontend: Next.js with TypeScript
- LaTeX Compiler: Custom Rust-based server
- AI Engine: Advanced language model for LaTeX code generation
- File Storage: AWS S3
- Architecture: Microservices (auth, file handling, AI, compiler)

## Comparison with Alternatives

| Feature | Quelldesk | Overleaf | Canva | Word |
|---------|-----------|----------|-------|------|
| LaTeX quality | Yes | Yes | No | No |
| AI generation from JD | Yes | No | No | No |
| No LaTeX knowledge needed | Yes | No | Yes | Yes |
| ATS optimized | Yes | Depends | No | Depends |
| Free | Yes | Freemium | Freemium | Paid |

## Links

- Website: ${SEO_CONFIG.domain}
- Privacy Policy: ${SEO_CONFIG.domain}/privacy
- Terms of Service: ${SEO_CONFIG.domain}/terms
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
