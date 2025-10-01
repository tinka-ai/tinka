"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/ui/navbar"
import { useLocale } from "@/contexts/locale-context"
import { ArrowRight, Bot, Globe, Workflow, Lightbulb, CheckCircle, AlertCircle, Zap, Users, Code } from "lucide-react"
import Link from "next/link"

export default function SolutionsPage() {
  const { t } = useLocale()

  const services = [
    {
      icon: Bot,
      title: t.solutions.chatbotDetail.title,
      problem: t.solutions.chatbotDetail.problemText,
      how: t.solutions.chatbotDetail.howText,
      forWho: t.solutions.chatbotDetail.forWhoText,
      example: t.solutions.chatbotDetail.exampleText,
      tech: ["ChatGPT", "Claude", "Python", "WhatsApp API"],
    },
    {
      icon: Globe,
      title: t.solutions.websiteDetail.title,
      problem: t.solutions.websiteDetail.problemText,
      how: t.solutions.websiteDetail.howText,
      forWho: t.solutions.websiteDetail.forWhoText,
      example: t.solutions.websiteDetail.exampleText,
      tech: ["Next.js", "React", "TailwindCSS", "AI APIs"],
    },
    {
      icon: Workflow,
      title: t.solutions.automationDetail.title,
      problem: t.solutions.automationDetail.problemText,
      how: t.solutions.automationDetail.howText,
      forWho: t.solutions.automationDetail.forWhoText,
      example: t.solutions.automationDetail.exampleText,
      tech: ["Python", "Zapier", "Make", "Custom APIs"],
    },
    {
      icon: Lightbulb,
      title: t.solutions.consultingDetail.title,
      problem: t.solutions.consultingDetail.problemText,
      how: t.solutions.consultingDetail.howText,
      forWho: t.solutions.consultingDetail.forWhoText,
      example: t.solutions.consultingDetail.exampleText,
      tech: ["AI Strategy", "ROI Analysis", "Implementation"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">{t.solutions.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{t.solutions.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Detailed Services */}
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
                        <div>
                          <h2 className="text-3xl font-bold text-foreground mb-2">{service.title}</h2>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-foreground mb-2">
                                {t.solutions.chatbotDetail.problem}
                              </h3>
                              <p className="text-muted-foreground leading-relaxed">{service.problem}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-warning mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-foreground mb-2">{t.solutions.chatbotDetail.how}</h3>
                              <p className="text-muted-foreground leading-relaxed">{service.how}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-chart-4 mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-foreground mb-2">{t.solutions.chatbotDetail.forWho}</h3>
                              <p className="text-muted-foreground leading-relaxed">{service.forWho}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Code className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-foreground mb-2">{t.solutions.chatbotDetail.tech}</h3>
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
                          {t.solutions.chatbotDetail.example}
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

      {/* Process Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.solutions.process.title}</h2>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              t.solutions.process.step1,
              t.solutions.process.step2,
              t.solutions.process.step3,
              t.solutions.process.step4,
            ].map((step, index) => (
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
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* First Client Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-success/20 text-success border-success/30 mb-4">
                {t.solutions.firstClient.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t.solutions.firstClient.title}</h2>
            </div>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8 md:p-12 space-y-8">
                <p className="text-lg text-muted-foreground leading-relaxed">{t.solutions.firstClient.story}</p>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-6">{t.solutions.firstClient.results}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      t.solutions.firstClient.result1,
                      t.solutions.firstClient.result2,
                      t.solutions.firstClient.result3,
                      t.solutions.firstClient.result4,
                    ].map((result, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground leading-snug">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 border-l-4 border-primary-foreground">
                  <p className="text-lg text-foreground leading-relaxed italic mb-4">
                    {t.solutions.firstClient.testimonial}
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{t.solutions.firstClient.author}</p>
                    <p className="text-sm text-muted-foreground">{t.solutions.firstClient.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Special Offer CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-primary-foreground/10 to-chart-4/10 border-primary-foreground/30">
              <CardContent className="p-12 text-center space-y-6">
                <Badge className="bg-destructive text-destructive-foreground">{t.solutions.specialOffer.badge}</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.solutions.specialOffer.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t.solutions.specialOffer.description}</p>
                <div className="space-y-4">
                  <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    {t.solutions.specialOffer.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-sm text-destructive font-semibold">{t.solutions.specialOffer.urgency}</p>
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
              <h3 className="text-2xl font-bold text-foreground">{t.footer.company}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.description}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{t.footer.quickLinks}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.home}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.solutions}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.contact}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{t.footer.resources}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.blog}
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.caseStudies}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.faq}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{t.footer.contactInfo}</h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">{t.footer.email}</p>
                <p className="text-muted-foreground">{t.footer.phone}</p>
                <p className="text-muted-foreground">{t.footer.hours}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">{t.footer.copyright}</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
