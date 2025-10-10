// app/api/offer/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs"        // obligă runtime-ul Node (nu Edge)
export const dynamic = "force-dynamic" // evită caching pe platforme de hosting

function listify(v: any) {
  if (v === undefined || v === null) return ""
  return Array.isArray(v) ? v.join(", ") : String(v)
}

function tableFromObject(obj: Record<string, any>) {
  const rows = Object.entries(obj)
    .filter(([k]) => k !== "agree" && k !== "gdpr")
    .map(
      ([k, v]) =>
        `<tr>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;"><b>${k}</b></td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;">${Array.isArray(v) ? v.join(", ") : String(v ?? "")}</td>
        </tr>`
    )
    .join("")
  return `<table style="border-collapse:collapse;width:100%;font-family:Inter,Arial,sans-serif">${rows}</table>`
}

async function parseBody(req: Request) {
  const ctype = req.headers.get("content-type") || ""
  if (ctype.includes("application/json")) return await req.json()
  const form = await req.formData()
  const obj: Record<string, any> = {}
  for (const [k, v] of form.entries()) {
    obj[k] = obj[k] !== undefined ? (Array.isArray(obj[k]) ? [...obj[k], v] : [obj[k], v]) : v
  }
  return obj
}

export async function POST(req: Request) {
  try {
    const data = await parseBody(req)

    const {
      name, email, phone, company, region,
      about, audience, problems, links,
      websiteGoals, kpi,
      features, content, branding, refs, integrations, domain,
      botChannels, botRole, botLangs, kb,
      automations, other,
      deadline, budget, notes,
      uiLocale,
    } = data

    const brand = process.env.BRAND_NAME || "TINKA AI"
    const toOwner = process.env.TO_EMAIL || process.env.SMTP_USER

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("Missing SMTP_USER / SMTP_PASS")
      return NextResponse.json({ ok: false, error: "smtp-misconfigured" }, { status: 500 })
    }
    if (!email) {
      return NextResponse.json({ ok: false, error: "no-email" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    })

    const ownerHtml = `
      <h2>Nouă solicitare ofertă – Pachet lansare rapidă</h2>
      <p><b>UI language:</b> ${uiLocale || "-"}</p>

      <h3>Contact</h3>
      ${tableFromObject({ name, email, phone, company, region })}

      <h3>Afacere</h3>
      ${tableFromObject({ about, audience, problems, links })}

      <h3>Obiective & KPI</h3>
      ${tableFromObject({ websiteGoals: listify(websiteGoals), kpi })}

      <h3>Website</h3>
      ${tableFromObject({ features: listify(features), content, branding, refs, integrations, domain })}

      <h3>Chatbot</h3>
      ${tableFromObject({ botChannels: listify(botChannels), botRole: listify(botRole), botLangs, kb })}

      <h3>Automatizări</h3>
      ${tableFromObject({ automations: listify(automations), other })}

      <h3>Constrângeri</h3>
      ${tableFromObject({ deadline, budget, notes })}
    `

    await transporter.sendMail({
      from: `"${brand} – Forms" <${process.env.SMTP_USER}>`,
      to: toOwner,
      replyTo: email,
      subject: `Oferta ${brand}: ${company || name || email}`,
      html: ownerHtml,
    })

    const confirmHtml = `
      <p>Bună${name ? `, ${name}` : ""}!</p>
      <p>Îți mulțumim pentru interesul în <b>Pachetul de lansare rapidă</b>. Am primit detaliile și revenim cât de curând cu o propunere.</p>
      <p>Pe scurt, iată ce am primit:</p>
      ${ownerHtml}
      <p>— Echipa ${brand}</p>
    `
    await transporter.sendMail({
      from: `"${brand}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `${brand}: am primit solicitarea ta`,
      html: confirmHtml,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
