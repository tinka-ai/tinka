"use client"

import { useLocale } from "@/contexts/locale-context"

export default function PrivacyClient() {
  const { t } = useLocale()
  const p = t.privacy

  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-foreground">{p.title}</h1>
      <p className="mt-3 text-muted-foreground">
        {p.updated}: {new Date().toLocaleDateString()}
      </p>
      <div className="mt-8 prose prose-invert max-w-none">
        <p>{p.intro}</p>
      </div>
    </main>
  )
}
