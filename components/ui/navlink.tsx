"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function PlainNavLink({
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
      className={
        "text-sm transition-colors font-medium " +
        (isActive
          ? "text-foreground font-semibold"
          : "text-muted-foreground hover:text-foreground")
      }
    >
      {children}
    </Link>
  )
}
