"use client"

import { useLocale } from "@/contexts/locale-context"

export default function T({ path }: { path: string }) {
  const { t } = useLocale()

  const keys = path.split(".")
  let value: any = t

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k]
    } else {
      return ""   // ✔️ nu arătăm [hero.title]
    }
  }

  // Dacă valoarea este string → afișăm
  if (typeof value === "string") return value

  // Dacă din greșeală este alt tip → nu afișăm nimic
  return ""
}
