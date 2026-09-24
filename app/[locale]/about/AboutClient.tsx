"use client"

import React from "react"
import { LocaleLink as Link } from "@/components/ui/locale-link"
import { Heart, Shield, Target, Users, Lightbulb } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/contexts/locale-context"
import CalendlyButton from "@/components/CalendlyButton"
import { Reveal } from "@/components/ui/reveal"

const ABOUT_ART_URL =
  "https://pub-bc5d8e0529324fd4a08614212ba4438b.r2.dev/73511d02-2b42-4432-95f6-86fb3965580c.png"

const ABOUT_TEXT = {
  ro: {
    heroTitle: "Despre TINKA AI",
    heroSubtitle:
      "Construim software personalizat, platforme SaaS, chatboți AI, automatizări, conținut generat cu AI și platforme e-learning — soluții pragmatice care aduc rezultate măsurabile pentru afacerile din Moldova.",

    missionLabel: "Misiune",
    approachLabel: "Abordare",
    letsTalkLabel: "Hai să discutăm",

    missionTitle: "Misiunea noastră",
    missionDescription:
      "Să transformăm companiile prin AI aplicat, începând cu proiecte mici și cu impact rapid (90 de zile), scalând apoi ce funcționează.",

    valuesTitle: "Valorile noastre",
    value1: "Pragmatism înainte de hype — livrăm doar ce aduce ROI.",
    value2: "Transparență totală — scope clar, timeline și costuri ferme.",
    value3: "Învățare continuă — iterezi repede, măsori, optimizezi.",

    teamTitle: "O echipă mică, orientată pe impact",
    teamText:
      "Lucrăm în echipe compacte, aproape de fondatori și echipele de management, ca să scurtăm feedback loop-urile și să punem în producție repede soluțiile.",

    approachText:
      "Începem cu un proiect pilot mic (2–4 săptămâni), măsurăm impactul, apoi scalăm. Fără blocaje inutile, fără vendor lock-in, cu documentație și transfer de cunoștințe.",

    ctaTitle: "Vrei să vezi ce poate face AI în compania ta?",
    ctaDescription:
      "Îți propunem un audit rapid de 60 de minute și cel puțin 3 oportunități concrete unde AI poate reduce costuri sau crește venituri.",
    ctaButton: "Programează un apel telefonic",

    footerCompany: "TINKA AI",
    footerTagline: "— Digital. Simplu. Eficient.",
    footerDescription:
      "Soluții AI, dezvoltare web și automatizări pentru afaceri mici din Chișinău și din toată Moldova.",
    footerQuickLinks: "Link-uri rapide",
    footerHome: "Acasă",
    footerSolutions: "Soluții",
    footerAbout: "Despre",
    footerContact: "Contact",
    footerResources: "Resurse",
    footerBlog: "Blog",
    footerCaseStudies: "Cazuri de Studiu",
    footerFaq: "FAQ",
    footerContactInfo: "Informații Contact",
    footerEmail: "office@tinka.md",
    footerPhone: "+373 68 333 899",
    footerHours: "Luni–Duminică 10:00–22:00",
    footerPrivacy: "Politica de Confidențialitate",
    footerTerms: "Termeni și Condiții",
  },

  en: {
    heroTitle: "About TINKA AI",
    heroSubtitle:
      "We build custom software, SaaS platforms, AI chatbots, automations, AI-generated content and e-learning platforms — pragmatic solutions that deliver measurable results.",

    missionLabel: "Mission",
    approachLabel: "Approach",
    letsTalkLabel: "Let's talk",

    missionTitle: "Our mission",
    missionDescription:
      "To transform companies through applied AI, starting with small, high-impact projects (within ~90 days) and scaling what works.",

    valuesTitle: "Our values",
    value1: "Pragmatism over hype — we ship what brings ROI.",
    value2: "Full transparency — clear scope, timelines and fixed costs.",
    value3: "Continuous learning — iterate fast, measure, optimize.",

    teamTitle: "A small team focused on impact",
    teamText:
      "We work in compact implementation teams, directly with founders and managers, to shorten feedback loops and ship to production quickly.",

    approachText:
      "We start with a small pilot (2–4 weeks), measure impact, then scale. No vendor lock-in, clear documentation and handover.",

    ctaTitle: "Want to see what AI can do for your company?",
    ctaDescription:
      "We offer a 60-minute quick audit and at least 3 concrete AI opportunities to cut costs or grow revenue.",
    ctaButton: "Schedule a call",

    footerCompany: "TINKA AI",
    footerTagline: "— Digital. Simple. Efficient.",
    footerDescription:
      "AI solutions, web development and automation for small businesses in Chișinău and across Moldova.",
    footerQuickLinks: "Quick links",
    footerHome: "Home",
    footerSolutions: "Solutions",
    footerAbout: "About",
    footerContact: "Contact",
    footerResources: "Resources",
    footerBlog: "Blog",
    footerCaseStudies: "Case Studies",
    footerFaq: "FAQ",
    footerContactInfo: "Contact Info",
    footerEmail: "office@tinka.md",
    footerPhone: "+373 68 333 899",
    footerHours: "Mon–Sun 10:00–22:00",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms & Conditions",
  },

  ru: {
    heroTitle: "О компании TINKA AI",
    heroSubtitle:
      "Мы создаём индивидуальное ПО, SaaS-платформы, AI-чатботов, автоматизацию, AI-контент и платформы e-learning — практичные решения с измеримым результатом.",

    missionLabel: "Миссия",
    approachLabel: "Подход",
    letsTalkLabel: "Давайте обсудим",

    missionTitle: "Наша миссия",
    missionDescription:
      "Помогать компаниям использовать прикладной ИИ, начиная с небольших, но эффективных проектов (до 90 дней) и масштабируя то, что действительно работает.",

    valuesTitle: "Наши ценности",
    value1: "Практичность вместо хайпа — внедряем только то, что даёт результат.",
    value2: "Полная прозрачность — понятный объём работ, сроки и бюджет.",
    value3: "Постоянное улучшение — быстрые итерации, измерение, оптимизация.",

    teamTitle: "Небольшая команда, ориентированная на результат",
    teamText:
      "Мы работаем небольшими командами внедрения, напрямую с владельцами и менеджерами, чтобы быстро получать обратную связь и выводить решения в продакшн.",

    approachText:
      "Мы начинаем с небольшого пилота (2–4 недели), измеряем эффект, затем масштабируем. Без жёсткой привязки к подрядчику, с документацией и передачей знаний.",

    ctaTitle: "Хотите узнать, что ИИ может сделать для вашего бизнеса?",
    ctaDescription:
      "Мы проведём 60-минутный экспресс-аудит и предложим минимум 3 конкретные идеи, как с помощью ИИ снизить затраты или увеличить доход.",
    ctaButton: "Записаться на звонок",

    footerCompany: "TINKA AI",
    footerTagline: "— Цифрово. Просто. Эффективно.",
    footerDescription:
      "AI-решения, разработка сайтов и автоматизация для малого бизнеса в Кишинёве и по всей Молдове.",
    footerQuickLinks: "Быстрые ссылки",
    footerHome: "Главная",
    footerSolutions: "Решения",
    footerAbout: "О нас",
    footerContact: "Контакты",
    footerResources: "Ресурсы",
    footerBlog: "Блог",
    footerCaseStudies: "Кейсы",
    footerFaq: "FAQ",
    footerContactInfo: "Контакты",
    footerEmail: "office@tinka.md",
    footerPhone: "+373 68 333 899",
    footerHours: "Пн–Вс 10:00–22:00",
    footerPrivacy: "Политика конфиденциальности",
    footerTerms: "Условия использования",
  },
} as const

