"use client"

import NextLink, { type LinkProps } from "next/link"
import type { AnchorHTMLAttributes } from "react"
import { useLocale } from "@/contexts/locale-context"

/**
 * Prefixeaza href-urile interne relative cu segmentul de limba curent
 * (/en, /ru — romana ramane fara prefix). Inlocuieste next/link ca sa nu
 * fie nevoie sa calculam manual prefixul in fiecare loc unde exista un Link.
 */
export function localizeHref(href: string, locale: string): string {
  if (locale === "ro") return href
  if (!href.startsWith("/")) return href // mailto:, tel:, http(s)://, #ancora
  return `/${locale}${href === "/" ? "" : href}`
}

type LocaleLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { locale } = useLocale()
  const target = typeof href === "string" ? localizeHref(href, locale) : href
  return <NextLink href={target} {...props} />
}
