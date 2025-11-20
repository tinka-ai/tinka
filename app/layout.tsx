// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script" // ✅ adăugat
import "./globals.css"

import Providers from "./providers"
import Navbar from "@/components/ui/navbar"

// ✅ JSON-LD pentru TINKA AI (Organization)
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TINKA AI",
  "url": "https://tinka.md",
  "logo": "https://tinka.md/logo.png", // ⬅️ pune aici URL-ul real al logo-ului tău
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+37300000000", // ⬅️ înlocuiește cu numărul tău
      "contactType": "customer service",
      "areaServed": "MD",
      "availableLanguage": ["ro", "ru"]
    }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL("https://tinka.md"),
  title: {
    default: "TINKA AI – Soluții digitale și AI pentru IMM-urile din Moldova",
    template: "%s | TINKA AI",
  },
  description:
    "TINKA AI ajută afacerile din Republica Moldova să crească prin website-uri moderne, SEO, planificatoare online, chatbot-uri și automatizări cu inteligență artificială.",
  generator: "v0.app",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://tinka.md",
    title: "TINKA AI – Soluții digitale și AI pentru IMM-urile din Moldova",
    description:
      "Website-uri, TinkaBook (programări online), automatizări AI și servicii digitale pentru IMM-urile din Republica Moldova.",
    siteName: "TINKA AI",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground`}
      >
        <Providers>
          <Suspense fallback={null}>
            <Navbar />
            {children}
            <Analytics />
          </Suspense>
        </Providers>

        {/* ✅ Schema.org injectat în <body> */}
        <Script
          id="tinka-org-ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(orgJsonLd)}
        </Script>
      </body>
    </html>
  )
}
