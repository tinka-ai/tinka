// components/ui/navbar.tsx — SERVER COMPONENT
import Link from "next/link"
import Image from "next/image"
import { Globe } from "lucide-react"
import ActiveNavLink from "./active-nav-link"
import { PlainNavLink } from "./navbar-locale-switcher"
import { getTranslations } from "@/lib/server-i18n"

const Dot = () => <span className="opacity-40">•</span>

export default async function Navbar() {
  const t = await getTranslations()

  return (
    <header className="sticky top-4 z-50">
      <div className="mx-auto max-w-7xl px-4">

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

          {/* NAVIGATION */}
          <nav className="hidden md:flex items-center gap-6">
            <ActiveNavLink href="/">{t("nav.home")}</ActiveNavLink>
            <ActiveNavLink href="/solutions">{t("nav.solutions")}</ActiveNavLink>
            <ActiveNavLink href="/about">{t("nav.about")}</ActiveNavLink>
            <ActiveNavLink href="/contact">{t("nav.contact")}</ActiveNavLink>
          </nav>

          {/* LANGUAGE SWITCH */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-background/70 px-2 py-1">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <PlainNavLink />
          </div>
        </div>

        {/* ACRONYM STRIP */}
        <div className="mt-2 hidden md:flex justify-center" aria-label="TINKA">
          <div className="relative inline-flex items-center gap-3 rounded-full border border-border bg-card/60 backdrop-blur-md px-4 py-1">
            <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
              <span className="inline-flex items-center gap-3">
                Technologies <Dot />
                Innovation <Dot />
                Networking <Dot />
                Knowledge <Dot />
                Automation
              </span>
            </p>
          </div>
        </div>

      </div>
    </header>
  )
}
