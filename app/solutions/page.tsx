"use client"

import Link from "next/link"
import { ArrowRight, Bot, Globe, Workflow, Lightbulb, CheckCircle, AlertCircle, Zap, Users, Code } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/contexts/locale-context"
import { translations } from "@/lib/i18n"
import Script from "next/script"

function StructuredDataSolutions() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Soluții Digitale și AI - TINKA AI",
    itemListElement: [
      {
        "@type": "Service",
        name: "Chatbot AI pentru afaceri",
        description: "Chatboți AI în limba română și rusă pentru IMM-uri din Moldova.",
        url: "https://tinka.md/solutions#chatbot"
      },
      {
        "@type": "Service",
        name: "Creare website & Web Design",
        description: "Website modern, optimizat SEO pentru afaceri din Republica Moldova.",
        url: "https://tinka.md/solutions#website"
      },
      {
        "@type": "Service",
        name: "Automatizări Business cu AI",
        description: "Automatizări pentru CRM, WhatsApp, email, vânzări și suport clienți.",
        url: "https://tinka.md/solutions#automation"
      },
      {
        "@type": "Service",
        name: "Consultanță în Strategie Digitală",
        description: "Analiză, audit, plan digital și roadmap.",
        url: "https://tinka.md/solutions#consulting"
      }
    ]
  };

  return (
    <Script
      id="solutions-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function SolutionsPage() {
  const { t } = useLocale()

  // Fallback sigur: română ca default pentru orice cheie lipsă
  const ro = translations.ro
  const current = t ?? ro

  const s = {
    ...ro.solutions,
    ...(current.solutions ?? {}),
    labels: { ...ro.solutions.labels, ...(current.solutions?.labels ?? {}) },
    chatbotDetail: { ...ro.solutions.chatbotDetail, ...(current.solutions?.chatbotDetail ?? {}) },
    websiteDetail: { ...ro.solutions.websiteDetail, ...(current.solutions?.websiteDetail ?? {}) },
    automationDetail: { ...ro.solutions.automationDetail, ...(current.solutions?.automationDetail ?? {}) },
    consultingDetail: { ...ro.solutions.consultingDetail, ...(current.solutions?.consultingDetail ?? {}) },
    process: { ...ro.solutions.process, ...(current.solutions?.process ?? {}) },
    firstClient: { ...ro.solutions.firstClient, ...(current.solutions?.firstClient ?? {}) },
    specialOffer: { ...ro.solutions.specialOffer, ...(current.solutions?.specialOffer ?? {}) },
  }

  const f = {
    ...ro.footer,
    ...(current.footer ?? {}),
  }

  const labels = s.labels

  const services = [
    {
      id: "chatbot",
      h2: "Chatbot AI pentru Afaceri din Moldova",
      icon: Bot,
      title: s.chatbotDetail.title,
      problem: s.chatbotDetail.problemText,
      how: s.chatbotDetail.howText,
      forWho: s.chatbotDetail.forWhoText,
      example: s.chatbotDetail.exampleText,
      tech: ["ChatGPT", "Claude", "Python", "WhatsApp API"],
    },
    {
      id: "website",
      h2: "Web Design & Creare Website în Chișinău",
      icon: Globe,
      title: s.websiteDetail.title,
      problem: s.websiteDetail.problemText,
      how: s.websiteDetail.howText,
      forWho: s.websiteDetail.forWhoText,
      example: s.websiteDetail.exampleText,
      tech: ["Next.js", "React", "TailwindCSS", "AI APIs"],
    },
    {
      id: "automation",
      h2: "Automatizări Business cu Integrare AI",
      icon: Workflow,
      title: s.automationDetail.title,
      problem: s.automationDetail.problemText,
      how: s.automationDetail.howText,
      forWho: s.automationDetail.forWhoText,
      example: s.automationDetail.exampleText,
      tech: ["Python", "Zapier", "Make", "Custom APIs"],
    },
    {
      id: "consulting",
      h2: "Consultanță în Strategie Digitală și Implementare AI",
      icon: Lightbulb,
      title: s.consultingDetail.title,
      problem: s.consultingDetail.problemText,
      how: s.consultingDetail.howText,
      forWho: s.consultingDetail.forWhoText,
      example: s.consultingDetail.exampleText,
      tech: ["AI Strategy", "ROI Analysis", "Implementation"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <StructuredDataSolutions />

      {/* HERO cu H1 SEO */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Soluții Digitale și AI pentru Afaceri din Moldova
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            {s.subtitle}
          </p>
        </div>
      </section>

      {/* Servicii – cu H2 pentru fiecare */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 space-y-24">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <div id={service.id} key={service.id} className="max-w-5xl mx-auto">
                {/* H2 optimizat SEO */}
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                  {service.h2}
                </h2>

                <Card className="bg-card/80 backdrop-blur-sm border-border overflow-hidden">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="h-16 w-16 bg-primary-foreground/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">

                      {/* H3 – Problema */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-destructive mt-1" />
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Problema în afacere</h3>
                            <p className="text-muted-foreground">{service.problem}</p>
                          </div>
                        </div>
                      </div>

                      {/* H3 – Cum ajutăm */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Zap className="h-5 w-5 text-warning mt-1" />
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Cum te ajutăm</h3>
                            <p className="text-muted-foreground">{service.how}</p>
                          </div>
                        </div>
                      </div>

                      {/* H3 – Pentru cine */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Users className="h-5 w-5 text-chart-4 mt-1" />
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Pentru cine este</h3>
                            <p className="text-muted-foreground">{service.forWho}</p>
                          </div>
                        </div>
                      </div>

                      {/* H3 – Tehnologii */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Code className="h-5 w-5 text-success mt-1" />
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Tehnologii</h3>
                            <div className="flex flex-wrap gap-2">
                              {service.tech.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* H3 – Exemplu practic */}
                    <div className="bg-muted/50 rounded-lg p-6 border">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-warning" />
                        Exemplu practic
                      </h3>
                      <p className="text-muted-foreground italic">
                        {service.example}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </section>

      {/* Proces */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
            Procesul nostru de lucru
          </h2>
          {/* ... păstrat restul codului exact ca la tine ... */}
        </div>
      </section>

      {/* Studiu de caz */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Studiu de caz – rezultate pentru clienți din Moldova
          </h2>
          {/* ... restul codului ... */}
        </div>
      </section>

      {/* Ofertă specială */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Ofertă specială pentru clienți din Republica Moldova
          </h2>

          {/* ... restul codului ... */}
        </div>
      </section>

      {/* Footer identic */}
      {/* ... footer-ul tău neschimbat ... */}
    </div>
  )
}
