// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

import Providers from "./providers"
import Navbar from "@/components/ui/navbar" // 👈 import Navbar

export const metadata: Metadata = {
  title: "TINKA AI - Transformare Digitală prin Inteligență Artificială",
  description:
    "Soluții AI personalizate pentru automatizare, chatbot-uri inteligente și integrări enterprise",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground`}>
        <Providers>
          <Suspense fallback={null}>
            <Navbar /> {/* 👈 apare pe toate paginile */}
            {children}
            <Analytics />
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
