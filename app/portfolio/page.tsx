export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import Script from "next/script";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portofoliu – Proiecte și produse SaaS | TINKA AI",
  description:
    "Vezi portofoliul TINKA AI: proiecte SaaS, aplicații web și soluții digitale realizate pentru clienți din Moldova.",

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  alternates: {
    canonical: "https://tinka.md/portfolio",
  },

  openGraph: {
    title: "Portofoliu – TINKA AI",
    description: "Proiecte SaaS și aplicații web realizate de TINKA AI.",
    url: "https://tinka.md/portfolio",
    type: "website",
    siteName: "TINKA AI",
    locale: "ro_MD",
    alternateLocale: ["en_US", "ru_MD"],
    images: [
      {
        url: "https://tinka.md/og/portfolio-og.jpg",
        width: 1200,
        height: 630,
        alt: "TINKA AI – Portofoliu",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Portofoliu – TINKA AI",
    description: "Proiecte și produse SaaS realizate de TINKA AI.",
    images: ["https://tinka.md/og/portfolio-og.jpg"],
  },
};

function PortfolioJSONLD() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: "https://tinka.md/portfolio",
    name: "TINKA AI – Portofoliu",
    description:
      "Colecție de proiecte SaaS și aplicații web realizate de TINKA AI.",
    isPartOf: {
      "@type": "WebSite",
      name: "TINKA AI",
      url: "https://tinka.md",
    },
  };

  return (
    <Script
      id="portfolio-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Page() {
  return (
    <>
      <PortfolioJSONLD />
      <PortfolioClient />
    </>
  );
}
