// app/page.tsx — SERVER COMPONENT cu metadata pentru SEO
import type { Metadata } from "next"
import HomeClient from "@/components/HomeClient"

export const metadata: Metadata = {
  title: "TINKA AI – Soluții AI & Web Design pentru Afaceri din Moldova",
  description:
    "TINKA AI creează site-uri moderne, chatbot-uri AI, magazine online și automatizări inteligente pentru companii și liber-profesioniști din Republica Moldova.",
  alternates: {
    canonical: "https://tinka.md/",
    languages: {
      "x-default": "https://tinka.md/",
      "ro": "https://tinka.md/",
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

export default function Page() {
  return <HomeClient />
}
