// app/api/lead/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const name = body?.name
    const email = body?.email
    const phone = body?.phone

    // Nou:
    const conversation = body?.conversation // array of {role, content}
    const offer = body?.offer // obiect oferta
    const acceptedAt = body?.acceptedAt

    // Vechi:
    const message = body?.message

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const transcriptHtml = Array.isArray(conversation)
      ? conversation
          .map((m: any) => {
            const who = m?.role === "user" ? "Client" : "TINKA AI"
            const text = String(m?.content ?? "").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            return `<p><strong>${who}:</strong> ${text}</p>`
          })
          .join("")
      : "<p>(nu a fost transmis transcriptul)</p>"

    const offerHtml = offer
      ? `
        <h3>✅ Ofertă acceptată</h3>
        <p><strong>Tip:</strong> ${offer.type || "-"}</p>
        <p><strong>Titlu:</strong> ${offer.title || "-"}</p>
        ${offer.monthly_mdl != null ? `<p><strong>Abonament:</strong> ${offer.monthly_mdl} MDL / lună</p>` : ""}
        ${offer.one_time_mdl != null ? `<p><strong>Plată unică:</strong> ${offer.one_time_mdl} MDL</p>` : ""}
        ${
          Array.isArray(offer.setup_mdl_range)
            ? `<p><strong>Setup:</strong> ${offer.setup_mdl_range[0]}–${offer.setup_mdl_range[1]} MDL (o singură dată)</p>`
            : ""
        }
        ${
          Array.isArray(offer.items)
            ? `<p><strong>Include:</strong><br>${offer.items.map((x: string) => `• ${x}`).join("<br>")}</p>`
            : ""
        }
        ${
          Array.isArray(offer.assumptions)
            ? `<p><strong>Presupuneri:</strong><br>${offer.assumptions.map((x: string) => `• ${x}`).join("<br>")}</p>`
            : ""
        }
        <p><strong>Următorul pas:</strong> ${offer.next_step || "-"}</p>
      `
      : ""

    await transporter.sendMail({
      from: `"TINKA AI" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL, // tinka.ai.srl@gmail.com
      subject: "✅ Ofertă acceptată / Lead nou din TINKA AI",
      html: `
        <h2>Lead nou din chatbot</h2>
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        ${acceptedAt ? `<p><strong>Acceptat la:</strong> ${acceptedAt}</p>` : ""}
        ${message ? `<p><strong>Mesaj:</strong> ${message}</p>` : ""}

        <hr>
        ${offerHtml}
        <hr>

        <h3>💬 Transcript conversație</h3>
        ${transcriptHtml}

        <hr>
        <p>Acest email a fost generat automat din conversația AI de pe site.</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("LEAD API ERROR:", error)
    return NextResponse.json({ error: "Server error sending email" }, { status: 500 })
  }
}
