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
