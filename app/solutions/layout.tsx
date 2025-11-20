// app/solutions/layout.tsx
import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://tinka.md"),

  // Titlu SEO pentru /solutions (root layout va adăuga "| TINKA AI")
  title: "Soluții AI & Web Design în Moldova – Chatbot, Website, Automatizări",

  description:
    "Descoperă soluțiile TINKA AI pentru afaceri din Moldova: website-uri moderne, magazine online, chatboți AI, integrări WhatsApp, CRM și automatizări care reduc costurile și cresc conversiile.",

  keywords: [
    "solutii AI Moldova",
    "creare site Moldova",
    "web design Chisinau",
    "dezvoltare website Moldova",
    "chatbot AI Moldova",
    "automatizari business Moldova",
    "digitalizare IMM Moldova",
  ],

  alternates: {
    canonical: "/solutions",
  },

  openGraph: {
    title: "Soluții AI & Web Design în Moldova – Chatbot, Website, Automatizări",
    description:
      "Website-uri moderne, magazine online, chatboți AI, integrări WhatsApp, CRM și automatizări pentru afaceri din Republica Moldova.",
    url: "https://tinka.md/solutions",
    siteName: "TINKA AI",
    locale: "ro_MD",
    type: "website",
  },
}

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
