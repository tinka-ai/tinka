"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import { cn } from "@/lib/utils"

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

const LANGS: { value: "ro" | "ru" | "en"; label: string }[] = [
  { value: "ro", label: "Română" },
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" },
]

// Bază pentru linkurile din meniu: are hover bold + animație
const linkBase =
  "nav-link rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:font-semibold"

export function Navbar() {
  const pathname = usePathname()
  const { locale, setLocale, t } = useLocale()

  const isActive = (href: string) => pathname === href

  const labels = {
    home: t?.nav?.home ?? t?.footer?.home ?? "Acasă",
    solutions: t?.nav?.solutions ?? t?.footer?.solutions ?? "Soluții",
    about: t?.nav?.about ?? t?.footer?.about ?? "Despre",
    contact: t?.nav?.contact ?? t?.footer?.contact ?? "Contact",
  }

  return (
    <header className="sticky top-4 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-center justify-between rounded-2xl border border-border bg-card/70 backdrop-blur-md px-3 py-2">
          {/* Logo în stânga */}
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

          {/* Meniu central */}
          <ul className="hidden md:flex items-center gap-4">
            <li>
              <Link
                href="/"
                data-active={isActive("/")}
                className={cn(linkBase, isActive("/") && "text-foreground font-semibold")}
              >
                {labels.home}
              </Link>
            </li>
            <li>
              <Link
                href="/solutions"
                data-active={isActive("/solutions")}
                className={cn(linkBase, isActive("/solutions") && "text-foreground font-semibold")}
              >
                {labels.solutions}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                data-active={isActive("/about")}
                className={cn(linkBase, isActive("/about") && "text-foreground font-semibold")}
              >
                {labels.about}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                data-active={isActive("/contact")}
                className={cn(linkBase, isActive("/contact") && "text-foreground font-semibold")}
              >
                {labels.contact}
              </Link>
            </li>
          </ul>

          {/* Selector limbi compact (dropdown) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/70 px-2 py-1">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Select
                value={locale}
                onValueChange={(val: "ro" | "ru" | "en") => setLocale(val)}
              >
                <SelectTrigger className="h-8 w-[130px] border-0 bg-transparent focus:ring-0 data-[placeholder]:text-muted-foreground">
                  <SelectValue
                    placeholder={LANGS.find((l) => l.value === locale)?.label}
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
        </nav>
      </div>
    </header>
  )
}

export default Navbar
