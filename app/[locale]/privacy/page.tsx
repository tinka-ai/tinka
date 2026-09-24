// app/[locale]/privacy/page.tsx — Server Component (necesar pentru metadata SEO)
import type { Metadata } from "next"
import type { Locale } from "@/contexts/locale-context"
import PrivacyClient from "./PrivacyClient"

const LOCALES: Locale[] = ["ro", "en", "ru"]

function urlFor(locale: Locale, path: string) {
  const prefix = locale === "ro" ? "" : `/${locale}`
  return `https://tinka.md${prefix}${path}`
}

const META: Record<Locale, { title: string; description: string }> = {
  ro: {
    title: "Politica de Confidențialitate",
    description:
      "Politica de confidențialitate TINKA AI: ce date colectăm, cum le folosim, cui le transmitem și cum îți poți exercita drepturile GDPR când folosești site-ul sau serviciile noastre.",
  },
  en: {
    title: "Privacy Policy",
    description:
      "TINKA AI's privacy policy: what data we collect, how we use it, who we share it with, and how to exercise your GDPR rights when using our website or services.",
  },
  ru: {
    title: "Политика конфиденциальности",
    description:
      "Политика конфиденциальности TINKA AI: какие данные мы собираем, как их используем, кому передаём и как вы можете реализовать свои права по GDPR при использовании нашего сайта или услуг.",
  },
}

const OG_LOCALE: Record<Locale, string> = { ro: "ro_MD", en: "en_US", ru: "ru_MD" }

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale
  const m = META[locale]
  const url = urlFor(locale, "/privacy")

  return {
    title: m.title,
    description: m.description,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: url,
      languages: {
        "x-default": urlFor("ro", "/privacy"),
        ro: urlFor("ro", "/privacy"),
        en: urlFor("en", "/privacy"),
        ru: urlFor("ru", "/privacy"),
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

function PrivacyJSONLD({ locale }: { locale: Locale }) {
  const m = META[locale]
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: m.title,
    url: urlFor(locale, "/privacy"),
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
      <PrivacyJSONLD locale={locale} />
      <PrivacyClient />
    </>
  )
}
