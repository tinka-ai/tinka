"use client"

import { useLocale } from "@/contexts/locale-context"

const LANGS = [
  { value: "ro", label: "Română" },
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" },
]

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as any)}
      className="bg-transparent text-sm text-foreground focus:outline-none"
    >
      {LANGS.map((l) => (
        <option key={l.value} value={l.value} className="text-black">
          {l.label}
        </option>
      ))}
    </select>
  )
}
