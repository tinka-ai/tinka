"use client"
// app/admin/comenzi/page.tsx

import { useState, useEffect, useCallback } from "react"

type Order = {
  id: string; createdAt: string; email: string
  machineId: string
  status: "pending" | "paid" | "delivered" | "cancelled"
  licenseKey?: string; deliveredAt?: string; amount: number; currency: string
}

const STATUSES = {
  pending:   { label: "În așteptare", color: "#FF9800", bg: "rgba(255,152,0,.1)" },
  paid:      { label: "Plătit",       color: "#2196F3", bg: "rgba(33,150,243,.1)" },
  delivered: { label: "Livrat ✅",    color: "#4CAF50", bg: "rgba(76,175,80,.1)" },
  cancelled: { label: "Anulat",       color: "#666",    bg: "rgba(100,100,100,.1)" },
}
const GOLD = "#C9A84C"

export default function AdminPage() {
  const [pass, setPass]       = useState("")
  const [authed, setAuthed]   = useState(false)
  const [orders, setOrders]   = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [busy, setBusy]       = useState<string | null>(null)
  const [msg, setMsg]         = useState("")
  const [filter, setFilter]   = useState("all")

  const fetchOrders = useCallback(async (p = pass) => {
    setLoading(true)
    const res = await fetch("/api/admin/orders", {
      headers: { "x-admin-password": p }
    })
    if (res.status === 401) { setAuthed(false); return }
    const data = await res.json()
    setOrders(data.orders || [])
    setLoading(false)
  }, [pass])

  const login = () => {
    if (pass.length > 3) { setAuthed(true); fetchOrders(pass) }
  }

  const deliver = async (orderId: string) => {
    const ref = prompt("Referința plății (opțional):") ?? ""
    setBusy(orderId); setMsg("")
    const res = await fetch("/api/deliver-key", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": pass },
      body: JSON.stringify({ orderId, paymentRef: ref }),
    })
    const data = await res.json()
    setMsg(data.success
      ? `✅ Cheie trimisă: ${data.licenseKey}`
      : `❌ ${data.message}`)
    if (data.success) fetchOrders()
    setBusy(null)
  }

  const shown = filter === "all" ? orders : orders.filter(o => o.status === filter)
  const revenue = orders.filter(o => o.status === "delivered").length * 490

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
        <button onClick={login} style={S.btnGold}>Intră</button>
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
            Admin — Comenzi Transcriber
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a href="/admin" style={{ fontSize: ".78rem", color: "#666" }}>
            ← Admin
          </a>
          <a href="/admin/consimtaminte" style={{ fontSize: ".78rem", color: "#666" }}>
            Consimțăminte →
          </a>
          <button onClick={() => fetchOrders()} style={S.btnSm}>🔄 Actualizează</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 12, padding: "16px 20px", flexWrap: "wrap" }}>
        {(Object.entries(STATUSES) as [string, typeof STATUSES.pending][]).map(([k, { label, color }]) => (
          <div key={k} onClick={() => setFilter(filter === k ? "all" : k)}
               style={S.statBox}>
            <div style={{ fontSize: "1.4rem", fontWeight: 700, color,
                          fontFamily: "monospace" }}>
              {orders.filter(o => o.status === k).length}
            </div>
            <div style={{ fontSize: ".7rem", color: "#555", marginTop: 2 }}>{label}</div>
          </div>
        ))}
        <div style={S.statBox}>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: GOLD,
                        fontFamily: "monospace" }}>
            {revenue} MDL
          </div>
          <div style={{ fontSize: ".7rem", color: "#555", marginTop: 2 }}>Venituri</div>
        </div>
      </div>

      {/* Filtre */}
      <div style={{ padding: "0 20px 10px", display: "flex", gap: 8 }}>
        {["all", "pending", "paid", "delivered"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
                  style={{ ...S.filterBtn, ...(filter === f ? S.filterBtnActive : {}) }}>
            {f === "all" ? "Toate" : STATUSES[f as keyof typeof STATUSES]?.label}
          </button>
        ))}
      </div>

      {/* Mesaj status */}
      {msg && (
        <div style={{
          margin: "0 20px 10px", padding: "10px 14px",
          background: "#111", border: "1px solid #222", borderRadius: 8,
          fontSize: ".84rem",
          color: msg.startsWith("✅") ? "#4CAF50" : "#e53935",
        }}>{msg}</div>
      )}

      {/* Comenzi */}
      <div style={{ padding: "0 20px 40px" }}>
        {loading ? (
          <div style={{ padding: 32, textAlign: "center", color: "#444" }}>
            Se încarcă...
          </div>
        ) : shown.length === 0 ? (
          <div style={{ padding: 32, textAlign: "center", color: "#333",
                        background: "#111", borderRadius: 12 }}>
            Nicio comandă
          </div>
        ) : shown.map(o => {
          const st = STATUSES[o.status]
          return (
            <div key={o.id} style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between",
                            alignItems: "center", marginBottom: 12 }}>
                <div>
                  <span style={{ fontFamily: "monospace", color: "#666",
                                 fontSize: ".82rem", marginRight: 8 }}>
                    #{o.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span style={{
                    fontSize: ".7rem", fontWeight: 600,
                    padding: "2px 10px", borderRadius: 100,
                    color: st.color, background: st.bg,
                  }}>{st.label}</span>
                </div>
                <span style={{ fontSize: ".75rem", color: "#444" }}>
                  {new Date(o.createdAt).toLocaleString("ro-MD")}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
                            gap: "8px 20px" }}>
                {[
                  ["Email", o.email],
                  ["Sumă", `${o.amount} ${o.currency}`],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: ".65rem", color: "#444",
                                  textTransform: "uppercase", letterSpacing: ".1em",
                                  marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: ".85rem", color: "#ccc" }}>{v}</div>
                  </div>
                ))}
                <div style={{ gridColumn: "1/-1" }}>
                  <div style={{ fontSize: ".65rem", color: "#444",
                                textTransform: "uppercase", letterSpacing: ".1em",
                                marginBottom: 2 }}>Machine ID</div>
                  <div style={{ fontSize: ".82rem", color: GOLD,
                                fontFamily: "monospace", wordBreak: "break-all" }}>
                    {o.machineId}
                  </div>
                </div>
                {o.message && (
                  <div style={{ gridColumn: "1/-1" }}>
                    <div style={{ fontSize: ".65rem", color: "#444",
                                  textTransform: "uppercase", letterSpacing: ".1em",
                                  marginBottom: 2 }}>Mesaj</div>
                    <div style={{ fontSize: ".85rem", color: "#ccc" }}>{o.message}</div>
                  </div>
                )}
                {o.licenseKey && (
                  <div style={{ gridColumn: "1/-1" }}>
                    <div style={{ fontSize: ".65rem", color: "#444",
                                  textTransform: "uppercase", letterSpacing: ".1em",
                                  marginBottom: 2 }}>Cheie licență</div>
                    <div style={{ fontSize: ".9rem", color: "#4CAF50",
                                  fontFamily: "monospace", letterSpacing: ".05em" }}>
                      {o.licenseKey}
                    </div>
                  </div>
                )}
              </div>

              {o.status !== "delivered" && (
                <button
                  onClick={() => deliver(o.id)}
                  disabled={busy === o.id}
                  style={{ ...S.btnGold, marginTop: 14, width: "auto",
                           padding: "8px 18px", fontSize: ".86rem" }}
                >
                  {busy === o.id ? "⏳ Se trimite..." : "🔑 Confirmare plată + Trimite cheie"}
                </button>
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
  statBox: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 10,
             padding: "12px 18px", cursor: "pointer", minWidth: 90 },
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
  filterBtn: { background: "#111", color: "#555", border: "1px solid #1a1a1a",
               borderRadius: 6, padding: "4px 12px", fontSize: ".75rem",
               cursor: "pointer" },
  filterBtnActive: { background: "#1a1408", color: GOLD, borderColor: "#8B6914" },
  loginBox: { maxWidth: 320, margin: "120px auto", background: "#111",
              border: "1px solid #1a1a1a", borderRadius: 14, padding: 28 },
}
