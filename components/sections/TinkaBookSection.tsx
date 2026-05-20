"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import T from "@/components/T";
import { useLocale } from "@/contexts/locale-context";

export default function TinkaBookSection({ fx }: { fx: string }) {
  const { t } = useLocale() as any;

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<"consent" | null>(null);

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    activity: "",
    language: "",
    honeypot: "",
    consent: false,
    phoneConsent: false,
  });

  // închidere cu ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // honeypot anti-bot
    if (formData.honeypot) return;

    // consimțământ obligatoriu
    if (!formData.consent) {
      setError("consent");
      return;
    }

    setStatus("submitting");

    // Textul complet al consimțământului afișat utilizatorului
    const consentText = t?.tinkabook?.form?.consentText || ""

    try {
      const res = await fetch("/api/tinkabook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          activity: formData.activity,
          language: formData.language,
          phone: formData.phoneConsent ? formData.phone : null,
          phoneConsent: formData.phoneConsent,
          honeypot: formData.honeypot,
          consentText,
          uiLanguage: typeof navigator !== "undefined" ? navigator.language : "unknown",
          sourcePage: typeof window !== "undefined" ? window.location.href : "tinka.md",
        }),
      });

      if (!res.ok) throw new Error("fail");

      setStatus("success");
      setError(null);

      setFormData({
        phone: "",
        email: "",
        activity: "",
        language: "",
        honeypot: "",
        consent: false,
        phoneConsent: false,
      });
    } catch (err) {
      setStatus("error");
      setError(null);
    }
  };

  const openModal = () => {
    setStatus("idle");
    setError(null);
    setOpen(true);
  };

  return (
    <section id="tinkabook" className="py-12 sm:py-16 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
        
        {/* STÂNGA */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
            <BadgeCheck className="h-3.5 w-3.5 text-sky-400" />
            <span><T path="tinkabook.badge" /></span>
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
              <T path="tinkabook.title" />
            </h2>
          </div>

          <p className="text-gray-300 text-base sm:text-lg">
            <T path="tinkabook.subtitle" />
          </p>

          <p className="text-sm sm:text-base text-sky-300 font-semibold">
            <T path="tinkabook.priceHighlight" />
          </p>

          <ul className="space-y-2 text-sm text-gray-300">
            <li>• <T path="tinkabook.bullets.bullet1" /></li>
            <li>• <T path="tinkabook.bullets.bullet2" /></li>
            <li>• <T path="tinkabook.bullets.bullet3" /></li>
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild variant="outline" className={`${fx} border-white/15 bg-white/5`}>
              <Link href="https://tinkaweb.md/agenda/" target="_blank">
                <T path="tinkabook.ctaVisit" />
              </Link>
            </Button>
          </div>
        </div>

        {/* DREAPTA */}
        <div className={`rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 ${fx}`}>
          <p className="text-sm text-gray-300">
            <T path="tinkabook.form.description" />
          </p>
          <p className="mt-3 text-xs text-gray-400">
            <T path="tinkabook.form.successDemoCredentials" />
          </p>

          <Button
            onClick={openModal}
            className={`mt-4 w-full bg-sky-500 text-white hover:bg-sky-400 ${fx}`}
          >
            <T path="tinkabook.ctaScroll" />
          </Button>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className={`relative mt-20 w-full max-w-xl rounded-2xl border border-white/10 bg-slate-950/95 p-5 sm:p-6 ${fx} max-h-[85vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-gray-300 hover:text-white hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "success" ? (
              <>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-100">
                  <T path="tinkabook.form.successTitle" />
                </h3>
                <p className="text-sm text-gray-300 mt-2">
                  <T path="tinkabook.form.successBody" />
                  <Link
                    href="https://tinkaweb.md/agenda/"
                    target="_blank"
                    className="text-sky-300 underline ml-1"
                  >
                    <T path="tinkabook.form.successDemoLinkText" />
                  </Link>
                </p>

                <Button
                  onClick={() => setOpen(false)}
                  className="mt-4 w-full bg-sky-500 hover:bg-sky-400"
                >
                  OK
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-100">
                  <T path="tinkabook.form.title" />
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  <T path="tinkabook.form.description" />
                </p>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    className="hidden"
                  />

                  {/* Limba */}
                  <div>
                    <label className="block text-xs text-gray-300 mb-1">
                      <T path="tinkabook.form.fields.language" />
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100"
                    >
                      <option value="" className="bg-white text-slate-900">
                        {t?.tinkabook?.form?.placeholders?.language ?? ""}
                      </option>
                      <option value="ro" className="bg-white text-slate-900">
                        {t?.tinkabook?.form?.languageOptions?.ro ?? "Română"}
                      </option>
                      <option value="ru" className="bg-white text-slate-900">
                        {t?.tinkabook?.form?.languageOptions?.ru ?? "Русский"}
                      </option>
                      <option value="en" className="bg-white text-slate-900">
                        {t?.tinkabook?.form?.languageOptions?.en ?? "English"}
                      </option>
                    </select>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs text-gray-300 mb-1">
                      <T path="tinkabook.form.fields.email" /> *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100"
                      placeholder={t?.tinkabook?.form?.placeholders?.email ?? ""}
                    />
                  </div>

                  {/* Activitate */}
                  <div>
                    <label className="block text-xs text-gray-300 mb-1">
                      <T path="tinkabook.form.fields.activity" /> *
                    </label>
                    <textarea
                      required
                      name="activity"
                      value={formData.activity}
                      onChange={handleChange}
                      rows={3}
                      className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100"
                      placeholder={t?.tinkabook?.form?.placeholders?.activity ?? ""}
                    />
                  </div>

                  {/* Telefon opțional + consimțământ telefonic */}
                  <div className="rounded-md border border-white/10 bg-black/20 p-3 space-y-2">
                    <label className="flex items-start gap-2 text-xs text-gray-200 cursor-pointer">
                      <input
                        type="checkbox"
                        name="phoneConsent"
                        checked={formData.phoneConsent}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-white/30 bg-black/40"
                      />
                      <span><T path="tinkabook.form.fields.phoneConsent" /></span>
                    </label>
                    {formData.phoneConsent && (
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-sm text-gray-100"
                        placeholder={t?.tinkabook?.form?.placeholders?.phone ?? "+373 69 000 000"}
                      />
                    )}
                  </div>

                  {/* GDPR TEXT */}
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-semibold text-gray-200">
                      <T path="tinkabook.form.consentTitle" />
                    </p>

                    <div className="max-h-40 overflow-y-auto rounded-md border border-white/15 bg-black/40 p-2 text-[11px] leading-snug text-gray-300 whitespace-pre-wrap">
                      <T path="tinkabook.form.consentText" />
                    </div>

                    <label className="mt-2 flex items-start gap-2 text-xs text-gray-200">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-white/30 bg-black/40"
                      />
                      <span><T path="tinkabook.form.consentLabel" /></span>
                    </label>

                    {error === "consent" && (
                      <p className="text-xs text-red-400">
                        <T path="tinkabook.form.consentRequired" />
                      </p>
                    )}
                  </div>

                  {/* Butoane */}
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
                      {status === "submitting" ? (
                        <T path="tinkabook.form.submitting" />
                      ) : (
                        <T path="tinkabook.form.submit" />
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpen(false)}
                      className="sm:w-auto border-white/20 bg-black/30 text-gray-200 hover:bg-black/60"
                    >
                      <T path="offer.close" />
                    </Button>
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-red-400">
                      <T path="tinkabook.form.error" />
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
