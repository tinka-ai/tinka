// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"

import "./globals.css"

import Providers from "./providers"
import Navbar from "@/components/ui/navbar"
import ChatWidget from "@/components/tinka/ChatWidget"
import CookieConsent from "@/components/CookieConsent"

export const metadata: Metadata = {
  metadataBase: new URL("https://tinka.md"),

  title: {
    default: "TINKA AI – Soluții AI & Web Design pentru Afaceri din Moldova",
    template: "%s | TINKA AI",
  },

  description:
    "TINKA AI creează software personalizat, platforme SaaS, chatbot-uri AI, website-uri, automatizări, conținut AI (dublaj, avatare) și platforme e-learning pentru companii din Republica Moldova.",

  keywords: [
    "TINKA AI",
    "software personalizat Moldova",
    "dezvoltare software la comandă",
    "CRM personalizat Moldova",
    "platformă SaaS Moldova",
    "web design Moldova",
    "creare site Chisinau",
    "chatbot AI Moldova",
    "automatizari business Moldova",
    "digitalizare IMM Moldova",
    "programări online Moldova",
    "meniu digital restaurant",
    "dublaj AI",
    "avatare AI",
    "e-learning Moldova",
    "platformă cursuri online",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

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
      "Software personalizat, platforme SaaS, website-uri, chatboturi AI, automatizări și conținut AI pentru afaceri din Republica Moldova.",
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
      "Software personalizat, platforme SaaS, website-uri, chatboturi AI și automatizări pentru IMM-uri.",
    images: ["https://tinka.md/image/og-image.webp"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        {/* GEO meta tags — semnalează localizarea geografică pentru motoarele de căutare */}
        <meta name="geo.region" content="MD" />
        <meta name="geo.placename" content="Chișinău, Republica Moldova" />
        <meta name="geo.position" content="47.0105;28.8638" />
        <meta name="ICBM" content="47.0105, 28.8638" />

        {/* JSON-LD LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://tinka.md/#business",
              name: "TINKA AI",
              url: "https://tinka.md",
              logo: {
                "@type": "ImageObject",
                url: "https://tinka.md/image/og-image.webp",
                width: 1200,
                height: 630,
              },
              image: "https://tinka.md/image/og-image.webp",
              description:
                "TINKA AI oferă software personalizat, platforme SaaS, website-uri, chatbot-uri AI, automatizări, conținut AI (dublaj, avatare) și platforme e-learning pentru companii din Republica Moldova.",
              telephone: "+37368333899",
              email: "office@tinka.md",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Chișinău",
                addressLocality: "Chișinău",
                addressCountry: "MD",
                addressRegion: "Chișinău",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 47.0105,
                longitude: 28.8638,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
              },
              sameAs: [
                "https://www.facebook.com/tinka.ai",
                "https://www.instagram.com/tinka.ai",
              ],
              priceRange: "$$",
              areaServed: {
                "@type": "Country",
                name: "Republica Moldova",
              },
              makesOffer: [
                { "@type": "Offer", name: "Software Personalizat" },
                { "@type": "Offer", name: "Platforme SaaS & Booking" },
                { "@type": "Offer", name: "Web Design" },
                { "@type": "Offer", name: "Chatbot AI" },
                { "@type": "Offer", name: "Automatizări Business" },
                { "@type": "Offer", name: "Conținut & Media AI" },
                { "@type": "Offer", name: "Platforme E-learning" },
                { "@type": "Offer", name: "Consultanță Digitală" },
              ],
            }),
          }}
        />

        {/* JSON-LD WebSite + SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://tinka.md/#website",
              url: "https://tinka.md",
              name: "TINKA AI",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://tinka.md/?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* JSON-LD BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Acasă",
                  item: "https://tinka.md/",
                },
              ],
            }),
          }}
        />

        {/* JSON-LD FAQPage — citit de Google și AI-uri (ChatGPT, Perplexity, Gemini) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Ce servicii oferă TINKA AI?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "TINKA AI dezvoltă în principal software personalizat (CRM-uri, aplicații desktop și offline) și platforme SaaS, plus website-uri, chatbot-uri AI, automatizări business, conținut generat cu AI (dublaj audio/video, avatare, meniuri audio), platforme de e-learning și consultanță digitală. Toate serviciile sunt adaptate pentru companii din Republica Moldova.",
                  },
                },
                {
                  "@type": "Question",
                  name: "TINKA AI dezvoltă software personalizat sau doar website-uri?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Website-urile sunt doar una dintre soluțiile oferite. TINKA AI dezvoltă în principal software personalizat — CRM-uri interne, sisteme de gestiune, aplicații desktop sau offline — construite exact pe procesele fiecărui client, fără vendor lock-in.",
                  },
                },
                {
                  "@type": "Question",
                  name: "TINKA AI face conținut generat cu AI (dublaj, avatare)?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Da. TINKA AI produce conținut și media generate cu AI: dublaj audio/video multilingv, avatare AI (digital humans) pentru prezentări sau customer service, meniuri audio electronice, voce-over și conținut video/social media.",
                  },
                },
                {
                  "@type": "Question",
                  name: "TINKA AI construiește platforme de e-learning?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Da. TINKA AI construiește platforme LMS personalizate, cursuri online cu certificare automată, teste automate și training corporate, cu conținut video/audio asistat de AI.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Cât costă un site web la TINKA AI?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Prețurile sunt stabilite individual în funcție de complexitate. TINKA AI oferă prețuri accesibile pentru piața din Moldova, cu evaluare gratuită în 24 de ore.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Cât durează crearea unui site web?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Un proiect pilot durează 2–4 săptămâni. Site-uri simple pot fi livrate în 5–7 zile lucrătoare.",
                  },
                },
                {
                  "@type": "Question",
                  name: "TINKA AI face chatbot-uri AI pentru WhatsApp?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Da, TINKA AI dezvoltă chatbot-uri AI integrate pe WhatsApp, Messenger și site web, disponibile 24/7 pentru suport clienți și generare de lead-uri.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Ce este TinkaBook?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "TinkaBook este o platformă SaaS de programări online dezvoltată de TINKA AI, destinată salonelor de frumusețe, cabinetelor medicale și liber-profesioniștilor din Moldova.",
                  },
                },
                {
                  "@type": "Question",
                  name: "TINKA AI lucrează și cu companii din afara Moldovei?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Da, TINKA AI oferă servicii remote pentru companii din România, Europa de Est și diaspora moldovenească.",
                  },
                },
              ],
            }),
          }}
        />
      </head>

      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground`}
      >
        <Providers>
          <Suspense fallback={null}>

            <header role="banner">
              <Navbar />
            </header>

            <main id="main-content" role="main">
              {children}
            </main>

            <footer role="contentinfo">
            </footer>
           <ChatWidget />
           <CookieConsent />
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
