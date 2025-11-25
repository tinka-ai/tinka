"use client"

import { useLocale } from "@/contexts/locale-context"

export default function T({ path }: { path: string }) {
  const { t } = useLocale()

  // Folosim direct proxy-ul
  const value = t[path]

  if (!value || typeof value !== "string") return ""
  return value
}
