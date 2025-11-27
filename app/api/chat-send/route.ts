// app/api/chat-send/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Funcție anti-XSS identică cu TinkaBook
function escapeHtml(input: unknown): string {
  if (!input) return ""
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, phone, email, lang, conversation } = body || {}

    // Validare exact ca în fișierul tinkaBook
    if (!name || !phone || !email) {
      return NextResponse.json(
        { ok: false, error: "missing-fields" },
        { status: 400 }
      )
    }

    // același email ca TinkaBook
    const toOwner =
      process.env.TINKABOOK_TO_EMAIL ||
      process.env.TO_EMAIL ||
      "tinka.ai.srl@gmail.com"

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("Missing SMTP_USER / SMTP_PASS")
      return NextResponse.json(
        { ok: false, error: "smtp-misconfigured" },
        { status: 500 }
      )
    }

    // Identic cu TinkaBook – Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    })

    // Conversația completă în HTML
    const conversationHtml =
      (conversation || [])
        .map((msg: any) => {
          const who = msg.role === "user" ? "Client" : "Ai-Tinka"
          return `<p><b>${who}:</b><br>${escapeHtml(msg.content)}</p>`
        })
        .join("<hr/>") || "<p>(fără conversație atașată)</p>"

    const now = new Date().toLocaleString("ro-RO", {
      timeZone: "Europe/Chisinau",
    })

    // EXACT stil TinkaBook
    const html = `
      <h2>Cerere nouă din chatbot – Ai-Tinka</h2>

      <h3>1. Date client</h3>
      <p><b>Nume:</b> ${escapeHtml(name)}</p>
      <p><b>Telefon:</b> ${escapeHtml(phone)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Limba conversației:</b> ${escapeHtml(lang)}</p>

      <hr/>

      <h3>2. Conversația completă</h3>
      ${conversationHtml}

      <hr/>

      <p><b>Data trimiterii:</b> ${escapeHtml(now)}</p>
      <p>Acest lead a fost generat automat de chatbotul <b>Ai-Tinka</b> integrat pe site.</p>
    `

    await transporter.sendMail({
      from: `"Ai-Tinka (Chatbot)" <${process.env.SMTP_USER}>`,
      to: toOwner,
      replyTo: email,
      subject: `📩 Lead nou din Ai-Tinka – ${name}`,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("chat-send ERROR:", err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
