"use client"

"use client"

import Link from "next/link"
import { ArrowRight, Bot, Globe, Workflow, Lightbulb, CheckCircle, AlertCircle, Zap, Users, Code } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/contexts/locale-context"
import { translations } from "@/lib/i18n"
export default function SolutionsPage() {
  const { t } = useLocale()

  // Fallback sigur: română ca default pentru orice cheie lipsă
  const ro = translations.ro
  const current = t ?? ro

  // Combinație profundă cu fallback pe ro
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
      icon: Bot,
      title: s.chatbotDetail.title,
      problem: s.chatbotDetail.problemText,
      how: s.chatbotDetail.howText,
      forWho: s.chatbotDetail.forWhoText,
      example: s.chatbotDetail.exampleText,
      tech: ["ChatGPT", "Claude", "Python", "WhatsApp API"],
    },
    {
      icon: Globe,
      title: s.websiteDetail.title,
      problem: s.websiteDetail.problemText,
      how: s.websiteDetail.howText,
      forWho: s.websiteDetail.forWhoText,
      example: s.websiteDetail.exampleText,
      tech: ["Next.js", "React", "TailwindCSS", "AI APIs"],
    },
    {
      icon: Workflow,
      title: s.automationDetail.title,
      problem: s.automationDetail.problemText,
      how: s.automationDetail.howText,
      forWho: s.automationDetail.forWhoText,
      example: s.automationDetail.exampleText,
      tech: ["Python", "Zapier", "Make", "Custom APIs"],
    },
    {
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
   

      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">{s.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{s.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Servicii detaliate */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="max-w-5xl mx-auto">
                  <Card className="bg-card/80 backdrop-blur-sm border-border overflow-hidden">
                    <CardContent className="p-8 md:p-12">
                      <div className="flex items-start gap-6 mb-8">
                        <div className="h-16 w-16 bg-primary-foreground/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground">{service.title}</h2>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-foreground mb-2">{labels.problem}</h3>
                              <p className="text-muted-foreground leading-relaxed">{service.problem}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-warning mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-foreground mb-2">{labels.how}</h3>
                              <p className="text-muted-foreground leading-relaxed">{service.how}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-chart-4 mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-foreground mb-2">{labels.forWho}</h3>
                              <p className="text-muted-foreground leading-relaxed">{service.forWho}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Code className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-foreground mb-2">{labels.tech}</h3>
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

                      <div className="bg-muted/50 rounded-lg p-6 border border-border">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-warning" />
                          {labels.example}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed italic">{service.example}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Proces */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{s.process.title}</h2>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[s.process.step1, s.process.step2, s.process.step3, s.process.step4].map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-card/80 backdrop-blur-sm border-border h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 bg-primary-foreground text-primary rounded-full flex items-center justify-center text-xl font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-foreground leading-tight">{step.title}</h3>
                    <p className="text-muted-foreground leading-snug">{step.description}</p>
                  </CardContent>
                </Card>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primul client */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-success/20 text-success border-success/30 mb-4">{s.firstClient.badge}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{s.firstClient.title}</h2>
            </div>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8 md:p-12 space-y-8">
                <p className="text-lg text-muted-foreground leading-relaxed">{s.firstClient.story}</p>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-6">{s.firstClient.results}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[s.firstClient.result1, s.firstClient.result2, s.firstClient.result3, s.firstClient.result4].map(
                      (result, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                          <p className="text-muted-foreground leading-snug">{result}</p>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 border-l-4 border-primary-foreground">
                  <p className="text-lg text-foreground leading-relaxed italic mb-4">{s.firstClient.testimonial}</p>
                  <div>
                    <p className="font-semibold text-foreground">{s.firstClient.author}</p>
                    <p className="text-sm text-muted-foreground">{s.firstClient.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ofertă specială */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-primary-foreground/10 to-chart-4/10 border-primary-foreground/30">
              <CardContent className="p-12 text-center space-y-6">
                <Badge className="bg-destructive text-destructive-foreground">{s.specialOffer.badge}</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">{s.specialOffer.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{s.specialOffer.description}</p>
                <div className="space-y-4">
                  <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    {s.specialOffer.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-sm text-destructive font-semibold">{s.specialOffer.urgency}</p>
                </div>
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
              <h3 className="text-2xl font-bold text-foreground">{f.company}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{f.quickLinks}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    {f.home}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">
                    {f.solutions}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    {f.about}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    {f.contact}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{f.resources}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    {f.blog}
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors">
                    {f.caseStudies}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    {f.faq}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{f.contactInfo}</h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">{f.email}</p>
                <p className="text-muted-foreground">{f.phone}</p>
                <p className="text-muted-foreground">{f.hours}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">{f.copyright}</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                {f.privacy}
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                {f.terms}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
