"use client"

import type { ReactNode } from "react"
import { createContext, useCallback, useContext, useState } from "react"

// ⬇️ corect
import { ThemeProvider } from "@/components/ui/theme-provider"
import { LocaleProvider } from "@/contexts/locale-context"
import OfferModal from "@/components/offer/OfferModal"

// --- Context + hook pentru OfferModal ---
type OfferCtx = { open: () => void; close: () => void; isOpen: boolean }
const OfferCtx = createContext<OfferCtx | null>(null)

export function useOfferModal() {
  const ctx = useContext(OfferCtx)
  if (!ctx) throw new Error("useOfferModal must be used within <Providers>")
  return ctx
}

// --- Provider global folosit în app/layout.tsx ---
export default function Providers({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LocaleProvider>
        <OfferCtx.Provider value={{ open, close, isOpen }}>
          {/* Modalul e montat global, îl deschizi din orice buton via useOfferModal() */}
          <OfferModal open={isOpen} onOpenChange={setIsOpen} />
          {children}
        </OfferCtx.Provider>
      </LocaleProvider>
    </ThemeProvider>
  )
}
