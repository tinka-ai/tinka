"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ro } from "@/locales/ro"
import { en } from "@/locales/en"
import { ru } from "@/locales/ru"

const DICTS = { ro, en, ru } as const
export type Locale = keyof typeof DICTS
export const defaultLocale: Locale = "ro"

/** 
 * Extrage o cheie din dicționar cu sintaxa dot notation
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
  t: any // Obiectul dicționar complet + funcție prin proxy
  tFunc: (path: string) => string // Funcția explicită pentru stringuri
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode
  initialLocale?: Locale
}) {
  // Sursa de adevar e URL-ul (segmentul /en//ru/, absent pentru ro) — vine ca
  // prop din app/[locale]/layout.tsx. Nu mai citim din localStorage la montare:
  // altfel o valoare veche ar suprascrie brusc limba unei pagini /en/... cu ru,
  // dupa hidratare.
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  // La navigare client-side intre /en/... si /ru/..., layout-ul server ii
  // trimite acestui provider un initialLocale nou, dar App Router nu
  // remonteaza automat provider-ul doar pentru ca s-a schimbat parametrul
  // dinamic — sincronizam explicit starea cu prop-ul (derivat mereu din URL,
  // nu din localStorage, deci nu reintroduce bug-ul de mai sus).
  useEffect(() => {
    setLocaleState(initialLocale)
  }, [initialLocale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", newLocale)
    }
  }

  const dict = DICTS[locale]
  
  // ✅ Funcție explicită pentru sintaxa t("path.to.string")
  const tFunc = (path: string) => getValue(dict, path)
  
  // ✅ t poate fi folosit și ca funcție și ca obiect
  // Când este apelat ca funcție: t("hero.title")
  // Când este accesat ca obiect: t.hero.title
  const t: any = new Proxy(
    (path: string) => getValue(dict, path),
    {
      get: (target, prop) => {
        if (typeof prop === 'string') {
          return dict[prop]
        }
        return undefined
      }
    }
  )

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, tFunc }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider")
  return ctx
}
