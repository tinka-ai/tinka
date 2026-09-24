"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LocaleLink } from "@/components/ui/locale-link"
import { useLocale } from "@/contexts/locale-context"

const TEXT = {
  ro: { title: "Pagina nu a fost găsită", body: "Această pagină nu există sau a fost mutată.", redirect: "Vei fi redirecționat automat în", seconds: "5 secunde", back: "← Înapoi acasă" },
  en: { title: "Page not found", body: "This page doesn't exist or has been moved.", redirect: "You'll be redirected automatically in", seconds: "5 seconds", back: "← Back home" },
  ru: { title: "Страница не найдена", body: "Эта страница не существует или была перемещена.", redirect: "Вы будете перенаправлены автоматически через", seconds: "5 секунд", back: "← На главную" },
} as const

export default function NotFound() {
  const router = useRouter()
  const { locale } = useLocale()
  const t = TEXT[locale] ?? TEXT.ro
  const home = locale === "ro" ? "/" : `/${locale}`

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(home)
    }, 5000)
    return () => clearTimeout(timer)
  }, [router, home])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-8xl font-extrabold bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{t.title}</h2>
          <p className="text-muted-foreground">
            {t.body}
            <br />
            {t.redirect}{" "}
            <span className="text-sky-400 font-semibold">{t.seconds}</span>.
          </p>
        </div>

        <LocaleLink
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors"
        >
          {t.back}
        </LocaleLink>

        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-violet-500 rounded-full"
            style={{ animation: "shrink 5s linear forwards" }}
          />
        </div>

        <style>{`
          @keyframes shrink {
            from { width: 100%; }
            to   { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  )
}
