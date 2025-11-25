// app/page.tsx — SEO MAX 2026

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"

import ArrowRight from "lucide-react/dist/esm/icons/arrow-right"
import Eye from "lucide-react/dist/esm/icons/eye"
import Puzzle from "lucide-react/dist/esm/icons/puzzle"
import Waves from "lucide-react/dist/esm/icons/waves"
import FlaskConical from "lucide-react/dist/esm/icons/flask-conical"
import Link2 from "lucide-react/dist/esm/icons/link-2"

import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

import LocalePageClient from "@/components/LocalePageClient"
import T from "@/components/T"

const OfferCTA = dynamic(() => import("@/components/offer/OfferCTA"), {
  ssr: false,
  loading: () => <span className="text-gray-400 text-sm">…</span>,
})

const TinkaBookSection = dynamic(
  () => import("@/components/sections/TinkaBookSection"),
  {
    ssr: false,
    loading: () => (
      <div className="text-center py-10 text-gray-400 text-sm">
        Loading...
      </div>
    ),
  }
)

export default function Page() {
  const fx =
    "transition-shadow duration-300 ease-out hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_28px_6px_rgba(168,85,247,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400/70 rounded-md"

  return (
    <LocalePageClient>
      <>
        {/* HERO */}
        <section
          id="acasa"
          aria-labelledby="hero-heading"
          className="relative overflow-hidden border-b border-white/5"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center py-8 sm:py-12">
              {/* TEXT HERO */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                  <span className="h-3.5 w-3.5 rounded-full bg-sky-400" />
                  <T path="hero.subtitle" />
                </div>

                <h1
                  id="hero-heading"
                  className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent"
                >
                  <T path="hero.title" />
                </h1>

                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
                  <T path="whatWeOffer.title" />
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    className={`bg-sky-500 text-white hover:bg-sky-400 ${fx}`}
                  >
                    <Link
                      href="/solutions"
                      aria-label="Vezi soluțiile digitale TINKA AI pentru afaceri din Moldova"
                    >
                      <T path="hero.ctaPrimary" />
                      <ArrowRight className="ms-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>

                  <OfferCTA
                    className={`${fx} active:scale-95 transition-transform`}
                  />
                </div>
              </div>

              {/* IMAGE HERO */}
              <div className="relative">
                <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.18),transparent_60%)]" />

                <Image
                  src="/image/hero-tinkaai.webp"
                  alt="TINKA AI – soluții AI și web design moderne pentru afaceri din Republica Moldova"
                  width={880}
                  height={700}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* WHY AI */}
        <section
          id="experiente"
          aria-labelledby="why-ai-heading"
          className="py-12 sm:py-16 border-b border-white/5"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2
              id="why-ai-heading"
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent"
            >
              <T path="whyAI.title" />
            </h2>

            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Feature
                fx={fx}
                icon={<Puzzle className="h-6 w-6" aria-hidden="true" />}
                title={<T path="whyAI.benefit1.title" />}
                text={<T path="whyAI.benefit1.description" />}
                link="/solutions"
                learnMore={<T path="hero.cta" />}
              />
              <Feature
                fx={fx}
                icon={<Waves className="h-6 w-6" aria-hidden="true" />}
                title={<T path="whyAI.benefit2.title" />}
                text={<T path="whyAI.benefit2.description" />}
                link="/solutions"
                learnMore={<T path="hero.cta" />}
              />
              <Feature
                fx={fx}
                icon={<Eye className="h-6 w-6" aria-hidden="true" />}
                title={<T path="whyAI.benefit3.title" />}
                text={<T path="whyAI.benefit3.description" />}
                link="/solutions"
                learnMore={<T path="hero.cta" />}
              />
              <Feature
                fx={fx}
                icon={<FlaskConical className="h-6 w-6" aria-hidden="true" />}
                title={<T path="whyAI.benefit4.title" />}
                text={<T path="whyAI.benefit4.description" />}
                link="/solutions"
                learnMore={<T path="hero.cta" />}
              />
            </ul>
          </div>
        </section>

        {/* TINKA BOOK */}
        <TinkaBookSection fx={fx} />

        {/* FAQ */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="py-12 sm:py-16 border-b border-white/5"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl font-bold text-gray-200"
            >
              <T path="contact.faq.title" />
            </h2>

            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem
                value="f1"
                className={`border-b border-white/10 ${fx}`}
              >
                <AccordionTrigger>
                  <T path="contact.faq.question1.q" />
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <T path="contact.faq.question1.a" />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="f2"
                className={`border-b border-white/10 ${fx}`}
              >
                <AccordionTrigger>
                  <T path="contact.faq.question2.q" />
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <T path="contact.faq.question2.a" />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </>
    </LocalePageClient>
  )
}

type FeatureProps = {
  fx: string
  icon: React.ReactNode
  title: React.ReactNode
  text: React.ReactNode
  link: string
  learnMore: React.ReactNode
}

function Feature({ fx, icon, title, text, link, learnMore }: FeatureProps) {
  return (
    <li
      className={`p-5 rounded-xl border border-white/10 bg-white/5 ${fx}`}
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-md bg-white/8 text-sky-400">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-300 text-lg" itemProp="name">
          {title}
        </h3>
      </div>

      <p className="mt-2 text-sm text-gray-300" itemProp="description">
        {text}
      </p>

      <Link
        href={link}
        className="mt-3 inline-flex items-center gap-2 text-sky-300 text-sm hover:text-white transition-colors"
        aria-label="Află mai multe despre acest serviciu TINKA AI"
      >
        <Link2 className="h-4 w-4" aria-hidden="true" />
        {learnMore}
      </Link>
    </li>
  )
}
