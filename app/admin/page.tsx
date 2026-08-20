"use client"
// app/admin/page.tsx
// Hub central de admin — un singur loc de unde intri în toate panourile.
// tinka.md/admin

import { useState } from "react"
import Link from "next/link"

const GOLD = "#C9A84C"

const SECTIONS = [
  {
    href: "/admin/comenzi",
    icon: "📦",
    title: "Comenzi Transcriber",
    desc: "Plăți, livrare chei de licență, venituri.",
  },
  {
    href: "/admin/consimtaminte",
    icon: "✅",
    title: "Consimțăminte GDPR",
    desc: "Dovadă cine, ce și când a acceptat colectarea datelor (chatbot / ofertă).",
  },
]

export default function AdminHubPage() {
  const [pass, setPass] = useState("")
  const [authed, setAuthed] = useState(false)
  const [err, setErr] = useState("")

  const login = () => {
    if (pass.length > 3) {
      setAuthed(true)
      setErr("")
    } else {
      setErr("Parolă prea scurtă.")
    }
  }

  if (!authed) return (
    <div style={S.page}>
      <div style={S.loginBox}>
        <div style={S.logo}>TINKA AI</div>
        <div style={{ fontSize: ".8rem", color: "#555", marginBottom: 20, textAlign: "center" }}>
          Panou Admin
        </div>
        <input type="password" placeholder="Parolă admin"
               value={pass} onChange={e => setPass(e.target.value)}
               onKeyDown={e => e.key === "Enter" && login()}
               style={S.input} />
        {err && <div style={{ color: "#e53935", fontSize: ".78rem", marginBottom: 10 }}>{err}</div>}
        <button onClick={login} style={S.btnGold}>Intră</button>
        <div style={{ fontSize: ".7rem", color: "#444", marginTop: 14, textAlign: "center" }}>
          Aceeași parolă e cerută din nou la fiecare secțiune —
          e o măsură de siguranță suplimentară.
        </div>
      </div>
    </div>
  )

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <div style={S.logo}>TINKA AI</div>
          <div style={{ fontSize: ".72rem", color: "#444", marginTop: 2 }}>
            Panou Admin — toate secțiunile
          </div>
        </div>
      </div>

      <div style={{ padding: "28px 20px 40px", maxWidth: 720, margin: "0 auto" }}>
        {SECTIONS.map(s => (
          <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
            <div style={S.card}>
              <div style={{ fontSize: "1.8rem", marginRight: 16 }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#eee" }}>{s.title}</div>
                <div style={{ fontSize: ".82rem", color: "#666", marginTop: 3 }}>{s.desc}</div>
              </div>
              <div style={{ fontSize: "1.2rem", color: GOLD }}>→</div>
            </div>
          </Link>
        ))}

        <div style={{ fontSize: ".72rem", color: "#333", marginTop: 24, textAlign: "center" }}>
          Fiecare secțiune are propria ei verificare cu parolă la intrare.
        </div>
      </div>
    </div>
  )
}

const S: Record<string, React.CSSProperties> = {
  page:    { minHeight: "100vh", background: "#080808", color: "#ccc",
             fontFamily: "var(--font-geist-sans, Helvetica, sans-serif)" },
  header:  { padding: "16px 20px", borderBottom: "1px solid #141414",
             display: "flex", alignItems: "center",
             justifyContent: "space-between", background: "#0f0f0f" },
  logo:    { fontSize: "1.1rem", fontWeight: 700, color: GOLD,
             letterSpacing: ".05em" },
  card:    { background: "#0f0f0f", border: "1px solid #141414",
             borderRadius: 12, padding: 18, marginBottom: 12,
             display: "flex", alignItems: "center", cursor: "pointer" },
  input:   { width: "100%", boxSizing: "border-box", background: "#161616",
             border: "1px solid #222", borderRadius: 8, padding: "10px 12px",
             color: "#ccc", fontSize: ".9rem", marginBottom: 12,
             fontFamily: "inherit", outline: "none" },
  btnGold: { background: GOLD, color: "#080808", border: "none", borderRadius: 8,
             padding: "11px", fontSize: ".9rem", fontWeight: 700,
             cursor: "pointer", width: "100%", fontFamily: "inherit" },
  loginBox: { maxWidth: 320, margin: "120px auto", background: "#111",
              border: "1px solid #1a1a1a", borderRadius: 14, padding: 28 },
}
