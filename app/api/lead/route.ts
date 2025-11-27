import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json()

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Transport SMTP configurat cu variabilele din Netlify
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    await transporter.sendMail({
      from: `"TINKA AI" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL, // tinka.ai.srl@gmail.com
      subject: "📩 Lead nou generat de TINKA AI",
      html: `
        <h2>Lead nou generat automat prin chatbotul TINKA AI</h2>
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Mesaj:</strong> ${message || "(fără mesaj)"} </p>
        <hr>
        <p>Acest lead a fost colectat automat din conversația AI de pe Tinka.md.</p>
      `
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
