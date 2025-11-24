"use client"

import { useLocale } from "@/contexts/locale-context"

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as any)}
      className="bg-transparent text-sm text-muted-foreground focus:outline-none"
    >
      <option value="ro">Română</option>
      <option value="ru">Русский</option>
      <option value="en">English</option>
    </select>
  )
}
