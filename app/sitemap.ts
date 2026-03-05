import type { MetadataRoute } from "next"
import { articles } from "./blog/blogData"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tinka.md"
  const now = new Date()

  const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "",           priority: 1.0, changeFrequency: "weekly"  },
    { path: "/solutions", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about",     priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact",   priority: 0.8, changeFrequency: "monthly" },
    { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog",      priority: 0.9, changeFrequency: "weekly"  },
    { path: "/privacy",   priority: 0.4, changeFrequency: "yearly"  },
    { path: "/terms",     priority: 0.4, changeFrequency: "yearly"  },
  ]

  const staticEntries = staticPages.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        "x-default": `${baseUrl}${path}`,
        "ro": `${baseUrl}${path}`,
      },
    },
  }))

  const blogEntries = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        "x-default": `${baseUrl}/blog/${article.slug}`,
        "ro": `${baseUrl}/blog/${article.slug}`,
      },
    },
  }))

  return [...staticEntries, ...blogEntries]
}
