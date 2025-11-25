"use client"

import Link from "next/link"
import { useLocale } from "@/contexts/locale-context"

export default function Footer() {
  const { t } = useLocale()

  return (
    <footer className="relative py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4">

        {/* GRID TOP */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          
          {/* COL 1 — COMPANY */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              {t("footer.company")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* COL 2 — QUICK LINKS */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/">{t("footer.home")}</Link></li>
              <li><Link href="/solutions">{t("footer.solutions")}</Link></li>
              <li><Link href="/about">{t("footer.about")}</Link></li>
              <li><Link href="/contact">{t("footer.contact")}</Link></li>
            </ul>
          </div>

          {/* COL 3 — RESOURCES */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">
              {t("footer.resources")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/blog">{t("footer.blog")}</Link></li>
              <li><Link href="/case-studies">{t("footer.caseStudies")}</Link></li>
              <li><Link href="/faq">{t("footer.faq")}</Link></li>
            </ul>
          </div>

          {/* COL 4 — CONTACT INFO */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">
              {t("footer.contactInfo")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t("footer.email")}</li>
              <li>{t("footer.phone")}</li>
              <li>{t("footer.hours")}</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p>

          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
