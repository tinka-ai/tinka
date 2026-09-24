import type { MetadataRoute } from "next"
import { articles } from "./blog/blogData"
import { TRANSCRIBER_ENABLED } from "@/lib/featureFlags"
import type { Locale } from "@/contexts/locale-context"
import { SERVICE_SLUGS } from "./[locale]/solutions/services-data"

const LOCALES: Locale[] = ["ro", "en", "ru"]
const baseUrl = "https://tinka.md"

function urlFor(locale: Locale, path: string) {
  const prefix = locale === "ro" ? "" : `/${locale}`
  return `${baseUrl}${prefix}${path}`
}

function alternatesFor(path: string) {
  return {
    languages: {
      "x-default": urlFor("ro", path),
      ro: urlFor("ro", path),
      en: urlFor("en", path),
      ru: urlFor("ru", path),
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: {
    path: string
    priority: number
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  }[] = [
    // ── Core pages ────────────────────────────────────────────
    { path: "",             priority: 1.0, changeFrequency: "weekly"  },
    { path: "/solutions",   priority: 0.9, changeFrequency: "monthly" },
    { path: "/about",       priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact",     priority: 0.8, changeFrequency: "monthly" },
    { path: "/portfolio",   priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog",        priority: 0.9, changeFrequency: "weekly"  },

    // ── Tinkora — produse (ascunse temporar din sitemap cât timp TRANSCRIBER_ENABLED === false) ──
    ...(TRANSCRIBER_ENABLED ? [
      { path: "/download",    priority: 0.9, changeFrequency: "weekly"  } as const,
      { path: "/cumparare",   priority: 0.9, changeFrequency: "monthly" } as const,
    ] : []),

    // ── Legal ─────────────────────────────────────────────────
    { path: "/privacy",     priority: 0.4, changeFrequency: "yearly"  },
    { path: "/terms",       priority: 0.4, changeFrequency: "yearly"  },
  ]

  // Fiecare pagina statica exista acum ca URL real si distinct in toate cele
  // 3 limbi (romana fara prefix, engleza/rusa cu /en, /ru) — cate o intrare
  // per limba, cu hreflang catre celelalte variante reale (nu mai e nevoie
  // de comentariul defensiv anterior, care evita exact aceasta situatie cat
  // timp nu existau rute distincte pentru en/ru).
  const staticEntries = staticPages.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: urlFor(locale, path),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: alternatesFor(path),
    }))
  )

  const blogEntries = articles.flatMap((article) =>
    LOCALES.map((locale) => ({
      url: urlFor(locale, `/blog/${article.slug}`),
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: alternatesFor(`/blog/${article.slug}`),
    }))
  )

  // Cele 9 pagini dedicate de servicii (/solutions/<slug>) — vezi
  // app/[locale]/solutions/services-data.ts pentru sursa unica a slug-urilor.
  const serviceEntries = SERVICE_SLUGS.flatMap((slug) =>
    LOCALES.map((locale) => ({
      url: urlFor(locale, `/solutions/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: alternatesFor(`/solutions/${slug}`),
    }))
  )

  return [...staticEntries, ...blogEntries, ...serviceEntries]
}
