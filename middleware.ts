import { NextResponse, type NextRequest } from "next/server"

const PREFIXED_LOCALES = ["en", "ru"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const firstSegment = pathname.split("/")[1]

  // /en/... si /ru/... se potrivesc direct cu app/[locale]/... — trec neschimbate.
  if (PREFIXED_LOCALES.includes(firstSegment)) {
    return NextResponse.next()
  }

  // /ro/... nu trebuie sa existe ca URL public (romana e varianta canonica,
  // fara prefix) — redirect permanent catre echivalentul fara prefix.
  if (firstSegment === "ro") {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/ro(?=\/|$)/, "") || "/"
    return NextResponse.redirect(url, 308)
  }

  // Orice alta cale fara prefix de limba (adica toate URL-urile actuale,
  // deja indexate) e rescrisa intern catre /ro/... — invizibil in bara de
  // adrese si pentru crawlere, dar Next randeaza app/[locale]/... cu locale="ro".
  const url = request.nextUrl.clone()
  url.pathname = `/ro${pathname === "/" ? "" : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/((?!api|_next|admin|.*\\..*).*)"],
}
