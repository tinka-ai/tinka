// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"  // ⬅️ GA4 necesar

import "./globals.css"

import Providers from "./providers"
import Navbar from "@/components/ui/navbar"

export const metadata: Metadata = {
  metadataBase: new URL("https://tinka.md"),

  title: {
    default: "TINKA AI – Soluții AI & Web Design pentru Afaceri din Moldova",
    template: "%s | TINKA AI",
  },

  description:
    "TINKA AI creează site-uri moderne, magazine online, chatboți AI și automatizări pentru companii și liber-profesioniști din Republica Moldova. Digital, simplu, eficient.",

  keywords: [
    "TINKA AI",
    "solutii AI Moldova",
    "web design Moldova",
    "creare site Chisinau",
    "chatbot AI Moldova",
    "automatizari business Moldova",
    "site pentru afaceri",
  ],

  generator: "v0.app",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "TINKA AI – Soluții AI & Web Design pentru Afaceri din Moldova",
    description:
      "Site-uri moderne, AI chatboți și automatizări pentru companii și liber-profesioniști din Republica Moldova.",
    url: "https://tinka.md/",
    siteName: "TINKA AI",
    locale: "ro_MD",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" suppressHydrationWarning>

      {/* 🔥 GA4 – Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-MLE4N46EN9"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MLE4N46EN9');
        `}
      </Script>

      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground`}>
        <Providers>
          <Suspense fallback={null}>
            <Navbar />
            {children}
            <Analytics />
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
