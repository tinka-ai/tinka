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
            <h3 className="text-2xl font-bold text-foreground">{t.footer.company}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* COL 2 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              <li><FooterLink href="/">{t.footer.home}</FooterLink></li>
              <li><FooterLink href="/solutions">{t.footer.solutions}</FooterLink></li>
              <li><FooterLink href="/about">{t.footer.about}</FooterLink></li>
              <li><FooterLink href="/contact">{t.footer.contact}</FooterLink></li>
            </ul>
          </div>

          {/* COL 3 — ascuns pentru viitor */}
          {/* 
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">{t.footer.resources}</h4>
            <ul className="space-y-2">
              <li><FooterLink href="/blog">{t.footer.blog}</FooterLink></li>
              <li><FooterLink href="/case-studies">{t.footer.caseStudies}</FooterLink></li>
              <li><FooterLink href="/faq">{t.footer.faq}</FooterLink></li>
            </ul>
          </div>
          */}

          {/* COL 4 – Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              {t.footer.contactInfo}
            </h4>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{t.footer.email}</p>
              <p>{t.footer.phone}</p>
              <p>{t.footer.hours}</p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t.footer.copyright}
          </p>

          <div className="flex gap-6 text-sm">
            <FooterLink href="/privacy">{t.footer.privacy}</FooterLink>
            <FooterLink href="/terms">{t.footer.terms}</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* SUBCOMPONENTĂ – ZERO JS */
function FooterLink({
  href,
  children
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
    >
      {children}
    </Link>
  )
}
