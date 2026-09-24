// app/robots.ts
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://tinka.md"

  const disallow = [
    "/api/",
    "/_next/",
    "/admin/",       // panoul admin — nu se indexează
  ]

  // Crawlere AI cunoscute, listate explicit (desi "User-Agent: *" de mai jos
  // le permite deja implicit) — explicitatea ajuta la audit/verificare rapida
  // ca site-ul e deschis intentionat pentru motoarele de cautare generative
  // (ChatGPT Search, Perplexity, Google AI Overviews, Copilot etc.), nu doar
  // "din intamplare" prin lipsa unei reguli. Niciunul nu e blocat: obiectivul
  // TINKA AI e vizibilitate maxima in raspunsurile AI, inclusiv folosirea
  // continutului pentru antrenare (GPTBot).
  const aiBots = [
    "GPTBot",             // OpenAI — antrenare model
    "OAI-SearchBot",      // OpenAI — ChatGPT Search
    "ChatGPT-User",       // OpenAI — actiuni declansate de utilizator in ChatGPT
    "PerplexityBot",      // Perplexity — indexare
    "Perplexity-User",    // Perplexity — actiuni declansate de utilizator
    "ClaudeBot",          // Anthropic — indexare/antrenare
    "Claude-User",        // Anthropic — actiuni declansate de utilizator
    "anthropic-ai",       // Anthropic — nume istoric al agentului
    "Google-Extended",    // Google — Gemini / AI Overviews (antrenare)
    "Applebot-Extended",  // Apple Intelligence
    "Bytespider",         // ByteDance
    "CCBot",              // Common Crawl (sursa pentru multe modele AI)
    "meta-externalagent", // Meta AI
  ]

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
