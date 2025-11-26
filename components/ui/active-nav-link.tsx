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
      <span className="block md:hidden text-sm font-medium 
        text-muted-foreground hover:text-foreground
        ">
        {children}
      </span>

      {/* ▬ DESKTOP — efect scroll ▬ */}
      <span
        className={
          "hidden md:block transition-transform duration-300 " +
          (isActive ? "-translate-y-full" : "hover:-translate-y-full")
        }
      >
        {/* Linie 1 = text inițial */}
        <span
          className={
            "block text-sm font-medium " +
            (isActive ? "text-primary font-semibold" : "text-muted-foreground")
          }
        >
          {children}
        </span>

        {/* Linie 2 = text vizibil la scroll sau când activ */}
        <span
          className={
            "block text-sm font-medium " +
            (isActive ? "text-primary font-semibold" : "text-foreground")
          }
        >
          {children}
        </span>
      </span>
    </Link>
  )
}
