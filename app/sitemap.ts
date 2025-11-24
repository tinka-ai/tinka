import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tinka.md"
  const now = new Date()

  const pages = [
    "",
    "/solutions",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ]

  const languages = ["", "/en", "/ru"]

  return pages.flatMap((page) =>
    languages.map((lang) => {
      const url = `${baseUrl}${lang}${page}`

      return {
        url,
        lastModified: now,
        changeFrequency: "monthly",
        priority: page === "" ? 1.0 : 0.8,

        // HREFLANG pentru Google
        alternates: {
          languages: {
            "ro-MD": `${baseUrl}${page}`,
            "en-US": `${baseUrl}/en${page}`,
            "ru-MD": `${baseUrl}/ru${page}`,
          },
        },
      }
    })
  )
}
