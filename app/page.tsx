// app/page.tsx
"use client"

import type React from "react"
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
                  src="/images/interactive-physics-experiment.png"
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
