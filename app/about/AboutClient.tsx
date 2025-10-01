// app/about/AboutClient.tsx
"use client"

import { Navbar } from "@/components/ui/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/contexts/locale-context"
import Link from "next/link"
import { Heart, Shield, Target, Users, Lightbulb, ArrowRight } from "lucide-react"

export default function AboutClient() {
  const { t } = useLocale()

  // Fallback-uri sigure în cazul în care lipsesc chei în dicționare (previn erorile din build)
  const F = {
    footer: {
      company: "TINKA AI",
      tagline: "",
      description: "",
      quickLinks: "Link-uri rapide",
      home: "Acasă",
      solutions: "Soluții",
      about: "Despre",
      contact: "Contact",
      resources: "Resurse",
      blog: "Blog",
      caseStudies: "Studii de caz",
      faq: "FAQ",
      contactInfo: "Contact",
      email: "info@tinka.ai",
      phone: "+373 00 000 000",
      hours: "L–V 09:00–18:00",
      copyright: "© TINKA AI",
      privacy: "Confidențialitate",
      terms: "Termeni",
    },
    about: {
      hero: {
        title: "Despre TINKA AI",
        subtitle:
          "Construim soluții AI pragmatice: chatboți, automatisări și website-uri care aduc rezultate măsurabile.",
      },
      mission: {
        title: "Misiunea noastră",
        description:
          "Să transformăm companiile prin AI aplicat, începând cu proiecte mici și cu impact rapid (90 de zile), scalând apoi ce funcționează.",
      },
      values: {
        title: "Valorile noastre",
        value1: "Pragmatism înainte de hype — livrăm ce aduce ROI.",
        value2: "Transparență totală — scope clar, timeline și costuri ferme.",
        value3: "Învățare continuă — iterezi repede, măsori, optimizezi.",
      },
      team: {
        title: "O echipă mică, orientată pe impact",
        text:
          "Lucrăm în echipe compacte de implementare, direct cu stakeholderii tăi, pentru a scurta feedback loop-urile.",
      },
      cta: {
        title: "Vrei să vezi ce poate face AI în compania ta?",
        description: "Îți propunem un audit rapid de 60 minute și 3 oportunități cu impact imediat.",
        button: "Programează un call",
      },
    },
  }

  const dict = {
    footer: t?.footer ?? F.footer,
    about: t?.about ?? F.about,
  }

  const values = [
    { icon: Target, text: dict.about.values?.value1 ?? F.about.values.value1 },
    { icon: Shield, text: dict.about.values?.value2 ?? F.about.values.value2 },
    { icon: Heart, text: dict.about.values?.value3 ?? F.about.values.value3 },
  ].filter((v) => Boolean(v.text))

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              {dict.about.hero?.title ?? F.about.hero.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {dict.about.hero?.subtitle ?? F.about.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="pb-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8 md:p-12 space-y-4">
                <Badge className="bg-primary-foreground text-primary">Misiune</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {dict.about.mission?.title ?? F.about.mission.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {dict.about.mission?.description ?? F.about.mission.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {dict.about.values?.title ?? F.about.values.title}
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
                    <p className="text-muted-foreground leading-relaxed">{v.text}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team / Approach */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {dict.about.team?.title ?? F.about.team.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {dict.about.team?.text ?? F.about.team.text}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Abordare</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Începem cu un proiect pilot mic (2–4 săptămâni), măsurăm impactul, apoi scalăm. Fără vendor lock-in,
                  cu documentație și transfer de cunoștințe.
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
                <Badge className="bg-primary-foreground text-primary">Hai să discutăm</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {dict.about.cta?.title ?? F.about.cta.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {dict.about.cta?.description ?? F.about.cta.description}
                </p>
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  {dict.about.cta?.button ?? F.about.cta.button}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
              <h3 className="text-2xl font-bold text-foreground">{dict.footer.company}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{dict.footer.tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{dict.footer.description}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{dict.footer.quickLinks}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    {dict.footer.home}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">
                    {dict.footer.solutions}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    {dict.footer.about}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    {dict.footer.contact}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{dict.footer.resources}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    {dict.footer.blog}
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors">
                    {dict.footer.caseStudies}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    {dict.footer.faq}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{dict.footer.contactInfo}</h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">{dict.footer.email}</p>
                <p className="text-muted-foreground">{dict.footer.phone}</p>
                <p className="text-muted-foreground">{dict.footer.hours}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">{dict.footer.copyright}</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                {dict.footer.privacy}
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                {dict.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
