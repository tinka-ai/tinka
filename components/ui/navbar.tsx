// components/ui/navbar.tsx
"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Globe } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

type Lang = "ro" | "ru" | "en"

const LANGS: { value: Lang; label: string }[] = [
  { value: "ro", label: "Română" },
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" },
]

// Link cu efect slide-up: regular→bold la hover și bold persistent pe ruta activă
function AnimatedNavLink({
  href,
  children,
  className = "",
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  const pathname = usePathname()
  const isActive =
    pathname === href || (href !== "/" && pathname?.startsWith(href))

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`group relative inline-block h-[1.25em] overflow-hidden ${className}`}
    >
      {/* strat REGULAR */}
      <span
        className={`block text-sm text-muted-foreground transition-transform duration-200 ${
          isActive ? "-translate-y-full" : "group-hover:-translate-y-full"
        }`}
      >
        {children}
      </span>
      {/* strat BOLD */}
      <span
        className={`absolute left-0 top-0 block text-sm font-semibold text-foreground transition-transform duration-200 ${
          isActive ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
        }`}
      >
        {children}
      </span>
    </Link>
  )
}

function Navbar() {
  const { locale, setLocale, t } = useLocale()

  const labels = {
    home: t?.nav?.home ?? t?.footer?.home ?? "Acasă",
    solutions: t?.nav?.solutions ?? t?.footer?.solutions ?? "Soluții",
    about: t?.nav?.about ?? t?.footer?.about ?? "Despre",
    contact: t?.nav?.contact ?? t?.footer?.contact ?? "Contact",
  }

  return (
    <header className="sticky top-4 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card/70 backdrop-blur-md px-3 py-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-muted/40 transition-colors"
          >
            <Image
              src="/TINKA-AI Logo.png"
              alt="TINKA AI"
              width={150}
              height={56}
              className="rounded-md"
              priority
            />
            <span className="sr-only">TINKA AI</span>
          </Link>

          {/* Meniu */}
          <nav className="hidden md:flex items-center gap-6">
            <AnimatedNavLink href="/">{labels.home}</AnimatedNavLink>
            <AnimatedNavLink href="/solutions">{labels.solutions}</AnimatedNavLink>
            <AnimatedNavLink href="/about">{labels.about}</AnimatedNavLink>
            <AnimatedNavLink href="/contact">{labels.contact}</AnimatedNavLink>
          </nav>

          {/* Limbi */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/70 px-2 py-1">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Select
                value={locale as Lang}
                onValueChange={(val: Lang) => setLocale(val)}
              >
                <SelectTrigger className="h-8 w-[140px] border-0 bg-transparent focus:ring-0 data-[placeholder]:text-muted-foreground">
                  <SelectValue
                    placeholder={LANGS.find((l) => l.value === (locale as Lang))?.label}
                  />
                </SelectTrigger>
                <SelectContent className="border-border bg-card/95 backdrop-blur-sm">
                  {LANGS.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// export named + default (ca să funcționeze `import { Navbar } ...` și `import Navbar ...`)
export { Navbar, AnimatedNavLink }
export default Navbar
