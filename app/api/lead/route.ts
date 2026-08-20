// app/api/lead/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getSupabaseAdmin } from "@/lib/supabaseAdmin"

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

    // Minim necesar: doar emailul e obligatoriu. Nume/telefon sunt opționale —
    // le includem doar dacă vizitatorul le-a oferit singur în conversație.
    const name = clamp(asString(body?.name).trim(), 120)
    const email = clamp(asString(body?.email).trim(), 160)
    const phone = clamp(normalizePhone(asString(body?.phone)), 80)

    // message (vechi) + câmpuri noi
    const message = clamp(asString(body?.message).trim(), 4000)
    const offer_final = clamp(asString(body?.offer_final).trim(), 6000)
    const conversation = clamp(asString(body?.conversation).trim(), 12000)

    // Dovada consimțământului (Art. 7(1) GDPR — "able to demonstrate that the
    // data subject has consented"): textul exact afișat + momentul bifării,
    // trimise de client, plus timestamp-ul de server + IP-ul, capturate aici,
    // ca sursă autoritativă. Totul e păstrat în corpul emailului (server SMTP +
    // inbox-ul destinatarului = evidență cu timestamp, suficientă pentru
    // volumul unei afaceri mici; nu necesită bază de date separată).
    const consentText = clamp(asString(body?.consentText).trim(), 500)
    const consentGivenAtClient = clamp(asString(body?.consentGivenAt).trim(), 40)
    const consentGivenAtServer = new Date().toISOString()
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown"

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Missing or invalid required field (email)" },
        { status: 400 }
      )
    }

    if (!consentText) {
      return NextResponse.json(
        { error: "Missing consent confirmation" },
        { status: 400 }
      )
    }

    // Dovadă durabilă și căutabilă a consimțământului — separată de email,
    // ca să poată fi verificată oricând din panoul admin (/admin/consimtaminte).
    // Nu blocăm trimiterea emailului dacă Supabase nu e configurat sau eșuează.
    try {
      const supabase = getSupabaseAdmin()
      if (supabase) {
        await supabase.from("consents").insert({
          source: "chatbot",
          email,
          name: name || null,
          phone: phone || null,
          consent_text: consentText,
          consent_given_at_client: consentGivenAtClient || null,
          consent_given_at_server: consentGivenAtServer,
          ip,
          offer_final: offer_final || null,
          conversation: conversation || null,
        })
      }
    } catch (e) {
      console.error("Supabase consent insert failed:", e)
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

        <p style="margin:0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${name ? `<p style="margin:0 0 6px;"><strong>Nume:</strong> ${escapeHtml(name)}</p>` : ""}
        ${phone ? `<p style="margin:0 0 12px;"><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ""}

        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
        <h3 style="margin:0 0 8px;">✅ Dovadă consimțământ (GDPR Art. 7.1)</h3>
        <p style="margin:0 0 4px;font-size:13px;"><strong>Text agreat:</strong> ${escapeHtml(consentText)}</p>
        <p style="margin:0 0 4px;font-size:13px;"><strong>Bifat de client la:</strong> ${escapeHtml(consentGivenAtClient || "—")}</p>
        <p style="margin:0 0 4px;font-size:13px;"><strong>Înregistrat pe server la:</strong> ${escapeHtml(consentGivenAtServer)}</p>
        <p style="margin:0 0 4px;font-size:13px;"><strong>IP vizitator:</strong> ${escapeHtml(ip)}</p>

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

    // Copie de confirmare către client — și propria lui dovadă a ce a acceptat și când.
    try {
      await transporter.sendMail({
        from: `"TINKA AI" <${SMTP_USER}>`,
        to: email,
        subject: "TINKA AI – Am primit solicitarea ta",
        html: `
          <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.45;color:#111;">
            <p>Bună${name ? " " + escapeHtml(name) : ""},</p>
            <p>Mulțumim pentru mesajul trimis către <b>TINKA AI</b>. Revenim rapid.</p>
            <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
            <p style="font-size:13px;color:#555;"><strong>Ai confirmat:</strong> ${escapeHtml(consentText)}</p>
            <p style="font-size:13px;color:#555;"><strong>La data:</strong> ${escapeHtml(consentGivenAtServer)}</p>
            <p style="font-size:12px;color:#888;margin-top:16px;">Ai dreptul la acces, rectificare și ștergere a datelor — scrie-ne la office@tinka.md.</p>
          </div>
        `,
      })
    } catch (e) {
      // Nu blocăm fluxul principal dacă emailul de confirmare eșuează.
      console.error("LEAD confirmation email failed:", e)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("LEAD API ERROR:", error)
    return NextResponse.json(
      { error: "Server error sending email" },
      { status: 500 }
    )
  }
}
