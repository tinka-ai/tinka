"use client"

import { useRouter, usePathname } from "next/navigation"
import { useLocale, type Locale } from "@/contexts/locale-context"

const PREFIXED: Locale[] = ["en", "ru"]

/** Elimina un prefix /en sau /ru de pe inceputul unei cai, daca exista. */
function stripLocalePrefix(pathname: string): string {
  for (const loc of PREFIXED) {
    if (pathname === `/${loc}`) return "/"
    if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1)
  }
  return pathname
}

export function PlainNavLink() {
  const { locale } = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (newLocale: Locale) => {
    const bare = stripLocalePrefix(pathname)
    const target = newLocale === "ro" ? bare : `/${newLocale}${bare === "/" ? "" : bare}`
    router.push(target)
  }

  return (
    <select
      value={locale}
      onChange={(e) => handleChange(e.target.value as Locale)}
      className="bg-transparent text-sm text-muted-foreground outline-none cursor-pointer"
      aria-label="Selectează limba"
    >
      <option value="ro">RO</option>
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  )
}
