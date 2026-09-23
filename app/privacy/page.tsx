// app/privacy/page.tsx — Server Component (necesar pentru metadata SEO)
import type { Metadata } from "next"
import Script from "next/script"
import PrivacyClient from "./PrivacyClient"

export const metadata: Metadata = {
  title: "Politica de Confidențialitate",
  description:
    "Politica de confidențialitate TINKA AI: ce date colectăm, cum le folosim, cui le transmitem și cum îți poți exercita drepturile GDPR când folosești site-ul sau serviciile noastre.",

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  alternates: {
    canonical: "https://tinka.md/privacy",
    languages: {
      "x-default": "https://tinka.md/privacy",
      "ro": "https://tinka.md/privacy",
    },
  },

  openGraph: {
    title: "Politica de Confidențialitate",
    description:
      "Cum colectează, folosește și protejează TINKA AI datele personale ale vizitatorilor și clienților.",
    url: "https://tinka.md/privacy",
    siteName: "TINKA AI",
    locale: "ro_MD",
    type: "website",
    images: [
      {
        url: "https://tinka.md/image/og-image.webp",
        width: 1200,
        height: 630,
        alt: "TINKA AI – Politica de Confidențialitate",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Politica de Confidențialitate",
    description:
      "Cum colectează, folosește și protejează TINKA AI datele personale ale vizitatorilor și clienților.",
    images: ["https://tinka.md/image/og-image.webp"],
  },
}

function PrivacyJSONLD() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Politica de Confidențialitate",
    url: "https://tinka.md/privacy",
    isPartOf: {
      "@type": "WebSite",
      name: "TINKA AI",
      url: "https://tinka.md",
    },
    publisher: { "@id": "https://tinka.md/#business" },
  }

  return (
    <Script
      id="privacy-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function Page() {
  return (
    <>
      <PrivacyJSONLD />
      <PrivacyClient />
    </>
  )
}
