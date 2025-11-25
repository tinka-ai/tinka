"use client"

import { useLocale } from "@/contexts/locale-context"

export default function T({ path }: { path: string }) {
  const { t } = useLocale()

  // Ex: "hero.title" → ["hero", "title"]
  const keys = path.split(".")

  let value: any = t

  for (const k of keys) {
    if (value == null || typeof value !== "object") {
      return `[${path}]` // fallback sigur
    }
    value = value[k]
  }

  // Dacă valoarea finală NU există → fallback
  if (value === undefined || value === null) {
    return `[${path}]`
  }

  // Dacă valoarea este obiect (greșeală de structură)
  if (typeof value === "object") {
    return `[${path}]`
  }

  return value
}
