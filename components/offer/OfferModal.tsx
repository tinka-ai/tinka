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

import {
  WEBSITE_GOALS_KEYS,
  WEBSITE_FEATURES_KEYS,
  BOT_CHANNEL_KEYS,
  BOT_ROLE_KEYS,
  AUTOMATION_KEYS,
} from "./offer.constants"

import { LoaderSvg, SendSvg } from "./offer.icons"

type OfferModalProps = { open: boolean; onOpenChange: (v: boolean) => void }

export default function OfferModal({ open, onOpenChange }: OfferModalProps) {
  const { t, locale } = useLocale() as any
  const L = t?.offer ?? {}

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState<null | "ok" | "err">(null)

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

    const multi = new Set([
      "websiteGoals",
      "features",
      "botChannels",
      "botRole",
      "automations",
    ])

    const payload: Record<string, any> = {}

    fd.forEach((value, key) => {
      if (multi.has(key)) {
        if (!Array.isArray(payload[key])) payload[key] = []
        payload[key].push(String(value))
      } else {
        payload[key] = String(value)
      }
    })

    try {
      const r = await fetch("/api/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      setSending(false)

      if (r.ok) {
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
            <p className="text-green-500 font-medium">
              {L?.successTitle ?? "Trimis!"}
            </p>
            <Button onClick={() => onOpenChange(false)}>
              {L?.close ?? "Închide"}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* CONTACT */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">{L?.sections?.contact}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{L.fields.name}</Label>
                  <Input id="name" name="name" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email">{L.fields.email} *</Label>
                  <Input id="email" name="email" type="email" required placeholder="name@domain.com" />
                </div>
                <div>
                  <Label htmlFor="phone">{L.fields.phone}</Label>
                  <Input id="phone" name="phone" placeholder="+373…" />
                </div>
                <div>
                  <Label htmlFor="company">{L.fields.company}</Label>
                  <Input id="company" name="company" placeholder="Company SRL" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="region">{L.fields.region}</Label>
                  <Input id="region" name="region" placeholder={L.placeholders.region} />
                </div>
              </div>
            </section>

            {/* BUSINESS */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">{L.sections.business}</h3>

              <Label>{L.fields.about}</Label>
              <Textarea id="about" name="about" rows={3} />

              <Label>{L.fields.audience}</Label>
              <Textarea id="audience" name="audience" rows={2} />

              <Label>{L.fields.problems}</Label>
              <Textarea id="problems" name="problems" rows={2} />

              <Label>{L.fields.links}</Label>
              <Input id="links" name="links" />
            </section>

            {/* GOALS */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">{L.sections.goals}</h3>
              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <Label>{L.fields.websiteGoals}</Label>
                  <div className="grid gap-2 mt-2">
                    {WEBSITE_GOALS_KEYS.map(k => (
                      <label key={k} className="flex items-center gap-2">
                        <Checkbox name="websiteGoals" value={k} />
                        <span>{L.options.websiteGoals[k]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="kpi">{L.fields.kpi}</Label>
                  <Input id="kpi" name="kpi" placeholder={L.placeholders.kpi} />
                </div>

              </div>
            </section>

            {/* WEBSITE */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">{L.sections.website}</h3>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <Label>{L.fields.features}</Label>
                  <div className="grid gap-2 mt-2">
                    {WEBSITE_FEATURES_KEYS.map(k => (
                      <label key={k} className="flex items-center gap-2">
                        <Checkbox name="features" value={k} />
                        <span>{L.options.features[k]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label>{L.fields.content}</Label>
                    <Select value={content} onValueChange={setContent}>
                      <SelectTrigger>
                        <SelectValue placeholder={L.placeholders.content} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="have">{L.options.content.have}</SelectItem>
                        <SelectItem value="need">{L.options.content.need}</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="content" value={content} />
                  </div>

                  <div>
                    <Label>{L.fields.branding}</Label>
                    <Select value={branding} onValueChange={setBranding}>
                      <SelectTrigger>
                        <SelectValue placeholder={L.placeholders.branding} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="have">{L.options.branding.have}</SelectItem>
                        <SelectItem value="need">{L.options.branding.need}</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="branding" value={branding} />
                  </div>

                  <div>
                    <Label>{L.fields.refs}</Label>
                    <Input id="refs" name="refs" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label>{L.fields.integrations}</Label>
                  <Input id="integrations" name="integrations" />
                </div>

                <div className="md:col-span-2">
                  <Label>{L.fields.domain}</Label>
                  <Select value={domain} onValueChange={setDomain}>
                    <SelectTrigger>
                      <SelectValue placeholder={L.placeholders.domain} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="have">{L.options.domain.have}</SelectItem>
                      <SelectItem value="need">{L.options.domain.need}</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="domain" value={domain} />
                </div>

              </div>
            </section>

            {/* CHATBOT */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">{L.sections.bot}</h3>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <Label>{L.fields.botChannels}</Label>
                  <div className="grid gap-2 mt-2">
                    {BOT_CHANNEL_KEYS.map(k => (
                      <label key={k} className="flex items-center gap-2">
                        <Checkbox name="botChannels" value={k} />
                        <span>{L.options.botChannels[k]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>{L.fields.botRole}</Label>
                  <div className="grid gap-2 mt-2">
                    {BOT_ROLE_KEYS.map(k => (
                      <label key={k} className="flex items-center gap-2">
                        <Checkbox name="botRole" value={k} />
                        <span>{L.options.botRole[k]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>{L.fields.botLangs}</Label>
                  <Input id="botLangs" name="botLangs" />
                </div>

                <div>
                  <Label>{L.fields.kb}</Label>
                  <Textarea id="kb" name="kb" rows={2} />
                </div>

              </div>
            </section>

            {/* AUTOMATIONS */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">{L.sections.automation}</h3>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <Label>{L.fields.automations}</Label>
                  <div className="grid gap-2 mt-2">
                    {AUTOMATION_KEYS.map(k => (
                      <label key={k} className="flex items-center gap-2">
                        <Checkbox name="automations" value={k} />
                        <span>{L.options.automations[k]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>{L.fields.other}</Label>
                  <Textarea id="other" name="other" rows={2} />
                </div>

              </div>
            </section>

            {/* CONSTRAINTS */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">{L.sections.constraints}</h3>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <Label>{L.fields.deadline}</Label>
                  <Input id="deadline" name="deadline" />
                </div>

                <div>
                  <Label>{L.fields.budget}</Label>

                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger>
                      <SelectValue placeholder={L.placeholders.budget} />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="lt1k">{L.options.budget.lt1k}</SelectItem>
                      <SelectItem value="1to5">{L.options.budget["1to5"]}</SelectItem>
                      <SelectItem value="5to10">{L.options.budget["5to10"]}</SelectItem>
                      <SelectItem value="gt10">{L.options.budget.gt10}</SelectItem>
                    </SelectContent>
                  </Select>

                  <input type="hidden" name="budget" value={budget} />
                </div>

                <div className="md:col-span-2">
                  <Label>{L.fields.notes}</Label>
                  <Textarea id="notes" name="notes" rows={2} />
                </div>

              </div>

              <label className="flex items-center gap-2 text-sm">
                <Checkbox name="gdpr" required />
                <span>{L.fields.gdpr}</span>
              </label>

            </section>

            {/* SUBMIT */}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {L.cancel}
              </Button>

              <Button type
