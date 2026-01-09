// app/api/lead/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

function asString(v: any) {
  return typeof v === "string" ? v : v == null ? "" : String(v)
}

function clamp(s: string, max: number) {
  if (!s) return ""
  return s.length > max ? s.slice(0, max) + "…" : s
}

function normalizePhone(s: string) {
  // păstrăm simplu: curățăm spații duble; nu stricăm formatele internaționale
  return s.replace(/\s+/g, " ").trim()
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const name = clamp(asString(body?.name).trim(), 120)
    const email = clamp(asString(body?.email).trim(), 160)
    const phone = clamp(normalizePhone(asString(body?.phone)), 80)

    // message (vechi) + câmpuri noi
    const message = clamp(asString(body?.message).trim(), 4000)
    const offer_final = clamp(asString(body?.offer_final).trim(), 6000)
    const conversation = clamp(asString(body?.conversation).trim(), 12000)

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, phone)" },
        { status: 400 }
      )
    }

    const SMTP_USER = process.env.SMTP_USER
    const SMTP_PASS = process.env.SMTP_PASS
    const TO_EMAIL = process.env.TO_EMAIL || "tinka.ai.srl@gmail.com"

    if (!SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { error: "SMTP is not configured (SMTP_USER/SMTP_PASS missing)" },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    const subject = offer_final
      ? "✅ Lead + ofertă acceptată (TINKA AI)"
      : "📩 Lead nou generat de TINKA AI"

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.45;color:#111;">
        <h2 style="margin:0 0 10px;">📩 Lead nou (TINKA AI)</h2>

        <p style="margin:0 0 6px;"><strong>Nume:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin:0 0 12px;"><strong>Telefon:</strong> ${escapeHtml(phone)}</p>

        ${
          message
            ? `<p style="margin:0 0 12px;"><strong>Mesaj:</strong> ${escapeHtml(message)}</p>`
            : ""
        }

        ${
          offer_final
            ? `
              <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
              <h3 style="margin:0 0 8px;">✅ Oferta finală acceptată</h3>
              <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px;margin:0;">${escapeHtml(
                offer_final
              )}</pre>
            `
            : ""
        }

        ${
          conversation
            ? `
              <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
              <h3 style="margin:0 0 8px;">🗨️ Conversație</h3>
              <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px;margin:0;">${escapeHtml(
                conversation
              )}</pre>
            `
            : ""
        }

        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
        <p style="margin:0;color:#555;font-size:12px;">Trimis automat din Tinka.md</p>
      </div>
    `

    await transporter.sendMail({
      from: `"TINKA AI" <${SMTP_USER}>`,
      to: TO_EMAIL,
      subject,
      replyTo: email, // util: dai reply direct clientului
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("LEAD API ERROR:", error)
    return NextResponse.json(
      { error: "Server error sending email" },
      { status: 500 }
    )
  }
}
