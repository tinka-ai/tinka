// app/solutions/SolutionsClient.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/contexts/locale-context"
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
import Link from "next/link"

export default function SolutionsClient() {
  const { t } = useLocale()

  // Fallback-uri ca să nu crape build-ul dacă lipsesc chei în dicționare
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
    solutions: {
      title: "Soluții",
      subtitle: "Transformă procesele cu AI aplicat",
      labels: {
        problem: "Problema",
        how: "Cum te ajută",
        forWho: "Pentru cine",
        tech: "Tehnologii",
        example: "Exemplu",
      },
      chatbotDetail: {
        title: "Chatbot-uri AI",
        problemText: "Răspunsuri întârziate, volum mare de întrebări repetate.",
        howText: "Automatizezi suportul și califici lead-uri 24/7.",
        forWhoText: "E-commerce, servicii, suport clienți.",
        exampleText: "Asistent care răspunde pe site și WhatsApp.",
      },
      websiteDetail: {
        title: "Website-uri cu AI",
        problemText: "Site-uri statice, greu de actualizat, fără conversie.",
        howText: "Website modern cu blocuri dinamice și asistent AI.",
        forWhoText: "Branduri care vor performanță și SEO.",
        exampleText: "Landing cu generare de conținut asistată.",
      },
      automationDetail: {
        title: "Automatizări",
        problemText: "Procese manuale, copy–paste între aplicații.",
        howText: "Integrezi CRM/ERP, email, WhatsApp, cu logică AI.",
        forWhoText: "Vânzări, marketing, operațiuni.",
        exampleText: "Calificare lead și creare deal în CRM automat.",
      },
      consultingDetail: {
        title: "Consultanță AI",
        problemText: "Multe opțiuni, dificil de prioritizat.",
        howText: "Strategie, ROI și plan de implementare.",
        forWhoText: "Companii la început de drum în AI.",
        exampleText: "Roadmap cu 90 de zile și KPI clari.",
      },
      process: {
        title: "Procesul nostru",
        step1: { title: "Descoperire", description: "Înțelegem obiectivele și constraints." },
        step2: { title: "Propunere", description: "Soluții, timeline și costuri." },
        step3: { title: "Implementare", description: "Livrare iterativă, testare." },
        step4: { title: "Lansare & Măsurare", description: "Optimizare pe KPI." },
      },
      firstClient: {
        badge: "STUDIU DE CAZ",
        title: "Cum am redus timpul de răspuns cu 70%",
        story:
          "Client din e-commerce cu sute de întrebări pe zi. Am integrat un asistent AI pe site și WhatsApp.",
        results: "Rezultate",
        result1: "–70% timp mediu de răspuns",
        result2: "–40% tichete la echipa umană",
        result3: "+25% conversii pe landing",
        result4: "CSAT în creștere cu 18%",
        testimonial: "„Implementarea a schimbat modul în care lucrăm zilnic.”",
        author: "Ana Popescu",
        role: "Head of CX",
      },
      specialOffer: {
        badge: "OFERTĂ LIMITATĂ",
        title: "Audit rapid de 60 minute",
        description: "Identificăm 3 oportunități AI cu impact imediat.",
        cta: "Programează un call",
        urgency: "Doar 5 sloturi pe săptămână",
      },
    },
  }

  const dict = {
    footer: t?.footer ?? F.footer,
    solutions: t?.solutions ?? F.solutions,
  }

  const L = dict.solutions.labels

  const services = [
    {
      icon: Bot,
      title: dict.solutions.chatbotDetail.title,
      problem: dict.solutions.chatbotDetail.problemText,
      how: dict.solutions.chatbotDetail.howText,
      forWho: dict.solutions.chatbotDetail.forWhoText,
      example: dict.solutions.chatbotDetail.exampleText,
      tech: ["ChatGPT", "Claude", "Python", "WhatsApp API"],
    },
    {
      icon: Globe,
      title: dict.solutions.websiteDetail.title,
      problem: dict.solutions.websiteDetail.problemText,
      how: dict.solutions.websiteDetail.howText,
      forWho: dict.solutions.websiteDetail.forWhoText,
      example: dict.solutions.websiteDetail.exampleText,
      tech: ["Next.js", "React", "TailwindCSS", "AI APIs"],
    },
    {
      icon: Workflow,
      title: dict.solutions.automationDetail.title,
      problem: dict.solutions.automationDetail.problemText,
      how: dict.solutions.automationDetail.howText,
      forWho: dict.solutions.automationDetail.forWhoText,
      example: dict.solutions.automationDetail.exampleText,
      tech: ["Python", "Zapier", "Make", "Custom APIs"],
    },
    {
      icon: Lightbulb,
      title: dict.solutions.consultingDetail.title,
      problem: dict.solutions.consultingDetail.problemText,
      how: dict.solutions.consultingDetail.howText,
      forWho: dict.solutions.consultingDetail.forWhoText,
      example: dict.solutions.consultingDetail.exampleText,
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">{dict.solutions.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{dict.solutions.subtitle}</p>
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
                              <h3 className="font-semibold text-foreground mb-2">{L.problem}</h3>
                              <p className="text-muted-foreground leading-relaxed">{service.problem}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Zap className="h-5 w-5 text-warning mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-foreground mb-2">{L.how}</h3>
                              <p className="text-muted-foreground leading-relaxed">{service.how}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Users className="h-5 w-5 text-chart-4 mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-foreground mb-2">{L.forWho}</h3>
                              <p className="text-muted-foreground leading-relaxed">{service.forWho}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Code className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-foreground mb-2">{L.tech}</h3>
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
                          {L.example}
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{dict.solutions.process.title}</h2>
          </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              dict.solutions.process.step1,
              dict.solutions.process.step2,
              dict.solutions.process.step3,
              dict.solutions.process.step4,
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
                {dict.solutions.firstClient.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {dict.solutions.firstClient.title}
              </h2>
            </div>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8 md:p-12 space-y-8">
                <p className="text-lg text-muted-foreground leading-relaxed">{dict.solutions.firstClient.story}</p>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-6">{dict.solutions.firstClient.results}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      dict.solutions.firstClient.result1,
                      dict.solutions.firstClient.result2,
                      dict.solutions.firstClient.result3,
                      dict.solutions.firstClient.result4,
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
                    {dict.solutions.firstClient.testimonial}
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{dict.solutions.firstClient.author}</p>
                    <p className="text-sm text-muted-foreground">{dict.solutions.firstClient.role}</p>
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
                <Badge className="bg-destructive text-destructive-foreground">
                  {dict.solutions.specialOffer.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">{dict.solutions.specialOffer.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {dict.solutions.specialOffer.description}
                </p>
                <div className="space-y-4">
                  <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    {dict.solutions.specialOffer.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-sm text-destructive font-semibold">{dict.solutions.specialOffer.urgency}</p>
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
