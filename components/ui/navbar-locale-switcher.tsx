"use client"

import { useLocale } from "@/contexts/locale-context"

export function PlainNavLink() {
  const { locale, setLocale } = useLocale()

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as any)}
      className="bg-transparent text-sm text-muted-foreground outline-none cursor-pointer"
      aria-label="Selectează limba"
    >
      <option value="ro">RO</option>
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  )
}
