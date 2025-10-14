// components/offer/OfferModal.tsx
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
import { Loader2, Send } from "lucide-react"

// NOTE: shadcn Select nu pune automat `name` în submit,
// așa că pentru câmpurile Select folosim stare + <input type="hidden" />
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type OfferModalProps = { open: boolean; onOpenChange: (v: boolean) => void }

// chei folosite la opțiunile multi-select (checkbox-uri)
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
const AUTOMATION_KEYS = ["crm", "qualify", "notify", "schedule", "followup", "newsletter", "other"] as const

export default function OfferModal({ open, onOpenChange }: OfferModalProps) {
  const { t, locale } = useLocale() as any
  const L = t?.offer ?? {}

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState<null | "ok" | "err">(null)

  // stări pentru Select (cu input hidden pentru submit)
  const [content, setContent] = useState<string>("")
  const [branding, setBranding] = useState<string>("")
  const [domain, setDomain] = useState<string>("")
  const [budget, setBudget] = useState<string>("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setSent(null)

    const fd = new FormData(e.currentTarget)

    // adăugăm și limba UI curentă
    fd.set("uiLocale", String(locale || "ro"))

    // construim payload JSON astfel încât checkbox-urile cu același "name"
    // să fie trimise ca ARRAYS, nu să se piardă valorile
    const multiKeys = new Set(["websiteGoals", "features", "botChannels", "botRole", "automations"])
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
        ;(e.target as HTMLFormElement).reset()
        // reset și pentru Select-uri controlate
        setContent("")
        setBranding("")
        setDomain("")
        setBudget("")
      } else {
        setSent("err")
      }
    } catch {
      setSending(false)
      setSent("err")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{L?.title ?? "Solicită ofertă – Pachet lansare rapidă"}</DialogTitle>
          <DialogDescription>
            {L?.subtitle ?? "Completează cât poți — ne ajută să propunem soluția potrivită."}
          </DialogDescription>
        </DialogHeader>

        {sent === "ok" ? (
          <div className="space-y-3">
            <p className="text-green-500 font-medium">
              {L?.successTitle ?? "Mulțumim! Formularul a fost trimis."}
            </p>
            <p className="text-muted-foreground">
              {L?.successBody ??
                "TINKA AI va analiza răspunsurile și revine în curând cu oferta. Ți-am trimis și un email de confirmare."}
            </p>
            <Button onClick={() => onOpenChange(false)} className="mt-2">
              {L?.close ?? "Închide"}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">{L?.sections?.contact ?? "Contact"}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{L?.fields?.name ?? "Nume"}</Label>
                  <Input id="name" name="name" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email">{L?.fields?.email ?? "Email"} *</Label>
                  <Input id="email" name="email" type="email" required placeholder="name@domain.com" />
                </div>
                <div>
                  <Label htmlFor="phone">{L?.fields?.phone ?? "Telefon"}</Label>
                  <Input id="phone" name="phone" placeholder="+373…" />
                </div>
                <div>
                  <Label htmlFor="company">{L?.fields?.company ?? "Companie"}</Label>
                  <Input id="company" name="company" placeholder="Company SRL" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="region">{L?.fields?.region ?? "Regiune"}</Label>
                  <Input
                    id="region"
                    name="region"
                    placeholder={L?.placeholders?.region ?? "Țară / oraș / fus orar"}
                  />
                </div>
              </div>
            </section>

            {/* Business */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">{L?.sections?.business ?? "Afacere"}</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="about">{L?.fields?.about ?? "Despre afacere"}</Label>
                  <Textarea id="about" name="about" rows={3} placeholder={L?.placeholders?.about} />
                </div>
                <div>
                  <Label htmlFor="audience">{L?.fields?.audience ?? "Public țintă"}</Label>
                  <Textarea id="audience" name="audience" rows={2} placeholder={L?.placeholders?.audience} />
                </div>
                <div>
                  <Label htmlFor="problems">{L?.fields?.problems ?? "Probleme actuale"}</Label>
                  <Textarea id="problems" name="problems" rows={2} placeholder={L?.placeholders?.problems} />
                </div>
                <div>
                  <Label htmlFor="links">{L?.fields?.links ?? "Linkuri"}</Label>
                  <Input
                    id="links"
                    name="links"
                    placeholder="https://exemplu.com, https://instagram.com/..."
                  />
                </div>
              </div>
            </section>

            {/* Goals */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">{L?.sections?.goals ?? "Obiective & KPI"}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>{L?.fields?.websiteGoals ?? "Scopul website-ului"}</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {WEBSITE_GOALS_KEYS.map((k) => (
                      <label key={k} className="flex items-center gap-2 text-sm">
                        <Checkbox name="websiteGoals" value={k} />
                        <span>{L?.options?.websiteGoals?.[k] ?? k}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="kpi">{L?.fields?.kpi ?? "KPI"}</Label>
                  <Input id="kpi" name="kpi" placeholder={L?.placeholders?.kpi} />
                </div>
              </div>
            </section>

            {/* Website */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">{L?.sections?.website ?? "Website"}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>{L?.fields?.features ?? "Funcții"}</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {WEBSITE_FEATURES_KEYS.map((k) => (
                      <label key={k} className="flex items-center gap-2 text-sm">
                        <Checkbox name="features" value={k} />
                        <span>{L?.options?.features?.[k] ?? k}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="content">{L?.fields?.content ?? "Conținut"}</Label>
                    <Select value={content} onValueChange={setContent}>
                      <SelectTrigger id="content">
                        <SelectValue placeholder={L?.placeholders?.content} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="have">{L?.options?.content?.have ?? "Am conținut"}</SelectItem>
                        <SelectItem value="need">{L?.options?.content?.need ?? "Am nevoie de creare"}</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="content" value={content} />
                  </div>

                  <div>
                    <Label htmlFor="branding">{L?.fields?.branding ?? "Branding"}</Label>
                    <Select value={branding} onValueChange={setBranding}>
                      <SelectTrigger id="branding">
                        <SelectValue placeholder={L?.placeholders?.branding} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="have">{L?.options?.branding?.have ?? "Am identitate vizuală"}</SelectItem>
                        <SelectItem value="need">{L?.options?.branding?.need ?? "Am nevoie de branding"}</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="branding" value={branding} />
                  </div>

                  <div>
                    <Label htmlFor="refs">{L?.fields?.refs ?? "Referințe (site-uri care îți plac)"}</Label>
                    <Input
                      id="refs"
                      name="refs"
                      placeholder="https://site1.com, https://site2.com, https://site3.com"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="integrations">{L?.fields?.integrations ?? "Integrări"}</Label>
                  <Input
                    id="integrations"
                    name="integrations"
                    placeholder={L?.placeholders?.integrations}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="domain">{L?.fields?.domain ?? "Domeniu"}</Label>
                  <Select value={domain} onValueChange={setDomain}>
                    <SelectTrigger id="domain">
                      <SelectValue placeholder={L?.placeholders?.domain} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="have">{L?.options?.domain?.have ?? "Am domeniu"}</SelectItem>
                      <SelectItem value="need">{L?.options?.domain?.need ?? "Am nevoie de domeniu"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="domain" value={domain} />
                </div>
              </div>
            </section>

            {/* Chatbot */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">{L?.sections?.bot ?? "Chatbot"}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>{L?.fields?.botChannels ?? "Canale"}</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {BOT_CHANNEL_KEYS.map((k) => (
                      <label key={k} className="flex items-center gap-2 text-sm">
                        <Checkbox name="botChannels" value={k} />
                        <span>{L?.options?.botChannels?.[k] ?? k}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>{L?.fields?.botRole ?? "Rol"}</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {BOT_ROLE_KEYS.map((k) => (
                      <label key={k} className="flex items-center gap-2 text-sm">
                        <Checkbox name="botRole" value={k} />
                        <span>{L?.options?.botRole?.[k] ?? k}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="botLangs">{L?.fields?.botLangs ?? "Limbi"}</Label>
                  <Input id="botLangs" name="botLangs" placeholder={L?.placeholders?.botLangs} />
                </div>
                <div>
                  <Label htmlFor="kb">{L?.fields?.kb ?? "Knowledge base"}</Label>
                  <Textarea id="kb" name="kb" rows={2} placeholder={L?.placeholders?.kb} />
                </div>
              </div>
            </section>

            {/* Automations */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">{L?.sections?.automation ?? "Automatizări"}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>{L?.fields?.automations ?? "Acțiuni"}</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {AUTOMATION_KEYS.map((k) => (
                      <label key={k} className="flex items-center gap-2 text-sm">
                        <Checkbox name="automations" value={k} />
                        <span>{L?.options?.automations?.[k] ?? k}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="other">{L?.fields?.other ?? "Altele"}</Label>
                  <Textarea id="other" name="other" rows={2} placeholder={L?.placeholders?.other} />
                </div>
              </div>
            </section>

            {/* Constraints */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">{L?.sections?.constraints ?? "Constrângeri"}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deadline">{L?.fields?.deadline ?? "Deadline"}</Label>
                  <Input id="deadline" name="deadline" placeholder={L?.placeholders?.deadline} />
                </div>
                <div>
                  <Label htmlFor="budget">{L?.fields?.budget ?? "Buget"}</Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger id="budget">
                      <SelectValue placeholder={L?.placeholders?.budget} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lt1k">{L?.options?.budget?.lt1k ?? "< 1.000 €"}</SelectItem>
                      <SelectItem value="1to5">{L?.options?.budget?.["1to5"] ?? "1.000–5.000 €"}</SelectItem>
                      <SelectItem value="5to10">{L?.options?.budget?.["5to10"] ?? "5.000–10.000 €"}</SelectItem>
                      <SelectItem value="gt10">{L?.options?.budget?.gt10 ?? "> 10.000 €"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="budget" value={budget} />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="notes">{L?.fields?.notes ?? "Note"}</Label>
                  <Textarea id="notes" name="notes" rows={2} placeholder={L?.placeholders?.notes} />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <Checkbox required name="gdpr" />
                <span>{L?.fields?.gdpr ?? "Sunt de acord cu prelucrarea datelor personale."}</span>
              </label>
            </section>

            {sent === "err" && (
              <p className="text-sm text-red-500">
                {L?.error ?? "A apărut o eroare. Te rugăm să încerci din nou."}
              </p>
            )}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {L?.cancel ?? "Renunță"}
              </Button>
              <Button
                type="submit"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                {sending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {L?.submit ?? "Trimite"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
