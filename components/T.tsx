"use client"

import { useLocale } from "@/contexts/locale-context"

export default function T({ path }: { path: string }) {
  const { t } = useLocale()
  return t(path)
}
