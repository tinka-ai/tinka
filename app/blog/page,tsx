"use client"

import Link from "next/link"
import { useLocale } from "@/contexts/locale-context"
import { articles, categories, blogUI, type Locale } from "./blogData"
import Footer from "@/components/ui/footer"

export default function BlogPage() {
  const { locale } = useLocale() as { locale: Locale }
  const ui = blogUI[locale] ?? blogUI.ro
  const cats = categories[locale] ?? categories.ro

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="pt-32 pb-16 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
            {ui.title}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {ui.subtitle}
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const t = article.translations[locale] ?? article.translations.ro
              const cat = (cats as any)[article.category] ?? article.category
              return (
                <article
                  key={article.slug}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-sky-500/40 hover:bg-white/8 transition-all duration-300"
                >
                  {/* Category + Date */}
                  <div className="flex items-center justify-between px-6 pt-6 pb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                      {cat}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(article.date).toLocaleDateString(locale === "ru" ? "ru-RU" : locale === "en" ? "en-GB" : "ro-RO", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 px-6 pb-6 space-y-3">
                    <h2 className="text-lg font-bold text-gray-100 group-hover:text-sky-300 transition-colors leading-snug">
                      {t.title}
                    </h2>
                    <p className="text-sm text-gray-400 line-clamp-3 flex-1">
                      {t.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gray-500">
                        {article.readTime} {ui.readTime}
                      </span>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                      >
                        {ui.readMore} →
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-2xl px-4 text-center space-y-4">
          <p className="text-gray-400">{ui.cta}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors"
          >
            Contact →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
