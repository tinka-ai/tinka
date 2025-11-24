// app/providers.tsx
"use client"

import { ReactNode, createContext, useContext, useState, useCallback } from "react"
import dynamic from "next/dynamic"

import { ThemeProvider } from "@/components/theme-provider"
import { LocaleProvider } from "@/contexts/locale-context"

// Lazy load pentru OfferModal – IMPORTANT pentru PageSpeed
const OfferModal = dynamic(() => import("@/components/offer/OfferModal"), {
  ssr: false,
  loading: () => null,
})

// ----------------------------
// Offer Modal Context
// ----------------------------
type OfferCtx = {
  open: () => void
}

const OfferCtx = createContext<OfferCtx | null>(null)

export function useOfferModal() {
  const ctx = useContext(OfferCtx)
  if (!ctx) throw new Error("useOfferModal must be inside <Providers>")
  return ctx
}

// Providers (MINIM JS posibil)
export default function Providers({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    // Montează modalul DOAR când userul cere
    setIsOpen(true)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LocaleProvider>
        <OfferCtx.Provider value={{ open }}>
          {children}

          {/* Modalul este montat doar când e necesar */}
          {isOpen && <OfferModal open={isOpen} onOpenChange={close} />}
        </OfferCtx.Provider>
      </LocaleProvider>
    </ThemeProvider>
  )
}
