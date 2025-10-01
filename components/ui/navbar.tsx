// components/ui/navbar.tsx
"use client"

import Link from "next/link"
import { Globe } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"

export function Navbar() {
  const { locale, setLocale, t } = useLocale()

  const langs = [
    { code: "ro", label: "Română" },
    { code: "ru", label: "Русский" },
    { code: "en", label: "English" },
  ]

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1150px,95%)]">
      <nav className="flex items-center justify-between rounded-2xl border border-border bg-card/90 backdrop-blur px-4 py-2">
        {/* stânga: logo + linkuri */}
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold tracking-tight text-foreground">
            TINKA AI <span className="hidden sm:inline">SRL</span>
          </Link>

          <div className="hidden md:flex items-center gap-4 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              {t?.footer?.home ?? "Acasă"}
            </Link>
            <Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">
              {t?.footer?.solutions ?? "Soluții"}
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              {t?.footer?.about ?? "Despre"}
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              {t?.footer?.contact ?? "Contact"}
            </Link>
          </div>
        </div>

        {/* dreapta: comutator de limbă (fără butonul Contact) */}
        <div className="flex items-center gap-3">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-1 rounded-full bg-background/60 p-1 border border-border">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => setLocale(l.code as any)}
                className={`px-3 py-1 rounded-full text-xs md:text-sm transition-colors ${
                  locale === l.code
                    ? "bg-primary-foreground text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={locale === l.code}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
