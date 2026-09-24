"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminNotFound() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/admin")
    }, 5000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-8xl font-extrabold bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Pagina nu a fost găsită</h2>
          <p className="text-muted-foreground">
            Această pagină nu există sau a fost mutată.
            <br />
            Vei fi redirecționat automat în{" "}
            <span className="text-sky-400 font-semibold">5 secunde</span>.
          </p>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors"
        >
          ← Înapoi la admin
        </Link>
      </div>
    </div>
  )
}
