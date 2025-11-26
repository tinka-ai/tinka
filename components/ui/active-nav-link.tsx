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
      className="relative inline-block overflow-hidden h-[20px]"
    >
      {/* ▬ MOBILE — fără efect ▬ */}
      <span className="block md:hidden text-sm font-medium text-muted-foreground hover:text-foreground">
        {children}
      </span>

      {/* ▬ DESKTOP — efect scroll ▬ */}
      <span
        className={
          "hidden md:block transition-transform duration-300 ease-out " +
          (isActive ? "-translate-y-full" : "hover:-translate-y-full")
        }
      >
        {/* Linie 1 = text inițial gri (întotdeauna gri când nu e scroll) */}
        <span className="block text-sm font-medium text-muted-foreground">
          {children}
        </span>

        {/* Linie 2 = text alb bold (se vede după scroll - fie hover, fie active) */}
        <span className="block text-sm font-semibold text-white">
          {children}
        </span>
      </span>
    </Link>
  )
}
