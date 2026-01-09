"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLocale } from "@/contexts/locale-context"
import { useOfferModal } from "@/app/providers"
import { useRouter } from "next/navigation"

export default function OfferCTA({
  variant = "primary",
  className = "",
}: {
  variant?: "primary" | "ghost"
  className?: string
}) {
  const { t } = useLocale() as any
  const { open } = useOfferModal() as any
  const router = useRouter()

  const label = t?.offer?.cta ?? "Solicită ofertă"

  const base =
    variant === "primary"
      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
      : "bg-transparent text-foreground hover:bg-muted/40"

  const handleClick = () => {
    try {
      if (typeof open === "function") {
        open()
        return
      }
      // fallback dacă modalul nu există
      router.push("/contact#oferta")
    } catch (e) {
      console.error("Offer modal open failed:", e)
      router.push("/contact#oferta")
    }
  }

  return (
    <Button
      onClick={handleClick}
      aria-label={label}
      className={`group ${base} ${className} transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-sky-400`}
    >
      {label}
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-active:translate-x-0.5" />
    </Button>
  )
}
