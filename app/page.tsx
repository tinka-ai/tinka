// app/page.tsx
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Eye, FlaskConical, Puzzle, Waves, Link2, BadgeCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import OfferCTA from "@/components/offer/OfferCTA"
import Footer from "@/components/ui/footer"
import { useLocale } from "@/contexts/locale-context"

export default function Page() {
  const { t: T } = useLocale() as any
  const t = (path: string) => path.split(".").reduce((acc: any, k: string) => acc?.[k], T) ?? path

  const fx =
    "transition-shadow duration-300 ease-out hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_28px_6px_rgba(168,85,247,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400/70 rounded-md"

  return (
    <>
      <main>
        {/* HERO */}
        <section id="acasa" className="relative overflow-hidden border-b border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center py-8 sm:py-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  {/* poți înlocui cu Sparkles dacă îl folosești */}
                  <span className="h-3.5 w-3.5 rounded-full bg-sky-400" aria-hidden />
                  {t("hero.subtitle")}
                </div>

                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
                  {t("hero.title")}
                </h1>

                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
                  {t("whatWeOffer.title")}
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className={`bg-sky-500 text-white hover:bg-sky-400 ${fx}`}>
                    <Link href="/solutions" aria-label={t("nav.solutions")}>
                      {t("hero.ctaPrimary")}
                      <ArrowRight className="ms-2 h-4 w-4" aria-hidden />
                    </Link>
                  </Button>

                  <OfferCTA className={`${fx} active:scale-95 transition-transform`} />
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.18),transparent_60%)]" />
                <Image
                  src="/image/hero-tinkaai.webp"
                  alt="Hero visual"
                  width={880}
                  height={700}
                  className="w-full h-auto rounded-2xl object-cover select-none pointer-events-none"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES (exemplu scurt) */}
        <section id="experiente" className="py-12 sm:py-16 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
              {t("whyAI.title")}
            </h2>

            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Feature
                fx={fx}
                icon={<Puzzle className="h-6 w-6" />}
                title={t("whyAI.benefit1.title")}
                text={t("whyAI.benefit1.description")}
                link="/solutions"
                learnMore={t("hero.cta")}
              />
              <Feature
                fx={fx}
                icon={<Waves className="h-6 w-6" />}
                title={t("whyAI.benefit2.title")}
                text={t("whyAI.benefit2.description")}
                link="/solutions"
                learnMore={t("hero.cta")}
              />
              <Feature
                fx={fx}
                icon={<Eye className="h-6 w-6" />}
                title={t("whyAI.benefit3.title")}
                text={t("whyAI.benefit3.description")}
                link="/solutions"
                learnMore={t("hero.cta")}
              />
              <Feature
                fx={fx}
                icon={<FlaskConical className="h-6 w-6" />}
                title={t("whyAI.benefit4.title")}
                text={t("whyAI.benefit4.description")}
                link="/solutions"
                learnMore={t("hero.cta")}
              />
            </ul>
          </div>
        </section>

        {/* TINKABOOK SECTION – nou */}
        <TinkaBookSection fx={fx} />

        {/* FAQ (exemplu) */}
        <section id="faq" className="py-12 sm:py-16 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h3 className="text-2xl font-bold text-gray-200">{t("contact.faq.title")}</h3>
            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="f1" className={`border-b border-white/10 ${fx}`}>
                <AccordionTrigger className="text-left">
                  {t("contact.faq.question1.q")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {t("contact.faq.question1.a")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="f2" className={`border-b border-white/10 ${fx}`}>
                <AccordionTrigger className="text-left">
                  {t("contact.faq.question2.q")}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {t("contact.faq.question2.a")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer DOAR pe Acasă */}
      <Footer />
    </>
  )
}

/* ———— Sub-componente ———— */

function Feature({
  fx,
  icon,
  title,
  text,
  link,
  learnMore,
}: {
  fx: string
  icon: React.ReactNode
  title: string
  text: string
  link: string
  learnMore: string
}) {
  return (
    <li className={`p-5 rounded-xl border border-white/10 bg-white/5 ${fx}`}>
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-md bg-white/8 text-sky-400">{icon}</div>
        <p className="font-semibold text-gray-300">{title}</p>
      </div>
      <p className="mt-2 text-sm text-gray-300">{text}</p>
      <Link
        href={link}
        className="mt-3 inline-flex items-center gap-2 text-sky-300 text-sm hover:text-white transition-colors"
      >
        <Link2 className="h-4 w-4" />
        {learnMore}
      </Link>
    </li>
  )
}

