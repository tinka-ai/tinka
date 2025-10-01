"use client"

import { useLocale } from "@/contexts/locale-context"

export default function SolutionsClient() {
  const { t } = useLocale()
  const s = t.solutions
  const items = Array.isArray(s.items) && s.items.length ? s.items : []

  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-foreground">{s.title}</h1>
      <p className="mt-3 text-muted-foreground">{s.subtitle}</p>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, idx) => (
          <div key={idx} className="rounded-xl border border-border p-6">
            <h3 className="text-xl font-semibold text-foreground">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
