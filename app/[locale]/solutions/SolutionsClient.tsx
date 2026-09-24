// app/solutions/SolutionsClient.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/contexts/locale-context"
import { ArrowRight } from "lucide-react"
import { LocaleLink as Link } from "@/components/ui/locale-link"
import { SERVICES } from "./services-data"

export default function SolutionsClient() {
  const { t } = useLocale()

  const solutions = t?.solutions || { title: "Soluții", subtitle: "" }

  return (
    <div className="min-h-screen bg-background">
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

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {SERVICES.map((service) => {
              const data = (solutions as any)[service.key] || {}
              const Icon = service.icon
              return (
                <Link key={service.slug} href={`/solutions/${service.slug}`} className="group block h-full">
                  <Card className="h-full bg-card/80 backdrop-blur-sm border-border hover-lift hover:border-white/20 transition-colors">
                    <CardContent className="p-6 space-y-4 flex flex-col h-full">
                      <div className={`h-14 w-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center border ${service.borderColor}`}>
                        <Icon className="h-7 w-7 text-foreground" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {data.title || service.slug}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {data.subtitle}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        {data.cta?.primary ? data.cta.primary.split(" ").slice(0, 3).join(" ") : ""}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
              Gata să transformi businessul tău?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Programează o consultație gratuită de 60 de minute și descoperă cum AI poate automatiza procesele tale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Programează consultație
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-2xl font-bold text-foreground">{t?.footer?.company || "TINKA AI"}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t?.footer?.tagline || ""}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{t?.footer?.description || ""}</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{t?.footer?.quickLinks || "Link-uri rapide"}</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">{t?.footer?.home || "Acasă"}</Link></li>
                <li><Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">{t?.footer?.solutions || "Soluții"}</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">{t?.footer?.about || "Despre"}</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">{t?.footer?.contact || "Contact"}</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{t?.footer?.resources || "Resurse"}</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">{t?.footer?.blog || "Blog"}</Link></li>
                <li><Link href="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors">{t?.footer?.caseStudies || "Cazuri de studiu"}</Link></li>
                <li><Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">{t?.footer?.faq || "FAQ"}</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{t?.footer?.contactInfo || "Contact"}</h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">{t?.footer?.email || "office@tinka.md"}</p>
                <p className="text-muted-foreground">{t?.footer?.phone || "+373 68 333 899"}</p>
                <p className="text-muted-foreground">{t?.footer?.hours || "Luni–Duminică 10:00–22:00"}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">{t?.footer?.copyright || `© ${new Date().getFullYear()} TINKA AI`}</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">{t?.footer?.privacy || "Confidențialitate"}</Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">{t?.footer?.terms || "Termeni"}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
