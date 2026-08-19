// app/blog/page.tsx — Server Component (necesar pentru metadata SEO)
import type { Metadata } from "next"
import BlogClient from "./BlogClient"

export const metadata: Metadata = {
  title: "Blog TINKA AI – Web Design, AI și Digitalizare în Moldova",
  description:
    "Articole practice despre web design, chatbot-uri AI, SEO local și digitalizare pentru afaceri din Republica Moldova.",
  keywords: [
    "blog TINKA AI",
    "web design Moldova",
    "SEO Moldova",
    "chatbot AI Moldova",
    "digitalizare IMM",
  ],

  alternates: {
    canonical: "https://tinka.md/blog",
    languages: {
      "x-default": "https://tinka.md/blog",
      "ro": "https://tinka.md/blog",
    },
  },

  openGraph: {
    title: "Blog TINKA AI – Web Design, AI și Digitalizare în Moldova",
    description:
      "Articole practice despre web design, chatbot-uri AI, SEO local și digitalizare pentru afaceri din Republica Moldova.",
    url: "https://tinka.md/blog",
    siteName: "TINKA AI",
    locale: "ro_MD",
    type: "website",
    images: [
      {
        url: "https://tinka.md/image/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Blog TINKA AI",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Blog TINKA AI",
    description:
      "Articole practice despre web design, chatbot-uri AI, SEO local și digitalizare pentru afaceri din Republica Moldova.",
    images: ["https://tinka.md/image/og-image.webp"],
  },
}

export default function Page() {
  return <BlogClient />
}
