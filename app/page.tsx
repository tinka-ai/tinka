"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Spotlight } from "@/components/ui/spotlight"
import { SplineScene } from "@/components/ui/spline-scene"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background"
import { Navbar } from "@/components/ui/navbar"
import { useLocale } from "@/contexts/locale-context"
import { ArrowRight, Bot, Globe, Workflow, Lightbulb, Clock, DollarSign, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { t } = useLocale()

  const technologies = ["ChatGPT", "Claude", "Python", "React", "Next.js", "TensorFlow", "PyTorch", "Node.js"]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        <div className="container mx-auto px-4">
          <Card className="w-full h-[500px] bg-card/[0.96] relative overflow-hidden border-none">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

            <div className="flex h-full">
              <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-balance">
                  {t.hero.title}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-lg leading-relaxed">{t.hero.subtitle}</p>

                <div className="mt-8">
                  <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    {t.hero.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 relative">
                <SplineScene
                  scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.whatWeOffer.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-primary-foreground/50 transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <Bot className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground leading-tight">{t.whatWeOffer.chatbots.name}</h3>
                <p className="text-muted-foreground leading-snug">{t.whatWeOffer.chatbots.description}</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-primary-foreground/50 transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground leading-tight">{t.whatWeOffer.websites.name}</h3>
                <p className="text-muted-foreground leading-snug">{t.whatWeOffer.websites.description}</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-primary-foreground/50 transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <Workflow className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground leading-tight">{t.whatWeOffer.automation.name}</h3>
                <p className="text-muted-foreground leading-snug">{t.whatWeOffer.automation.description}</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border hover:border-primary-foreground/50 transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground leading-tight">{t.whatWeOffer.consulting.name}</h3>
                <p className="text-muted-foreground leading-snug">{t.whatWeOffer.consulting.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.whyAI.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t.whyAI.benefit1.title}</h3>
              <p className="text-muted-foreground leading-snug">{t.whyAI.benefit1.description}</p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-chart-1/20 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="h-8 w-8 text-chart-1" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t.whyAI.benefit2.title}</h3>
              <p className="text-muted-foreground leading-snug">{t.whyAI.benefit2.description}</p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-chart-4/20 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-chart-4" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t.whyAI.benefit3.title}</h3>
              <p className="text-muted-foreground leading-snug">{t.whyAI.benefit3.description}</p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-warning" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t.whyAI.benefit4.title}</h3>
              <p className="text-muted-foreground leading-snug">{t.whyAI.benefit4.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.technologies.title}</h2>
            <p className="text-lg text-muted-foreground">{t.technologies.subtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="px-6 py-3 text-base border-border bg-card/50 hover:bg-card hover:border-primary-foreground/50 transition-all duration-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <AnimatedGradientBackground
          Breathing={true}
          gradientColors={["#0A0A0A", "#2979FF", "#FF80AB", "#FF6D00", "#FFD600", "#00E676", "#3D5AFE"]}
          gradientStops={[35, 50, 60, 70, 80, 90, 100]}
        />
        <div className="relative z-10 container mx-auto px-4">
          <Card className="max-w-3xl mx-auto bg-card/95 backdrop-blur-sm border-primary-foreground/20">
            <CardContent className="p-12 text-center space-y-6">
              <Badge className="bg-primary-foreground text-primary">{t.specialOffer.badge}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.specialOffer.title}</h2>
              <p className="text-lg text-muted-foreground">{t.specialOffer.description}</p>
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                {t.specialOffer.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer id="contact" className="relative py-20 bg-background border-t border-border">
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
