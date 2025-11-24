"use client"

import { useState } from "react"
import { useLocale } from "@/contexts/locale-context"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// 🔥 SVG ICONS – inline (NO lucide-react)
const LoaderSvg = (
  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
  </svg>
)

const SendSvg = (
  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
    <path
      d="M22 2L11 13"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 2L15 22L11 13L2 9L22 2Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// 🔒 CONSTANTE (NECESARE)
const WEBSITE_GOALS_KEYS = ["leads", "ecom", "brand", "info", "support"] as const
const WEBSITE_FEATURES_KEYS = [
  "blog",
  "portfolio",
  "form",
  "booking",
  "payments",
  "ecommerce",
  "multilang",
  "gdpr",
  "analytics",
] as const
const BOT_CHANNEL_KEYS = ["site", "whatsapp", "facebook", "telegram", "viber"] as const
const BOT_ROLE_KEYS = ["sales", "support", "faq", "booking"] as const
const AUTOMATION_KEYS = [
  "crm",
  "qualify",
  "notify",
  "schedule",
  "followup",
  "newsletter",
  "other",
] as const

type OfferModalProps = { open: boolean; onOpenChange: (v: boolean) => void }

export default function OfferModal({ open, onOpenChange }: OfferModalProps) {
  const { t, locale } = useLocale() as any
  const L = t?.offer ?? {}

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState<null | "ok" | "err">(null)

  // Select state
  const [content, setContent] = useState("")
  const [branding, setBranding] = useState("")
  const [domain, setDomain] = useState("")
  const [budget, setBudget] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setSent(null)

    const fd = new FormData(e.currentTarget)
    fd.set("uiLocale", String(locale || "ro"))

    const multiKeys = new Set([
      "websiteGoals",
      "features",
      "botChannels",
      "botRole",
      "automations",
    ])

    const payload: Record<string, any> = {}

    fd.forEach((value, key) => {
      if (multiKeys.has(key)) {
        if (!Array.isArray(payload[key])) payload[key] = []
        payload[key].push(String(value))
      } else {
        payload[key] = String(value)
      }
    })

    try {
      const res = await fetch("/api/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      setSending(false)

      if (res.ok) {
        setSent("ok")
        e.currentTarget.reset()

        setContent("")
        setBranding("")
        setDomain("")
        setBudget("")
      } else setSent("err")
    } catch {
      setSending(false)
      setSent("err")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{L?.title ?? "Solicită ofertă"}</DialogTitle>
          <DialogDescription>
            {L?.subtitle ?? "Completează detaliile proiectului."}
          </DialogDescription>
        </DialogHeader>

        {sent === "ok" ? (
          <div className="space-y-3">
            <p className="text-green-500 font-medium">{L?.successTitle ?? "Trimis!"}</p>
            <Button onClick={() => onOpenChange(false)}>Închide</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* FORM CONTENT ... tot restul rămâne neschimbat */}
            
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {L?.cancel ?? "Renunță"}
              </Button>

              <Button type="submit" className="bg-primary-foreground text-primary">
                {sending ? LoaderSvg : SendSvg}
                {L?.submit ?? "Trimite"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
