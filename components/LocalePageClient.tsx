'use client'

import { useLocale } from "@/contexts/locale-context"

export default function LocalePageClient({ children }: { children: (t: any) => React.ReactNode }) {
  const { t: T } = useLocale() as any

  const t = (path: string) =>
    path.split(".").reduce((acc: any, k: string) => acc?.[k], T) ?? path

  return <>{children(t)}</>
}
