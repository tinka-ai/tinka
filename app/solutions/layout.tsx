// app/solutions/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Software Personalizat, SaaS & Soluții AI pentru Afaceri din Moldova",
  description:
    "Software personalizat, platforme SaaS, chatbot-uri AI, website-uri, automatizări, conținut AI și e-learning pentru IMM-uri din Republica Moldova.",

  alternates: {
    canonical: "https://tinka.md/solutions",
    languages: {
      "x-default": "https://tinka.md/solutions",
      "ro": "https://tinka.md/solutions",
    },
  },

  openGraph: {
    title: "Software Personalizat, SaaS & Soluții AI pentru Afaceri din Moldova",
    description:
      "Construim software personalizat, platforme SaaS, chatbot-uri AI, website-uri și automatizări pentru companii.",
    url: "https://tinka.md/solutions",
    siteName: "TINKA AI",
    type: "website",
    images: [
      {
        url: "https://tinka.md/image/og-image.webp",
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
            numberOfItems: 8,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "Service",
                  name: "Chatbot AI",
                  url: "https://tinka.md/solutions#chatbots",
                  provider: { "@id": "https://tinka.md/#business" },
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "Service",
                  name: "Software Personalizat",
                  url: "https://tinka.md/solutions#customSoftware",
                  provider: { "@id": "https://tinka.md/#business" },
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "Service",
                  name: "Web Design",
                  url: "https://tinka.md/solutions#websites",
                  provider: { "@id": "https://tinka.md/#business" },
                },
              },
              {
                "@type": "ListItem",
                position: 4,
                item: {
                  "@type": "Service",
                  name: "Platforme SaaS & Booking",
                  url: "https://tinka.md/solutions#saas",
                  provider: { "@id": "https://tinka.md/#business" },
                },
              },
              {
                "@type": "ListItem",
                position: 5,
                item: {
                  "@type": "Service",
                  name: "Automatizări Business",
                  url: "https://tinka.md/solutions#automation",
                  provider: { "@id": "https://tinka.md/#business" },
                },
              },
              {
                "@type": "ListItem",
                position: 6,
                item: {
                  "@type": "Service",
                  name: "Conținut & Media AI",
                  url: "https://tinka.md/solutions#aiContent",
                  provider: { "@id": "https://tinka.md/#business" },
                },
              },
              {
                "@type": "ListItem",
                position: 7,
                item: {
                  "@type": "Service",
                  name: "Platforme E-learning",
                  url: "https://tinka.md/solutions#elearning",
                  provider: { "@id": "https://tinka.md/#business" },
                },
              },
              {
                "@type": "ListItem",
                position: 8,
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
