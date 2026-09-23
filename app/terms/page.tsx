// app/terms/page.tsx — Server Component (necesar pentru metadata SEO)
import type { Metadata } from "next"
import Script from "next/script"
import TermsClient from "./TermsClient"

export const metadata: Metadata = {
  title: "Termeni și Condiții",
  description:
    "Termenii și condițiile de utilizare a site-ului și serviciilor TINKA AI: software personalizat, platforme SaaS, chatbot-uri AI, automatizări și conținut generat cu AI.",

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  alternates: {
    canonical: "https://tinka.md/terms",
    languages: {
      "x-default": "https://tinka.md/terms",
      "ro": "https://tinka.md/terms",
    },
  },

  openGraph: {
    title: "Termeni și Condiții",
    description:
      "Condițiile care guvernează folosirea site-ului tinka.md și a serviciilor TINKA AI.",
    url: "https://tinka.md/terms",
    siteName: "TINKA AI",
    locale: "ro_MD",
    type: "website",
    images: [
      {
        url: "https://tinka.md/image/og-image.webp",
        width: 1200,
        height: 630,
        alt: "TINKA AI – Termeni și Condiții",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Termeni și Condiții",
    description:
      "Condițiile care guvernează folosirea site-ului tinka.md și a serviciilor TINKA AI.",
    images: ["https://tinka.md/image/og-image.webp"],
  },
}

function TermsJSONLD() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Termeni și Condiții",
    url: "https://tinka.md/terms",
    isPartOf: {
      "@type": "WebSite",
      name: "TINKA AI",
      url: "https://tinka.md",
    },
    publisher: { "@id": "https://tinka.md/#business" },
  }

  return (
    <Script
      id="terms-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function Page() {
  return (
    <>
      <TermsJSONLD />
      <TermsClient />
    </>
  )
}
