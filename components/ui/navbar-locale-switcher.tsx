import Link from "next/link"
import { headers } from "next/headers"

export function PlainNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const headersList = headers()
  const pathname = headersList.get("x-pathname") || "/"

  // Activ exact ca în client, dar calculat pe server
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
