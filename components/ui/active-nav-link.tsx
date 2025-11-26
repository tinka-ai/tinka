"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ActiveNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href)

  return (
    <Link
      href={href}
      prefetch={false}
      aria-current={isActive ? "page" : undefined}
      className="relative group inline-block"
    >
      {/* ▬ MOBILE — fără efect ▬ */}
      <span className="block md:hidden text-sm font-medium text-muted-foreground hover:text-foreground">
        {children}
      </span>

      {/* ▬ DESKTOP — efect scroll ▬ */}
      <span className="hidden md:block relative overflow-hidden h-[20px]">
        {/* Container cu ambele texte - acesta se mișcă */}
        <span
          className={
            "block transition-transform duration-300 ease-out " +
            (isActive ? "-translate-y-full" : "group-hover:-translate-y-full")
          }
        >
          {/* Linie 1 = text inițial gri */}
          <span className="block text-sm font-medium text-muted-foreground h-[20px] leading-[20px]">
            {children}
          </span>

          {/* Linie 2 = text alb bold (apare după scroll) */}
          <span className="block text-sm font-semibold text-foreground h-[20px] leading-[20px]">
            {children}
          </span>
        </span>
      </span>
    </Link>
  )
}
