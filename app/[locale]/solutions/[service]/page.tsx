// app/[locale]/solutions/[service]/page.tsx
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { Locale } from "@/contexts/locale-context"
import { ro } from "@/locales/ro"
import { en } from "@/locales/en"
import { ru } from "@/locales/ru"
import { SERVICES, getServiceBySlug } from "../services-data"
import ServiceDetail from "./ServiceDetail"

const LOCALES: Locale[] = ["ro", "en", "ru"]
const DICTS = { ro, en, ru }

function urlFor(locale: Locale, path: string) {
  const prefix = locale === "ro" ? "" : `/${locale}`
  return `https://tinka.md${prefix}${path}`
}

const SUFFIX: Record<Locale, string> = {
  ro: "pentru afaceri din Moldova",
  en: "for businesses in Moldova",
  ru: "для бизнеса в Молдове",
}

const OG_LOCALE: Record<Locale, string> = { ro: "ro_MD", en: "en_US", ru: "ru_MD" }

const BACK_LABEL: Record<Locale, string> = {
  ro: "Toate soluțiile",
  en: "All solutions",
  ru: "Все решения",
}

const BREADCRUMB: Record<Locale, { home: string; solutions: string }> = {
  ro: { home: "Acasă", solutions: "Soluții" },
  en: { home: "Home", solutions: "Solutions" },
  ru: { home: "Главная", solutions: "Решения" },
}

type Props = { params: Promise<{ locale: string; service: string }> }

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, service: slug } = await params
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale
  const service = getServiceBySlug(slug)
  if (!service) return {}

  const dict = DICTS[locale] ?? DICTS.ro
  const data = (dict.solutions as any)[service.key]
  const title = `${data.title} ${SUFFIX[locale]}`
  const url = urlFor(locale, `/solutions/${slug}`)

  return {
    title,
    description: data.subtitle,
    alternates: {
      canonical: url,
      languages: {
        "x-default": urlFor("ro", `/solutions/${slug}`),
        ro: urlFor("ro", `/solutions/${slug}`),
        en: urlFor("en", `/solutions/${slug}`),
        ru: urlFor("ru", `/solutions/${slug}`),
      },
    },
    openGraph: {
      title,
      description: data.subtitle,
      url,
      siteName: "TINKA AI",
      locale: OG_LOCALE[locale],
      type: "website",
      images: [{ url: "https://tinka.md/image/og-image.webp", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: data.subtitle,
      images: ["https://tinka.md/image/og-image.webp"],
    },
  }
}

function ServiceJSONLD({ locale, slug, data }: { locale: Locale; slug: string; data: any }) {
  const url = urlFor(locale, `/solutions/${slug}`)
  const bc = BREADCRUMB[locale]

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: bc.home, item: urlFor(locale, "") || urlFor(locale, "/") },
          { "@type": "ListItem", position: 2, name: bc.solutions, item: urlFor(locale, "/solutions") },
          { "@type": "ListItem", position: 3, name: data.title, item: url },
        ],
      },
      {
        "@type": "Service",
        name: data.title,
        description: data.subtitle,
        serviceType: data.title,
        url,
        inLanguage: locale,
        provider: { "@id": "https://tinka.md/#business" },
        areaServed: { "@type": "Country", name: "Republica Moldova" },
      },
    ],
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  )
}

export default async function ServicePage({ params }: Props) {
  const { locale: raw, service: slug } = await params
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const dict = DICTS[locale] ?? DICTS.ro
  const data = (dict.solutions as any)[service.key]

  return (
    <>
      <ServiceJSONLD locale={locale} slug={slug} data={data} />
      <ServiceDetail
        data={data}
        icon={service.icon}
        color={service.color}
        borderColor={service.borderColor}
        backLabel={BACK_LABEL[locale]}
      />
    </>
  )
}
