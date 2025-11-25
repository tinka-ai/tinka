"use client"

import { useLocale } from "@/contexts/locale-context"

export default function T({ path }: { path: string }) {
  const { t } = useLocale()

  // "hero.title" → ["hero", "title"]
  const keys = path.split(".")

  // navigăm prin obiectul de traduceri
  let value: any = t
  for (const k of keys) {
    if (!value || typeof value !== "object") return path // fallback
    value = value[k]
  }

  // dacă nu există cheia → returnăm path pentru debug
  return value ?? path
}
