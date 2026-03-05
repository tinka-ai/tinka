"use client"

import Link from "next/link"
import { useLocale } from "@/contexts/locale-context"
import { blogUI, type Article, type Locale } from "../blogData"
import Footer from "@/components/ui/footer"

// Simple markdown-like renderer for the content
function renderContent(content: string) {
  const lines = content.trim().split("\n")
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    if (!line) { i++; continue }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-gray-100 mt-10 mb-4">
          {line.replace("## ", "")}
        </h2>
      )
    }
    // H3
    else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-semibold text-sky-300 mt-8 mb-3">
          {line.replace("### ", "")}
        </h3>
      )
    }
    // Table
    else if (line.startsWith("|")) {
      const tableLines = []
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim())
        i++
      }
      const [header, , ...rows] = tableLines
      const headers = header.split("|").filter(Boolean).map(h => h.trim())
      elements.push(
        <div key={i} className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
            <thead className="bg-white/10">
              <tr>{headers.map((h, j) => <th key={j} className="px-4 py-2 text-left text-gray-200">{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, j) => (
                <tr key={j} className="border-t border-white/5">
                  {row.split("|").filter(Boolean).map((cell, k) => (
                    <td key={k} className="px-4 py-2 text-gray-400">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }
    // Bullet list
    else if (line.startsWith("- ")) {
      const items = []
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().replace("- ", ""))
        i++
      }
      elements.push(
        <ul key={i} className="list-disc pl-6 space-y-2 my-4 text-gray-300">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='text-gray-100'>$1</strong>") }} />
          ))}
        </ul>
      )
      continue
    }
    // Paragraph
    else {
      elements.push(
        <p key={i} className="text-gray-300 leading-relaxed my-4"
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong class='text-gray-100'>$1</strong>") }}
        />
      )
    }
    i++
  }
  return elements
}

export default function ArticleClient({ article }: { article: Article }) {
  const { locale } = useLocale() as { locale: Locale }
  const ui = blogUI[locale] ?? blogUI.ro
  const t = article.translations[locale] ?? article.translations.ro

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="pt-32 pb-10 border-b border-white/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link href="/blog" className="text-sm text-sky-400 hover:text-sky-300 transition-colors">
            {ui.backToBlog}
          </Link>

          <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-gray-100 leading-tight">
            {t.title}
          </h1>

          <p className="mt-4 text-lg text-gray-400">{t.description}</p>

          <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
            <span>{ui.by}</span>
            <span>·</span>
            <span>{new Date(article.date).toLocaleDateString(locale === "ru" ? "ru-RU" : locale === "en" ? "en-GB" : "ro-RO", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span>·</span>
            <span>{article.readTime} {ui.readTime}</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <article className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {renderContent(t.content)}
        </div>
      </article>

      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: t.title,
            description: t.description,
            datePublished: article.date,
            author: {
              "@type": "Organization",
              name: "TINKA AI",
              url: "https://tinka.md",
            },
            publisher: {
              "@type": "Organization",
              name: "TINKA AI",
              logo: { "@type": "ImageObject", url: "https://tinka.md/image/og-image.webp" },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": `https://tinka.md/blog/${article.slug}` },
          }),
        }}
      />

      {/* CTA */}
      <section className="py-12 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-8 text-center space-y-4">
            <p className="text-lg font-semibold text-gray-200">{ui.cta}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors"
            >
              Contact →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
