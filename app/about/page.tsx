// app/about/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import Script from "next/script";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Despre TINKA AI – Cine suntem și ce facem | TINKA AI",
  description:
    "Află povestea TINKA AI, misiunea noastră și cum ajutăm afacerile din Moldova cu web design modern, AI, automatizări și soluții digitale inteligente.",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "https://tinka.md/about",
    languages: {
      "ro-MD": "https://tinka.md/about",
      "en-US": "https://tinka.md/en/about",
      "ru-MD": "https://tinka.md/ru/about",
    },
  },

  openGraph: {
    title: "Despre noi – TINKA AI",
    description:
      "Suntem o agenție digitală specializată în Web Design, AI, Chatbot-uri și automatizări pentru afacerile din Moldova.",
    url: "https://tinka.md/about",
    type: "website",
    siteName: "TINKA AI",
    locale: "ro_MD",
    alternateLocale: ["en_US", "ru_MD"],
    images: [
      {
        url: "https://tinka.md/og/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "TINKA AI – Despre echipa noastră",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Despre TINKA AI – Soluții Digitale pentru companii",
    description:
      "Descoperă cine suntem, cum lucrăm și ce soluții aducem pentru afacerile din Moldova.",
    images: ["https://tinka.md/og/about-og.jpg"],
  },
};

// JSON-LD complet pentru AboutPage + Organization
function AboutJSONLD() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: "https://tinka.md/about",

    mainEntity: {
      "@type": "Organization",
      name: "TINKA AI",
      url: "https://tinka.md",
      logo: "https://tinka.md/tinka-og-image.jpg",
      image: "https://tinka.md/tinka-og-image.jpg",
      description:
        "TINKA AI este o agenție digitală din Moldova specializată în Web Design, AI, chatbot-uri și automatizări pentru afaceri.",
      email: "office@tinka.md",
      telephone: "+37368333899",
      sameAs: [
        "https://www.facebook.com/tinka.ai",
        "https://www.instagram.com/tinka.ai",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+37368333899",
        email: "office@tinka.md",
        availableLanguage: ["ro", "ru", "en"],
        areaServed: "MD",
      },
    },
  };

  return (
    <Script
      id="about-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Page() {
  return (
    <>
      <AboutJSONLD />
      <AboutClient />
    </>
  );
}
