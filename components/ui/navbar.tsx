// components/ui/navbar.tsx (SERVER COMPONENT)
import Link from "next/link"
import Image from "next/image"
import { Globe } from "lucide-react"
import { getTranslations } from "@/lib/server-i18n"
import LocaleSwitcher from "./navbar-locale-switcher"
import ActiveNavLink from "./active-nav-link"   // <-- ✔ corect

const Dot = () => <span className="opacity-40">•</span>

export default async function Navbar() {
  const t = await getTranslations()

  const labels = {
    home: t.nav.home,
    solutions: t.nav.solutions,
    about: t.nav.about,
    contact: t.nav.contact,
  }

  const ACRONYM = ["Technologies", "Innovation", "Networking", "Knowledge", "Automation"]

  return (
    <header className="sticky top-4 z-50">
      <div className="mx-auto max-w-7xl px-4">

        {/* Bara principală — ZERO JS */}
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card/70 backdrop-blur-md px-3 py-2">

          {/* LOGO */}
          <Link
            href="/"
            prefetch={false}
            className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-muted/40 transition-colors"
          >
            <Image
              src="/TINKA-AI Logo.png"
              alt="TINKA AI"
              width={150}
              height={56}
              className="rounded-md"
            />
            <span className="sr-only">TINKA AI</span>
          </Link>

          {/* MENIU — ZERO JS în nav, doar links sunt client-based */}
          <nav className="hidden md:flex items-center gap-6">
            <ActiveNavLink href="/">{labels.home}</ActiveNavLink>
            <ActiveNavLink href="/solutions">{labels.solutions}</ActiveNavLink>
            <ActiveNavLink href="/about">{labels.about}</ActiveNavLink>
            <ActiveNavLink href="/contact">{labels.contact}</ActiveNavLink>
          </nav>

          {/* LIMBI */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-background/70 px-2 py-1">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <LocaleSwitcher />
          </div>
        </div>

        {/* Banda ACRONYM */}
        <div
          className="mt-2 hidden md:flex justify-center"
          aria-label="TINKA"
        >
          <div className="relative inline-flex items-center gap-3 rounded-full border border-border bg-card/60 backdrop-blur-md px-4 py-1">
            <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
              {ACRONYM.map((word, i) => (
                <span key={word} className="inline-flex items-center gap-3">
                  <span>{word}</span>
                  {i < ACRONYM.length - 1 && <Dot />}
                </span>
              ))}
            </p>
          </div>
        </div>

      </div>
    </header>
  )
}
