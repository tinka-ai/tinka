// app/api/chat/route.ts
import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

type Lang = "ro" | "ru" | "en"

function safeString(v: any) {
  return typeof v === "string" ? v : ""
}

export async function POST(req: Request) {
  let language: Lang = "ro"

  try {
    const body = await req.json()
    const messages = Array.isArray(body?.messages) ? body.messages : []
    language = (body?.lang as Lang) || "ro"

    const greetings: Record<Lang, string> = {
      ro: "Salut! Eu sunt Tinka AI. Cu ce te pot ajuta?",
      en: "Hello! I’m Tinka AI. How can I help?",
      ru: "Здравствуйте! Я Tinka AI. Чем помочь?"
    }

    // ✅ Pricing constants (MDL implicit)
    // Pentru automatizări “AI agents”: tu ai spus 3 agenți ~ 400 EUR.
    // Ca să fie controlabil și corect, punem curs ca variabilă de mediu.
    // Dacă nu e setată, folosim 20 MDL/EUR doar ca fallback.
    const EUR_MDL = Number(process.env.EUR_MDL_RATE || 20)

    const baseAutomation3AgentsMDL = Math.round(400 * EUR_MDL)

    const systemPrompt = `
Ești TINKA AI – consultant digital pentru IMM-uri din Republica Moldova.
Conceptul firmei: Technologies • Innovation • Networking • Knowledge • Automation.

Limbă conversație: ${language}
Monedă implicită: MDL (dacă clientul cere altă monedă, răspunzi în MDL + echivalent aproximativ).

═══════════════════════════════════════
STIL
═══════════════════════════════════════
- Vorbești natural, prietenos, clar.
- În mod normal: scurt (max 2 propoziții).
- EXCEPȚIE: când dai ofertă / calcul preț → ai voie 4–6 linii scurte tip “Oferta: …” (fără povești lungi).

═══════════════════════════════════════
REGULI DE INTEROGARE
═══════════════════════════════════════
- Pui o singură întrebare pe mesaj.
- Dacă utilizatorul nu dă date, respecți și continui fără presiune.
- Nu inventezi cifre “din aer”: dacă lipsește un input, spui “estimare” și ceri 1 detaliu.

═══════════════════════════════════════
PRODUSE
═══════════════════════════════════════
TinkaBook:
- programări online 24/7 (de la 99 MDL/lună)

TinkaBot:
- chatbot AI pentru site + lead-uri (de la 1.999 MDL/lună)

TinkaWeb:
- website modern (de la 5.999 MDL plată unică)

TinkaSell:
- pagini de ofertă + captare lead-uri (de la 59€/lună echivalent MDL)

TinkaBiz:
- pachet (site + programări + chatbot), preț personalizat (începe de la un prag sănătos)

AUTOMATIZĂRI (n8n + AI):
- “Agenți AI” care înlocuiesc munca repetitivă (emailuri, CRM, facturi, rapoarte, suport).
- 3 agenți AI: de la ${baseAutomation3AgentsMDL} MDL (echivalent ~400€). 
- Regula ta: 1 agent ≈ 1 angajat (argument ROI: se recuperează rapid dacă elimină 1 post).

═══════════════════════════════════════
PRICING & NEGOCIERE (OBLIGATORIU)
═══════════════════════════════════════
Principiu:
Prețul = Costuri reale (podea) + marjă + risc + valoare pentru client.
Nu scazi prețul direct. Ajustezi pachetul:
- suport mai mic / ore incluse mai puține / fără modificări / fazare pe etape.

Când clientul zice “prea scump”:
- oferi 2 opțiuni: (1) pachet redus, (2) implementare în etape.
Când compară cu “100 MDL”:
- explici diferența: generic vs responsabilitate + integrare + suport + impact.

═══════════════════════════════════════
CÂND DAI OFERTĂ (FORMAT)
═══════════════════════════════════════
Răspunzi așa:
Oferta:
1) Recomandare: [produs/soluție]
2) Preț: [MDL / lună] sau [MDL one-time]
3) Include: [3 puncte]
4) Opțiune mai ieftină: [ce se taie]
Întrebare (una): “Câte puncte de lucru ai?” / “Cât trafic ai?” / “Vrei suport lunar sau proiect one-time?”

═══════════════════════════════════════
DECIZIE FINALĂ + EMAIL (OBLIGATORIU)
═══════════════════════════════════════
Scop: clientul ia o decizie.
Dacă clientul CONFIRMĂ explicit oferta (“accept”, “da”, “ok”, “mergem”, “confirm”):
1) Ceri: nume + telefon + email (în 1 întrebare: “Lasă-mi nume, telefon și email.”)
2) După ce le primești, pregătești un rezumat final (Oferta finală acceptată + pașii următori)
3) Marchezi pentru sistem: SEND_LEAD cu:
   - name, phone, email
   - offer_final (text scurt)
   - conversation (ultimele mesaje relevante)

IMPORTANT:
Nu promiți că “trimiți tu email” ca acțiune internă. Doar incluzi markerul SEND_LEAD pentru sistem.

Format marker final (doar când ai toate datele):
[SEND_LEAD]
{"name":"...","phone":"...","email":"...","offer_final":"...","conversation":"..."}
[/SEND_LEAD]
`

    const finalMessages =
      messages.length === 0
        ? [
            { role: "system", content: systemPrompt },
            { role: "assistant", content: greetings[language] }
          ]
        : [{ role: "system", content: systemPrompt }, ...messages]

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: finalMessages,
      max_tokens: 450,
      temperature: 0.7
    })

    let botReply = response.choices[0]?.message?.content || ""
    botReply = safeString(botReply)

    // ✅ Detect marker SEND_LEAD
    const leadStart = botReply.indexOf("[SEND_LEAD]")
    const leadEnd = botReply.indexOf("[/SEND_LEAD]")

    if (leadStart !== -1 && leadEnd !== -1 && leadEnd > leadStart) {
      const jsonPart = botReply
        .slice(leadStart + "[SEND_LEAD]".length, leadEnd)
        .trim()

      let lead: any = null
      try {
        lead = JSON.parse(jsonPart)
      } catch {
        // dacă parse-ul pică, returnăm răspunsul normal fără acțiune
        return NextResponse.json({ bot: botReply.replace(/\[SEND_LEAD\][\s\S]*?\[\/SEND_LEAD\]/, "").trim() })
      }

      // curățăm markerul din textul afișat utilizatorului
      const cleaned = botReply.replace(/\[SEND_LEAD\][\s\S]*?\[\/SEND_LEAD\]/, "").trim()

      // payload către /api/lead
      const leadPayload = {
        name: safeString(lead?.name),
        email: safeString(lead?.email),
        phone: safeString(lead?.phone),
        offer_final: safeString(lead?.offer_final),
        conversation: safeString(lead?.conversation)
      }

      return NextResponse.json({
        bot: cleaned,
        action: "send_lead",
        lead: leadPayload
      })
    }

    return NextResponse.json({ bot: botReply })
  } catch (error: any) {
    return NextResponse.json(
      {
        bot:
          language === "ro"
            ? "Eroare server. Încearcă din nou."
            : language === "ru"
            ? "Ошибка сервера. Попробуйте снова."
            : "Server error. Try again.",
        error: true,
        details: error?.message
      },
      { status: 500 }
    )
  }
}
