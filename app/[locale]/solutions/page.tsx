// app/[locale]/solutions/page.tsx — SERVER COMPONENT
import type { Metadata } from "next"
import type { Locale } from "@/contexts/locale-context"
import { ro } from "@/locales/ro"
import { en } from "@/locales/en"
import { ru } from "@/locales/ru"
import { SERVICES } from "./services-data"
import SolutionsClient from "./SolutionsClient"

const DICTS = { ro, en, ru }

const LOCALES: Locale[] = ["ro", "en", "ru"]

function urlFor(locale: Locale, path: string) {
  const prefix = locale === "ro" ? "" : `/${locale}`
  return `https://tinka.md${prefix}${path}`
}

const META: Record<Locale, { title: string; description: string }> = {
  ro: {
    title: "Software Personalizat, SaaS & Soluții AI pentru Afaceri din Moldova",
    description:
      "Software personalizat, platforme SaaS, chatbot-uri AI, website-uri, automatizări, conținut AI și e-learning pentru IMM-uri din Republica Moldova.",
  },
  en: {
    title: "Custom Software, SaaS & AI Solutions for Businesses in Moldova",
    description:
      "Custom software, SaaS platforms, AI chatbots, websites, automation, AI content and e-learning for SMEs in the Republic of Moldova.",
  },
  ru: {
    title: "Индивидуальное ПО, SaaS и AI-решения для бизнеса в Молдове",
    description:
      "Индивидуальное ПО, SaaS-платформы, AI-чатботы, сайты, автоматизация, AI-контент и e-learning для малого и среднего бизнеса Молдовы.",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale
  const m = META[locale]
  const url = urlFor(locale, "/solutions")

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        "x-default": urlFor("ro", "/solutions"),
        ro: urlFor("ro", "/solutions"),
        en: urlFor("en", "/solutions"),
        ru: urlFor("ru", "/solutions"),
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: "TINKA AI",
      type: "website",
      images: [{ url: "https://tinka.md/image/og-image.webp", width: 1200, height: 630 }],
    },
  }
}

function SolutionsJSONLD({ locale }: { locale: Locale }) {
  const url = urlFor(locale, "/solutions")
  const dict = DICTS[locale] ?? DICTS.ro
  const solutions = dict.solutions as unknown as Record<string, { title: string }>

  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: META[locale].title,
    description: META[locale].description,
    url,
    inLanguage: locale,
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: solutions[service.key]?.title ?? service.slug,
        url: urlFor(locale, `/solutions/${service.slug}`),
        provider: { "@id": "https://tinka.md/#business" },
      },
    })),
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

export default async function SolutionsPage({ params }: Props) {
  const { locale: raw } = await params
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale
  return (
    <>
      <SolutionsJSONLD locale={locale} />
      <SolutionsClient />
    </>
  )
}
