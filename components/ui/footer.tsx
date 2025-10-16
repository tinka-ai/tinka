// components/ui/footer.tsx
"use client"

import Link from "next/link"
import { useLocale } from "@/contexts/locale-context"

export default function Footer() {
  const { t: T } = useLocale() as any
  const t = (p: string) => p.split(".").reduce((a: any, k: string) => a?.[k], T) ?? p

  return (
    <footer className="relative py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Col 1 */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-2xl font-bold text-foreground">{t("footer.company")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.tagline")}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.description")}</p>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.home")}</Link></li>
              <li><Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.solutions")}</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.about")}</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.contact")}</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">{t("footer.resources")}</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.blog")}</Link></li>
              <li><Link href="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.caseStudies")}</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.faq")}</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">{t("footer.contactInfo")}</h4>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">{t("footer.email")}</p>
              <p className="text-muted-foreground">{t("footer.phone")}</p>
              <p className="text-muted-foreground">{t("footer.hours")}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">{t("footer.copyright")}</p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.privacy")}</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
