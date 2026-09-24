import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { articles } from "../blogData"
import ArticleClient from "./ArticleClient"

// Next.js 15: params este acum o Promise, trebuie facut await inainte de folosire.
type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  const t = article.translations.ro
  const ogImage = article.image ?? "https://tinka.md/image/og-image.webp"
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `https://tinka.md/blog/${slug}`,
      languages: {
        "x-default": `https://tinka.md/blog/${slug}`,
        "ro": `https://tinka.md/blog/${slug}`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://tinka.md/blog/${slug}`,
      siteName: "TINKA AI",
      locale: "ro_MD",
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

function ArticleJSONLD({ article }: { article: (typeof articles)[number] }) {
  const t = article.translations.ro
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: t.title,
    description: t.description,
    url: `https://tinka.md/blog/${article.slug}`,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "ro",
    image: article.image ?? "https://tinka.md/image/og-image.webp",
    author: { "@id": "https://tinka.md/#business" },
    publisher: { "@id": "https://tinka.md/#business" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://tinka.md/blog/${article.slug}`,
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
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()
  return (
    <>
      <ArticleJSONLD article={article} />
      <ArticleClient article={article} />
    </>
  )
}
