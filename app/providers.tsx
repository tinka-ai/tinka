// app/providers.tsx
"use client"

import { ReactNode, createContext, useContext, useState, useCallback } from "react"
import dynamic from "next/dynamic"

import { ThemeProvider } from "@/components/theme-provider"
import { LocaleProvider } from "@/contexts/locale-context"

const OfferModal = dynamic(() => import("@/components/offer/OfferModal"), {
  ssr: false,
  loading: () => null,
})

type OfferCtx = {
  open: () => void
  close: () => void
}

const OfferCtx = createContext<OfferCtx | null>(null)

export function useOfferModal() {
  const ctx = useContext(OfferCtx)
  if (!ctx) throw new Error("useOfferModal must be inside <Providers>")
  return ctx
}

export default function Providers({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  //  primește booleanul de la Dialog/Radix și îl aplică corect
  const onOpenChange = useCallback((v: boolean) => setIsOpen(v), [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LocaleProvider>
        <OfferCtx.Provider value={{ open, close }}>
          {children}

          {/*  Modalul există doar când trebuie */}
          {isOpen && <OfferModal open={isOpen} onOpenChange={onOpenChange} />}
        </OfferCtx.Provider>
      </LocaleProvider>
    </ThemeProvider>
  )
}
