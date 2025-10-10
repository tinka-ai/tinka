"use client"

import OfferCTA from "@/components/offer/OfferCTA"
import type React from "react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { ArrowRight, Eye, FlaskConical, Puzzle, Sparkles, Waves, Link2, BadgeCheck } from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { useLanguage } from "@/components/language-provider"

// ⬇️ import nou: butonul care deschide formularul
import OfferCta from "@/components/offer/OfferCta"

export default function Page() {
  const { t } = useLanguage()

  const fx =
    "transition-shadow duration-300 ease-out hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_28px_6px_rgba(168,85,247,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400/70 rounded-md"

  return (
    <>
      {/* VIDEO LOGO SECTION */}
      <section className="relative w-full h-auto overflow-hidden flex items-center justify-center bg-black py-4 mt-24 md:mt-0">
        <video className="max-w-full max-h-full object-contain" autoPlay loop muted playsInline>
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unwatermark_ELementar%20logo-IWmmAsRBKFrGVBf8T0e953xG8X72Y7.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </section>

      <main>
        {/* HERO */}
        <section id="acasa" className="relative overflow-hidden border-b border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center py-8 sm:py-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  <Sparkles className="h-3.5 w-3.5 text-sky-400" aria-hidden />
                  {t("hero.badge")}
                </div>
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
                  {t("hero.title")}
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">{t("hero.description")}</p>

               {/* CTA buttons */}
<div className="flex flex-col sm:flex-row gap-3">
  <Button asChild className={`bg-sky-500 text-white hover:bg-sky-400 ${fx}`}>
    <Link href="/domenii" aria-label={t("aria.home")}>
      {t("hero.ctaPrimary")}
      <ArrowRight className="ms-2 h-4 w-4" aria-hidden />
    </Link>
  </Button>

  {/* Butonul „Solicită ofertă” cu feedback vizual */}
  <OfferCTA className={`${fx} active:scale-95 transition-transform`} />
</div>
              </div>

              <div className="relative">
                <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.18),transparent_60%)]" />
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%206%2C%202025%2C%2002_14_52%20AM-z4nOUqVJRDW56Gv6MkCZE8fLK8cFkN.png"
                  alt="Portret de copil cu inel luminos, simbol al mirării și al descoperirii"
                  width={880}
                  height={700}
                  className="w-full h-auto rounded-2xl object-cover select-none pointer-events-none"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="experiente" className="py-12 sm:py-16 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionTitle title={t("features.title")} />
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Feature
                fx={fx}
                icon={<Puzzle className="h-6 w-6" />}
                title={t("features.items.puzzles.title")}
                text={t("features.items.puzzles.description")}
                link="/domenii"
                learnMore={t("features.learnMore")}
              />
              <Feature
                fx={fx}
                icon={<Waves className="h-6 w-6" />}
                title={t("features.items.sensory.title")}
                text={t("features.items.sensory.description")}
                link="/domenii"
                learnMore={t("features.learnMore")}
              />
              <Feature
                fx={fx}
                icon={<Eye className="h-6 w-6" />}
                title={t("features.items.illusions.title")}
                text={t("features.items.illusions.description")}
                link="/domenii"
                learnMore={t("features.learnMore")}
              />
              <Feature
                fx={fx}
                icon={<FlaskConical className="h-6 w-6" />}
                title={t("features.items.workshops.title")}
                text={t("features.items.workshops.description")}
                link="/domenii"
                learnMore={t("features.learnMore")}
              />
            </ul>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-12 sm:py-16 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <SectionKicker>{t("values.kicker")}</SectionKicker>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-300">{t("values.title")}</h2>
              <p className="text-gray-300">{t("values.description")}</p>
              <div className="flex items-center gap-6">
                <Donut value={79} label={t("values.stats.growth")} />
                <div>
                  <p className="text-4xl font-extrabold text-gray-300">370+</p>
                  <p className="text-sm text-gray-400">{t("values.stats.hours")}</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold text-gray-300">239+</p>
                  <p className="text-sm text-gray-400">{t("values.stats.experiments")}</p>
                </div>
              </div>
            </div>

            <div>
              <Image
                src="/images/interactive-physics-experiment.png"
                alt="Copil experimentează pendulul lui Newton la un stand"
                width={880}
                height={620}
                className={`w-full h-auto rounded-2xl object-cover ${fx}`}
                priority={false}
                sizes="(max-width: 1024px) 100vw, 880px"
              />
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="py-12 sm:py-16 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <img
                src="/images/optical-illusions-science-exhibit.png"
                alt="Copii și adulți explorează iluziile optice într-o sală interactivă cu modele geometrice colorate"
                width={880}
                height={620}
                className={`w-full h-auto rounded-2xl object-cover ${fx}`}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="space-y-6">
              <SectionKicker>{t("skills.kicker")}</SectionKicker>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-300">{t("skills.title")}</h2>
              <p className="text-gray-300">{t("skills.description")}</p>
              <Progress label={t("skills.progress.understanding")} value={75} />
              <Progress label={t("skills.progress.application")} value={86} />
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="py-12 sm:py-16 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionKicker>TARIFE</SectionKicker>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-300">Alege un plan potrivit vizitei tale</h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <PricingCard
                fx={fx}
                title="Individual"
                price="250 MDL/copil; 100 MDL/adult"
                perks={["Acces la toate zonele", "Ghidaj de sală", "Durata aprox. 1,5 ore"]}
              />

              <PricingCard
                fx={fx}
                highlight
                title="Grup/Școli"
                price="230 MDL/copil (min. 5 copii/grup)"
                perks={[
                  "Acces complet",
                  "Ghidaj de sală",
                  "Program personalizat",
                  "1 profesor gratuit/grup (max. 20 elevi)",
                  "Max. 2 grupuri simultan",
                ]}
              />
            </div>

            <p className="mt-6 pt-3 text-center text-sm text-gray-400 border-t border-white/10">
              Prețurile afișate sunt valabile până la{" "}
              <span className="font-medium text-gray-300">30 septembrie 2025</span> (inclusiv).
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-12 sm:py-16 border-b border-white/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionKicker>{t("faq.kicker")}</SectionKicker>
            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="f1" className={`border-b border-white/10 ${fx}`}>
                <AccordionTrigger className="text-left">{t("faq.items.audience.question")}</AccordionTrigger>
                <AccordionContent className="text-gray-300">{t("faq.items.audience.answer")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="f2" className={`border-b border-white/10 ${fx}`}>
                <AccordionTrigger className="text-left">{t("faq.items.duration.question")}</AccordionTrigger>
                <AccordionContent className="text-gray-300">{t("faq.items.duration.answer")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="f3" className={`border-b border-white/10 ${fx}`}>
                <AccordionTrigger className="text-left">{t("faq.items.booking.question")}</AccordionTrigger>
                <AccordionContent className="text-gray-300">{t("faq.items.booking.answer")}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
    </>
  )
}

/* ————— Sub-componente ————— */

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-sky-300">
      <span className="inline-block h-1 w-1 rounded-full bg-sky-400" />
      {children}
    </span>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
      {title}
    </h2>
  )
}

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

function Donut({ value, label }: { value: number; label: string }) {
  const rotation = (value / 100) * 360
  return (
    <div className="relative grid place-items-center">
      <div
        className="h-20 w-20 rounded-full"
        style={{
          background:
            "conic-gradient(rgb(56,189,248) 0deg, rgb(168,85,247) " +
            rotation +
            "deg, rgba(255,255,255,0.08) " +
            rotation +
            "deg 360deg)",
        }}
        aria-hidden
      />
      <div className="absolute text-center">
        <div className="text-xl font-bold text-gray-300">{value}%</div>
        <div className="text-[10px] text-gray-400">{label}</div>
      </div>
    </div>
  )
}

function Progress({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-300">{label}</span>
        <span className="text-gray-300 font-medium">{value}%</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
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
      {/* no button */}
    </div>
  )
}
