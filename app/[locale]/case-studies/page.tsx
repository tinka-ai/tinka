// app/[locale]/case-studies/page.tsx
export const dynamic = "force-dynamic"
export const revalidate = 0

import type { Metadata } from "next"
import type { Locale } from "@/contexts/locale-context"
import CaseStudiesClient from "./CaseStudiesClient"

const LOCALES: Locale[] = ["ro", "en", "ru"]

function urlFor(locale: Locale, path: string) {
  const prefix = locale === "ro" ? "" : `/${locale}`
  return `https://tinka.md${prefix}${path}`
}

const META: Record<Locale, { title: string; description: string }> = {
  ro: {
    title: "Caz de studiu: automatizare Facebook & Instagram cu AI",
    description:
      "Cum rulăm chiar propriile pagini de Facebook și Instagram cu un agent AI — conținut, imagini și publicare automate, inclusiv partea unde s-a stricat și am reparat-o.",
  },
  en: {
    title: "Case study: AI Facebook & Instagram automation",
    description:
      "How we run our own Facebook and Instagram pages with an AI agent — automated content, images and publishing, including the part where it broke and we fixed it.",
  },
  ru: {
    title: "Кейс: автоматизация Facebook и Instagram с AI",
    description:
      "Как мы ведём собственные страницы Facebook и Instagram с помощью AI-агента — автоматический контент, изображения и публикация, включая момент поломки и починки.",
  },
}

const OG_LOCALE: Record<Locale, string> = { ro: "ro_MD", en: "en_US", ru: "ru_MD" }

const BREADCRUMB: Record<Locale, { home: string; caseStudies: string }> = {
  ro: { home: "Acasă", caseStudies: "Cazuri de Studiu" },
  en: { home: "Home", caseStudies: "Case Studies" },
  ru: { home: "Главная", caseStudies: "Кейсы" },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale
  const m = META[locale]
  const url = urlFor(locale, "/case-studies")

  return {
    title: m.title,
    description: m.description,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: url,
      languages: {
        "x-default": urlFor("ro", "/case-studies"),
        ro: urlFor("ro", "/case-studies"),
        en: urlFor("en", "/case-studies"),
        ru: urlFor("ru", "/case-studies"),
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      type: "article",
      siteName: "TINKA AI",
      locale: OG_LOCALE[locale],
      images: [{ url: "https://tinka.md/image/og-image.webp", width: 1200, height: 630, alt: m.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: ["https://tinka.md/image/og-image.webp"],
    },
  }
}

const FAQ_BY_LOCALE: Record<Locale, { q: string; a: string }[]> = {
  ro: [
    {
      q: "Cine scrie textele postărilor?",
      a: "Un agent AI, configurat cu reguli clare: fără cifre inventate, fără testimoniale false, fără pretenții nedemonstrabile.",
    },
    {
      q: "Ce se întâmplă dacă generarea imaginii eșuează?",
      a: "Sistemul trece automat pe un al doilea furnizor de generare imagini, fără intervenție manuală. Din octombrie 2026, nicio postare nu a mai ieșit fără imagine.",
    },
    {
      q: "Pot avea și eu acest sistem pentru afacerea mea?",
      a: "Da — e exact serviciul de automatizare postări Facebook & Instagram, de la 150 €/lună.",
    },
  ],
  en: [
    {
      q: "Who writes the post text?",
      a: "An AI agent, configured with clear rules: no invented numbers, no fake testimonials, no unprovable claims.",
    },
    {
      q: "What happens if image generation fails?",
      a: "The system automatically switches to a second image-generation provider, with no manual intervention. Since October 2026, no post has gone out without an image.",
    },
    {
      q: "Can I get this system for my own business?",
      a: "Yes — it's exactly the Facebook & Instagram post automation service, starting from €150/month.",
    },
  ],
  ru: [
    {
      q: "Кто пишет тексты постов?",
      a: "AI-агент, настроенный с чёткими правилами: никаких выдуманных цифр, никаких фальшивых отзывов, никаких бездоказательных заявлений.",
    },
    {
      q: "Что происходит, если генерация изображения не удаётся?",
      a: "Система автоматически переключается на второго провайдера генерации изображений, без ручного вмешательства. С октября 2026 года ни один пост не вышел без изображения.",
    },
    {
      q: "Можно ли получить такую систему для своего бизнеса?",
      a: "Да — это услуга автоматизации постов в Facebook и Instagram, от 150 €/месяц.",
    },
  ],
}

function CaseStudyJSONLD({ locale }: { locale: Locale }) {
  const m = META[locale]
  const url = urlFor(locale, "/case-studies")
  const bc = BREADCRUMB[locale]
  const faqs = FAQ_BY_LOCALE[locale]

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: bc.home, item: urlFor(locale, "") || urlFor(locale, "/") },
          { "@type": "ListItem", position: 2, name: bc.caseStudies, item: url },
        ],
      },
      {
        "@type": "Article",
        headline: m.title,
        description: m.description,
        url,
        inLanguage: locale,
        datePublished: "2026-11-12",
        dateModified: "2026-11-12",
        author: { "@id": "https://tinka.md/#business" },
        publisher: { "@id": "https://tinka.md/#business" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale
  return (
    <>
      <CaseStudyJSONLD locale={locale} />
      <CaseStudiesClient />
    </>
  )
}
