import type React from "react"
import { Suspense } from "react"

import Providers from "@/app/providers"
import Navbar from "@/components/ui/navbar"
import ChatWidget from "@/components/tinka/ChatWidget"
import CookieConsent from "@/components/CookieConsent"
import type { Locale } from "@/contexts/locale-context"

/**
 * Structura vizuala comuna a site-ului public (navbar + continut + chat +
 * cookie banner), partajata intre app/[locale]/layout.tsx si orice alt
 * layout radacina care are nevoie de acelasi shell (de ex. admin).
 */
export default function SiteChrome({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  return (
    <Providers initialLocale={initialLocale}>
      <Suspense fallback={null}>
        <header role="banner">
          <Navbar />
        </header>

        <main id="main-content" role="main">
          {children}
        </main>

        <footer role="contentinfo"></footer>
        <ChatWidget />
        <CookieConsent />
      </Suspense>
    </Providers>
  )
}
