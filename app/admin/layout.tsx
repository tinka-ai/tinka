import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import "../globals.css"

// Panoul admin nu se indexeaza (vezi app/robots.ts) si nu foloseste
// localizare — ramane un arbore radacina separat de app/[locale]/layout.tsx,
// fara Navbar/ChatWidget/LocaleProvider din site-ul public.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}
