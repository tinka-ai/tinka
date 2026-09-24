import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { notFound } from "next/navigation"

import "../globals.css"

import SiteChrome from "@/components/layout/SiteChrome"
import type { Locale } from "@/contexts/locale-context"
import { getStructuredData } from "./structured-data"

const LOCALES: Locale[] = ["ro", "en", "ru"]
const OG_LOCALE: Record<Locale, string> = { ro: "ro_MD", en: "en_US", ru: "ru_MD" }

function urlFor(locale: Locale, path = "") {
  const base = "https://tinka.md"
  const prefix = locale === "ro" ? "" : `/${locale}`
  if (path === "" || path === "/") return `${base}${prefix || "/"}`
  return `${base}${prefix}${path}`
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

const SITE_TITLE: Record<Locale, string> = {
  ro: "TINKA AI – Soluții AI & Web Design pentru Afaceri din Moldova",
  en: "TINKA AI – AI Solutions & Web Design for Businesses in Moldova",
  ru: "TINKA AI – AI-решения и веб-дизайн для бизнеса в Молдове",
}

const SITE_DESCRIPTION: Record<Locale, string> = {
  ro: "TINKA AI creează software personalizat, platforme SaaS, chatbot-uri AI, website-uri, automatizări, conținut AI (dublaj, avatare) și platforme e-learning pentru companii din Republica Moldova.",
  en: "TINKA AI builds custom software, SaaS platforms, AI chatbots, websites, automations, AI content (dubbing, avatars) and e-learning platforms for companies in the Republic of Moldova.",
  ru: "TINKA AI разрабатывает индивидуальное ПО, SaaS-платформы, AI-чатботов, сайты, автоматизацию, AI-контент (дубляж, аватары) и платформы e-learning для компаний Республики Молдова.",
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale

  return {
    metadataBase: new URL("https://tinka.md"),
    title: {
      default: SITE_TITLE[locale],
      template: "%s | TINKA AI",
    },
    description: SITE_DESCRIPTION[locale],
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
      canonical: urlFor(locale),
      languages: {
        "x-default": urlFor("ro"),
        ro: urlFor("ro"),
        en: urlFor("en"),
        ru: urlFor("ru"),
      },
    },
    openGraph: {
      title: SITE_TITLE[locale],
      description: SITE_DESCRIPTION[locale],
      url: urlFor(locale),
      siteName: "TINKA AI",
      locale: OG_LOCALE[locale],
      type: "website",
      images: [
        {
          url: "https://tinka.md/image/og-image.webp",
          width: 1200,
          height: 630,
          alt: SITE_TITLE[locale],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE[locale],
      description: SITE_DESCRIPTION[locale],
      images: ["https://tinka.md/image/og-image.webp"],
    },
  }
}

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!LOCALES.includes(raw as Locale)) notFound()
  const locale = raw as Locale
  const sd = getStructuredData(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
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
              url: urlFor(locale),
              logo: {
                "@type": "ImageObject",
                url: "https://tinka.md/image/og-image.webp",
                width: 1200,
                height: 630,
              },
              image: "https://tinka.md/image/og-image.webp",
              description: sd.businessDescription,
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
              makesOffer: sd.offerNames.map((name) => ({ "@type": "Offer", name })),
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
              url: urlFor(locale),
              name: "TINKA AI",
              inLanguage: locale,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${urlFor(locale)}?q={search_term_string}`,
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
                  name: sd.breadcrumbHome,
                  item: urlFor(locale),
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
              mainEntity: sd.faq.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            }),
          }}
        />
      </head>

      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground`}
      >
        <SiteChrome initialLocale={locale}>{children}</SiteChrome>
      </body>
    </html>
  )
}
