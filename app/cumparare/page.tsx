"use client"
// app/cumparare/page.tsx

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useLocale } from "@/contexts/locale-context"
import { TRANSCRIBER_ENABLED } from "@/lib/featureFlags"

const GOLD = "#C9A84C"
const IBAN = "MD93AG000000022516940454" // ← înlocuiește cu IBAN-ul real!

export default function CumpararePage() {
  const { t } = useLocale()
  const c = t.cumparare
  const searchParams = useSearchParams()

  const [form, setForm] = useState({ email: "", machineId: "" })
  const [machineIdError, setMachineIdError] = useState("")
  const [machineIdValid, setMachineIdValid] = useState<boolean | null>(null)
  const [midFromUrl, setMidFromUrl] = useState(false)

  // Citește Machine ID din URL (?mid=...) — trimis automat din aplicație
  useEffect(() => {
    const mid = searchParams.get("mid")
    if (mid && /^[0-9a-f]{32}$/i.test(mid.trim())) {
      setForm(f => ({ ...f, machineId: mid.trim().toLowerCase() }))
      setMachineIdValid(true)
      setMidFromUrl(true)
    }
  }, [searchParams])
  const [loading, setLoading]       = useState(false)
  const [sent, setSent]             = useState(false)
  const [error, setError]           = useState("")
  const [ibanCopied, setIbanCopied] = useState(false)

  const MACHINE_ID_RE = /^[0-9a-f]{32}$/i

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setForm(f => ({ ...f, [k]: val }))
    if (k === "machineId") {
      const clean = val.trim()
      if (clean.length === 0) {
        setMachineIdError("")
        setMachineIdValid(null)
      } else if (clean.length < 32) {
        setMachineIdError(`${clean.length}/32`)
        setMachineIdValid(false)
      } else if (!MACHINE_ID_RE.test(clean)) {
        setMachineIdError(c.form.machineIdError)
        setMachineIdValid(false)
      } else {
        setMachineIdError("")
        setMachineIdValid(true)
      }
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Validare client-side Machine ID
    if (!MACHINE_ID_RE.test(form.machineId.trim())) {
      setMachineIdError(c.form.machineIdError)
      setMachineIdValid(false)
      return
    }
    setError(""); setLoading(true)
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, machineId: form.machineId }),
      })
      const data = await res.json()
      if (data.success) setSent(true)
      else setError(data.message || c.form.errorGeneric)
    } catch {
      setError(c.form.errorGeneric)
    }
    setLoading(false)
  }

  const copyIban = () => {
    navigator.clipboard.writeText(IBAN)
      .then(() => { setIbanCopied(true); setTimeout(() => setIbanCopied(false), 2000) })
      .catch(() => alert(IBAN))
  }

  // TINKA AI Transcriber — cumpărare temporar indisponibilă (bug în curs de rezolvare)
  // Pune TRANSCRIBER_ENABLED = true în lib/featureFlags.ts pentru a reactiva pagina.
  if (!TRANSCRIBER_ENABLED) {
    return (
      <main style={{
        minHeight: "100vh", background: "#080808", color: "#f0f0f0",
        fontFamily: "var(--font-geist-sans, Helvetica, sans-serif)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "80px 20px 60px", textAlign: "center",
      }}>
        <div style={{ maxWidth: 480 }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🛠️</div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: 12 }}>
            Produs temporar indisponibil
          </h1>
          <p style={{ color: "#888", fontSize: "1rem", lineHeight: 1.7, marginBottom: 28 }}>
            TINKA AI Transcriber este momentan în mentenanță și nu poate fi achiziționat.
            Revenim în curând. Pentru întrebări, ne poți contacta la{" "}
            <a href="mailto:office@tinka.md" style={{ color: GOLD }}>office@tinka.md</a>.
          </p>
          <Link href="/" style={{
            display: "inline-block", background: GOLD, color: "#080808",
            textDecoration: "none", fontWeight: 700, fontSize: ".9rem",
            padding: "10px 24px", borderRadius: 8,
          }}>
            ← Înapoi la pagina principală
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{
      minHeight: "100vh", background: "#080808", color: "#f0f0f0",
      fontFamily: "var(--font-geist-sans, Helvetica, sans-serif)",
      padding: "80px 20px 60px",
    }}>
      {/* HERO */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#1a1408", border: "1px solid #8B6914", color: GOLD,
          fontSize: ".72rem", fontWeight: 600, letterSpacing: ".12em",
          textTransform: "uppercase", padding: "5px 14px",
          borderRadius: 100, marginBottom: 20,
        }}>
          <span style={{ width: 6, height: 6, background: GOLD, borderRadius: "50%",
                         display: "inline-block" }} />
          {c.badge}
        </div>

        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700,
                     lineHeight: 1.15, marginBottom: 12 }}>
          {c.title}{" "}<span style={{ color: GOLD }}>{c.titleHighlight}</span>
        </h1>
        <p style={{ fontSize: "1rem", color: "#888", maxWidth: 500,
                    margin: "0 auto 32px", lineHeight: 1.7 }}>
          {c.subtitle}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10,
                      justifyContent: "center", marginBottom: 16 }}>
          {Object.values(c.features).map((f: any) => (
            <span key={f} style={{ background: "#111", border: "1px solid #222",
                                    padding: "6px 14px", borderRadius: 8,
                                    fontSize: ".8rem", color: "#888" }}>{f}</span>
          ))}
        </div>

        <div style={{
          display: "inline-flex", gap: 12, alignItems: "center",
          background: "linear-gradient(135deg, #1a1200, #0f0f0f)",
          border: "1px solid #2a2010", borderRadius: 10,
          padding: "12px 20px", maxWidth: 500, textAlign: "left",
          fontSize: ".85rem", color: "#888", lineHeight: 1.6,
        }}>
          <span style={{ fontSize: "1.4rem" }}>🎁</span>
          <span><strong style={{ color: GOLD }}>{c.trial}</strong> — {c.trialDesc}</span>
        </div>
      </div>

      {/* GRID */}
      <div style={{
        maxWidth: 940, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 24,
      }}>
        {/* STÂNGA */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card gold>
            <Label>{c.price.label}</Label>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontFamily: "Georgia,serif", fontSize: "2.8rem",
                             fontWeight: 700, color: GOLD }}>199</span>
              <span style={{ color: "#8B6914", fontSize: "1rem", marginLeft: 6 }}>
                {c.price.currency}
              </span>
            </div>
            <div style={{ fontSize: ".75rem", color: "#555", marginBottom: 20,
                          textTransform: "uppercase", letterSpacing: ".06em" }}>
              {c.price.period}
            </div>
            <Divider />
            {c.price.benefits.map((b: string) => (
              <div key={b} style={{ display: "flex", gap: 10, marginBottom: 9,
                                     fontSize: ".86rem", color: "#888", lineHeight: 1.5 }}>
                <span style={{ color: GOLD, flexShrink: 0 }}>✦</span> {b}
              </div>
            ))}
            <Divider />
            <div style={{ fontSize: ".78rem", color: "#444", lineHeight: 1.5 }}>
              ℹ {c.price.note}
            </div>
          </Card>

          <Card>
            <Label>{c.howItWorks.title}</Label>
            {c.howItWorks.steps.map(([title, desc]: string[], i: number) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 22, height: 22, flexShrink: 0,
                  background: "#1a1408", border: "1px solid #8B6914",
                  borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: ".7rem",
                  fontWeight: 700, color: GOLD, marginTop: 1,
                }}>{i + 1}</div>
                <div style={{ fontSize: ".84rem", color: "#888", lineHeight: 1.5 }}>
                  <strong style={{ color: "#f0f0f0" }}>{title}</strong> — {desc}
                </div>
              </div>
            ))}
            <div style={{ background: "#161616", border: "1px solid #222",
                          borderRadius: 8, padding: "12px 14px", marginTop: 4 }}>
              <div style={{ fontSize: ".68rem", color: "#444", textTransform: "uppercase",
                            letterSpacing: ".1em", marginBottom: 6 }}>
                {c.machineIdHint.title}
              </div>
              <div style={{ fontSize: ".83rem", color: "#888", lineHeight: 1.6 }}>
                {c.machineIdHint.desc}
              </div>
            </div>
          </Card>
        </div>

        {/* DREAPTA */}
        <Card>
          <Label>{c.form.title}</Label>

          {sent ? (
            <div style={{ background: "rgba(76,175,80,.08)", border: "1px solid rgba(76,175,80,.3)",
                          borderRadius: 10, padding: "20px 16px",
                          color: "#4CAF50", fontSize: ".9rem", lineHeight: 1.7 }}>
              <strong>✅ {c.form.successTitle}</strong><br />{c.form.successDesc}
            </div>
          ) : (
            <form onSubmit={submit}>
              <Field label={c.form.email}>
                <input type="email" placeholder={c.form.emailPlaceholder}
                       value={form.email} onChange={set("email")} required style={iStyle} />
                <Hint>{c.form.emailHint}</Hint>
              </Field>

              {/* Machine ID — ascuns dacă vine din aplicație, vizibil dacă e manual */}
              {midFromUrl ? (
                <>
                  {/* Câmp ascuns — utilizatorul nu trebuie să știe */}
                  <input type="hidden" value={form.machineId} />
                  {/* Confirmare vizuală discretă */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "rgba(76,175,80,.06)",
                    border: "1px solid rgba(76,175,80,.2)",
                    borderRadius: 8, padding: "8px 12px", marginBottom: 14,
                    fontSize: ".82rem", color: "#4CAF50",
                  }}>
                    <span>✅</span>
                    <span>{c.form.machineIdAutoDetected}</span>
                  </div>
                </>
              ) : (
                <Field label={c.form.machineId}>
                  <div style={{ position: "relative" }}>
                    <input placeholder={c.form.machineIdPlaceholder}
                           value={form.machineId} onChange={set("machineId")}
                           required spellCheck={false} autoComplete="off"
                           style={{
                             ...iStyle, fontFamily: "monospace",
                             fontSize: ".85rem", color: GOLD,
                             borderColor: machineIdValid === true
                               ? "#4CAF50"
                               : machineIdValid === false
                               ? "#e53935" : "#222",
                             paddingRight: "36px",
                           }} />
                    {machineIdValid === true && (
                      <span style={{ position: "absolute", right: 10,
                                     top: "50%", transform: "translateY(-50%)",
                                     color: "#4CAF50", fontSize: "1rem" }}>✓</span>
                    )}
                    {machineIdValid === false && (
                      <span style={{ position: "absolute", right: 10,
                                     top: "50%", transform: "translateY(-50%)",
                                     color: "#e53935", fontSize: "1rem" }}>✗</span>
                    )}
                  </div>
                  {machineIdError && (
                    <div style={{ fontSize: ".74rem", color: "#e53935",
                                  marginTop: 4, lineHeight: 1.4 }}>
                      {machineIdError}
                    </div>
                  )}
                  {!machineIdError && <Hint>{c.form.machineIdHint}</Hint>}
                  <div style={{ fontSize: ".7rem", color: "#444",
                                marginTop: 4, fontFamily: "monospace" }}>
                    {c.form.machineIdFormat}
                  </div>
                </Field>
              )}

              {error && (
                <div style={{ background: "rgba(229,57,53,.08)",
                              border: "1px solid rgba(229,57,53,.3)",
                              borderRadius: 8, padding: "10px 14px",
                              color: "#e53935", fontSize: ".84rem", marginBottom: 12 }}>
                  {error}
                </div>
              )}
              <div style={{
                fontSize: ".76rem", color: "#888", lineHeight: 1.7,
                background: "#0a0a0a", border: "1px solid #2a2010",
                borderRadius: 8, padding: "12px 14px", marginBottom: 12,
              }}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "#C9A84C", flexShrink: 0, marginTop: 1 }}>🔒</span>
                  <span>{c.form.gdprNote}</span>
                </div>
              </div>
              <button type="submit" disabled={loading} style={{
                width: "100%", background: loading ? "#333" : GOLD,
                color: loading ? "#888" : "#080808", border: "none",
                borderRadius: 10, padding: "13px 20px", fontSize: ".95rem",
                fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                marginTop: 4, fontFamily: "inherit",
              }}>
                {loading ? c.form.sending : c.form.submit}
              </button>
            </form>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 10,
                        margin: "16px 0", fontSize: ".72rem", color: "#333" }}>
            <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
            {c.bank.orDirect}
            <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
          </div>

          <div style={{ background: "#0f0e09", border: "1px solid #2a2010",
                        borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: ".68rem", color: "#555", textTransform: "uppercase",
                          letterSpacing: ".1em", marginBottom: 10 }}>
              {c.bank.title}
            </div>
            {Object.entries(c.bank.fields).map(([key, label]: any) => (
              <div key={key} style={{ fontSize: ".84rem", marginBottom: 5, color: "#888" }}>
                <span style={{ color: "#555" }}>{label}: </span>
                <span style={{ color: GOLD, fontFamily: "monospace" }}>
                  {key === "iban" ? IBAN : (c.bank.values as any)[key] ?? ""}
                </span>
              </div>
            ))}
            <button onClick={copyIban} style={{
              background: "none", border: "1px solid #2a2a2a",
              color: ibanCopied ? "#4CAF50" : "#555",
              fontSize: ".75rem", padding: "4px 10px", borderRadius: 6,
              cursor: "pointer", marginTop: 6, fontFamily: "inherit",
            }}>
              {ibanCopied ? c.bank.ibanCopied : c.bank.copyIban}
            </button>
          </div>

          <div style={{ marginTop: 12, fontSize: ".78rem", color: "#444", lineHeight: 1.6 }}>
            💬 {c.contact}{" "}
            <a href="mailto:office@tinka.md"
               style={{ color: "#8B6914", textDecoration: "none" }}>
              office@tinka.md
            </a>
          </div>
        </Card>
      </div>
    </main>
  )
}

function Card({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <div style={{
      background: gold ? "linear-gradient(135deg,#0f0e09,#0f0f0f)" : "#0f0f0f",
      border: `1px solid ${gold ? "#2a2010" : "#1a1a1a"}`,
      borderRadius: 14, padding: 26, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1,
                    background: `linear-gradient(90deg,transparent,${gold?"#C9A84C":"#2a2a2a"},transparent)`,
                    opacity: gold ? 0.5 : 1 }} />
      {children}
    </div>
  )
}
function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".15em",
                       textTransform: "uppercase", color: "#8B6914", marginBottom: 18 }}>{children}</div>
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: ".7rem", fontWeight: 600,
                      letterSpacing: ".1em", textTransform: "uppercase",
                      color: "#444", marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  )
}
function Hint({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: ".74rem", color: "#444", marginTop: 4, lineHeight: 1.5 }}>{children}</div>
}
function Divider() {
  return <div style={{ height: 1, background: "linear-gradient(90deg,#2a2010,transparent)", margin: "16px 0" }} />
}
const iStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box", background: "#161616",
  border: "1px solid #222", borderRadius: 8, padding: "10px 12px",
  color: "#f0f0f0", fontSize: ".88rem", fontFamily: "inherit", outline: "none",
}
