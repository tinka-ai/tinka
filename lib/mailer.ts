// lib/mailer.ts
// Folosește același SMTP Gmail configurat deja în proiectul tău

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const FROM = `"TINKA AI" <${process.env.SMTP_USER}>`
const ADMIN = process.env.TO_EMAIL || process.env.SMTP_USER || ""

// ── 1. Confirmare comandă → client ───────────────────────────────────────────
export async function sendOrderConfirmation({
  name, email, orderId,
}: {
  name: string; email: string; orderId: string
}) {
  const ref = `${name.split(" ")[0].toUpperCase()} TINKA ${orderId.slice(0, 6).toUpperCase()}`

  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: "✅ Comanda ta TINKA AI Transcriber a fost înregistrată",
    html: `
<!DOCTYPE html>
<html lang="ro">
<head><meta charset="UTF-8">
<style>
  body{font-family:Helvetica,Arial,sans-serif;background:#0a0a0a;margin:0;padding:20px;}
  .wrap{max-width:560px;margin:0 auto;background:#111;border:1px solid #222;border-radius:12px;overflow:hidden;}
  .bar{height:3px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);}
  .head{padding:28px 32px 20px;text-align:center;border-bottom:1px solid #1a1a1a;}
  .logo{font-size:1.4rem;font-weight:700;color:#C9A84C;letter-spacing:.05em;}
  .tag{font-size:.72rem;color:#444;margin-top:3px;}
  .body{padding:28px 32px;color:#bbb;font-size:.9rem;line-height:1.7;}
  h2{color:#f0f0f0;font-size:1.05rem;margin:0 0 16px;}
  .box{background:#161616;border:1px solid #2a2a2a;border-radius:8px;padding:14px 18px;margin:18px 0;}
  .bl{font-size:.68rem;color:#555;text-transform:uppercase;letter-spacing:.1em;margin-bottom:5px;}
  .bv{color:#C9A84C;font-family:monospace;font-size:.9rem;}
  .bank{background:#0f0e09;border:1px solid #2a2010;border-radius:8px;padding:16px 18px;margin:18px 0;}
  .br{font-size:.85rem;margin-bottom:5px;color:#999;}
  .br strong{color:#C9A84C;font-family:monospace;}
  .step{display:flex;gap:10px;margin-bottom:10px;}
  .sn{background:#1a1408;border:1px solid #8B6914;color:#C9A84C;width:20px;height:20px;
      border-radius:50%;display:inline-flex;align-items:center;justify-content:center;
      font-size:.7rem;font-weight:700;flex-shrink:0;margin-top:1px;}
  .st{font-size:.84rem;color:#888;line-height:1.5;}
  .st strong{color:#f0f0f0;}
  .foot{padding:16px 32px;text-align:center;border-top:1px solid #1a1a1a;
        font-size:.75rem;color:#444;}
  .foot a{color:#8B6914;text-decoration:none;}
</style>
</head>
<body>
<div class="wrap">
  <div class="bar"></div>
  <div class="head">
    <div class="logo">TINKA AI</div>
    <div class="tag">digital simplu eficient</div>
  </div>
  <div class="body">
    <h2>Bună ziua, ${name}! 👋</h2>
    <p>Comanda ta pentru <strong style="color:#f0f0f0">TINKA AI Transcriber — Licență pe Viață</strong>
    a fost înregistrată.</p>

    <div class="box">
      <div class="bl">Număr comandă</div>
      <div class="bv">#${orderId.slice(0, 8).toUpperCase()}</div>
    </div>

    <p>Efectuează transferul bancar la datele de mai jos și vei primi cheia în maxim
    <strong style="color:#f0f0f0">2 ore lucrătoare</strong>.</p>

    <div class="bank">
      <div class="br"><span style="color:#666">Bancă:</span> <strong>MAIB</strong></div>
      <div class="br"><span style="color:#666">IBAN:</span> <strong>MD__ AGRNMD2X0000000000000</strong></div>
      <div class="br"><span style="color:#666">Beneficiar:</span> <strong>TINKA AI SRL</strong></div>
      <div class="br"><span style="color:#666">Suma:</span> <strong>490 MDL</strong></div>
      <div class="br"><span style="color:#666">Referință:</span> <strong>${ref}</strong></div>
    </div>

    <div class="step">
      <span class="sn">1</span>
      <span class="st">Efectuează transferul cu referința de mai sus</span>
    </div>
    <div class="step">
      <span class="sn">2</span>
      <span class="st">Primești <strong>cheia de licență</strong> pe acest email în max. 2 ore</span>
    </div>
    <div class="step">
      <span class="sn">3</span>
      <span class="st">Deschide aplicația → <strong>🔑 Activează licența</strong> → introdu cheia → gata!</span>
    </div>
  </div>
  <div class="foot">
    © 2025 TINKA AI · <a href="https://tinka.md">tinka.md</a> ·
    <a href="mailto:office@tinka.md">office@tinka.md</a>
  </div>
  <div class="bar"></div>
</div>
</body></html>
    `,
  })
}

