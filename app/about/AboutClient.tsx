"use client"

import { useLocale } from "@/contexts/locale-context"

export default function AboutClient() {
  const { t } = useLocale()
  const a = t.about

  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-foreground">{a.title}</h1>
      <p className="mt-3 text-muted-foreground">{a.subtitle}</p>
      <div className="mt-8 prose prose-invert max-w-none">
        <p>{a.content}</p>
      </div>
    </main>
  )
}
