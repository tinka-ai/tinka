'use client'

import { useLocale } from "@/contexts/locale-context"

export default function LocaleClientWrapper({
  children,
}: {
  children: (t: (path: string) => string) => React.ReactNode
}) {
  const { t: T } = useLocale() as any

  const t = (path: string) =>
    path.split(".").reduce((acc: any, k: string) => acc?.[k], T) ?? path

  return <>{children(t)}</>
}
