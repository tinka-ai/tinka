// lib/server-i18n.ts
import { headers } from "next/headers"
import { locales, defaultLocale, translations, type Locale } from "@/lib/i18n"

// Detectează limba din header
function detectLocale(): Locale {
  try {
    const h = headers()
    const lang = h.get("x-locale") || h.get("accept-language") || ""

    const found = locales.find(l => lang.toLowerCase().startsWith(l))
    return found || defaultLocale
  } catch {
    return defaultLocale
  }
}

// Returnează traducerile pentru o anumită limbă
export async function getTranslations(locale?: Locale) {
  const loc = locale || detectLocale()
  return translations[loc] || translations[defaultLocale]
}
