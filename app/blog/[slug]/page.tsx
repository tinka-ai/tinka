import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { articles } from "../blogData"
import ArticleClient from "./ArticleClient"

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articles.find((a) => a.slug === params.slug)
  if (!article) return {}
  const t = article.translations.ro
  return {
    title: `${t.title} | TINKA AI Blog`,
    description: t.description,
    alternates: {
      canonical: `https://tinka.md/blog/${params.slug}`,
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://tinka.md/blog/${params.slug}`,
      siteName: "TINKA AI",
      locale: "ro_MD",
      type: "article",
      publishedTime: article.date,
    },
  }
}

export default function ArticlePage({ params }: Props) {
  const article = articles.find((a) => a.slug === params.slug)
  if (!article) notFound()
  return <ArticleClient article={article} />
}
