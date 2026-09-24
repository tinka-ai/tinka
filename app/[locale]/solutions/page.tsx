// app/[locale]/solutions/page.tsx — SERVER COMPONENT
import type { Metadata } from "next"
import type { Locale } from "@/contexts/locale-context"
import SolutionsClient from "./SolutionsClient"

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

const SERVICE_NAMES: Record<Locale, string[]> = {
  ro: [
    "Chatbot AI",
    "Software Personalizat",
    "Web Design",
    "Platforme SaaS & Booking",
    "Automatizări Business",
    "Conținut & Media AI",
    "Platforme E-learning",
    "Consultanță Digitală",
  ],
  en: [
    "AI Chatbot",
    "Custom Software",
    "Web Design",
    "SaaS & Booking Platforms",
    "Business Automation",
    "AI Content & Media",
    "E-learning Platforms",
    "Digital Consulting",
  ],
  ru: [
    "AI чатбот",
    "Индивидуальное ПО",
    "Веб-дизайн",
    "SaaS и платформы бронирования",
    "Автоматизация бизнеса",
    "AI контент и медиа",
    "Платформы e-learning",
    "Цифровой консалтинг",
  ],
}

const ANCHORS = ["chatbots", "customSoftware", "websites", "saas", "automation", "aiContent", "elearning", "consulting"]

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
  const names = SERVICE_NAMES[locale]
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: META[locale].title,
    description: META[locale].description,
    url,
    inLanguage: locale,
    numberOfItems: names.length,
    itemListElement: names.map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name,
        url: `${url}#${ANCHORS[i]}`,
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
