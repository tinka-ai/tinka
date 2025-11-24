// app/api/offer/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
// TEST ENV
console.log("ENV TEST:", process.env.TEST_VAR)
// END TEST ENV
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// ----------------------------
//  RATE LIMIT (anti-spam)
// ----------------------------
const RATE = new Map<string, number>()

function rateLimit(ip: string) {
  const now = Date.now()
  const last = RATE.get(ip) || 0

  if (now - last < 15000) return false // 15 secunde între cereri
  RATE.set(ip, now)
  return true
}

// ----------------------------
//  UTILS
// ----------------------------
function clean(s: any) {
  if (!s) return ""
  return String(s)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim()
}

function listify(v: any) {
  if (!v) return ""
  return Array.isArray(v) ? v.join(", ") : clean(v)
}

function table(obj: Record<string, any>) {
  return `
    <table style="border-collapse:collapse;width:100%;font-family:Inter,Arial,sans-serif">
      ${Object.entries(obj)
        .map(
          ([k, v]) => `
        <tr>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;"><b>${clean(k)}</b></td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;">${listify(v)}</td>
        </tr>`
        )
        .join("")}
    </table>`
}

async function getBody(req: Request) {
  const ctype = req.headers.get("content-type") || ""

  if (ctype.includes("application/json")) return await req.json()

  const fd = await req.formData()
  const obj: Record<string, any> = {}
  for (const [k, v] of fd.entries()) {
    obj[k] = obj[k] ? [...[].concat(obj[k]), v] : v
  }
  return obj
}

// ----------------------------
//  MAIN POST HANDLER
// ----------------------------
export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown"

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "rate-limit" },
        { status: 429 }
      )
    }

    const data = await getBody(req)

    // ----------------------------
    // VALIDARE
    // ----------------------------
    const email = clean(data.email)
    const name = clean(data.name)
    const company = clean(data.company)

    if (!email || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "invalid-email" }, { status: 400 })
    }

    if (!data.gdpr) {
      return NextResponse.json({ ok: false, error: "gdpr-required" }, { status: 400 })
    }

    // ----------------------------
    // SMTP
    // ----------------------------
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json(
        { ok: false, error: "smtp-missing" },
        { status: 500 }
      )
    }

    const brand = process.env.BRAND_NAME || "TINKA AI"
    const toOwner = process.env.TO_EMAIL || process.env.SMTP_USER

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    })

    // ----------------------------
    // EMAIL CĂTRE OWNER
    // ----------------------------
    const sections = `
      <h2>Nouă solicitare ofertă – Pachet lansare</h2>
      <p><b>UI Language:</b> ${clean(data.uiLocale)}</p>

      <h3>Contact</h3>
      ${table({
        name,
        email,
        phone: clean(data.phone),
        company,
        region: clean(data.region),
      })}

      <h3>Afacere</h3>
      ${table({
        about: clean(data.about),
        audience: clean(data.audience),
        problems: clean(data.problems),
        links: clean(data.links),
      })}

      <h3>Website</h3>
      ${table({
        websiteGoals: listify(data.websiteGoals),
        features: listify(data.features),
        content: clean(data.content),
        branding: clean(data.branding),
        domain: clean(data.domain),
      })}
