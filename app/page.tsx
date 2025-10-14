"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bot, Globe, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import OfferCTA from "@/components/offer/OfferCTA"
import { useLocale } from "@/contexts/locale-context"

export default function Page() {
  const { t } = useLocale() as any
  const fx = "transition-shadow duration-300 ease-out hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_28px_6px_rgba(168,85,247,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400/70 rounded-md"

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center py-8 sm:py-14">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
                {t?.hero?.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">{t?.hero?.subtitle}</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className={`bg-sky-500 text-white hover:bg-sky-400 ${fx}`}>
                  <Link href="/solutions" aria-label={t?.nav?.solutions}>
                    {t?.hero?.ctaPrimary}
                    <ArrowRight className="ms-2 h-4 w-4" aria-hidden />
                  </Link>
                </Button>

                <OfferCTA className={`${fx} active:scale-95 transition-transform`} />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.18),transparent_60%)]" />
              <Image
                src="/images/hero-tinkaai.webp" // <- imagine in loc de 3D robot in /public/images
                alt="TINKA AI — soluții AI & web"
                width={880}
                height={700}
                className="w-full h-auto rounded-2xl object-cover select-none pointer-events-none"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* CE OFERIM (3 carduri) */}
      <section className="py-12 sm:py-16 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
            {t?.whatWeOffer?.title}
          </h2>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li className={`p-5 rounded-xl border border-white/10 bg-white/5 ${fx}`}>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-white/8 text-sky-400"><Bot className="h-5 w-5" /></div>
                <p className="font-semibold text-gray-300">{t?.whatWeOffer?.chatbots?.name}</p>
              </div>
              <p className="mt-2 text-sm text-gray-300">{t?.whatWeOffer?.chatbots?.description}</p>
            </li>

            <li className={`p-5 rounded-xl border border-white/10 bg-white/5 ${fx}`}>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-white/8 text-sky-400"><Globe className="h-5 w-5" /></div>
                <p className="font-semibold text-gray-300">{t?.whatWeOffer?.websites?.name}</p>
              </div>
              <p className="mt-2 text-sm text-gray-300">{t?.whatWeOffer?.websites?.description}</p>
            </li>

            <li className={`p-5 rounded-xl border border-white/10 bg-white/5 ${fx}`}>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-white/8 text-sky-400"><Zap className="h-5 w-5" /></div>
                <p className="font-semibold text-gray-300">{t?.whatWeOffer?.automation?.name}</p>
              </div>
              <p className="mt-2 text-sm text-gray-300">{t?.whatWeOffer?.automation?.description}</p>
            </li>
          </ul>
        </div>
      </section>

      {/* OFERTĂ SPECIALĂ */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`p-6 rounded-xl border border-sky-400/40 bg-white/5 ${fx}`}>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/30">
                {t?.specialOffer?.badge}
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-bold text-gray-200">{t?.specialOffer?.title}</h3>
            <p className="mt-1 text-gray-300">{t?.specialOffer?.description}</p>
            <div className="mt-4">
              <OfferCTA className="active:scale-95 transition-transform" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