function TinkaBookSection({ fx }: { fx: string }) {
  const { t: T } = useLocale() as any
  const t = (path: string) => path.split(".").reduce((acc: any, k: string) => acc?.[k], T) ?? path

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    activity: "",
    contactPref: "",
    links: "",
    language: "",
    honeypot: "",
    consent: false,
  })

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // honeypot anti-spam
    if (formData.honeypot) {
      return
    }

    if (!formData.consent) {
      setError(t("tinkabook.form.consentRequired"))
      return
    }

    setStatus("submitting")

    try {
      const res = await fetch("/api/tinkabook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          activity: formData.activity,
          contactPref: formData.contactPref,
          links: formData.links,
          language: formData.language,
          consentText: t("tinkabook.form.consentText"),
          uiLanguage: typeof navigator !== "undefined" ? navigator.language : "unknown",
          sourcePage: "Homepage – secțiunea TinkaBook",
          subjectPrefix: "[TinkaBook] Cerere nouă de conectare",
        }),
      })

      if (!res.ok) throw new Error("Request failed")

      setStatus("success")
      setFormData({
        name: "",
        phone: "",
        email: "",
        activity: "",
        contactPref: "",
        links: "",
        language: "",
        honeypot: "",
        consent: false,
      })
    } catch (err) {
      console.error(err)
      setStatus("error")
      setError(t("tinkabook.form.error"))
    }
  }

  const scrollToForm = () => {
    const el = document.getElementById("tinkabook-form")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section id="tinkabook" className="py-12 sm:py-16 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
        {/* Col stânga: prezentare + preț */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
            <BadgeCheck className="h-3.5 w-3.5 text-sky-400" aria-hidden />
            <span>{t("tinkabook.badge")}</span>
          </div>

          <div className="flex items-center gap-4">
            <Image
              src="/images/TinkaBook_Logo.png"
              alt="TinkaBook logo"
              width={72}
              height={72}
              className="h-16 w-16 rounded-2xl bg-white/5 p-1"
            />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-100">
              {t("tinkabook.title")}
            </h2>
          </div>

          <p className="text-gray-300 text-base sm:text-lg">
            {t("tinkabook.subtitle")}
          </p>

          <p className="text-sm sm:text-base text-sky-300 font-semibold">
            {t("tinkabook.priceHighlight")}
          </p>

          <ul className="space-y-2 text-sm text-gray-300">
            <li>• {t("tinkabook.bullets.bullet1")}</li>
            <li>• {t("tinkabook.bullets.bullet2")}</li>
            <li>• {t("tinkabook.bullets.bullet3")}</li>
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              type="button"
              onClick={scrollToForm}
              className={`bg-sky-500 text-white hover:bg-sky-400 ${fx}`}
            >
              {t("tinkabook.ctaScroll")}
              <ArrowRight className="ms-2 h-4 w-4" aria-hidden />
            </Button>

            <Button asChild variant="outline" className={`${fx} border-white/15 bg-white/5`}>
              <Link href="https://tinkaweb.md/agenda/" target="_blank" rel="noreferrer">
                {t("tinkabook.ctaVisit")}
                <Link2 className="ms-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>

        {/* Col dreapta: formular */}
        <div
          id="tinkabook-form"
          className={`rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 ${fx}`}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-100">
            {t("tinkabook.form.title")}
          </h3>
          <p className="mt-1 text-sm text-gray-300">
            {t("tinkabook.form.description")}
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Honeypot */}
            <div className="hidden">
              <label>
                {t("tinkabook.form.fields.honeypot")}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                {t("tinkabook.form.fields.name")} *
              </label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("tinkabook.form.placeholders.name")}
                className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  {t("tinkabook.form.fields.phone")} *
                </label>
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("tinkabook.form.placeholders.phone")}
                  className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  {t("tinkabook.form.fields.email")} *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("tinkabook.form.placeholders.email")}
                  className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                {t("tinkabook.form.fields.activity")} *
              </label>
              <textarea
                required
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                rows={3}
                placeholder={t("tinkabook.form.placeholders.activity")}
                className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  {t("tinkabook.form.fields.contactPref")}
                </label>
                <select
                  name="contactPref"
                  value={formData.contactPref}
                  onChange={handleChange}
                  className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <option value="">{t("tinkabook.form.placeholders.contactPref")}</option>
                  <option value="phone">{t("tinkabook.form.contactPrefOptions.phone")}</option>
                  <option value="email">{t("tinkabook.form.contactPrefOptions.email")}</option>
                  <option value="whatsapp">
                    {t("tinkabook.form.contactPrefOptions.whatsapp")}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  {t("tinkabook.form.fields.language")}
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <option value="">{t("tinkabook.form.placeholders.language")}</option>
                  <option value="ro">{t("tinkabook.form.languageOptions.ro")}</option>
                  <option value="ru">{t("tinkabook.form.languageOptions.ru")}</option>
                  <option value="en">{t("tinkabook.form.languageOptions.en")}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                {t("tinkabook.form.fields.links")}
              </label>
              <input
                name="links"
                value={formData.links}
                onChange={handleChange}
                placeholder={t("tinkabook.form.placeholders.links")}
                className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              />
            </div>

            {/* Acordul de prelucrare date */}
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold text-gray-200">
                {t("tinkabook.form.consentTitle")}
              </p>
              <div className="max-h-40 overflow-y-auto rounded-md border border-white/10 bg-black/40 p-3 text-[11px] leading-snug text-gray-300 whitespace-pre-line">
                {t("tinkabook.form.consentText")}
              </div>
              <label className="mt-2 flex items-start gap-2 text-xs text-gray-200">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black/60"
                  required
                />
                <span>{t("tinkabook.form.consentLabel")}</span>
              </label>
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <div className="pt-2">
              <Button
                type="submit"
                disabled={!formData.consent || status === "submitting"}
                className={`w-full justify-center bg-sky-500 text-white hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed ${fx}`}
              >
                {status === "submitting"
                  ? t("tinkabook.form.submitting")
                  : t("tinkabook.form.submit")}
              </Button>
            </div>

            {status === "success" && (
              <div className="mt-3 rounded-md bg-emerald-500/10 border border-emerald-500/40 p-3 text-xs text-emerald-200">
                <p className="font-semibold">{t("tinkabook.form.successTitle")}</p>
                <p className="mt-1">
                  {t("tinkabook.form.successBody")}
                  <Link
                    href="https://tinkaweb.md/agenda/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-sky-400 hover:text-sky-200"
                  >
                    {t("tinkabook.form.successDemoLinkText")}
                  </Link>
                </p>
                <p className="mt-1">{t("tinkabook.form.successDemoCredentials")}</p>
              </div>
            )}

            {status === "error" && (
              <div className="mt-3 rounded-md bg-red-500/10 border border-red-500/40 p-3 text-xs text-red-200">
                {t("tinkabook.form.error")}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
