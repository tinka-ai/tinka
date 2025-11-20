// app/sitemap.ts
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tinka.md"

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // când vei avea pagini separate (ex: /servicii, /contact etc.),
    // le vei adăuga aici, de exemplu:
    // {
    //   url: `${baseUrl}/servicii`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
  ]
}
