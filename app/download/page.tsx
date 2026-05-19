"use client"
// app/download/page.tsx

import { useState } from "react"
import { useLocale } from "@/contexts/locale-context"

const GOLD = "#C9A84C"
const GOLD_DIM = "#8B6914"

export default function DownloadPage() {
  const { t } = useLocale()
  const d = t.download
  const p = d.products.transcriber
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash).then(() => {
      setCopiedHash(hash)
      setTimeout(() => setCopiedHash(null), 2000)
    })
  }

  return (
    <main style={{
      minHeight: "100vh", background: "#080808", color: "#f0f0f0",
      fontFamily: "var(--font-geist-sans, Helvetica, sans-serif)",
      padding: "80px 20px 60px",
    }}>
      {/* HERO */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#1a1408", border: "1px solid #8B6914", color: GOLD,
          fontSize: ".72rem", fontWeight: 600, letterSpacing: ".12em",
          textTransform: "uppercase", padding: "5px 14px",
          borderRadius: 100, marginBottom: 20,
        }}>
          <span style={{ width: 6, height: 6, background: GOLD,
                         borderRadius: "50%", display: "inline-block" }} />
          {d.badge}
        </div>

        <h1 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700,
                     lineHeight: 1.15, marginBottom: 12 }}>
          {d.title}{" "}<span style={{ color: GOLD }}>{d.titleHighlight}</span>
        </h1>
        <p style={{ fontSize: "1rem", color: "#888", maxWidth: 520,
                    margin: "0 auto", lineHeight: 1.7 }}>
          {d.subtitle}
        </p>
      </div>

      {/* PRODUCTS */}
      <div style={{ maxWidth: 860, margin: "0 auto",
                    display: "flex", flexDirection: "column", gap: 28 }}>

        {/* ── TINKA AI Transcriber ── */}
        <div style={{
          background: "#0f0f0f", border: "1px solid #2a2010",
          borderRadius: 16, overflow: "hidden",
        }}>
          <div style={{ height: 2, background: `linear-gradient(90deg,transparent,${GOLD},transparent)`,
                        opacity: .5 }} />

          {/* Product header */}
          <div style={{ padding: "24px 28px 16px",
                        display: "flex", justifyContent: "space-between",
                        alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center",
                            gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: "1.5rem" }}>🎙</span>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700,
                             color: "#f0f0f0", margin: 0 }}>{p.name}</h2>
              </div>
              <p style={{ color: GOLD, fontSize: ".85rem", margin: "0 0 8px" }}>
                {p.tagline}
              </p>
              <p style={{ color: "#888", fontSize: ".85rem",
                          maxWidth: 480, lineHeight: 1.6, margin: 0 }}>
                {p.description}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column",
                          gap: 5, alignItems: "flex-end" }}>
              {[
                { icon: "🎁", text: p.trial, color: "#4CAF50" },
                { icon: "💻", text: p.os, color: "#888" },
                { icon: "📦", text: p.version, color: "#555" },
              ].map(({ icon, text, color }) => (
                <span key={text} style={{ fontSize: ".78rem", color,
                                           display: "flex", alignItems: "center", gap: 5 }}>
                  {icon} {text}
                </span>
              ))}
            </div>
          </div>

          {/* Download cards */}
          <div style={{ padding: "0 28px 20px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                        gap: 16 }}>
            <DownloadCard
              label={p.portable.label}
              desc={p.portable.desc}
              size={p.portable.size}
              url={p.portable.url}
              sha256={p.portable.sha256}
              btnLabel={d.downloadBtn}
              sha256Label={d.sha256Label}
              copyLabel={d.copyHash}
              copiedLabel={d.hashCopied}
              isCopied={copiedHash === p.portable.sha256}
              onCopy={() => copyHash(p.portable.sha256)}
              icon="📁"
              primary={false}
            />
            <DownloadCard
              label={p.installer.label}
              desc={p.installer.desc}
              size={p.installer.size}
              url={p.installer.url}
              sha256={p.installer.sha256}
              btnLabel={d.downloadBtn}
              sha256Label={d.sha256Label}
              copyLabel={d.copyHash}
              copiedLabel={d.hashCopied}
              isCopied={copiedHash === p.installer.sha256}
              onCopy={() => copyHash(p.installer.sha256)}
              icon="⚙️"
              primary={true}
            />
          </div>

          {/* Buy CTA */}
          <div style={{
            margin: "0 28px 20px",
            background: "#0a0a0a", border: "1px solid #2a2010",
            borderRadius: 10, padding: "14px 18px",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: 12,
          }}>
            <div style={{ fontSize: ".84rem", color: "#888" }}>
              🔑 {p.trial} —{" "}
              <span style={{ color: "#f0f0f0" }}>activează licența pe viață</span>
            </div>
            <a href={p.buyLink} style={{
              background: GOLD, color: "#080808",
              textDecoration: "none", fontWeight: 700,
              fontSize: ".88rem", padding: "8px 18px",
              borderRadius: 8, display: "inline-block",
            }}>
              {p.buyLabel} →
            </a>
          </div>

          {/* Verificare SHA256 */}
          <div style={{
            margin: "0 28px 28px",
            background: "#161616", border: "1px solid #1a1a1a",
            borderRadius: 10, padding: "14px 18px",
          }}>
            <div style={{ fontSize: ".72rem", fontWeight: 600,
                          color: "#444", textTransform: "uppercase",
                          letterSpacing: ".1em", marginBottom: 8 }}>
              {d.verify.title}
            </div>
            <p style={{ fontSize: ".82rem", color: "#888",
                        lineHeight: 1.6, margin: "0 0 10px" }}>
              {d.verify.desc}
            </p>
            <div style={{ fontSize: ".78rem", color: "#555", marginBottom: 6 }}>
              {d.verify.howTo}
            </div>
            <div style={{
              background: "#0a0a0a", border: "1px solid #1a1a1a",
              borderRadius: 6, padding: "8px 12px",
              fontFamily: "monospace", fontSize: ".8rem",
              color: GOLD, overflowX: "auto",
            }}>
              {d.verify.command}
            </div>
            <p style={{ fontSize: ".78rem", color: "#555", margin: "8px 0 0" }}>
              {d.verify.compare}
            </p>
          </div>
        </div>

        {/* Coming Soon placeholder */}
        <div style={{
          background: "#0f0f0f", border: "1px solid #1a1a1a",
          borderRadius: 16, padding: "32px 28px",
          display: "flex", alignItems: "center", gap: 16,
          opacity: .45,
        }}>
          <span style={{ fontSize: "2rem" }}>🚀</span>
          <div>
            <div style={{ fontSize: "1rem", fontWeight: 600,
                          color: "#f0f0f0", marginBottom: 4 }}>
              {d.comingSoon}
            </div>
            <div style={{ fontSize: ".85rem", color: "#888" }}>
              TINKA AI — alte produse în curând
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}

// ── Download Card ─────────────────────────────────────────────────────────────
function DownloadCard({
  label, desc, size, url, sha256,
  btnLabel, sha256Label, copyLabel, copiedLabel,
  isCopied, onCopy, icon, primary,
}: {
  label: string; desc: string; size: string; url: string; sha256: string
  btnLabel: string; sha256Label: string; copyLabel: string; copiedLabel: string
  isCopied: boolean; onCopy: () => void; icon: string; primary: boolean
}) {
  return (
    <div style={{
      background: primary ? "#0f0e09" : "#0a0a0a",
      border: `1px solid ${primary ? "#2a2010" : "#1a1a1a"}`,
      borderRadius: 12, padding: 18,
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      {/* Label + size */}
      <div style={{ display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center",
                        gap: 8, marginBottom: 4 }}>
            <span>{icon}</span>
            <span style={{ fontSize: ".9rem", fontWeight: 700,
                           color: "#f0f0f0" }}>{label}</span>
          </div>
          <p style={{ fontSize: ".8rem", color: "#888",
                      lineHeight: 1.5, margin: 0 }}>{desc}</p>
        </div>
        <span style={{ fontSize: ".72rem", color: "#555",
                       flexShrink: 0, marginLeft: 8 }}>{size}</span>
      </div>

      {/* SHA256 */}
      <div style={{ background: "#080808", border: "1px solid #1a1a1a",
                    borderRadius: 8, padding: "8px 10px" }}>
        <div style={{ fontSize: ".65rem", color: "#444",
                      textTransform: "uppercase", letterSpacing: ".1em",
                      marginBottom: 4 }}>
          {sha256Label}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between",
                      alignItems: "center", gap: 8 }}>
          <span style={{
            fontFamily: "monospace", fontSize: ".68rem",
            color: primary ? "#C9A84C" : "#8B6914",
            wordBreak: "break-all", lineHeight: 1.4,
          }}>
            {sha256}
          </span>
          <button onClick={onCopy} style={{
            background: "none", border: "1px solid #2a2a2a",
            color: isCopied ? "#4CAF50" : "#555",
            fontSize: ".68rem", padding: "3px 8px",
            borderRadius: 5, cursor: "pointer",
            flexShrink: 0, fontFamily: "inherit",
            whiteSpace: "nowrap",
          }}>
            {isCopied ? copiedLabel : copyLabel}
          </button>
        </div>
      </div>

      {/* Button */}
      <a href={url} style={{
        display: "block", textAlign: "center",
        textDecoration: "none",
        background: primary ? "#C9A84C" : "#1a1a1a",
        color: primary ? "#080808" : "#f0f0f0",
        fontWeight: 700, fontSize: ".9rem",
        padding: "10px", borderRadius: 8,
        border: primary ? "none" : "1px solid #2a2a2a",
      }}>
        ↓ {btnLabel}
      </a>
    </div>
  )
}
