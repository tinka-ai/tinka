// lib/server-i18n.ts
import { translations, defaultLocale, type Locale } from "@/lib/i18n"

export async function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale] ?? translations[defaultLocale]
}
