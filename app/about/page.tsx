// app/about/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import AboutClient from "./AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Despre TINKA AI – Cine suntem și ce facem | TINKA AI",
  description:
    "Află povestea TINKA AI, misiunea noastră și cum ajutăm afacerile din Moldova cu web design modern, AI, automatizări și soluții digitale inteligente.",
  
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

export default function Page() {
  return <AboutClient />;
}