// ── 2. Cheie de licență → client ─────────────────────────────────────────────
export async function sendLicenseKey({
  name, email, licenseKey,
}: {
  name: string; email: string; licenseKey: string
}) {
  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: "🔑 Cheia ta de licență TINKA AI Transcriber",
    html: `
<!DOCTYPE html>
<html lang="ro">
<head><meta charset="UTF-8">
<style>
  body{font-family:Helvetica,Arial,sans-serif;background:#0a0a0a;margin:0;padding:20px;}
  .wrap{max-width:560px;margin:0 auto;background:#111;border:1px solid #222;border-radius:12px;overflow:hidden;}
  .bar{height:3px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);}
  .head{padding:28px 32px 20px;text-align:center;border-bottom:1px solid #1a1a1a;}
  .logo{font-size:1.4rem;font-weight:700;color:#C9A84C;letter-spacing:.05em;}
  .tag{font-size:.72rem;color:#444;margin-top:3px;}
  .body{padding:28px 32px;color:#bbb;font-size:.9rem;line-height:1.7;}
  h2{color:#f0f0f0;font-size:1.05rem;margin:0 0 16px;}
  .keybox{background:#0f0e09;border:2px solid #C9A84C;border-radius:12px;
          padding:22px;text-align:center;margin:22px 0;}
  .kl{font-size:.68rem;color:#8B6914;text-transform:uppercase;letter-spacing:.15em;margin-bottom:10px;}
  .kv{font-family:monospace;font-size:1.3rem;font-weight:700;color:#C9A84C;letter-spacing:.06em;}
  .step{display:flex;gap:10px;margin-bottom:10px;}
  .sn{background:#1a1408;border:1px solid #8B6914;color:#C9A84C;width:20px;height:20px;
      border-radius:50%;display:inline-flex;align-items:center;justify-content:center;
      font-size:.7rem;font-weight:700;flex-shrink:0;margin-top:1px;}
  .st{font-size:.84rem;color:#888;line-height:1.5;}
  .st strong{color:#f0f0f0;}
  .warn{background:#161616;border:1px solid #2a2a2a;border-radius:8px;
        padding:12px 14px;font-size:.8rem;color:#555;line-height:1.6;margin-top:18px;}
  .foot{padding:16px 32px;text-align:center;border-top:1px solid #1a1a1a;
        font-size:.75rem;color:#444;}
  .foot a{color:#8B6914;text-decoration:none;}
</style>
</head>
<body>
<div class="wrap">
  <div class="bar"></div>
  <div class="head">
    <div class="logo">TINKA AI</div>
    <div class="tag">digital simplu eficient</div>
  </div>
  <div class="body">
    <h2>Felicitări, ${name}! 🎉</h2>
    <p>Plata a fost confirmată. Mai jos găsești cheia ta de licență pentru
    <strong style="color:#f0f0f0">TINKA AI Transcriber</strong>.</p>

    <div class="keybox">
      <div class="kl">⭐ Cheia ta de licență pe viață</div>
      <div class="kv">${licenseKey}</div>
    </div>

    <div class="step">
      <span class="sn">1</span>
      <span class="st">Deschide <strong>TINKA AI Transcriber</strong></span>
    </div>
    <div class="step">
      <span class="sn">2</span>
      <span class="st">Apasă <strong>🔑 Activează licența</strong></span>
    </div>
    <div class="step">
      <span class="sn">3</span>
      <span class="st">Introdu cheia de mai sus → <strong>Activează</strong></span>
    </div>
    <div class="step">
      <span class="sn">4</span>
      <span class="st">✅ <strong>Licență activă pe viață!</strong></span>
    </div>

    <div class="warn">
      ⚠ Această cheie funcționează <strong style="color:#f0f0f0">doar pe calculatorul tău</strong>.
      Dacă schimbi calculatorul, contactează-ne pentru transfer gratuit la
      <a href="mailto:office@tinka.md" style="color:#8B6914">office@tinka.md</a>.
    </div>
  </div>
  <div class="foot">
    © 2025 TINKA AI · <a href="https://tinka.md">tinka.md</a> ·
    <a href="mailto:office@tinka.md">office@tinka.md</a>
  </div>
  <div class="bar"></div>
</div>
</body></html>
    `,
  })
}

