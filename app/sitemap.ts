import type { MetadataRoute } from "next"
import { articles } from "./blog/blogData"
import { TRANSCRIBER_ENABLED } from "@/lib/featureFlags"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tinka.md"
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

  // NOTĂ: site-ul afișează EN/RU doar client-side (comutator de limbă), fără
  // URL-uri separate per limbă — deci nu există încă pagini distincte pe care
  // Google le poate indexa în engleză/rusă. Declararea unor alternates hreflang
  // "en"/"ru" către exact același URL ca "ro" e invalidă (hreflang cere URL-uri
  // distincte per limbă) și poate genera erori în Search Console, așa că le-am
  // scos până când site-ul are rute reale /en/ și /ru/ cu conținut randat pe server.
  const languages = {
    "x-default": "",
    "ro": "",
  }

  const staticEntries = staticPages.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        Object.keys(languages).map((lang) => [
          lang,
          `${baseUrl}${path}`,
        ])
      ),
    },
  }))

  const blogEntries = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: Object.fromEntries(
        Object.keys(languages).map((lang) => [
          lang,
          `${baseUrl}/blog/${article.slug}`,
        ])
      ),
    },
  }))

  return [...staticEntries, ...blogEntries]
}
