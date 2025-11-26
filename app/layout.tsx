// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
// import { Analytics } from "@vercel/analytics/next" // ❌ Șters - nu e nevoie pe Netlify
import { Suspense } from "react"
import Script from "next/script"

import "./globals.css"

import Providers from "./providers"
import Navbar from "@/components/ui/navbar"

export const metadata: Metadata = {
  metadataBase: new URL("https://tinka.md"),

  title: {
    default: "TINKA AI – Soluții AI & Web Design pentru Afaceri din Moldova",
    template: "%s | TINKA AI",
  },

  description:
    "TINKA AI creează site-uri moderne, chatbot-uri AI, magazine online și automatizări inteligente pentru companii și liber-profesioniști din Republica Moldova.",

  keywords: [
    "TINKA AI",
    "web design Moldova",
    "creare site Chisinau",
    "chatbot AI Moldova",
    "automatizari business Moldova",
    "digitalizare IMM Moldova",
    "programări online Moldova",
    "magazin online Moldova",
    "website profesional Moldova",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://tinka.md/",
    languages: {
      "ro-MD": "https://tinka.md/",
      "ru-MD": "https://tinka.md/ru",
      "en-US": "https://tinka.md/en",
    },
  },

  openGraph: {
  title: "TINKA AI – Soluții AI & Web Design pentru Afaceri din Moldova",
  description:
    "Website-uri moderne, chatboturi AI, SEO și automatizări pentru afaceri din Republica Moldova.",
  url: "https://tinka.md/",
  siteName: "TINKA AI",
  locale: "ro_MD",
  type: "website",
  images: [
    {
      url: "https://tinka.md/image/og-image.webp",
      width: 1200,
      height: 630,
      alt: "TINKA AI – Soluții Digitale Moldova",
    },
  ],
},

twitter: {
  card: "summary_large_image",
  title: "TINKA AI – Soluții Digitale în Moldova",
  description:
    "Website-uri moderne, chatboturi AI, SEO și automatizări pentru IMM-uri.",
  images: ["https://tinka.md/image/og-image.webp"],
},
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        {/* Fallback SEO required by Lighthouse */}
        <title>TINKA AI – Soluții AI & Web Design pentru Afaceri din Moldova</title>
        <meta
          name="description"
          content="TINKA AI creează site-uri moderne, chatbot-uri AI, magazine online și automatizări inteligente pentru companii și liber-profesioniști din Republica Moldova."
        />

        {/* JSON-LD LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://tinka.md/#business",
              name: "TINKA AI",
              url: "https://tinka.md",
              logo: "https://tinka.md/tinka-og-image.jpg",
              image: "https://tinka.md/tinka-og-image.jpg",
              description:
                "TINKA AI oferă website-uri moderne, chatbot-uri AI, SEO și automatizări pentru companii din Republica Moldova.",
              telephone: "+37368333899",
              email: "office@tinka.md",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chișinău",
                addressCountry: "Moldova",
              },
              sameAs: [
                "https://www.facebook.com/tinka.ai",
                "https://www.instagram.com/tinka.ai",
              ],
              priceRange: "$$",
              areaServed: {
                "@type": "Country",
                name: "Republica Moldova",
              },
              makesOffer: [
                { "@type": "Offer", name: "Web Design" },
                { "@type": "Offer", name: "Chatbot AI" },
                { "@type": "Offer", name: "Automatizări Business" },
              ],
            }),
          }}
        />

        {/* JSON-LD Website Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://tinka.md",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://tinka.md/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* JSON-LD Breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Acasă",
                  item: "https://tinka.md/",
                },
              ],
            }),
          }}
        />
      </head>

      {/* GA4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-MLE4N46EN9"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer
