import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, phone, email, project } = body

    if (!name || !email || !project) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // --- CONFIGURARE SMTP TOPHOST ---
    const transporter = nodemailer.createTransport({
      host: "mail.tinka.md",  // sau mail.domainul-tau.md
      port: 465,
      secure: true,
      auth: {
        user: "office@tinka.md",
        pass: process.env.MAIL_PASS, // IMPORTANT: adaugi parola în .env
      },
    })

    // Email care ajunge la tine
    await transporter.sendMail({
      from: `"Ai-Tinka" <office@tinka.md>`,
      to: "office@tinka.md",
      subject: "Lead nou de pe Ai-Tinka",
      html: `
        <h2>Lead nou primit prin chatbot</h2>
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Proiect:</strong> ${project}</p>
        <br>
        <small>Acest mesaj a fost trimis automat de Ai-Tinka.</small>
      `,
    })

    return NextResponse.json(
      { success: true, message: "Email trimis cu succes" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Eroare trimitere email:", error)
    return NextResponse.json(
      { error: "Eroare la trimiterea emailului" },
      { status: 500 }
    )
  }
}
