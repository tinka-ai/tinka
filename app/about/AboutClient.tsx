"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/contexts/locale-context"
import Link from "next/link"
import { Heart, Shield, Target, Users, Lightbulb } from "lucide-react"
import CalendlyButton from "@/components/CalendlyButton"

export default function AboutClient() {
  const { t: tFunc, locale } = useLocale()
  const t = tFunc

  // PRELUĂM TRADUCERILE CORECTE
  const A = t.aboutPage ?? {}           // <<< 🔥 AICI ESTE FIXUL
  const F = t.footer ?? {}

  // Combinăm fallback + traduceri
  const about = {
    hero: {
      title: A.title ?? "Despre TINKA AI",
      subtitle: A.subtitle ?? "Construim soluții AI pragmatice.",
    },
    mission: {
      title: A.mission?.title ?? "Misiunea noastră",
      description:
        A.mission?.description ??
        "Să transformăm companiile prin AI aplicat, cu proiecte rapide și scalabile.",
    },
    values: {
      title: A.values?.title ?? "Valorile noastre",
      value1:
        A.values?.value1 ??
        "Pragmatism înainte de hype — livrăm ce aduce rezultate reale.",
      value2:
        A.values?.value2 ??
        "Transparență — scope clar, timeline precis, buget ferm.",
      value3:
        A.values?.value3 ??
        "Învățare continuă — iterăm rapid, măsurăm, optimizăm.",
    },
    team: {
      title: A.team?.title ?? "O echipă mică, orientată pe impact",
      text:
        A.team?.text ??
        "Lucrăm în echipe compacte, cu feedback rapid și implementări eficiente.",
    },
    cta: {
      title:
        A.cta?.title ?? "Vrei să vezi ce poate face AI în compania ta?",
      description:
        A.cta?.description ??
        "Îți propunem un audit rapid de 60 minute și 3 oportunități cu impact imediat.",
      button:
        A.cta?.button ??
        (locale === "en"
          ? "Schedule a call"
          : locale === "ru"
          ? "Записаться на звонок"
          : "Programează un apel telefonic"),
    },
    labels: {
      mission:
        A.labels?.mission ??
        (locale === "en"
          ? "Mission"
          : locale === "ru"
          ? "Миссия"
          : "Misiune"),
      approach:
        A.labels?.approach ??
        (locale === "en"
          ? "Approach"
          : locale === "ru"
          ? "Подход"
          : "Abordare"),
      letsTalk:
        A.labels?.letsTalk ??
        (locale === "en"
          ? "Let's talk"
          : locale === "ru"
          ? "Давайте обсудим"
          : "Hai să discutăm"),
    },
  }

  const footer = {
    company: F.company ?? "TINKA AI",
    tagline: F.tagline ?? "",
    description: F.description ?? "",
    quickLinks: F.quickLinks ?? "Linkuri rapide",
    home: F.home ?? "Acasă",
    solutions: F.solutions ?? "Soluții",
    about: F.about ?? "Despre",
    contact: F.contact ?? "Contact",
    resources: F.resources ?? "Resurse",
    blog: F.blog ?? "Blog",
    caseStudies: F.caseStudies ?? "Studii de caz",
    faq: F.faq ?? "FAQ",
    contactInfo: F.contactInfo ?? "Contact",
    email: F.email ?? "office@tinka.md",
    phone: F.phone ?? "+373 68 333 899",
    hours: F.hours ?? "L–D 10:00–22:00",
    copyright: F.copyright,
    privacy: F.privacy ?? "Confidențialitate",
    terms: F.terms ?? "Termeni",
  }

  const values = [
    { icon: Target, text: about.values.value1 },
    { icon: Shield, text: about.values.value2 },
    { icon: Heart, text: about.values.value3 },
  ].filter(Boolean)

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {about.hero.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {about.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8 md:p-12 space-y-4">
                <Badge className="bg-primary-foreground text-primary">
                  {about.labels.mission}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {about.mission.title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {about.mission.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {about.values.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <Card
                  key={i}
                  className="bg-card/80 backdrop-blur-sm border-border hover:border-primary-foreground/50 transition-all"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">{v.text}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* TEAM + APPROACH */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{about.team.title}</h3>
                <p className="text-muted-foreground">{about.team.text}</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{about.labels.approach}</h3>
                <p className="text-muted-foreground">
                  {A.approach ??
                    "Începem cu un proiect pilot mic (2–4 săptămâni), măsurăm impactul, apoi scalăm."}
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-primary-foreground/10 to-chart-4/10 border-primary-foreground/30">
              <CardContent className="p-12 text-center space-y-6">
                <Badge className="bg-primary-foreground text-primary">
                  {about.labels.letsTalk}
                </Badge>

                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {about.cta.title}
                </h2>

                <p className="text-lg text-muted-foreground">
                  {about.cta.description}
                </p>

                <CalendlyButton
                  buttonText={about.cta.button}
                  modalTitle={
                    locale === "en"
                      ? "Schedule a Free Phone Consultation"
                      : locale === "ru"
                      ? "Бесплатная консультация"
                      : "Programează o consultație"
                  }
                  modalSubtitle={
                    locale === "en"
                      ? "30 minutes · Online"
                      : locale === "ru"
                      ? "30 минут · Онлайн"
                      : "30 minute · Online"
                  }
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{footer.company}</h3>
              <p className="text-sm text-muted-foreground">{footer.tagline}</p>
              <p className="text-sm text-muted-foreground">{footer.description}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{footer.quickLinks}</h4>
              <ul className="space-y-2">
                <li><Link href="/">{footer.home}</Link></li>
                <li><Link href="/solutions">{footer.solutions}</Link></li>
                <li><Link href="/about">{footer.about}</Link></li>
                <li><Link href="/contact">{footer.contact}</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{footer.resources}</h4>
              <ul className="space-y-2">
                <li><Link href="/blog">{footer.blog}</Link></li>
                <li><Link href="/case-studies">{footer.caseStudies}</Link></li>
                <li><Link href="/faq">{footer.faq}</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{footer.contactInfo}</h4>
              <div className="space-y-2 text-sm">
                <p>{footer.email}</p>
                <p>{footer.phone}</p>
                <p>{footer.hours}</p>
              </div>
            </div>

          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">{footer.copyright}</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy">{footer.privacy}</Link>
              <Link href="/terms">{footer.terms}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
