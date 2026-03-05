import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tinka.md"
  const now = new Date()

  // Only include pages that actually exist and are accessible
  const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "",            priority: 1.0, changeFrequency: "weekly"  },
    { path: "/solutions",  priority: 0.9, changeFrequency: "monthly" },
    { path: "/about",      priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact",    priority: 0.8, changeFrequency: "monthly" },
    { path: "/portfolio",  priority: 0.8, changeFrequency: "monthly" },
    { path: "/privacy",    priority: 0.4, changeFrequency: "yearly"  },
    { path: "/terms",      priority: 0.4, changeFrequency: "yearly"  },
  ]

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        "x-default": `${baseUrl}${path}`,
        "ro":        `${baseUrl}${path}`,
      },
    },
  }))
}
