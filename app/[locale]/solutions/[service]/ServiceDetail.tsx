import { AlertCircle, ArrowRight, CheckCircle, Target, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LocaleLink as Link } from "@/components/ui/locale-link"

type ServiceData = {
  title: string
  subtitle: string
  problem?: { title: string; description: string }
  whereApplies?: { title: string; description: string; tags?: string[] }
  example?: { title: string; description: string }
  features?: { title: string; list: string[] }
  cta?: { primary: string; secondary?: string }
}

/**
 * Pagina completa pentru UN singur serviciu — extrasa din blocul de randare
 * pe care SolutionsClient.tsx il folosea anterior pentru fiecare sectiune
 * a paginii unice /solutions. Acum e reutilizata o singura data pentru
 * fiecare din cele 9 pagini dedicate /solutions/[service].
 */
export default function ServiceDetail({
  data,
  icon: Icon,
  color,
  borderColor,
  backLabel,
}: {
  data: ServiceData
  icon: LucideIcon
  color: string
  borderColor: string
  backLabel: string
}) {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <Link href="/solutions" className="text-sm text-primary hover:underline">
            ← {backLabel}
          </Link>

          <div className="max-w-4xl mx-auto text-center space-y-6 mt-6">
            <div className="flex justify-center">
              <div className={`h-24 w-24 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center border ${borderColor} shadow-xl`}>
                <Icon className="h-12 w-12 text-foreground" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance leading-tight">
              {data.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {data.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          {data.problem && (
            <Card className="bg-destructive/5 border-destructive/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground">{data.problem.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{data.problem.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {data.whereApplies && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Target className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-3">
                    <h3 className="font-bold text-foreground">{data.whereApplies.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{data.whereApplies.description}</p>
                    {data.whereApplies.tags && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {data.whereApplies.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
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

          {data.example && (
            <Card className="bg-success/5 border-success/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground">{data.example.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{data.example.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {data.features?.list && (
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-foreground">{data.features.title}</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {data.features.list.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground leading-snug">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.cta && (
            <div className="pt-6 text-center space-y-3">
              <Link href="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto">
                  {data.cta.primary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              {data.cta.secondary && (
                <p className="text-sm text-muted-foreground">{data.cta.secondary}</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
