"use client"
// app/admin/consimtaminte/page.tsx
// Panou admin: verifică dacă un consimțământ (chatbot / ofertă) există,
// pentru cine și la ce oră — sursa de adevăr e tabela Supabase "consents".

import { useState, useCallback } from "react"
import Link from "next/link"

type Consent = {
  id: string
  created_at: string
  source: string
  email: string
  name: string | null
  phone: string | null
  consent_text: string
  consent_given_at_client: string | null
  consent_given_at_server: string
  ip: string | null
  offer_final: string | null
  conversation: string | null
}

const GOLD = "#C9A84C"

export default function ConsentsAdminPage() {
  const [pass, setPass] = useState("")
  const [authed, setAuthed] = useState(false)
  const [consents, setConsents] = useState<Consent[]>([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchConsents = useCallback(async (p = pass, q = search) => {
    setLoading(true)
    setErrorMsg("")
    try {
      const url = q ? `/api/admin/consents?q=${encodeURIComponent(q)}` : "/api/admin/consents"
      const res = await fetch(url, { headers: { "x-admin-password": p } })
      if (res.status === 401) { setAuthed(false); setLoading(false); return }
      const data = await res.json()
      if (!data.success) { setErrorMsg(data.message || "Eroare necunoscută."); setConsents([]) }
      else setConsents(data.consents || [])
    } catch {
      setErrorMsg("Eroare de rețea.")
    }
    setLoading(false)
  }, [pass, search])

  const login = () => {
    if (pass.length > 3) { setAuthed(true); fetchConsents(pass, search) }
  }

  if (!authed) return (
    <div style={S.page}>
      <div style={S.loginBox}>
        <div style={S.logo}>TINKA AI</div>
        <div style={{ fontSize: ".8rem", color: "#555", marginBottom: 20, textAlign: "center" }}>
          Panou Admin — Consimțăminte
        </div>
        <input type="password" placeholder="Parolă admin"
               value={pass} onChange={e => setPass(e.target.value)}
               onKeyDown={e => e.key === "Enter" && login()}
               style={S.input} />
        <button onClick={login} style={S.btnGold}>Intră</button>
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <Link href="/admin/comenzi" style={{ fontSize: ".75rem", color: "#555" }}>
            → Panou Comenzi
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div>
          <div style={S.logo}>TINKA AI</div>
          <div style={{ fontSize: ".72rem", color: "#444", marginTop: 2 }}>
            Admin — Consimțăminte (GDPR)
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link href="/admin" style={{ fontSize: ".78rem", color: "#666" }}>
            ← Admin
          </Link>
          <Link href="/admin/comenzi" style={{ fontSize: ".78rem", color: "#666" }}>
            Comenzi →
          </Link>
          <button onClick={() => fetchConsents()} style={S.btnSm}>🔄 Actualizează</button>
        </div>
      </div>

      {/* Căutare */}
      <div style={{ padding: "16px 20px 0", display: "flex", gap: 8 }}>
        <input
          placeholder="Caută după email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === "Enter" && fetchConsents(pass, search)}
          style={{ ...S.input, marginBottom: 0, flex: 1 }}
        />
        <button onClick={() => fetchConsents(pass, search)} style={{ ...S.btnGold, width: "auto", padding: "0 20px" }}>
          Caută
        </button>
        {search && (
          <button
            onClick={() => { setSearch(""); fetchConsents(pass, "") }}
            style={S.btnSm}
          >
            ✕ Golește
          </button>
        )}
      </div>

      <div style={{ padding: "10px 20px 0", fontSize: ".75rem", color: "#555" }}>
        {loading ? "Se încarcă…" : `${consents.length} înregistrare${consents.length === 1 ? "" : "i"}`}
      </div>

      {errorMsg && (
        <div style={{
          margin: "12px 20px 0", padding: "10px 14px",
          background: "#1a0f0f", border: "1px solid #3a1a1a", borderRadius: 8,
          fontSize: ".84rem", color: "#e53935",
        }}>
          {errorMsg}
          {errorMsg.includes("Supabase") && (
            <div style={{ marginTop: 6, color: "#999" }}>
              Configurează SUPABASE_URL și SUPABASE_SERVICE_ROLE_KEY în variabilele de mediu (local + Netlify).
            </div>
          )}
        </div>
      )}

      {/* Listă */}
      <div style={{ padding: "16px 20px 40px" }}>
        {!loading && consents.length === 0 && !errorMsg ? (
          <div style={{ padding: 32, textAlign: "center", color: "#333",
                        background: "#111", borderRadius: 12 }}>
            {search ? "Niciun consimțământ găsit pentru această căutare." : "Niciun consimțământ înregistrat încă."}
          </div>
        ) : consents.map(c => {
          const isOpen = expanded === c.id
          return (
            <div key={c.id} style={S.card}>
              <div
                style={{ display: "flex", justifyContent: "space-between",
                         alignItems: "center", cursor: "pointer" }}
                onClick={() => setExpanded(isOpen ? null : c.id)}
              >
                <div>
                  <span style={{ fontSize: ".7rem", fontWeight: 600,
                                 padding: "2px 10px", borderRadius: 100,
                                 color: "#4CAF50", background: "rgba(76,175,80,.1)",
                                 marginRight: 8 }}>
                    ✅ CONSIMȚIT
                  </span>
                  <span style={{ fontSize: ".85rem", color: "#ccc" }}>{c.email}</span>
                  {c.name && <span style={{ fontSize: ".8rem", color: "#666" }}> · {c.name}</span>}
                </div>
                <span style={{ fontSize: ".75rem", color: "#444" }}>
                  {new Date(c.consent_given_at_server).toLocaleString("ro-MD")}
                </span>
              </div>

              {isOpen && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #1a1a1a",
                              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
                  {([
                    ["Sursă", c.source],
                    ["Telefon", c.phone || "—"],
                    ["Bifat de client la", c.consent_given_at_client || "—"],
                    ["Înregistrat pe server la", c.consent_given_at_server],
                    ["IP vizitator", c.ip || "—"],
                  ] as [string, string][]).map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontSize: ".65rem", color: "#444",
                                    textTransform: "uppercase", letterSpacing: ".1em",
                                    marginBottom: 2 }}>{k}</div>
                      <div style={{ fontSize: ".82rem", color: "#ccc", fontFamily: k === "IP vizitator" ? "monospace" : "inherit" }}>{v}</div>
                    </div>
                  ))}
                  <div style={{ gridColumn: "1/-1" }}>
                    <div style={{ fontSize: ".65rem", color: "#444",
                                  textTransform: "uppercase", letterSpacing: ".1em",
                                  marginBottom: 2 }}>Text agreat</div>
                    <div style={{ fontSize: ".82rem", color: GOLD }}>{c.consent_text}</div>
                  </div>
                  {c.offer_final && (
                    <div style={{ gridColumn: "1/-1" }}>
                      <div style={{ fontSize: ".65rem", color: "#444",
                                    textTransform: "uppercase", letterSpacing: ".1em",
                                    marginBottom: 2 }}>Ofertă finală</div>
                      <pre style={{ whiteSpace: "pre-wrap", fontSize: ".8rem", color: "#ccc",
                                    background: "#0a0a0a", padding: 10, borderRadius: 8, margin: 0 }}>
                        {c.offer_final}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
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
             borderRadius: 12, padding: 18, marginBottom: 12 },
  input:   { width: "100%", boxSizing: "border-box", background: "#161616",
             border: "1px solid #222", borderRadius: 8, padding: "10px 12px",
             color: "#ccc", fontSize: ".9rem", marginBottom: 12,
             fontFamily: "inherit", outline: "none" },
  btnGold: { background: GOLD, color: "#080808", border: "none", borderRadius: 8,
             padding: "11px", fontSize: ".9rem", fontWeight: 700,
             cursor: "pointer", width: "100%", fontFamily: "inherit" },
  btnSm:   { background: "#1a1a1a", color: "#666", border: "1px solid #222",
             borderRadius: 8, padding: "6px 12px", fontSize: ".78rem",
             cursor: "pointer" },
  loginBox: { maxWidth: 320, margin: "120px auto", background: "#111",
              border: "1px solid #1a1a1a", borderRadius: 14, padding: 28 },
}
