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
      <div className="hidden md:block relative h-[20px] overflow-hidden">
        {/* Container cu ambele texte - acesta se mișcă */}
        <div
          className={
            "transition-transform duration-300 ease-out " +
            (isActive ? "-translate-y-[20px]" : "group-hover:-translate-y-[20px]")
          }
        >
          {/* Linie 1 = text inițial gri - 20px înălțime */}
          <div className="h-[20px] flex items-center text-sm font-medium text-muted-foreground">
            {children}
          </div>

          {/* Linie 2 = text alb bold - 20px înălțime */}
          <div className="h-[20px] flex items-center text-sm font-bold text-foreground">
            {children}
          </div>
        </div>
      </div>
    </Link>
  )
}
