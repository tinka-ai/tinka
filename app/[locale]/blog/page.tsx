// app/[locale]/blog/page.tsx — Server Component (necesar pentru metadata SEO)
import type { Metadata } from "next"
import type { Locale } from "@/contexts/locale-context"
import BlogClient from "./BlogClient"

const LOCALES: Locale[] = ["ro", "en", "ru"]

function urlFor(locale: Locale, path: string) {
  const prefix = locale === "ro" ? "" : `/${locale}`
  return `https://tinka.md${prefix}${path}`
}

const META: Record<Locale, { title: string; description: string }> = {
  ro: {
    title: "Blog TINKA AI – Web Design, AI și Digitalizare în Moldova",
    description:
      "Articole practice despre web design, chatbot-uri AI, SEO local și digitalizare pentru afaceri din Republica Moldova.",
  },
  en: {
    title: "TINKA AI Blog – Web Design, AI & Digital Transformation in Moldova",
    description:
      "Practical articles on web design, AI chatbots, local SEO and digital transformation for businesses in the Republic of Moldova.",
  },
  ru: {
    title: "Блог TINKA AI – Веб-дизайн, ИИ и цифровизация в Молдове",
    description:
      "Практические статьи о веб-дизайне, AI-чатботах, локальном SEO и цифровизации для бизнеса в Молдове.",
  },
}

const OG_LOCALE: Record<Locale, string> = { ro: "ro_MD", en: "en_US", ru: "ru_MD" }

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale
  const m = META[locale]
  const url = urlFor(locale, "/blog")

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        "x-default": urlFor("ro", "/blog"),
        ro: urlFor("ro", "/blog"),
        en: urlFor("en", "/blog"),
        ru: urlFor("ru", "/blog"),
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

export default function Page() {
  return <BlogClient />
}
