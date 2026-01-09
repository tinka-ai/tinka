import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const name = body?.name
    const email = body?.email
    const phone = body?.phone

    // message (vechi) + câmpuri noi
    const message = body?.message || ""
    const offer_final = body?.offer_final || ""
    const conversation = body?.conversation || ""

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    const html = `
      <h2>📩 Lead nou generat prin chatbotul TINKA AI</h2>
      <p><strong>Nume:</strong> ${escapeHtml(String(name))}</p>
      <p><strong>Email:</strong> ${escapeHtml(String(email))}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(String(phone))}</p>

      ${message ? `<p><strong>Mesaj:</strong> ${escapeHtml(String(message))}</p>` : ""}

      ${offer_final ? `
        <hr/>
        <h3>✅ Oferta finală acceptată</h3>
        <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px;">${escapeHtml(String(offer_final))}</pre>
      ` : ""}

      ${conversation ? `
        <hr/>
        <h3>🗨️ Conversație</h3>
        <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px;">${escapeHtml(String(conversation))}</pre>
      ` : ""}

      <hr/>
      <p>Trimis automat din Tinka.md</p>
    `

    await transporter.sendMail({
      from: `"TINKA AI" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL, // tinka.ai.srl@gmail.com
      subject: "📩 Lead nou + ofertă acceptată (TINKA AI)",
      html
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("LEAD API ERROR:", error)
    return NextResponse.json({ error: "Server error sending email" }, { status: 500 })
  }
}
