import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import "../globals.css"

// Pagini de privacy policy pentru aplicatiile mobile TINKA AI (Google Play).
// Arbore radacina separat de app/[locale]/layout.tsx, fara Navbar/ChatWidget/
// LocaleProvider din site-ul public — document de conformitate, nu continut
// de marketing, deci nu are nevoie de localizare.
export const metadata: Metadata = {
  metadataBase: new URL("https://tinka.md"),
  robots: { index: true, follow: true },
}

export default function AppPrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}
