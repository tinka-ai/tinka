"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ro } from "@/locales/ro"
import { en } from "@/locales/en"
import { ru } from "@/locales/ru"

const DICTS = { ro, en, ru } as const

export type Locale = keyof typeof DICTS
export const defaultLocale: Locale = "ro"

type Dict = typeof ro

/** 
 * Funcție pentru a extrage o valoare profundă din dicționar.
 * Dacă nu există → returnează numele cheii ca fallback.
 */
function getValue(dict: any, path: string): string {
  const parts = path.split(".")
  let current = dict

  for (const p of parts) {
    if (current && typeof current === "object" && p in current) {
      current = current[p]
    } else {
      return `[${path}]` // fallback profesional
    }
  }

  if (typeof current === "string") return current
  return `[${path}]`
}

type LocaleContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: any
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

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

  /** Obiect T care permite accesul prin metode: T("hero.title") */
  const t = new Proxy(
    {},
    {
      get: (_, prop: string) => {
        return getValue(DICTS[locale], prop)
      },
    }
  )

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
