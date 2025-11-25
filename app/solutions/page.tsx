// app/solutions/page.tsx — SERVER COMPONENT, fără “use client”
import SolutionsClient from "./SolutionsClient"

export const metadata = {
  title: "Soluții Digitale & AI pentru Afaceri din Moldova | TINKA AI",
  description:
    "Chatbot-uri AI, website-uri moderne, automatizări business și consultanță digitală pentru IMM-uri din Republica Moldova.",

  alternates: {
    canonical: "https://tinka.md/solutions",
    languages: {
      "ro-MD": "https://tinka.md/solutions",
      "en-US": "https://tinka.md/en/solutions",
      "ru-MD": "https://tinka.md/ru/solutions",
    },
  },

  openGraph: {
    title: "Soluții Digitale & AI pentru Afaceri din Moldova",
    description:
      "Implementăm chatbot-uri AI, website-uri moderne și automatizări pentru companii.",
    url: "https://tinka.md/solutions",
    siteName: "TINKA AI",
    type: "website",
    images: [
      {
        url: "https://tinka.md/og/solutions-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function SolutionsPage() {
  return <SolutionsClient />
}
