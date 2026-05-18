"use client"
// app/cumparare/page.tsx

import { useState } from "react"

const GOLD = "#C9A84C"

export default function CumpararePage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", machineId: "", message: ""
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState("")

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(""); setLoading(true)
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
      } else {
        setError(data.message || "A apărut o eroare.")
      }
    } catch {
      setError("Eroare de rețea. Încearcă din nou sau scrie-ne la office@tinka.md")
    }
    setLoading(false)
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
          background: "#1a1408", border: "1px solid #8B6914",
          color: GOLD, fontSize: ".72rem", fontWeight: 600,
          letterSpacing: ".12em", textTransform: "uppercase",
          padding: "5px 14px", borderRadius: 100, marginBottom: 20,
        }}>
          <span style={{ width: 6, height: 6, background: GOLD,
                         borderRadius: "50%", display: "inline-block" }} />
          Disponibil acum
        </div>
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700,
          lineHeight: 1.15, marginBottom: 12,
        }}>
          TINKA AI{" "}
          <span style={{ color: GOLD }}>Transcriber</span>
        </h1>
        <p style={{ fontSize: "1rem", color: "#888", maxWidth: 500,
                    margin: "0 auto 32px", lineHeight: 1.7 }}>
          Transformă orice fișier audio în text cu AI. 100% offline, privat,
          fără abonament.
        </p>

        {/* Features */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10,
                      justifyContent: "center", marginBottom: 16 }}>
          {["🎙 MP3, WAV, M4A, OGG", "🌐 10+ limbi, auto-detect",
            "💾 Export TXT + SRT", "🔒 100% offline", "⚡ Fără abonament"
          ].map(f => (
            <span key={f} style={{
              background: "#111", border: "1px solid #222",
              padding: "6px 14px", borderRadius: 8,
              fontSize: ".8rem", color: "#888",
            }}>{f}</span>
          ))}
        </div>

        {/* Trial note */}
        <div style={{
          display: "inline-flex", gap: 12, alignItems: "center",
          background: "linear-gradient(135deg, #1a1200, #0f0f0f)",
          border: "1px solid #2a2010", borderRadius: 10,
          padding: "12px 20px", maxWidth: 500, textAlign: "left",
          fontSize: ".85rem", color: "#888", lineHeight: 1.6,
        }}>
          <span style={{ fontSize: "1.4rem" }}>🎁</span>
          <span>
            <strong style={{ color: GOLD }}>3 zile gratuit</strong> — Testează
            aplicația înainte de cumpărare. Dacă ești mulțumit, activează
            licența pe viață.
          </span>
        </div>
      </div>

      {/* GRID */}
      <div style={{
        maxWidth: 940, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 24,
      }}>

        {/* ── STÂNGA: Prețuri + Cum funcționează ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Price card */}
          <Card gold>
            <Label>Licență pe Viață</Label>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "2.8rem",
                             fontWeight: 700, color: GOLD }}>490</span>
              <span style={{ color: "#8B6914", fontSize: "1rem",
                             marginLeft: 6 }}>MDL</span>
            </div>
            <div style={{ fontSize: ".75rem", color: "#555", marginBottom: 20,
                          textTransform: "uppercase", letterSpacing: ".06em" }}>
              Plată unică · Fără abonament
            </div>
            <Divider />
            {[
              "Licență permanentă — plătești o singură dată",
              "Toate actualizările viitoare incluse",
              "Funcționează 100% offline — datele rămân la tine",
              "Suport română, engleză, rusă + 7 alte limbi",
              "Export TXT, SRT și TXT cu timestamps",
              "Suport tehnic via office@tinka.md",
            ].map(b => (
              <div key={b} style={{ display: "flex", gap: 10,
                                     marginBottom: 9, fontSize: ".86rem",
                                     color: "#888", lineHeight: 1.5 }}>
                <span style={{ color: GOLD, flexShrink: 0 }}>✦</span> {b}
              </div>
            ))}
          </Card>

          {/* Cum funcționează */}
          <Card>
            <Label>Cum funcționează</Label>
            {[
              ["Completează formularul", "cu datele tale și Machine ID-ul din aplicație"],
              ["Efectuează transferul", "la IBAN-ul indicat în emailul de confirmare"],
              ["Primești cheia", "pe email în maxim 2 ore lucrătoare"],
              ["Activezi în aplicație", "→ Licență activă pe viață ✅"],
            ].map(([title, desc], i) => (
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

            {/* Machine ID hint */}
            <div style={{
              background: "#161616", border: "1px solid #222",
              borderRadius: 8, padding: "12px 14px", marginTop: 4,
            }}>
              <div style={{ fontSize: ".68rem", color: "#444",
                            textTransform: "uppercase", letterSpacing: ".1em",
                            marginBottom: 6 }}>
                Unde găsesc Machine ID-ul?
              </div>
              <div style={{ fontSize: ".83rem", color: "#888", lineHeight: 1.6 }}>
                Deschide <strong style={{ color: "#f0f0f0" }}>TINKA AI Transcriber</strong> →
                apasă <strong style={{ color: GOLD }}>🔑 Activează licența</strong> →
                copiază ID-ul afișat în căsuța gri.
              </div>
            </div>
          </Card>
        </div>

        {/* ── DREAPTA: Formular ── */}
        <Card>
          <Label>Completează Comanda</Label>

          {sent ? (
            <div style={{
              background: "rgba(76,175,80,.08)",
              border: "1px solid rgba(76,175,80,.3)",
              borderRadius: 10, padding: "20px 16px",
              color: "#4CAF50", fontSize: ".9rem", lineHeight: 1.7,
            }}>
              <strong>✅ Comanda a fost înregistrată!</strong><br />
              Verifică emailul — ți-am trimis instrucțiunile de plată.
              Cheia de licență va sosi în maxim 2 ore după confirmarea plății.
            </div>
          ) : (
            <form onSubmit={submit}>
              <Field label="Nume și Prenume *">
                <input placeholder="Ion Popescu" value={form.name}
                       onChange={set("name")} required style={inputStyle} />
              </Field>
              <Field label="Email *">
                <input type="email" placeholder="ion@exemplu.md"
                       value={form.email} onChange={set("email")}
                       required style={inputStyle} />
                <Hint>Cheia de licență va fi trimisă pe acest email.</Hint>
              </Field>
              <Field label="Telefon (opțional)">
                <input type="tel" placeholder="+373 69 000 000"
                       value={form.phone} onChange={set("phone")}
                       style={inputStyle} />
              </Field>
              <Field label="Machine ID *">
                <input placeholder="a1b2c3d4e5f6..."
                       value={form.machineId} onChange={set("machineId")}
                       required spellCheck={false} autoComplete="off"
                       style={{ ...inputStyle, fontFamily: "monospace",
                                fontSize: ".85rem", color: GOLD }} />
                <Hint>
                  ⚠ Copiază Machine ID-ul <strong style={{ color: "#f0f0f0" }}>exact</strong> din
                  aplicație. Cheia va funcționa doar pe acel calculator.
                </Hint>
              </Field>
              <Field label="Mesaj (opțional)">
                <input placeholder="Factură, altceva..."
                       value={form.message} onChange={set("message")}
                       style={inputStyle} />
              </Field>

              {error && (
                <div style={{
                  background: "rgba(229,57,53,.08)",
                  border: "1px solid rgba(229,57,53,.3)",
                  borderRadius: 8, padding: "10px 14px",
                  color: "#e53935", fontSize: ".84rem", marginBottom: 12,
                }}>{error}</div>
              )}

              <button type="submit" disabled={loading} style={{
                width: "100%", background: loading ? "#333" : GOLD,
                color: loading ? "#888" : "#080808",
                border: "none", borderRadius: 10,
                padding: "13px 20px", fontSize: ".95rem", fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: 4, fontFamily: "inherit",
              }}>
                {loading ? "Se trimite..." : "Trimite Comanda"}
              </button>
            </form>
          )}

          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            margin: "16px 0", fontSize: ".72rem", color: "#333",
          }}>
            <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
            sau plătește direct
            <div style={{ flex: 1, height: 1, background: "#1a1a1a" }} />
          </div>

          {/* Date bancare */}
          <div style={{
            background: "#0f0e09", border: "1px solid #2a2010",
            borderRadius: 10, padding: "14px 16px",
          }}>
            <div style={{ fontSize: ".68rem", color: "#555",
                          textTransform: "uppercase", letterSpacing: ".1em",
                          marginBottom: 10 }}>
              Transfer Bancar — MAIB
            </div>
            {[
              ["IBAN", "MD93AG000000022516940454"], 
              ["Suma", "199 MDL"],
              ["Referință", "numele tău + TINKA"],
            ].map(([k, v]) => (
              <div key={k} style={{ fontSize: ".84rem", marginBottom: 5, color: "#888" }}>
                <span style={{ color: "#555" }}>{k}: </span>
                <span style={{ color: GOLD, fontFamily: "monospace" }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12, fontSize: ".78rem", color: "#444",
                        lineHeight: 1.6 }}>
            💬 Întrebări?{" "}
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

// ── Componente mici ────────────────────────────────────────────────────────────
function Card({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <div style={{
      background: gold
        ? "linear-gradient(135deg, #0f0e09 0%, #0f0f0f 100%)"
        : "#0f0f0f",
      border: `1px solid ${gold ? "#2a2010" : "#1a1a1a"}`,
      borderRadius: 14, padding: 26, position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${gold ? "#C9A84C" : "#2a2a2a"}, transparent)`,
        opacity: gold ? 0.5 : 1,
      }} />
      {children}
    </div>
  )
}
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".15em",
                  textTransform: "uppercase", color: "#8B6914", marginBottom: 18 }}>
      {children}
    </div>
  )
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: ".7rem", fontWeight: 600,
                      letterSpacing: ".1em", textTransform: "uppercase",
                      color: "#444", marginBottom: 5 }}>
        {label}
      </label>
      {children}
    </div>
  )
}
function Hint({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: ".74rem", color: "#444", marginTop: 4,
                  lineHeight: 1.5 }}>
      {children}
    </div>
  )
}
function Divider() {
  return (
    <div style={{
      height: 1,
      background: "linear-gradient(90deg, #2a2010, transparent)",
      margin: "16px 0",
    }} />
  )
}
const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  background: "#161616", border: "1px solid #222",
  borderRadius: 8, padding: "10px 12px",
  color: "#f0f0f0", fontSize: ".88rem",
  fontFamily: "inherit", outline: "none",
}
