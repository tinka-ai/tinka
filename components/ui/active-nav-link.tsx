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
      className="
        relative inline-block h-[20px] overflow-hidden 
        md:h-[20px] 
      "
    >
      {/* ▬▬▬ Structura este diferită pentru mobil vs desktop ▬▬▬ */}

      {/* 🔸 MOBIL — fără scroll */}
      <span className="block md:hidden text-sm font-medium transition-colors
        text-muted-foreground hover:text-foreground
        ">
        {children}
      </span>

      {/* 🔹 DESKTOP — are scroll */}
      <span
        className={
          "hidden md:block transition-transform duration-300 " +
          (isActive ? "-translate-y-full" : "hover:-translate-y-full")
        }
      >
        {/* TEXT NORMAL */}
        <span
          className={
            "block text-sm font-medium transition-colors " +
            (isActive ? "text-primary font-semibold" : "text-muted-foreground")
          }
        >
          {children}
        </span>

        {/* TEXT HOVER / ACTIVE */}
        <span className="block text-sm font-medium text-primary">
          {children}
        </span>
      </span>
    </Link>
  )
}
