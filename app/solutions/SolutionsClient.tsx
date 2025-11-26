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
  Target,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function SolutionsClient() {
  const { t } = useLocale()

  // Verificăm dacă există noua structură solutions în traduceri
  const solutions = t?.solutions || {
    title: "Soluții",
    subtitle: "Transformăm procesele cu AI și aplicații",
    chatbots: {},
    websites: {},
    automation: {},
    consulting: {},
  }

  const services = [
    {
      icon: Bot,
      id: "chatbots",
      data: solutions.chatbots,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Globe,
      id: "websites",
      data: solutions.websites,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Workflow,
      id: "automation",
      data: solutions.automation,
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
    {
      icon: Lightbulb,
      id: "consulting",
      data: solutions.consulting,
      color: "from-orange-500/20 to-yellow-500/20",
      borderColor: "border-orange-500/30",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20 text-sm">
              {solutions.title}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance leading-tight">
              {solutions.subtitle}
            </h1>
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-32">
            {services.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="max-w-6xl mx-auto scroll-mt-24"
                >
                  <div
                    className={`flex flex-col ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    } gap-12 items-center`}
                  >
                    {/* Icon Card */}
                    <div className="w-full lg:w-1/3 flex justify-center">
                      <div
                        className={`h-32 w-32 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center border ${service.borderColor} shadow-xl`}
                      >
                        <Icon className="h-16 w-16 text-foreground" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-2/3 space-y-8">
                      {/* Header */}
                      <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                          {service.data?.title || "Titlu lipsă"}
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                          {service.data?.subtitle || ""}
                        </p>
                      </div>

                      {/* Problem */}
                      {service.data?.problem && (
                        <Card className="bg-destructive/5 border-destructive/20">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <AlertCircle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
                              <div className="space-y-2">
                                <h3 className="font-bold text-foreground">
                                  {service.data.problem.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                  {service.data.problem.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Where Applies */}
                      {service.data?.whereApplies && (
                        <Card className="bg-primary/5 border-primary/20">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <Target className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                              <div className="space-y-3">
                                <h3 className="font-bold text-foreground">
                                  {service.data.whereApplies.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                  {service.data.whereApplies.description}
                                </p>
                                {service.data.whereApplies.tags && (
                                  <div className="flex flex-wrap gap-2 pt-2">
                                    {service.data.whereApplies.tags.map((tag: string, i: number) => (
                                      <Badge
                                        key={i}
                                        variant="secondary"
                                        className="bg-primary/10 text-primary border-primary/20"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Example */}
                      {service.data?.example && (
                        <Card className="bg-success/5 border-success/20">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                              <div className="space-y-2">
                                <h3 className="font-bold text-foreground">
                                  {service.data.example.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                  {service.data.example.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Features */}
                      {service.data?.features?.list && (
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-foreground">
                            {service.data.features.title}
                          </h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            {service.data.features.list.map((feature: string, i: number) => (
                              <div key={i} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                                <p className="text-muted-foreground leading-snug">{feature}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      {service.data?.cta && (
                        <div className="pt-4 space-y-3">
                          <Link href="/contact">
                            <Button
                              size="lg"
                              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto"
                            >
                              {service.data.cta.primary}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          {service.data.cta.secondary && (
                            <p className="text-sm text-muted-foreground">
                              {service.data.cta.secondary}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
              Gata să transformi businessul tău?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Programează o consultație gratuită de 60 de minute și descoperă cum AI poate
              automatiza procesele tale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Programează consultație
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#what-we-offer">
                <Button size="lg" variant="outline">
                  Explorează soluțiile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                {t?.footer?.company || "TINKA AI"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t?.footer?.tagline || ""}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t?.footer?.description || ""}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                {t?.footer?.quickLinks || "Link-uri rapide"}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t?.footer?.home || "Acasă"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t?.footer?.solutions || "Soluții"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t?.footer?.about || "Despre"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t?.footer?.contact || "Contact"}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                {t?.footer?.resources || "Resurse"}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t?.footer?.blog || "Blog"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/case-studies"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t?.footer?.caseStudies || "Cazuri de studiu"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t?.footer?.faq || "FAQ"}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                {t?.footer?.contactInfo || "Contact"}
              </h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">{t?.footer?.email || "office@tinka.md"}</p>
                <p className="text-muted-foreground">{t?.footer?.phone || "+373 68 333 899"}</p>
                <p className="text-muted-foreground">
                  {t?.footer?.hours || "Luni–Duminică 10:00–22:00"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {t?.footer?.copyright || `© ${new Date().getFullYear()} TINKA AI`}
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t?.footer?.privacy || "Confidențialitate"}
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t?.footer?.terms || "Termeni"}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
