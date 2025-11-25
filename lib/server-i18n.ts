// lib/server-i18n.ts

import { translations, type Locale, defaultLocale } from "./i18n"

/**
 * Returnează dictionarul pentru o anumită limbă.
 * Dacă limba nu există, folosim limba implicită.
 */
export async function getDictionary(locale: Locale) {
  return translations[locale] || translations[defaultLocale]
}

export type { Locale }
