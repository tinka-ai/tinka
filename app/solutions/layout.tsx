// app/solutions/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
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

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Soluții Digitale și AI",
            itemListElement: [
              { "@type": "Service", name: "Chatbot AI", url: "https://tinka.md/solutions#chatbot" },
              { "@type": "Service", name: "Web Design", url: "https://tinka.md/solutions#website" },
              { "@type": "Service", name: "Automatizări", url: "https://tinka.md/solutions#automation" },
              { "@type": "Service", name: "Consultanță", url: "https://tinka.md/solutions#consulting" },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
