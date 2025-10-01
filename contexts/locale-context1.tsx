"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ro } from "@/locales/ro"
import { en } from "@/locales/en"
import { ru } from "@/locales/ru"

// dicionare disponibile
const DICTS = { ro, en, ru } as const

export type Locale = keyof typeof DICTS // "ro" | "en" | "ru"
export const defaultLocale: Locale = "ro"
type Dict = typeof ro

// merge cu fallback (combină dict-ul selectat peste RO)
function isObj(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v)
}
function mergeDeep<T extends Record<string, any>>(base: T, over?: Partial<T>): T {
  if (!over) return base
  const out: any = Array.isArray(base) ? [...base] : { ...base }
  for (const k of Object.keys(over)) {
    const sv = (over as any)[k]
    const bv = (base as any)[k]
    out[k] = isObj(bv) && isObj(sv) ? mergeDeep(bv, sv) : sv
  }
  return out
}

type LocaleContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dict
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  // Încarcă limba din localStorage (client-only)
  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = window.localStorage.getItem("locale") as Locale | null
    if (saved && saved in DICTS) setLocaleState(saved)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== "undefined") window.localStorage.setItem("locale", newLocale)
  }

  // Fallback la RO pentru cheile lipsă
  const t = mergeDeep(ro, DICTS[locale])

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider")
  return ctx
}
