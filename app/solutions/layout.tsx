// app/solutions/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Soluții Digitale & AI pentru Afaceri din Moldova | TINKA AI",
  description:
    "Chatbot-uri AI, website-uri moderne, automatizări business și consultanță digitală pentru IMM-uri din Republica Moldova.",

  alternates: {
    canonical: "https://tinka.md/solutions",
    languages: {
      "x-default": "https://tinka.md/solutions",
      "ro": "https://tinka.md/solutions",
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
            name: "Soluții Digitale și AI – TINKA AI",
            description: "Servicii digitale oferite de TINKA AI în Moldova",
            url: "https://tinka.md/solutions",
            numberOfItems: 4,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "Service",
                  name: "Chatbot AI",
                  url: "https://tinka.md/solutions#chatbot",
                  provider: { "@id": "https://tinka.md/#business" },
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "Service",
                  name: "Web Design",
                  url: "https://tinka.md/solutions#website",
                  provider: { "@id": "https://tinka.md/#business" },
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "Service",
                  name: "Automatizări Business",
                  url: "https://tinka.md/solutions#automation",
                  provider: { "@id": "https://tinka.md/#business" },
                },
              },
              {
                "@type": "ListItem",
                position: 4,
                item: {
                  "@type": "Service",
                  name: "Consultanță Digitală",
                  url: "https://tinka.md/solutions#consulting",
                  provider: { "@id": "https://tinka.md/#business" },
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
