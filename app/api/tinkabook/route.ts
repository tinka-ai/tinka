// app/api/tinkabook/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"        // obligă runtime-ul Node (nu Edge)
export const dynamic = "force-dynamic" // evită caching pe platforme de hosting

function escapeHtml(input: unknown): string {
  if (input === null || input === undefined) return ""
  const str = String(input)
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const {
      name,
      phone,
      email,
      activity,
      contactPref,
      links,
      language,
      consentText,
      uiLanguage,
      sourcePage,
      subjectPrefix,
      honeypot,
    } = data || {}

    // Anti-spam: dacă cineva completează honeypot, nu facem nimic
    if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
      return NextResponse.json({ ok: true })
    }

    const brand = process.env.BRAND_NAME || "TINKA AI"
    const toOwner =
      process.env.TINKABOOK_TO_EMAIL ||
      process.env.TO_EMAIL ||
      "tinka.ai.srl@gmail.com"

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("Missing SMTP_USER / SMTP_PASS")
      return NextResponse.json({ ok: false, error: "smtp-misconfigured" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    })

    const forwardedFor = req.headers.get("x-forwarded-for") || ""
    const ip =
      forwardedFor.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown"

    const now = new Date().toLocaleString("ro-RO", {
      timeZone: "Europe/Chisinau",
    })

    const safeName = (name || "").toString().trim()
    const subjectBase =
      subjectPrefix && typeof subjectPrefix === "string"
        ? subjectPrefix
        : "[TinkaBook] Cerere nouă de conectare"

    const subject = safeName ? `${subjectBase} – ${safeName}` : subjectBase

    const ownerHtml = `
      <h2>Nouă cerere de conectare la TinkaBook</h2>

      <h3>1. Date solicitant</h3>
      <p><b>Nume / Denumire:</b> ${escapeHtml(name)}</p>
      <p><b>Telefon:</b> ${escapeHtml(phone)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Domeniu de activitate / servicii:</b><br/>
        ${escapeHtml(activity).replace(/\n/g, "<br/>")}</p>

      <p><b>Modalitate preferată de contact:</b> ${escapeHtml(contactPref)}</p>
      <p><b>Linkuri (Facebook / Instagram / site):</b> ${escapeHtml(links)}</p>
      <p><b>Limba preferată în comunicare:</b> ${escapeHtml(language)}</p>

      <hr/>

      <h3>2. Metadate formular</h3>
      <p><b>Data și ora trimiterii:</b> ${escapeHtml(now)}</p>
      <p><b>IP:</b> ${escapeHtml(ip)}</p>
      <p><b>Limba UI browser (navigator.language):</b> ${escapeHtml(uiLanguage)}</p>
      <p><b>Pagină sursă:</b> ${escapeHtml(sourcePage || "Homepage – secțiunea TinkaBook")}</p>

      <hr/>

      <h3>3. Acord pentru prelucrarea datelor</h3>
      <p>Textul de mai jos reprezintă acordul afișat în formular și acceptat prin bifă:</p>
      <pre style="white-space:pre-wrap;font-size:12px;line-height:1.4;border:1px solid #ddd;padding:8px;border-radius:4px;">
${consentText || ""}
      </pre>
    `

    const ownerText = `
Nouă cerere de conectare la TinkaBook

1. Date solicitant
- Nume / Denumire: ${name || ""}
- Telefon: ${phone || ""}
- Email: ${email || ""}
- Domeniu de activitate / servicii:
${activity || ""}

- Modalitate preferată de contact: ${contactPref || ""}
- Linkuri (Facebook / Instagram / site): ${links || ""}
- Limba preferată în comunicare: ${language || ""}

2. Metadate formular
- Data și ora trimiterii: ${now}
- IP: ${ip}
- Limba UI browser (navigator.language): ${uiLanguage || ""}
- Pagină sursă: ${sourcePage || "Homepage – secțiunea TinkaBook"}

3. Acord pentru prelucrarea datelor (text complet acceptat de utilizator):

${consentText || ""}
    `.trim()

    await transporter.sendMail({
      from: `"${brand} – TinkaBook" <${process.env.SMTP_USER}>`,
      to: toOwner,
      replyTo: email || undefined,
      subject,
      html: ownerHtml,
      text: ownerText,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("TinkaBook API error:", err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
