"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ActiveNavLink({
  href,
  children
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
      className={
        "text-sm font-medium transition-colors " +
        (isActive
          ? "text-foreground font-semibold"
          : "text-muted-foreground hover:text-foreground")
      }
    >
      {children}
    </Link>
  )
}
