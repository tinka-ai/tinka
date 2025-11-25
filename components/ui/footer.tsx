// components/ui/footer.tsx (SERVER COMPONENT — ZERO JS)
import Link from "next/link"
import { getTranslations } from "@/lib/server-i18n"

export default async function Footer() {
  const t = await getTranslations()

  return (
    <footer className="relative py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          
          {/* COL 1 */}
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
            <h3 className="text-xl font-semibold mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/">{t("footer.home")}</Link></li>
              <li><Link href="/solutions">{t("footer.solutions")}</Link></li>
              <li><Link href="/about">{t("footer.about")}</Link></li>
              <li><Link href="/contact">{t("footer.contact")}</Link></li>
            </ul>
          </div>

          {/* COL 3 — CONTACT INFO */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t("footer.contactInfo")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t("footer.email")}</li>
              <li>{t("footer.phone")}</li>
              <li>{t("footer.hours")}</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex justify-between items-center mt-12 text-xs text-muted-foreground">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <Link href="/privacy">{t("footer.privacy")}</Link>
            <Link href="/terms">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
