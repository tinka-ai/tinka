// components/ui/navbar.tsx — SERVER COMPONENT (ok), folosește T (client) doar pentru text
import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";
import ActiveNavLink from "./active-nav-link";
import { PlainNavLink } from "./navbar-locale-switcher";
import T from "@/components/T";
import { TRANSCRIBER_ENABLED } from "@/lib/featureFlags";

export default function Navbar() {
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
            <ActiveNavLink href="/"><T path="nav.home" /></ActiveNavLink>
            <ActiveNavLink href="/solutions"><T path="nav.solutions" /></ActiveNavLink>
            <ActiveNavLink href="/portfolio"><T path="nav.portfolio" /></ActiveNavLink>
            {TRANSCRIBER_ENABLED && (
              <ActiveNavLink href="/download" className="text-amber-400 hover:text-amber-300 font-semibold"><T path="nav.tinkora" /></ActiveNavLink>
            )}
            <ActiveNavLink href="/blog"><T path="nav.blog" /></ActiveNavLink>
            <ActiveNavLink href="/about"><T path="nav.about" /></ActiveNavLink>
            <ActiveNavLink href="/contact"><T path="nav.contact" /></ActiveNavLink>
          </nav>

          {/* LANGUAGE SWITCH */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-background/70 px-2 py-1">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <PlainNavLink />
          </div>
        </div>

      </div>

      {/* SECOND ROW – ACRONYM (ticker continuu, pe toată lățimea paginii) */}
      <div className="mt-2 w-full" aria-label="TINKA">
        <div
          className="relative w-full overflow-hidden border-y border-border bg-card/60 backdrop-blur-md py-1.5 sm:py-2"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="marquee-track flex w-max items-center gap-3 whitespace-nowrap">
            <p className="text-[9px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-muted-foreground px-3">
              • Technologies • Innovation • Networking • Knowledge • Automation •
            </p>
            <p className="text-[9px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-muted-foreground px-3" aria-hidden="true">
              • Technologies • Innovation • Networking • Knowledge • Automation •
            </p>
            <p className="text-[9px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-muted-foreground px-3" aria-hidden="true">
              • Technologies • Innovation • Networking • Knowledge • Automation •
            </p>
            <p className="text-[9px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-muted-foreground px-3" aria-hidden="true">
              • Technologies • Innovation • Networking • Knowledge • Automation •
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
