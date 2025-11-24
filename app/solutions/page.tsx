// app/solutions/page.tsx (SERVER COMPONENT – ZERO JS)
// ❗ IMPORTANT: fără "use client"

import Image from "next/image"
import Link from "next/link"
import Script from "next/script"

// ICONS — import individual (tree-shaking, bundle ultra-mic)
import Bot from "lucide-react/dist/esm/icons/bot"
import Globe from "lucide-react/dist/esm/icons/globe"
import Workflow from "lucide-react/dist/esm/icons/workflow"
import Lightbulb from "lucide-react/dist/esm/icons/lightbulb"
import AlertCircle from "lucide-react/dist/esm/icons/alert-circle"
import Zap from "lucide-react/dist/esm/icons/zap"
import Users from "lucide-react/dist/esm/icons/users"
import Code from "lucide-react/dist/esm/icons/code"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getTranslations } from "@/lib/server-i18n"

export const metadata = {
  title: "Soluții Digitale & AI pentru Afaceri din Moldova | TINKA AI",
  description:
    "Chatbot-uri AI, website-uri moderne, automatizări business și consultanță digitală pentru IMM-uri din Republica Moldova.",

  alternates: {
    canonical: "https://tinka.md/solutions",
    languages: {
      "ro-MD": "https://tinka.md/solutions",
      "en-US": "https://tinka.md/en/solutions",
      "ru-MD": "https://tinka.md/ru/solutions",
    },
  },

  openGraph: {
    title: "Soluții Digitale & AI pentru Afaceri din Moldova",
    description:
      "Implementăm chatbot-uri AI, website-uri moderne și automatizări pentru companii.",
    url: "https://tinka.md/solutions",
    siteName: "TINKA AI",
    type: "website",
    images: [
      {
        url: "https://tinka.md/og/solutions-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
}

function StructuredDataSolutions() {
  return (
    <Script
      id="solutions-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Soluții Digitale și AI",
          itemListElement: [
            { "@type": "Service", name: "Chatbot AI", url: "https://tinka.md/solutions#chatbot" },
            { "@type": "Service", name: "Web Design", url: "https://tinka.md/solutions#website" },
            { "@type": "Service", name: "Automatizări", url: "https://tinka.md/solutions#automation" },
            { "@type": "Service", name: "Consultanță", url: "https://tinka.md/solutions#consulting" },
          ],
        }),
      }}
    />
  )
}

export default async function SolutionsPage() {
  const t = await getTranslations()

  const services = [
    {
      id: "chatbot",
      h2: "Chatbot AI pentru Afaceri",
      icon: Bot,
      title: t.solutions.chatbotDetail.title,
      problem: t.solutions.chatbotDetail.problemText,
      how: t.solutions.chatbotDetail.howText,
      forWho: t.solutions.chatbotDetail.forWhoText,
      example: t.solutions.chatbotDetail.exampleText,
      tech: ["ChatGPT", "Claude", "Python", "WhatsApp API"],
    },

    {
      id: "website",
      h2: "Web Design & Creare Website",
      icon: Globe,
      title: t.solutions.websiteDetail.title,
      problem: t.solutions.websiteDetail.problemText,
      how: t.solutions.websiteDetail.howText,
      forWho: t.solutions.websiteDetail.forWhoText,
      example: t.solutions.websiteDetail.exampleText,
      tech: ["Next.js", "React", "TailwindCSS"],
    },

    {
      id: "automation",
      h2: "Automatizări Business cu AI",
      icon: Workflow,
      title: t.solutions.automationDetail.title,
      problem: t.solutions.automationDetail.problemText,
      how: t.solutions.automationDetail.howText,
      forWho: t.solutions.automationDetail.forWhoText,
      example: t.solutions.automationDetail.exampleText,
      tech: ["Python", "Zapier", "Make"],
    },

    {
      id: "consulting",
      h2: "Consultanță în Strategie Digitală",
      icon: Lightbulb,
      title: t.solutions.consultingDetail.title,
      problem: t.solutions.consultingDetail.problemText,
      how: t.solutions.consultingDetail.howText,
      forWho: t.solutions.consultingDetail.forWhoText,
      example: t.solutions.consultingDetail.exampleText,
      tech: ["AI Strategy", "ROI Analysis"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <StructuredDataSolutions />

      {/* HERO (SERVER RENDERED – NO JS) */}
      <section className="pt-32 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Soluții Digitale și AI pentru Afaceri din Moldova
        </h1>

        <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
          {t.solutions.subtitle}
        </p>
      </section>

      {/* LISTĂ SERVICII */}
      <section className="py-16">
        <div className="container mx-auto px-4 space-y-24">
          {services.map((s) => {
            const Icon = s.icon

            return (
              <div id={s.id} key={s.id} className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">{s.h2}</h2>

                <Card className="bg-card/80 backdrop-blur-sm border-border">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="h-16 w-16 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold">{s.title}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <ServiceBlock icon={AlertCircle} title="Problema" text={s.problem} color="text-destructive" />
                      <ServiceBlock icon={Zap} title="Cum ajutăm" text={s.how} color="text-warning" />
                      <ServiceBlock icon={Users} title="Pentru cine" text={s.forWho} color="text-chart-4" />
                      <TechBlock tech={s.tech} />
                    </div>

                    {/* EXEMPLU */}
                    <div className="bg-muted/50 rounded-lg p-6 border">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-warning" />
                        Exemplu practic
                      </h3>
                      <p className="text-muted-foreground italic">{s.example}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function ServiceBlock({ icon: Icon, title, text, color }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-1 ${color}`} />
        <div>
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{text}</p>
        </div>
      </div>
    </div>
  )
}

function TechBlock({ tech }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Code className="h-5 w-5 text-success mt-1" />
        <div>
          <h3 className="font-semibold mb-2">Tehnologii</h3>
          <div className="flex flex-wrap gap-2">
            {tech.map((t: string) => (
              <Badge key={t} variant="outline" className="text-xs">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
