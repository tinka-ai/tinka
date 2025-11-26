"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ro } from "@/locales/ro"
import { en } from "@/locales/en"
import { ru } from "@/locales/ru"

const DICTS = { ro, en, ru } as const
export type Locale = keyof typeof DICTS
export const defaultLocale: Locale = "ro"

/** 
 * Extrage o cheie din dicționar fără fallback la altă limbă.
 * Dacă lipsește → returnează [path] pentru debugging.
 */
function getValue(dict: any, path: string): string {
  const parts = path.split(".")
  let current = dict
  for (const p of parts) {
    if (current && typeof current === "object" && p in current) {
      current = current[p]
    } else {
      return `[${path}]`
    }
  }
  return typeof current === "string" ? current : `[${path}]`
}

type LocaleContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: any  // ✅ Poate fi și funcție și obiect
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  // Load saved language from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = window.localStorage.getItem("locale") as Locale | null
    if (saved && saved in DICTS) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", newLocale)
    }
  }

  // ✅ HACK: t este și funcție și obiect în același timp
  const dict = DICTS[locale]
  
  // Creăm o funcție care are și proprietăți ale obiectului
  const t: any = (path: string) => getValue(dict, path)
  
  // Adăugăm toate proprietățile dicționarului la funcție
  Object.assign(t, dict)

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider")
  return ctx
}
