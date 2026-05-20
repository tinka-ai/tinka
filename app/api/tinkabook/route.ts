// app/api/tinkabook/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import fs from "fs"
import path from "path"
import { randomUUID } from "crypto"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function escapeHtml(input: unknown): string {
  if (input === null || input === undefined) return ""
  return String(input)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// ── Salvare consimțământ local (Art. 7.1 LP195/2024) ──────────────────────────
function saveConsent(record: object) {
  try {
    const dir = process.env.NODE_ENV === "production" ? "/tmp" : path.join(process.cwd(), "data")
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    const file = path.join(dir, "tinkabook_consents.json")
    const existing = fs.existsSync(file)
      ? JSON.parse(fs.readFileSync(file, "utf-8"))
      : []
    existing.push(record)
    fs.writeFileSync(file, JSON.stringify(existing, null, 2))
  } catch (e) {
    console.error("Consent save error:", e)
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const {
      email,
      activity,
      language,
      phone,
      phoneConsent,
      consentText,
      uiLanguage,
      sourcePage,
      honeypot,
    } = data || {}

    // Anti-spam honeypot
    if (honeypot?.trim()) return NextResponse.json({ ok: true })

    // Validare obligatorie
    if (!email || !activity) {
      return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 })
    }

    const brand = process.env.BRAND_NAME || "TINKA AI"
    const toOwner = process.env.TINKABOOK_TO_EMAIL || process.env.TO_EMAIL || "tinka.ai.srl@gmail.com"

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json({ ok: false, error: "smtp-misconfigured" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    })

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip") || "unknown"

    const now = new Date().toISOString()
    const nowRo = new Date().toLocaleString("ro-RO", { timeZone: "Europe/Chisinau" })
    const consentId = randomUUID()

    // ── Salvare consimțământ (Art. 7.1 LP195/2024) ───────────────────────────
    saveConsent({
      id: consentId,
      timestamp: now,
      email,
      ip,
      // Consimțăminte specifice
      consentGDPR: true,           // a bifat consimțământul principal
      consentPhone: !!phoneConsent, // a bifat explicit contactul telefonic
      consentText: consentText || "",
      // Date colectate cu acordul dat
      dataCollected: {
        email,
        activity,
        language: language || null,
        phone: phoneConsent && phone ? phone : null, // telefonul doar dacă a consimțit
      },
      sourcePage: sourcePage || "Homepage – TinkaBook",
      uiLanguage: uiLanguage || "",
      // Dreptul de ștergere — contact@tinka.md cu subiectul "Ștergere date [email]"
      deletionNote: "La cerere de ștergere — caută după id sau email și șterge acest înregistrare",
    })

    // ── Email notificare admin ────────────────────────────────────────────────
    const ownerHtml = `
      <div style="font-family:sans-serif;max-width:600px">
        <h2 style="color:#0ea5e9">TinkaBook — Cerere nouă demo</h2>

        <h3>1. Date solicitant</h3>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Domeniu activitate:</b><br/>${escapeHtml(activity).split("\n").join("<br/>")}</p>
        <p><b>Limba preferată:</b> ${escapeHtml(language || "—")}</p>
        ${phoneConsent && phone
          ? `<p><b>Telefon:</b> ${escapeHtml(phone)} <em>(client a consimțit explicit contactul telefonic)</em></p>`
          : `<p><b>Telefon:</b> — <em>(client nu a solicitat contact telefonic)</em></p>`
        }

        <hr/>
        <h3>2. Consimțământ (Art. 7.1 LP195/2024)</h3>
        <p><b>ID consimțământ:</b> <code>${consentId}</code></p>
        <p><b>Data/ora:</b> ${escapeHtml(nowRo)}</p>
        <p><b>IP:</b> ${escapeHtml(ip)}</p>
        <p><b>Consimțământ GDPR:</b> ✅ DA</p>
        <p><b>Consimțământ contact telefonic:</b> ${phoneConsent ? "✅ DA" : "❌ NU"}</p>
        <details>
          <summary style="cursor:pointer;color:#888">Text consimțământ afișat</summary>
          <pre style="font-size:11px;border:1px solid #ddd;padding:8px;border-radius:4px;white-space:pre-wrap">${escapeHtml(consentText || "")}</pre>
        </details>

        <hr/>
        <p style="font-size:11px;color:#888">
          La cerere de ștergere date: caută după email sau ID consimțământ în
          /tmp/tinkabook_consents.json și șterge înregistrarea.<br/>
          Termenul de răspuns: max 30 zile (Art. 12.3 LP195/2024).
        </p>
      </div>
    `

    await transporter.sendMail({
      from: `"${brand} – TinkaBook" <${process.env.SMTP_USER}>`,
      to: toOwner,
      replyTo: email,
      subject: `[TinkaBook] Cerere demo — ${email}`,
      html: ownerHtml,
    })

    return NextResponse.json({ ok: true, consentId })

  } catch (err) {
    console.error("TinkaBook API error:", err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
