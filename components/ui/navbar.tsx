"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useLocale } from "@/contexts/locale-context"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const defaultTextColor = "text-muted-foreground"
  const hoverTextColor = "text-foreground"
  const textSizeClass = "text-sm"

  return (
    <a href={href} className={`group relative inline-block overflow-hidden h-5 flex items-center ${textSizeClass}`}>
      <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2">
        <span className={defaultTextColor}>{children}</span>
        <span className={hoverTextColor}>{children}</span>
      </div>
    </a>
  )
}

export function Navbar() {
  const { t } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full")
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current)
    }

    if (isOpen) {
      setHeaderShapeClass("rounded-xl")
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full")
      }, 300)
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current)
      }
    }
  }, [isOpen])

  const logoElement = (
    <div className="relative flex items-center gap-2">
      <div className="relative w-6 h-6 flex items-center justify-center">
        <div className="absolute inset-0 border border-muted-foreground rounded-sm opacity-60"></div>
        <div className="absolute w-2 h-2 bg-info rounded-full top-1 left-1"></div>
        <div className="absolute w-1 h-1 bg-muted-foreground rounded-full top-1 right-1"></div>
        <div className="absolute w-1 h-1 bg-muted-foreground rounded-full bottom-1 left-1"></div>
        <div className="absolute w-2 h-0.5 bg-muted-foreground bottom-1.5 right-1"></div>
        <span className="absolute text-xs font-bold text-foreground">AI</span>
      </div>
      <span className="text-sm font-bold text-foreground hidden sm:inline">{t.footer.company}</span>
    </div>
  )

  const navLinksData = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.solutions, href: "/solutions" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ]

  const loginButtonElement = (
    <a
      href="/contact"
      className="px-4 py-2 sm:px-3 text-xs sm:text-sm border border-border bg-muted text-muted-foreground rounded-full hover:border-border/50 hover:text-foreground transition-colors duration-200 w-full sm:w-auto text-center"
    >
      {t.nav.contact}
    </a>
  )

  const signupButtonElement = (
    <div className="relative group w-full sm:w-auto">
      <div
        className="absolute inset-0 -m-2 rounded-full
                     hidden sm:block
                     bg-info
                     opacity-40 filter blur-lg pointer-events-none
                     transition-all duration-300 ease-out
                     group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"
      ></div>
      <button className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-info-foreground bg-gradient-to-br from-info to-chart-1 rounded-full hover:from-info/90 hover:to-chart-1/90 transition-all duration-200 w-full sm:w-auto">
        {t.hero.cta1}
      </button>
    </div>
  )

  return (
    <header
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20
                       flex flex-col items-center
                       pl-6 pr-6 py-3 backdrop-blur-sm
                       ${headerShapeClass}
                       border border-border bg-muted
                       w-[calc(100%-2rem)] sm:w-auto
                       transition-[border-radius] duration-0 ease-in-out`}
    >
      <div className="flex items-center justify-between w-full gap-x-4 sm:gap-x-6">
        <div className="flex items-center">{logoElement}</div>

        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
          <LanguageSwitcher />
        </nav>

        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          {loginButtonElement}
          {signupButtonElement}
        </div>

        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 text-muted-foreground focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12M6 12h12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>

      <div
        className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? "max-h-[1000px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"}`}
      >
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors w-full text-center"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-4 w-full">
          {loginButtonElement}
          {signupButtonElement}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
