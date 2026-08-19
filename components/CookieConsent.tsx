"use client"
// components/CookieConsent.tsx
//
// Banner de consimțământ cookie-uri (GDPR / ePrivacy).
// Google Analytics (GA4) NU se încarcă deloc până când vizitatorul
// apasă "Acceptă" — evită setarea de cookie-uri neesențiale fără acord.

import { useEffect, useState } from "react"
import Script from "next/script"
import { useLocale } from "@/contexts/locale-context"

const GA_ID = "G-MLE4N46EN9"
const STORAGE_KEY = "tinka_cookie_consent" // "accepted" | "rejected"

const TEXT: Record<
  "ro" | "en" | "ru",
  { text: string; accept: string; reject: string; settings: string }
> = {
  ro: {
    text:
      "Folosim cookie-uri esențiale pentru funcționarea site-ului și, doar cu acordul tău, cookie-uri analitice (Google Analytics) ca să înțelegem cum e folosit site-ul. Poți accepta sau refuza — detalii în ",
    accept: "Acceptă",
    reject: "Refuză",
    settings: "Setări cookie-uri",
  },
  en: {
    text:
      "We use essential cookies for the site to work and, only with your consent, analytics cookies (Google Analytics) to understand how the site is used. You can accept or decline — details in our ",
    accept: "Accept",
    reject: "Decline",
    settings: "Cookie settings",
  },
  ru: {
    text:
      "Мы используем необходимые cookie для работы сайта и, только с вашего согласия, аналитические cookie (Google Analytics), чтобы понимать, как используется сайт. Вы можете принять или отклонить — подробности в ",
    accept: "Принять",
    reject: "Отклонить",
    settings: "Настройки cookie",
  },
}

const PRIVACY_LABEL: Record<"ro" | "en" | "ru", string> = {
  ro: "Politica de confidențialitate",
  en: "Privacy Policy",
  ru: "Политике конфиденциальности",
}

export default function CookieConsent() {
  const { locale } = useLocale() as { locale: "ro" | "en" | "ru" }
  const [consent, setConsent] = useState<"accepted" | "rejected" | null | "pending">("pending")

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as
      | "accepted"
      | "rejected"
      | null
    setConsent(saved)
  }, [])

  const choose = (value: "accepted" | "rejected") => {
    window.localStorage.setItem(STORAGE_KEY, value)
    window.localStorage.setItem(STORAGE_KEY + "_at", new Date().toISOString())
    setConsent(value)
  }

  const t = TEXT[locale] ?? TEXT.ro

  return (
    <>
      {/* GA4 — se încarcă STRICT după acceptul explicit al vizitatorului */}
      {consent === "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* Banner — vizibil doar înainte de o alegere */}
      {consent === "pending" && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed bottom-0 inset-x-0 z-[100] border-t border-white/10 bg-black/95 backdrop-blur-md px-4 py-4 sm:px-6"
        >
          <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <p className="text-xs sm:text-sm text-gray-300 flex-1 leading-relaxed">
              {t.text}
              <a href="/privacy" className="underline text-sky-400 hover:text-sky-300">
                {PRIVACY_LABEL[locale] ?? PRIVACY_LABEL.ro}
              </a>
              .
            </p>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => choose("rejected")}
                className="text-xs sm:text-sm px-4 py-2 rounded-lg border border-white/15 text-gray-300 hover:bg-white/5 transition-colors"
              >
                {t.reject}
              </button>
              <button
                onClick={() => choose("accepted")}
                className="text-xs sm:text-sm px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-colors"
              >
                {t.accept}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buton mic, persistent, ca vizitatorul să-și poată schimba alegerea oricând */}
      {(consent === "accepted" || consent === "rejected") && (
        <button
          onClick={() => setConsent("pending")}
          className="fixed bottom-3 left-3 z-[90] text-[10px] px-2 py-1 rounded-full border border-white/10 bg-black/60 text-gray-400 hover:text-gray-200 hover:border-white/20 transition-colors"
        >
          🍪 {t.settings}
        </button>
      )}
    </>
  )
}
