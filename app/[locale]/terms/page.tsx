// app/[locale]/terms/page.tsx — Server Component (necesar pentru metadata SEO)
import type { Metadata } from "next"
import type { Locale } from "@/contexts/locale-context"
import TermsClient from "./TermsClient"

const LOCALES: Locale[] = ["ro", "en", "ru"]

function urlFor(locale: Locale, path: string) {
  const prefix = locale === "ro" ? "" : `/${locale}`
  return `https://tinka.md${prefix}${path}`
}

const META: Record<Locale, { title: string; description: string }> = {
  ro: {
    title: "Termeni și Condiții",
    description:
      "Termenii și condițiile de utilizare a site-ului și serviciilor TINKA AI: software personalizat, platforme SaaS, chatbot-uri AI, automatizări și conținut generat cu AI.",
  },
  en: {
    title: "Terms and Conditions",
    description:
      "Terms and conditions for using the TINKA AI website and services: custom software, SaaS platforms, AI chatbots, automation and AI-generated content.",
  },
  ru: {
    title: "Условия использования",
    description:
      "Условия использования сайта и услуг TINKA AI: индивидуальное ПО, SaaS-платформы, AI-чатботы, автоматизация и AI-контент.",
  },
}

const OG_LOCALE: Record<Locale, string> = { ro: "ro_MD", en: "en_US", ru: "ru_MD" }

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale
  const m = META[locale]
  const url = urlFor(locale, "/terms")

  return {
    title: m.title,
    description: m.description,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: url,
      languages: {
        "x-default": urlFor("ro", "/terms"),
        ro: urlFor("ro", "/terms"),
        en: urlFor("en", "/terms"),
        ru: urlFor("ru", "/terms"),
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: "TINKA AI",
      locale: OG_LOCALE[locale],
      type: "website",
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

function TermsJSONLD({ locale }: { locale: Locale }) {
  const m = META[locale]
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: m.title,
    url: urlFor(locale, "/terms"),
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", name: "TINKA AI", url: "https://tinka.md" },
    publisher: { "@id": "https://tinka.md/#business" },
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale
  return (
    <>
      <TermsJSONLD locale={locale} />
      <TermsClient />
    </>
  )
}
