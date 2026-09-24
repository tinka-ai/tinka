import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { articles } from "@/app/blog/blogData"
import type { Locale } from "@/contexts/locale-context"
import ArticleClient from "./ArticleClient"

const LOCALES: Locale[] = ["ro", "en", "ru"]

function urlFor(locale: Locale, path: string) {
  const prefix = locale === "ro" ? "" : `/${locale}`
  return `https://tinka.md${prefix}${path}`
}

const OG_LOCALE: Record<Locale, string> = { ro: "ro_MD", en: "en_US", ru: "ru_MD" }

// Next.js 15: params este acum o Promise, trebuie facut await inainte de folosire.
// locale-ul e furnizat de generateStaticParams-ul parintelui (app/[locale]/layout.tsx);
// aici doar fanam slug-urile pe fiecare din cele 3 limbi.
type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  const t = article.translations[locale] ?? article.translations.ro
  const ogImage = article.image ?? "https://tinka.md/image/og-image.webp"
  const path = `/blog/${slug}`
  const url = urlFor(locale, path)

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: url,
      languages: {
        "x-default": urlFor("ro", path),
        ro: urlFor("ro", path),
        en: urlFor("en", path),
        ru: urlFor("ru", path),
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url,
      siteName: "TINKA AI",
      locale: OG_LOCALE[locale],
      type: "article",
      publishedTime: article.date,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [ogImage],
    },
  }
}

function ArticleJSONLD({ article, locale }: { article: (typeof articles)[number]; locale: Locale }) {
  const t = article.translations[locale] ?? article.translations.ro
  const url = urlFor(locale, `/blog/${article.slug}`)
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: t.title,
    description: t.description,
    url,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: locale,
    image: article.image ?? "https://tinka.md/image/og-image.webp",
    author: { "@id": "https://tinka.md/#business" },
    publisher: { "@id": "https://tinka.md/#business" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  // Script simplu, randat pe server — NU next/script (acela injecteaza
  // continutul doar client-side, in payload-ul RSC, invizibil pentru
  // crawlerele care nu executa JS: Googlebot in unele cazuri si aproape
  // toate crawlerele AI: GPTBot, PerplexityBot, ClaudeBot etc.).
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default async function ArticlePage({ params }: Props) {
  const { locale: raw, slug } = await params
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()
  return (
    <>
      <ArticleJSONLD article={article} locale={locale} />
      <ArticleClient article={article} />
    </>
  )
}
