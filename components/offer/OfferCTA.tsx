// components/offer/OfferCTA.tsx
"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import { useOfferModal } from "@/app/providers"

export default function OfferCTA({
  variant = "primary",
  className = "",
}: {
  variant?: "primary" | "ghost"
  className?: string
}) {
  const { t } = useLocale() as any
  const { open } = useOfferModal()
  const label = t?.offer?.cta ?? "Solicită ofertă"

  const base =
    variant === "primary"
      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
      : "bg-transparent text-foreground hover:bg-muted/40"

  return (
    <Button
      onClick={open}
      aria-label={label}
      className={`group ${base} ${className} transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-sky-400`}
    >
      {label}
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-active:translate-x-0.5" />
    </Button>
  )
}
