// app/api/chat-send/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, phone, email, message } = body || {}

    // Validare simplă
    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "missing-fields" },
        { status: 400 }
      )
    }

    // Același email la care ajunge TinkaBook
    const toOwner =
      process.env.TINKABOOK_TO_EMAIL ||
      process.env.TO_EMAIL ||
      "tinka.ai.srl@gmail.com"

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("Lipsă SMTP_USER / SMTP_PASS")
      return NextResponse.json(
        { ok: false, error: "smtp-misconfigured" },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    })

    const html = `
      <h2>Cerere nouă din chatbot TINKA AI</h2>
      <p><b>Nume:</b> ${name}</p>
      <p><b>Telefon:</b> ${phone}</p>
      <p><b>Email:</b> ${email}</p>

      <h3>Mesaj</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>

      <hr>
      <p>Acest mesaj a fost trimis automat din chatbotul integrat pe site.</p>
    `

    await transporter.sendMail({
      from: `"Ai-Tinka (Chatbot)" <${process.env.SMTP_USER}>`,
      to: toOwner,
      replyTo: email,
      subject: `Cerere nouă din chatbot – ${name}`,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("chat-send ERROR:", err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
