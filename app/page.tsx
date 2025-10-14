// app/page.tsx
"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { ArrowRight, Bot, Workflow, PlugZap, ShieldCheck, LineChart, Link2, BadgeCheck } from "lucide-react"
import OfferCTA from "@/components/offer/OfferCTA"
import { useLocale } from "@/contexts/locale-context"

export default function Page() {
  // i18n helper (merge și dacă lipsesc unele chei)
  const { t: T } = useLocale() as any
  const t = (path: string, fallback?: string) =>
    path.split(".").reduce((acc: any, k: string) => acc?.[k], T) ?? fallback ?? path

  const fx =
    "transition-shadow duration-300 ease-out hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_28px_6px_rgba(168,85,247,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400/70 rounded-md"

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center py-12">
            {/* Text */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                {t("home.hero.badge", "TINKA AI • Pachet lansare rapidă")}
              </span>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent leading-[1.05]">
                {t("home.hero.title", "Transformare digitală prin Inteligență Artificială")}
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
                {t(
                  "home.hero.description",
                  "Construim website-uri moderne, chatbot-uri AI și automatizări esențiale care reduc costurile și cresc conversiile."
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className={`bg-sky-500 text-white hover:bg-sky-400 ${fx}`}>
                  <Link href="/solutions" aria-label={t("aria.solutions", "Vezi soluțiile")}>
                    {t("home.hero.primary", "Vezi soluțiile")}
                    <ArrowRight className="ms-2 h-4 w-4" aria-hidden />
                  </Link>
                </Button>

                {/* Buton „Solicită ofertă” — deschide formularul modal */}
                <OfferCTA className={`${fx} active:scale-95 transition-transform`} />
              </div>

              <div className="flex gap-6 pt-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-sky-400" /> {t("home.hero.points.secure", "Securizat & GDPR-ready")}
                </div>
                <div className="flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-sky-400" /> {t("home.hero.points.impact", "Orientat pe rezultate")}
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.18),transparent_60%)]" />
              <Image
                src="/TINKA-AI Logo.png"
                alt="TINKA AI Logo"
                width={880}
                height={620}
                className="w-full h-auto rounded-2xl object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 sm:py-16 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
            {t("home.features.title", "Ce livrăm în 14 zile")}
          </h2>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              fx={fx}
              icon={<Bot className="h-6 w-6" />}
              title={t("home.features.items.chatbot.title", "Chatbot AI personalizat")}
              text={t(
                "home.features.items.chatbot.text",
                "Preia lead-uri, răspunde automat la întrebări și se integrează cu CRM-ul tău."
              )}
              link="/solutions"
              learnMore={t("home.features.learnMore", "Află mai mult")}
            />
            <Feature
              fx={fx}
              icon={<Workflow className="h-6 w-6" />}
              title={t("home.features.items.automation.title", "Automatizări esențiale")}
              text={t(
                "home.features.items.automation.text",
                "Formulare → email/CRM, notificări, calificare lead, programări, follow-up."
              )}
              link="/solutions"
              learnMore={t("home.features.learnMore", "Află mai mult")}
            />
            <Feature
              fx={fx}
              icon={<PlugZap className="h-6 w-6" />}
              title={t("home.features.items.integration.title", "Website modern + integrări")}
              text={t(
                "home.features.items.integration.text",
                "Site rapid, SEO-ready, multi-lingv, conectat cu tool-urile deja folosite."
              )}
              link="/solutions"
              learnMore={t("home.features.learnMore", "Află mai mult")}
            />
          </ul>
        </div>
      </section>

      {/* PRICING (exemplu simplu) */}
      <section className="py-12 sm:py-16 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-sky-300">
            <span className="inline-block h-1 w-1 rounded-full bg-sky-400" />
            {t("home.pricing.kicker", "Pachet lansare rapidă")}
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-300">
            {t("home.pricing.title", "Website + chatbot + automatizări esențiale")}
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <PricingCard
              fx={fx}
              title={t("home.pricing.cards.starter.title", "Start")}
              price={t("home.pricing.cards.starter.price", "De la 990 €")}
              perks={[
                t("home.pricing.cards.starter.p1", "Website 1–5 pagini"),
                t("home.pricing.cards.starter.p2", "Chatbot FAQ/lead capture"),
                t("home.pricing.cards.starter.p3", "2 integrări esențiale"),
              ]}
            />
            <PricingCard
              fx={fx}
              highlight
              title={t("home.pricing.cards.pro.title", "Pro")}
              price={t("home.pricing.cards.pro.price", "De la 1.990 €")}
              perks={[
                t("home.pricing.cards.pro.p1", "Website extins + blog"),
                t("home.pricing.cards.pro.p2", "Chatbot multi-rol (sales/support)"),
                t("home.pricing.cards.pro.p3", "4+ integrări & automatizări"),
              ]}
            />
          </div>

          <p className="mt-6 pt-3 text-center text-sm text-gray-400 border-t border-white/10">
            {t(
              "home.pricing.note",
              "Prețurile sunt orientative. Completează formularul pentru o ofertă personalizată."
            )}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 sm:py-16 border-b border-white/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-sky-300">
            <span className="inline-block h-1 w-1 rounded-full bg-sky-400" />
            {t("home.faq.kicker", "Întrebări frecvente")}
          </span>

          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="f1" className={`border-b border-white/10 ${fx}`}>
              <AccordionTrigger className="text-left">
                {t("home.faq.q1", "În cât timp livrați?")}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {t(
                  "home.faq.a1",
                  "Pachetul de lansare rapidă se livrează uzual în 10–14 zile, în funcție de complexitate și feedback."
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="f2" className={`border-b border-white/10 ${fx}`}>
              <AccordionTrigger className="text-left">
                {t("home.faq.q2", "Cum primesc oferta?")}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {t(
                  "home.faq.a2",
                  "Completezi formularul din „Solicită ofertă”. Vei primi confirmare pe email și revenim cu propunerea."
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="f3" className={`border-b border-white/10 ${fx}`}>
              <AccordionTrigger className="text-left">
                {t("home.faq.q3", "Ce integrări suportați?")}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {t(
                  "home.faq.a3",
                  "CRM (HubSpot/Pipedrive/Zoho), formulare, email, calendare, plăți, WhatsApp/Facebook/Telegram etc."
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  )
}

/* ————— Sub-componente ————— */

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

function PricingCard({
  fx,
  title,
  price,
  perks,
  highlight = false,
}: {
  fx: string
  title: string
  price: string
  perks: string[]
  highlight?: boolean
}) {
  return (
    <div
      className={`p-6 rounded-xl border ${highlight ? "border-sky-400/40" : "border-white/10"} bg-white/5 ${fx}`}
      aria-label={`Plan ${title}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-300">{title}</h3>
        <span className="text-2xl font-extrabold text-gray-300">{price}</span>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-gray-300">
        {perks.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <BadgeCheck className="mt-0.5 h-4 w-4 text-sky-400" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
