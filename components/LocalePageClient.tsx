"use client"

import { useLocale } from "@/contexts/locale-context"

export default function LocalePageClient({ children }: { children: React.ReactNode }) {
  const { t } = useLocale()

  return <>{children}</>
}
