"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLocale } from "@/contexts/locale-context"
import { Mail, Phone, Clock, MapPin, Send, CheckCircle, AlertTriangle, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ContactClient() {
  const { t: tOrig } = useLocale()

  const defaults = {
    contact: {
      title: "Contact",
      subtitle: "Hai să vorbim despre proiectul tău.",
      info: {
        title: "Informații de contact",
        email: "Email",
        phone: "Telefon",
        hours: "Program",
        location: "Locație",
        locationDetail: "Chișinău, Republica Moldova",
        messaging: "Mesagerie",
      },
      quickResponse: {
        title: "Răspundem rapid",
        description: "Îți răspundem în 4 de ore lucrătoare.",
      },
      form: {
        successTitle: "Mulțumim!",
        successMessage: "Mesajul a fost trimis. Revenim în curând.",
        name: "Nume",
        namePlaceholder: "Numele tău",
        email: "Email",
        emailPlaceholder: "ex: nume@domeniu.md",
        phone: "Telefon",
        phonePlaceholder: "+373…",
        company: "Companie",
        companyPlaceholder: "Numele companiei",
        service: "Serviciu",
        servicePlaceholder: "Alege serviciul",
        budget: "Buget",
        budgetPlaceholder: "Alege bugetul",
        message: "Mesaj",
        messagePlaceholder: "Spune-ne câteva detalii…",
        submit: "Trimite",
        serviceOptions: {
          chatbot: "Chatbot AI",
          website: "Website",
          automation: "Automatizări",
          consulting: "Consultanță",
          other: "Altceva",
        },
        budgetOptions: {
          option1: "< 1.000 €",
          option2: "1.000–5.000 €",
          option3: "5.000–10.000 €",
          option4: "> 10.000 €",
        },
      },
      faq: {
        title: "Întrebări frecvente",
        subtitle: "Răspunsuri rapide",
        question1: { q: "Cum începem?", a: "Ne scrii și stabilim o discuție." },
        question2: { q: "În cât timp livrați?", a: "De regulă 2–6 săptămâni, în funcție de proiect." },
        question3: { q: "Plăți și contract?", a: "Da, contract + factură; 30% avans." },
        question4: { q: "Mentenanță?", a: "Oferim pachete de mentenanță." },
        question5: { q: "Hosting propriu?", a: "Se poate, sau găzduim noi." },
        question6: { q: "Tehnologii?", a: "Next.js, Netlify, Tailwind etc." },
        question7: { q: "Limba?", a: "Suport în română, rusă, engleză." },
        question8: { q: "Date personale?", a: "Respectăm GDPR și bune practici." },
      },
    },
    footer: {
      company: "TINKA AI SRL",
      tagline: "Din Tradițional în Digital",
      description: "Soluții AI & Web pentru IMM-uri.",
      quickLinks: "Linkuri rapide",
      home: "Acasă",
      solutions: "Soluții",
      about: "Despre",
      contact: "Contact",
      resources: "Resurse",
      blog: "Blog",
      caseStudies: "Studii de caz",
      faq: "FAQ",
      contactInfo: "Contact",
      email: "office@tinka.md",
      phone: "+373 68 333 899",
      hours: "Lun–Vin 10:00–22:00",
      copyright: `© ${new Date().getFullYear()} TINKA AI`,
      privacy: "Politica de confidențialitate",
      terms: "Termeni și condiții",
    },
  } as const

  // deep-merge defensiv
  const t = {
    contact: {
      ...defaults.contact,
      ...(tOrig?.contact || {}),
      info: { ...defaults.contact.info, ...(tOrig?.contact?.info || {}) },
      quickResponse: { ...defaults.contact.quickResponse, ...(tOrig?.contact?.quickResponse || {}) },
      form: {
        ...defaults.contact.form,
        ...(tOrig?.contact?.form || {}),
        serviceOptions: {
          ...defaults.contact.form.serviceOptions,
          ...(tOrig?.contact?.form?.serviceOptions || {}),
        },
        budgetOptions: {
          ...defaults.contact.form.budgetOptions,
          ...(tOrig?.contact?.form?.budgetOptions || {}),
        },
      },
      faq: {
        ...defaults.contact.faq,
        question1: { ...defaults.contact.faq.question1, ...(tOrig?.contact?.faq?.question1 || {}) },
        question2: { ...defaults.contact.faq.question2, ...(tOrig?.contact?.faq?.question2 || {}) },
        question3: { ...defaults.contact.faq.question3, ...(tOrig?.contact?.faq?.question3 || {}) },
        question4: { ...defaults.contact.faq.question4, ...(tOrig?.contact?.faq?.question4 || {}) },
        question5: { ...defaults.contact.faq.question5, ...(tOrig?.contact?.faq?.question5 || {}) },
        question6: { ...defaults.contact.faq.question6, ...(tOrig?.contact?.faq?.question6 || {}) },
        question7: { ...defaults.contact.faq.question7, ...(tOrig?.contact?.faq?.question7 || {}) },
        question8: { ...defaults.contact.faq.question8, ...(tOrig?.contact?.faq?.question8 || {}) },
      },
    },
    footer: { ...defaults.footer, ...(tOrig?.footer || {}) },
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // pentru mesagerie
  const phoneNumber = "37368333899" // fără +

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Trimitem payload-ul direct din state, ca să fim siguri că ajung și Select-urile
      const payload = {
        "form-name": "contact",
        ...formData,
      }

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload as any).toString(),
      })

      if (!res.ok) throw new Error("Eroare la trimitere")

      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" })
      setTimeout(() => setSubmitted(false), 7000)
    } catch (err: any) {
      setError(err?.message || "Eroare la trimitere")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">{t.contact.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{t.contact.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{t.contact.info.title}</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">{t.contact.info.email}</p>
                        <a
                          href={`mailto:${t.footer.email}`}
                          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                          {t.footer.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">{t.contact.info.phone}</p>
                        <a
                          href={`tel:${t.footer.phone.replace(/[^0-9]/g, "")}`}
                          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                          {t.footer.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">{t.contact.info.hours}</p>
                        <p className="text-muted-foreground text-sm">{t.footer.hours}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">{t.contact.info.location}</p>
                        <p className="text-muted-foreground text-sm">{t.contact.info.locationDetail}</p>
                      </div>
                    </div>

                    {/* Mesagerie */}
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm mb-2">{t.contact.info.messaging}</p>
                        <div className="flex gap-2">
                          <a
                            href={`https://wa.me/${phoneNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-8 px-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-md text-xs font-medium transition-colors"
                          >
                            WhatsApp
                          </a>

                          <a
                            href={`viber://chat?number=%2B${phoneNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-8 px-3 bg-[#7360F2] hover:bg-[#665AC8] text-white rounded-md text-xs font-medium transition-colors"
                          >
                            Viber
                          </a>

                          <a
                            href={`tg://resolve?phone=+${phoneNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-8 px-3 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-md text-xs font-medium transition-colors"
                          >
                            Telegram
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary-foreground/10 to-chart-4/10 border-primary-foreground/30">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-foreground">{t.contact.quickResponse.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.contact.quickResponse.description}</p>
                </CardContent>
              </Card>
            </div>

            {/* Formular */}
            <div className="lg:col-span-2">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="h-16 w-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-success" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{t.contact.form.successTitle}</h3>
                      <p className="text-muted-foreground">{t.contact.form.successMessage}</p>
                    </div>
                  ) : (
                    <form
                      name="contact"
                      method="POST"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* Netlify needs this */}
                      <input type="hidden" name="form-name" value="contact" />
                      <div style={{ display: "none" }}>
                        <input name="bot-field" />
                      </div>

                      {/* Hidden inputs pentru Select (Radix nu trimite automat în FormData) */}
                      <input type="hidden" name="service" value={formData.service} />
                      <input type="hidden" name="budget" value={formData.budget} />

                      {error && (
                        <div className="flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm">
                          <AlertTriangle className="h-4 w-4 mt-0.5 text-destructive" />
                          <p className="text-destructive">
                            {error}. Dacă problema persistă, scrie-ne direct la{" "}
                            <a className="underline" href={`mailto:${t.footer.email}`}>
                              {t.footer.email}
                            </a>.
                          </p>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t.contact.form.name}</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            required
                            placeholder={t.contact.form.namePlaceholder}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">{t.contact.form.email}</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                            placeholder={t.contact.form.emailPlaceholder}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t.contact.form.phone}</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder={t.contact.form.phonePlaceholder}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company">{t.contact.form.company}</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={(e) => handleChange("company", e.target.value)}
                            placeholder={t.contact.form.companyPlaceholder}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="service">{t.contact.form.service}</Label>
                          <Select
                            value={formData.service}
                            onValueChange={(value) => handleChange("service", value)}
                          >
                            <SelectTrigger id="service">
                              <SelectValue placeholder={t.contact.form.servicePlaceholder} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="chatbot">{t.contact.form.serviceOptions.chatbot}</SelectItem>
                              <SelectItem value="website">{t.contact.form.serviceOptions.website}</SelectItem>
                              <SelectItem value="automation">{t.contact.form.serviceOptions.automation}</SelectItem>
                              <SelectItem value="consulting">{t.contact.form.serviceOptions.consulting}</SelectItem>
                              <SelectItem value="other">{t.contact.form.serviceOptions.other}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="budget">{t.contact.form.budget}</Label>
                          <Select value={formData.budget} onValueChange={(value) => handleChange("budget", value)}>
                            <SelectTrigger id="budget">
                              <SelectValue placeholder={t.contact.form.budgetPlaceholder} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-1000">{t.contact.form.budgetOptions.option1}</SelectItem>
                              <SelectItem value="1000-5000">{t.contact.form.budgetOptions.option2}</SelectItem>
                              <SelectItem value="5000-10000">{t.contact.form.budgetOptions.option3}</SelectItem>
                              <SelectItem value="over-10000">{t.contact.form.budgetOptions.option4}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t.contact.form.message}</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          required
                          rows={6}
                          placeholder={t.contact.form.messagePlaceholder}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        {loading ? "Se trimite..." : t.contact.form.submit}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.contact.faq.title}</h2>
              <p className="text-lg text-muted-foreground">{t.contact.faq.subtitle}</p>
            </div>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="w-full">
                  {(["1", "2", "3", "4", "5", "6", "7", "8"] as const).map((k) => (
                    <AccordionItem key={k} value={`item-${k}`}>
                      <AccordionTrigger className="text-left">
                        {(t.contact.faq as any)[`question${k}`].q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {(t.contact.faq as any)[`question${k}`].a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-2xl font-bold text-foreground">{t.footer.company}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.description}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{t.footer.quickLinks}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.home}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.solutions}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.contact}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{t.footer.resources}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.blog}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/case-studies"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t.footer.caseStudies}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.faq}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{t.footer.contactInfo}</h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">{t.footer.email}</p>
                <p className="text-muted-foreground">{t.footer.phone}</p>
                <p className="text-muted-foreground">{t.footer.hours}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">{t.footer.copyright}</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