// ── 3. Notificare internă → tu ────────────────────────────────────────────────
export async function sendAdminNotification({
  name, email, machineId, orderId, phone, message,
}: {
  name: string; email: string; machineId: string
  orderId: string; phone?: string; message?: string
}) {
  await transporter.sendMail({
    from: FROM,
    to: ADMIN,
    subject: `🛒 Comandă nouă TINKA AI — ${name}`,
    html: `
<div style="font-family:monospace;background:#0a0a0a;color:#ccc;padding:24px;border-radius:10px;">
  <h2 style="color:#C9A84C;margin:0 0 20px">🛒 Comandă nouă — TINKA AI Transcriber</h2>
  <table style="width:100%;border-collapse:collapse;font-size:.88rem;">
    <tr><td style="color:#666;padding:5px 0;width:110px;">ID:</td>
        <td style="color:#C9A84C;">#${orderId.slice(0, 8).toUpperCase()}</td></tr>
    <tr><td style="color:#666;padding:5px 0;">Nume:</td>
        <td style="color:#f0f0f0;">${name}</td></tr>
    <tr><td style="color:#666;padding:5px 0;">Email:</td>
        <td><a href="mailto:${email}" style="color:#C9A84C;">${email}</a></td></tr>
    <tr><td style="color:#666;padding:5px 0;">Telefon:</td>
        <td style="color:#f0f0f0;">${phone || "—"}</td></tr>
    <tr><td style="color:#666;padding:5px 0;">Machine ID:</td>
        <td style="color:#C9A84C;font-size:.82rem;word-break:break-all;">${machineId}</td></tr>
    <tr><td style="color:#666;padding:5px 0;">Mesaj:</td>
        <td style="color:#f0f0f0;">${message || "—"}</td></tr>
    <tr><td style="color:#666;padding:5px 0;">Sumă:</td>
        <td style="color:#4CAF50;font-weight:700;">490 MDL</td></tr>
  </table>
  <div style="margin-top:20px;padding:14px;background:#111;border:1px solid #222;border-radius:8px;">
    <p style="color:#666;font-size:.82rem;margin:0 0 8px;">Accesează panoul de admin:</p>
    <a href="https://tinka.md/admin/comenzi" style="color:#C9A84C;font-size:.85rem;">
      → https://tinka.md/admin/comenzi
    </a>
  </div>
</div>
    `,
  })
}