export default function AboutClient() {
  const { locale } = useLocale() as any
  const L = (ABOUT_TEXT as any)[locale] ?? ABOUT_TEXT.ro

  const values = [
    { icon: Target, text: L.value1, color: "amber" as const },
    { icon: Shield, text: L.value2, color: "violet" as const },
    { icon: Heart, text: L.value3, color: "cyan" as const },
  ].filter((v) => Boolean(v.text))

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-background overflow-hidden">
        <div className="glow-blob w-[26rem] h-[26rem] -top-20 -left-24 bg-[#ff9a56]/10" />
        <div className="glow-blob w-[24rem] h-[24rem] top-10 -right-16 bg-[#8b8ef5]/10" />
        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <Reveal className="space-y-6 text-center lg:text-left">
              <span className="eyebrow-pulse font-mono text-xs uppercase tracking-[0.22em] text-[#ff9a56]">
                TINKA AI
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
                {L.heroTitle}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {L.heroSubtitle}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="art-panel aspect-[4/3]">
                <img src={ABOUT_ART_URL} alt="" aria-hidden="true" loading="eager" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="pb-10 bg-background">
        <div className="container mx-auto px-4">
          <Reveal className="max-w-4xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-sm border-border hover-lift">
              <CardContent className="p-8 md:p-12 space-y-4">
                <Badge variant="outline" className="brand-chip-amber">
                  {L.missionLabel}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                  {L.missionTitle}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {L.missionDescription}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-16 bg-muted/30 overflow-hidden">
        <div className="glow-blob w-[22rem] h-[22rem] top-0 left-1/2 -translate-x-1/2 bg-[#6fd9ff]/8" />
        <div className="container relative mx-auto px-4">
          <Reveal className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">
              {L.valuesTitle}
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <Card className="group bg-card/80 backdrop-blur-sm border-border hover-lift hover:border-white/20 transition-colors">
                    <CardContent className="p-6 space-y-4">
                      <div className={`icon-badge icon-badge-${v.color} h-12 w-12`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {v.text}
                      </p>
                    </CardContent>
                  </Card>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team / Approach */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <Reveal>
              <Card className="group bg-card/80 backdrop-blur-sm border-border hover-lift hover:border-white/20 transition-colors h-full">
                <CardContent className="p-8 space-y-4">
                  <div className="icon-badge icon-badge-violet h-12 w-12">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {L.teamTitle}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {L.teamText}
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.1}>
              <Card className="group bg-card/80 backdrop-blur-sm border-border hover-lift hover:border-white/20 transition-colors h-full">
                <CardContent className="p-8 space-y-4">
                  <div className="icon-badge icon-badge-amber h-12 w-12">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {L.approachLabel}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {L.approachText}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-muted/30 overflow-hidden">
        <div className="glow-blob w-[28rem] h-[28rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ff9a56]/8" />
        <div className="container relative mx-auto px-4">
          <Reveal className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-[#ff9a56]/10 via-transparent to-[#8b8ef5]/10 border-[#8b8ef5]/25 hover-lift">
              <CardContent className="p-12 text-center space-y-6">
                <Badge variant="outline" className="brand-chip-cyan">
                  {L.letsTalkLabel}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {L.ctaTitle}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {L.ctaDescription}
                </p>

                <CalendlyButton
                  buttonText={L.ctaButton}
                  modalTitle={
                    locale === "en"
                      ? "Schedule a Free Phone Consultation"
                      : locale === "ru"
                      ? "Записаться на бесплатную консультацию"
                      : "Programează o consultație telefonică gratuită"
                  }
                  modalSubtitle={
                    locale === "en"
                      ? "30 minutes · Online · Let's discuss AI for your company"
                      : locale === "ru"
                      ? "30 минут · Онлайн · Обсудим ИИ для вашего бизнеса"
                      : "30 de minute · Online · Discutăm despre AI în compania ta"
                  }
                />
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Footer simplu */}
      <footer className="relative py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                {L.footerCompany}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {L.footerTagline}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {L.footerDescription}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                {L.footerQuickLinks}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    {L.footerHome}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {L.footerSolutions}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {L.footerAbout}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {L.footerContact}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                {L.footerResources}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    {L.footerBlog}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/case-studies"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {L.footerCaseStudies}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    {L.footerFaq}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                {L.footerContactInfo}
              </h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">{L.footerEmail}</p>
                <p className="text-muted-foreground">{L.footerPhone}</p>
                <p className="text-muted-foreground">{L.footerHours}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TINKA AI
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                {L.footerPrivacy}
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                {L.footerTerms}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
