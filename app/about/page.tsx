"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/ui/navbar"
import { useLocale } from "@/contexts/locale-context"
import { ArrowRight, Target, Heart, Zap, Users, Lightbulb, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const { t } = useLocale()

  const values = [
    {
      icon: Heart,
      title: t.about.values.value1.title,
      description: t.about.values.value1.description,
    },
    {
      icon: Zap,
      title: t.about.values.value2.title,
      description: t.about.values.value2.description,
    },
    {
      icon: Users,
      title: t.about.values.value3.title,
      description: t.about.values.value3.description,
    },
    {
      icon: Lightbulb,
      title: t.about.values.value4.title,
      description: t.about.values.value4.description,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">{t.about.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{t.about.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8 md:p-12 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">{t.about.story.title}</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>{t.about.story.paragraph1}</p>
                    <p>{t.about.story.paragraph2}</p>
                    <p>{t.about.story.paragraph3}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8 space-y-6">
                <div className="h-16 w-16 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">{t.about.mission.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t.about.mission.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8 space-y-6">
                <div className="h-16 w-16 bg-chart-4/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-chart-4" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">{t.about.vision.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t.about.vision.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.about.values.title}</h2>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="bg-card/80 backdrop-blur-sm border-border">
                  <CardContent className="p-8 space-y-4">
                    <div className="h-12 w-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.about.team.title}</h2>
            </div>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{t.about.team.founder.name}</h3>
                    <Badge className="mb-4">{t.about.team.founder.role}</Badge>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>{t.about.team.founder.bio1}</p>
                      <p>{t.about.team.founder.bio2}</p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-8">
                    <h3 className="text-xl font-bold text-foreground mb-4">{t.about.team.approach.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{t.about.team.approach.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.about.whyUs.title}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border text-center">
                <CardContent className="p-6 space-y-3">
                  <div className="text-4xl font-bold text-primary-foreground">{t.about.whyUs.reason1.stat}</div>
                  <h3 className="text-lg font-semibold text-foreground">{t.about.whyUs.reason1.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.about.whyUs.reason1.description}</p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border text-center">
                <CardContent className="p-6 space-y-3">
                  <div className="text-4xl font-bold text-primary-foreground">{t.about.whyUs.reason2.stat}</div>
                  <h3 className="text-lg font-semibold text-foreground">{t.about.whyUs.reason2.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.about.whyUs.reason2.description}</p>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border text-center">
                <CardContent className="p-6 space-y-3">
                  <div className="text-4xl font-bold text-primary-foreground">{t.about.whyUs.reason3.stat}</div>
                  <h3 className="text-lg font-semibold text-foreground">{t.about.whyUs.reason3.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.about.whyUs.reason3.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-primary-foreground/10 to-chart-4/10 border-primary-foreground/30">
              <CardContent className="p-12 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.about.cta.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t.about.cta.description}</p>
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  {t.about.cta.button}
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
