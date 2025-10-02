"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import { cn } from "@/lib/utils"

// folosim Select de la shadcn/ui (deja există în proiect)
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

export function Navbar() {
  const pathname = usePathname()
  const { locale, setLocale, t } = useLocale()

  // etichete din i18n, cu fallback dacă lipsesc cheile
  const labels = {
    home: t?.nav?.home ?? t?.footer?.home ?? "Acasă",
    solutions: t?.nav?.solutions ?? t?.footer?.solutions ?? "Soluții",
    about: t?.nav?.about ?? t?.footer?.about ?? "Despre",
    contact: t?.nav?.contact ?? t?.footer?.contact ?? "Contact",
  }

  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-4 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-center justify-between rounded-2xl border border-border bg-card/70 backdrop-blur-md px-3 py-2">
          {/* STÂNGA: Logo (înlocuiește textul) */}
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-muted/40 transition-colors"
          >
            {/* Folosește logo din /public */}
            <Image
              src="/TINKA-AI Logo.png"
              alt="TINKA AI"
              width={150}
              height={53}
              className="rounded-md"
              priority
            />
            <span className="sr-only">TINKA AI</span>
          </Link>

          {/* MIJLOC: Linkuri */}
          <ul className="hidden md:flex items-center gap-4">
            <li>
              <Link
                href="/"
                className={cn(
                  "rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                  isActive("/") && "text-foreground"
                )}
              >
                {labels.home}
              </Link>
            </li>
            <li>
              <Link
                href="/solutions"
                className={cn(
                  "rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                  isActive("/solutions") && "text-foreground"
                )}
              >
                {labels.solutions}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={cn(
                  "rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                  isActive("/about") && "text-foreground"
                )}
              >
                {labels.about}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={cn(
                  "rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                  isActive("/contact") && "text-foreground"
                )}
              >
                {labels.contact}
              </Link>
            </li>
          </ul>

          {/* DREAPTA: Select limbi (dropdown animat) */}
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

            {/* Buton meniu pe mobil (opțional) */}
            {/* Dacă ai deja un MobileNav, îl poți păstra aici. */}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
