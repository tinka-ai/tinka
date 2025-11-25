
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

// ICONS – import individual pentru PageSpeed
import X from "lucide-react/dist/esm/icons/x"
import Link2 from "lucide-react/dist/esm/icons/link-2"
import BadgeCheck from "lucide-react/dist/esm/icons/badge-check"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/contexts/locale-context"

export default function TinkaBookSection({ fx }: { fx: string }) {

  const { t: T } = useLocale() as any
  const t = (path: string) => path.split(".").reduce((acc: any, k: string) => acc?.[k], T) ?? path

  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    activity: "",
    contactPref: "",
    links: "",
    language: "",
    honeypot: "",
    consent: false,
  })

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  // ESC pentru închidere
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (formData.honeypot) return

    if (!formData.consent) {
      setError(t("tinkabook.form.consentRequired"))
      return
    }

    setStatus("submitting")

    try {
      const res = await fetch("/api/tinkabook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          activity: formData.activity,
          contactPref: formData.contactPref,
          links: formData.links,
          language: formData.language,
          consentText: t("tinkabook.form.consentText"),
          uiLanguage:
            typeof window !== "undefined" ? navigator.language : "unknown",
          sourcePage: "Homepage – secțiunea TinkaBook",
          subjectPrefix: "[TinkaBook] Cerere nouă de conectare",
        }),
      })

      if (!res.ok) throw new Error("Request failed")

      setStatus("success")
      setFormData({
        name: "",
        phone: "",
        email: "",
        activity: "",
        contactPref: "",
        links: "",
        language: "",
        honeypot: "",
        consent: false,
      })
    } catch (err) {
      console.error(err)
      setStatus("error")
      setError(t("tinkabook.form.error"))
    }
  }

  const openModal = () => {
    setStatus("idle")
    setError(null)
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <section id="tinkabook" className="py-12 sm:py-16 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">

        {/* Col stânga */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
            <BadgeCheck className="h-3.5 w-3.5 text-sky-400" aria-hidden />
            <span>{t("tinkabook.badge")}</span>
          </div>

          <div className="flex items-center gap-4">
            <Image
              src="/image/TinkaBook_Logo.png"
              alt="TinkaBook logo"
              width={72}
              height={72}
              className="h-16 w-16 rounded-2xl bg-white/5 p-1"
            />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-100">
              {t("tinkabook.title")}
            </h2>
          </div>

          <p className="text-gray-300 text-base sm:text-lg">
            {t("tinkabook.subtitle")}
          </p>

          <p className="text-sm sm:text-base text-sky-300 font-semibold">
            {t("tinkabook.priceHighlight")}
          </p>

          <ul className="space-y-2 text-sm text-gray-300">
            <li>• {t("tinkabook.bullets.bullet1")}</li>
            <li>• {t("tinkabook.bullets.bullet2")}</li>
            <li>• {t("tinkabook.bullets.bullet3")}</li>
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild variant="outline" className={`${fx} border-white/15 bg-white/5`}>
              <Link href="https://tinkaweb.md/agenda/" target="_blank" rel="noreferrer">
                {t("tinkabook.ctaVisit")}
                <Link2 className="ms-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>

        {/* Col dreapta */}
        <div className={`rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 ${fx}`}>
          <p className="text-sm text-gray-300">
            {t("tinkabook.form.description")}
          </p>
          <p className="mt-3 text-xs text-gray-400">
            {t("tinkabook.form.successDemoCredentials")}
          </p>
          <Button
            type="button"
            onClick={openModal}
            className={`mt-4 w-full bg-sky-500 text-white hover:bg-sky-400 ${fx}`}
          >
            {t("tinkabook.ctaScroll")}
          </Button>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={closeModal}
        >
          <div
            className={`relative mt-20 w-full max-w-xl rounded-2xl border border-white/10 bg-slate-950/95 p-5 sm:p-6 ${fx} max-h-[85vh] overflow-y-auto`}
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-gray-300 hover:text-white hover:bg-black/70"
              aria-label="Închide"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            {status === "success" ? (
              <div className="space-y-3 pt-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-100">
                  {t("tinkabook.form.successTitle")}
                </h3>
                <p className="text-sm text-gray-300">
                  {t("tinkabook.form.successBody")}
                  <Link
                    href="https://tinkaweb.md/agenda/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-300 hover:text-sky-200 underline ml-1"
                  >
                    {t("tinkabook.form.successDemoLinkText")}
                  </Link>
                </p>
                <p className="text-xs text-gray-400">
                  {t("tinkabook.form.successDemoCredentials")}
                </p>
                <div className="pt-2">
                  <Button
                    type="button"
                    onClick={closeModal}
                    className="w-full bg-sky-500 text-white hover:bg-sky-400"
                  >
                    OK
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-100 pr-8">
                  {t("tinkabook.form.title")}
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  {t("tinkabook.form.description")}
                </p>
                                {/* FORMULARUL COMPLET DEJA EXISTENT LA TINE */}
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">

                  <input
                    type="text"
                    name="name"
                    placeholder={t("tinkabook.form.name")}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-black/30 border border-white/20 px-3 py-2 text-gray-200"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder={t("tinkabook.form.email")}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-black/30 border border-white/20 px-3 py-2 text-gray-200"
                  />

                  <textarea
                    name="activity"
                    placeholder={t("tinkabook.form.activity")}
                    value={formData.activity}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-black/30 border border-white/20 px-3 py-2 text-gray-200 min-h-[80px]"
                  />

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="h-4 w-4"
                    />
                    <label className="text-sm text-gray-300">
                      {t("tinkabook.form.consentLabel")}
                    </label>
                  </div>

                  {error && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-sky-500 text-white hover:bg-sky-400"
                  >
                    {status === "submitting"
                      ? t("tinkabook.form.sending")
                      : t("tinkabook.form.submit")}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
