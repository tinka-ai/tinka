// lib/server-i18n.ts
import { translations, defaultLocale, type Locale } from "@/lib/i18n"
export async function getTranslations(locale?: Locale) {
  const loc = locale || defaultLocale
  return translations[loc] || translations[defaultLocale]
}
