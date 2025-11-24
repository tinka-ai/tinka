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
          uiLanguage: typeof navigator !== "undefined" ? navigator.language : "unknown",
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

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  {/* Honeypot */}
                  <div className="hidden">
                    <label>
                      {t("tinkabook.form.fields.honeypot")}
                      <input
                        type="text"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      {t("tinkabook.form.fields.name")} *
                    </label>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("tinkabook.form.placeholders.name")}
                      className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        {t("tinkabook.form.fields.phone")} *
                      </label>
                      <input
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t("tinkabook.form.placeholders.phone")}
                        className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        {t("tinkabook.form.fields.email")} *
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("tinkabook.form.placeholders.email")}
                        className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      {t("tinkabook.form.fields.activity")} *
                    </label>
                    <textarea
                      required
                      name="activity"
                      value={formData.activity}
                      onChange={handleChange}
                      rows={3}
                      placeholder={t("tinkabook.form.placeholders.activity")}
                      className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        {t("tinkabook.form.fields.contactPref")}
                      </label>
                      <select
                        name="contactPref"
                        value={formData.contactPref}
                        onChange={handleChange}
                        className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                      >
                        <option value="">
                          {t("tinkabook.form.placeholders.contactPref")}
                        </option>
                        <option value="phone">
                          {t("tinkabook.form.contactPrefOptions.phone")}
                        </option>
                        <option value="email">
                          {t("tinkabook.form.contactPrefOptions.email")}
                        </option>
                        <option value="whatsapp">
                          {t("tinkabook.form.contactPrefOptions.whatsapp")}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        {t("tinkabook.form.fields.language")}
                      </label>
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                      >
                        <option value="" className="bg-white text-slate-900">
                          {t("tinkabook.form.placeholders.language")}
                        </option>
                        <option value="ro" className="bg-white text-slate-900">
                          {t("tinkabook.form.languageOptions.ro")}
                        </option>
                        <option value="ru" className="bg-white text-slate-900">
                          {t("tinkabook.form.languageOptions.ru")}
                        </option>
                        <option value="en" className="bg-white text-slate-900">
                          {t("tinkabook.form.languageOptions.en")}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      {t("tinkabook.form.fields.links")}
                    </label>
                    <input
                      name="links"
                      value={formData.links}
                      onChange={handleChange}
                      placeholder={t("tinkabook.form.placeholders.links")}
                      className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    />
                  </div>

                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-semibold text-gray-200">
                      {t("tinkabook.form.consentTitle")}
                    </p>
                    <div className="max-h-40 overflow-y-auto rounded-md border border-white/15 bg-black/40 p-2 text-[11px] leading-snug text-gray-300 whitespace-pre-wrap">
                      {t("tinkabook.form.consentText")}
                    </div>
                    <label className="mt-2 flex items-start gap-2 text-xs text-gray-200">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-white/30 bg-black/40"
                      />
                      <span>{t("tinkabook.form.consentLabel")}</span>
                    </label>
                    {error && (
                      <p className="text-xs text-red-400">
                        {error}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      disabled={!formData.consent || status === "submitting"}
                      className={`flex-1 text-white ${
                        !formData.consent || status === "submitting"
                          ? "bg-gray-600 cursor-not-allowed opacity-60"
                          : "bg-sky-500 hover:bg-sky-400"
                      }`}
                    >
                      {status === "submitting"
                        ? t("tinkabook.form.submitting")
                        : t("tinkabook.form.submit")}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={closeModal}
                      className="sm:w-auto border-white/20 bg-black/30 text-gray-200 hover:bg-black/60"
                    >
                      Închide
                    </Button>
                  </div>

                  {status === "error" && !error && (
                    <p className="mt-1 text-xs text-red-400">
                      {t("tinkabook.form.error")}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
