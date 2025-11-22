"use client"

import Link from "next/link"
import {
  ArrowRight,
  Bot,
  Globe,
  Workflow,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Zap,
  Users,
  Code,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/contexts/locale-context"
import { translations } from "@/lib/i18n"
import Script from "next/script"

/* ────────────────────────────────────────────────
   🔥 JSON-LD pentru pagina Solutions
────────────────────────────────────────────────── */
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
        url: "https://tinka.md/solutions#chatbot",
      },
      {
        "@type": "Service",
        name: "Creare website & Web Design",
        description: "Website modern, optimizat SEO pentru afaceri din Republica Moldova.",
        url: "https://tinka.md/solutions#website",
      },
      {
        "@type": "Service",
        name: "Automatizări Business cu AI",
        description: "Automatizări pentru CRM, WhatsApp, email, vânzări și suport clienți.",
        url: "https://tinka.md/solutions#automation",
      },
      {
        "@type": "Service",
        name: "Consultanță în Strategie Digitală",
        description: "Analiză, audit, plan digital, automatizări și roadmap.",
        url: "https://tinka.md/solutions#consulting",
      },
    ],
  }

  return (
    <Script
      id="solutions-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/* ────────────────────────────────────────────────
   🔥 Pagina completă
────────────────────────────────────────────────── */
export default function SolutionsPage() {
  const { t } = useLocale()

  const ro = translations.ro
  const current = t ?? ro

  // Deep merge cu fallback
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

  const services = [
    {
      id: "chatbot",
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
    <>
      {/* JSON-LD SEO */}
      <StructuredDataSolutions />

      <div className="min-h-screen bg-background">

        {/* HERO */}
        <section className="pt-32 pb-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {s.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {s.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────
            SERVICII DETALIATE
        ───────────────────────────────────────────────── */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 space-y-24">

            {services.map((service, index) => {
              const Icon = service.icon

              return (
                <div key={service.id} id={service.id} className="max-w-5xl mx-auto">
                  <Card className="bg-card/80 backdrop-blur-sm border-border">
                    <CardContent className="p-8 md:p-12">

                      <div className="flex items-start gap-6 mb-8">
                        <div className="h-16 w-16 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                          <Icon className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground">{service.title}</h2>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 mb-8">

                        {/* Problema */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-destructive mt-1" />
                            <div>
                              <h3 className="font-semibold mb-2">{s.labels.problem}</h3>
                              <p className="text-muted-foreground leading-relaxed">{service.problem}</p>
                            </div>
                          </div>
                        </div>

                        {/* Cum ajutăm */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-warning mt-1" />
                            <div>
                              <h3 className="font-semibold mb-2">{s.labels.how}</h3>
                              <p className="text-muted-foreground leading-relaxed">{service.how}</p>
                            </div>
                          </div>
                        </div>

                        {/* Pentru cine */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-chart-4 mt-1" />
                            <div>
                              <h3 className="font-semibold mb-2">{s.labels.forWho}</h3>
                              <p className="text-muted-foreground leading-relaxed">{service.forWho}</p>
                            </div>
                          </div>
                        </div>

                        {/* Tehnologii */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Code className="h-5 w-5 text-success mt-1" />
                            <div>
                              <h3 className="font-semibold mb-2">{s.labels.tech}</h3>
                              <div className="flex flex-wrap gap-2">
                                {service.tech.map(tech => (
                                  <Badge key={tech} variant="outline" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Exemplu */}
                      <div className="bg-muted/50 rounded-lg p-6 border border-border">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-warning" />
                          {s.labels.example}
                        </h3>
                        <p className="text-muted-foreground italic">{service.example}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              {s.process.title}
            </h2>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[s.process.step1, s.process.step2, s.process.step3, s.process.step4].map((step, i) => (
                <div key={i} className="relative">
                  <Card className="bg-card/80 backdrop-blur-sm border-border h-full">
                    <CardContent className="p-6 space-y-4">
                      <div className="h-12 w-12 bg-primary-foreground text-primary rounded-full flex items-center justify-center text-xl font-bold">
                        {i + 1}
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground leading-snug">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Studiu de caz */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="bg-success/20 text-success border-success/30 mb-4">
                {s.firstClient.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">{s.firstClient.title}</h2>
            </div>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8 md:p-12 space-y-8">
                <p className="text-lg text-muted-foreground">{s.firstClient.story}</p>

                <div>
                  <h3 className="text-xl font-bold mb-6">{s.firstClient.results}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[s.firstClient.result1, s.firstClient.result2, s.firstClient.result3, s.firstClient.result4].map(
                      (result, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <p className="text-muted-foreground">{result}</p>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 border-l-4 border-primary-foreground">
                  <p className="text-lg italic mb-4">{s.firstClient.testimonial}</p>
                  <div>
                    <p className="font-semibold">{s.firstClient.author}</p>
                    <p className="text-sm text-muted-foreground">{s.firstClient.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Ofertă specială */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <Card className="bg-gradient-to-br from-primary-foreground/10 to-chart-4/10 border-primary-foreground/30">
              <CardContent className="p-12 text-center space-y-6">
                <Badge className="bg-destructive text-destructive-foreground">
                  {s.specialOffer.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">{s.specialOffer.title}</h2>
                <p className="text-lg text-muted-foreground">{s.specialOffer.description}</p>
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  {s.specialOffer.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-sm text-destructive font-semibold">{s.specialOffer.urgency}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative py-20 bg-background border-t border-border">
          <div className="container mx-auto px-4 grid lg:grid-cols-4 md:grid-cols-2 gap-12">

            <div className="space-y-4 lg:col-span-1">
              <h3 className="text-2xl font-bold">{f.company}</h3>
              <p className="text-sm text-muted-foreground">{f.tagline}</p>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{f.quickLinks}</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-muted-foreground hover:text-foreground">{f.home}</Link></li>
                <li><Link href="/solutions" className="text-muted-foreground hover:text-foreground">{f.solutions}</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-foreground">{f.about}</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">{f.contact}</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{f.resources}</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">{f.blog}</Link></li>
                <li><Link href="/case-studies" className="text-muted-foreground hover:text-foreground">{f.caseStudies}</Link></li>
                <li><Link href="/faq" className="text-muted-foreground hover:text-foreground">{f.faq}</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">{f.contactInfo}</h4>
              <p className="text-sm text-muted-foreground">{f.email}</p>
              <p className="text-sm text-muted-foreground">{f.phone}</p>
              <p className="text-sm text-muted-foreground">{f.hours}</p>
            </div>

          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">{f.copyright}</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">{f.privacy}</Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">{f.terms}</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
