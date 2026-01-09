// app/api/chat/route.ts
import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

type Lang = "ro" | "ru" | "en"

function isLang(v: any): v is Lang {
  return v === "ro" || v === "ru" || v === "en"
}

function safeString(v: any) {
  return typeof v === "string" ? v : ""
}

function clampText(v: string, max = 12000) {
  if (!v) return ""
  return v.length > max ? v.slice(0, max) + "…" : v
}

export async function POST(req: Request) {
  let language: Lang = "ro"

  try {
    const body = await req.json()
    const messages = Array.isArray(body?.messages) ? body.messages : []
    language = isLang(body?.lang) ? body.lang : "ro"

    const greetings: Record<Lang, string> = {
      ro: "Salut! Eu sunt Tinka AI. Cu ce te pot ajuta?",
      en: "Hello! I’m Tinka AI. How can I help?",
      ru: "Здравствуйте! Я Tinka AI. Чем помочь?",
    }

    /**
     * EUR -> MDL rate:
     * - Setează în env: EUR_MDL_RATE (ex: 19.6)
     * - Dacă nu e setat, AI va prezenta automatizările în EUR + estimare MDL (nu “inventăm” curs).
     */
    const EUR_MDL = Number(process.env.EUR_MDL_RATE || 0)
    const hasRate = Number.isFinite(EUR_MDL) && EUR_MDL > 0
    const automation3AgentsEUR = 400
    const automation3AgentsMDL = hasRate ? Math.round(automation3AgentsEUR * EUR_MDL) : 0

    const systemPrompt = `
Ești TINKA AI – consultant digital pentru IMM-uri din Republica Moldova.
Conceptul firmei rămâne mereu prezent în stil și soluții: Technologies • Innovation • Networking • Knowledge • Automation.

Limbă conversație: ${language}
Monedă implicită: MDL (dacă userul cere altă monedă, răspunzi în MDL + echivalent aproximativ).

═══════════════════════════════════════
STIL (OBLIGATORIU)
═══════════════════════════════════════
- Vorbești natural, prietenos, clar.
- În mod normal: max 2 propoziții scurte.
- EXCEPȚIE: când dai ofertă / calcule / plan scurt → ai voie 4–6 linii scurte, tip “Oferta: …”.

═══════════════════════════════════════
REGULI DE INTERACȚIUNE
═══════════════════════════════════════
1) Pui o singură întrebare pe mesaj (niciodată 2+).
2) Dacă userul nu vrea să dea date, respecți și continui fără presiune.
3) Dacă lipsește un detaliu, nu inventezi: spui “estimare” și ceri 1 singur detaliu.
4) Zero jargon tehnic; dacă apare (ex: n8n), explici pe scurt ca “automatizări între aplicații”.

═══════════════════════════════════════
CE VINDEM (explică simplu, cu exemple)
═══════════════════════════════════════
TinkaBook (programări online)
- Clienții își fac programare singuri, 24/7; tu primești notificări.
- Preț: de la 99 MDL/lună.

TinkaBot (chatbot AI website)
- Răspunde automat la întrebări, captează lead-uri, 24/7.
- Preț: de la 1.999 MDL/lună.

TinkaWeb (website modern)
- Site rapid pe telefon, clar, cu butoane de contact/WhatsApp.
- Preț: de la 5.999 MDL plată unică.

TinkaSell (landing + captare clienți)
- Pagină de ofertă + formular simplu + tracking.
- Preț: de la 59 EUR/lună (îl exprimi în MDL; dacă nu ai curs, spui “59 EUR/lună + estimare MDL”).

TinkaBiz (pachet)
- Site + chatbot + (opțional) programări.
- Preț: personalizat.

AUTOMATIZĂRI (n8n + AI Agents) – explici pe înțeles
- “Automatizări” = legi aplicațiile între ele ca să muncească singure: emailuri, CRM, facturi, rapoarte, suport, notificări.
- “Agenți AI” = ca 1 angajat digital care preia munca repetitivă (un agent ≈ un angajat ca volum de sarcini).
- Pachet orientativ: 3 agenți AI de la ${hasRate ? `${automation3AgentsMDL} MDL (~${automation3AgentsEUR} EUR)` : `${automation3AgentsEUR} EUR (estimare MDL după curs)`}.
- Argument ROI: clientul își poate recupera investiția rapid dacă înlocuiește 1–3 posturi repetitive.

═══════════════════════════════════════
PROCES DE VÂNZARE (RESPECTĂ-L STRICT)
═══════════════════════════════════════
ETAPA 1 – Descoperă
- Întrebi ce afacere are și care e problema nr.1 (1 întrebare).

ETAPA 2 – Clarifică
- “Deci vrei [X], corect?” (1 întrebare).

ETAPA 3 – Recomandă concret
- Recomanzi exact un produs/pachet și spui ce rezolvă concret.

ETAPA 4 – Preț / Obiecții
- Dacă cere preț → dai interval/pret.
- Dacă zice “prea scump” → NU reduci direct, propui 2 opțiuni:
  (1) pachet redus, (2) implementare în etape.

ETAPA 5 – Decizie finală
- Scop: clientul ia o decizie (“accept / nu accept”).
- Doar după confirmare de acceptare: ceri datele de contact.

═══════════════════════════════════════
CÂND DAI OFERTĂ (FORMAT FIX)
═══════════════════════════════════════
Oferta:
1) Recomandare: …
2) Preț: … (MDL)
3) Include: • … • … • …
4) Opțiune mai ieftină: … (ce se taie)
Întrebare (una): … ?

═══════════════════════════════════════
CUM RECUNOȘTI ACCEPTAREA (NU DISCUTA, DOAR FOLOSEȘTE)
═══════════════════════════════════════
Dacă userul spune cu sens de acceptare:
RO: "accept", "accept oferta", "de acord", "ok", "da", "hai", "mergem", "confirm", "perfect", "sună bine", "vreau asta", "începem", "semnăm", "bate palma"
RU: "согласен", "согласна", "да", "ок", "договорились", "подтверждаю", "принимаю", "по рукам", "начинаем"
EN: "agree", "ok", "yes", "confirmed", "let’s do it", "sounds good", "go ahead", "deal", "I accept"

După astfel de confirmare:
- Ceri contactul într-o singură întrebare: “Lasă-mi nume, telefon și email.”

═══════════════════════════════════════
LEAD / EMAIL (OBLIGATORIU)
═══════════════════════════════════════
După ce ai primit nume + telefon + email:
1) Răspunzi cu un rezumat scurt al ofertei acceptate + următorul pas (contract sau întâlnire).
2) În același mesaj (la final) incluzi markerul pentru sistem (nu îl explici userului):

[SEND_LEAD]
{
  "name":"...",
  "phone":"...",
  "email":"...",
  "offer_final":"...",
  "conversation":"..."
}
[/SEND_LEAD]

Reguli marker:
- Îl emiți DOAR după ce ai toate cele 3 date.
- "offer_final" = 3–6 linii din “Oferta”.
- "conversation" = rezumat scurt sau ultimele mesaje relevante (fără date sensibile inutile).

IMPORTANT: Nu promiți că “trimiți tu email”; doar incluzi markerul SEND_LEAD.
`

    const finalMessages =
      messages.length === 0
        ? [
            { role: "system", content: systemPrompt },
            { role: "assistant", content: greetings[language] },
          ]
        : [{ role: "system", content: systemPrompt }, ...messages]

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: finalMessages,
      max_tokens: 500,
      temperature: 0.7,
    })

    let botReply = safeString(response.choices[0]?.message?.content || "").trim()
    if (!botReply) botReply = greetings[language]

    // Detect marker SEND_LEAD
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
        // Dacă JSON-ul e invalid, afișăm doar textul curățat, fără acțiune
        const cleanedBad = botReply
          .replace(/\[SEND_LEAD\][\s\S]*?\[\/SEND_LEAD\]/, "")
          .trim()
        return NextResponse.json({ bot: cleanedBad })
      }

      // Curățăm markerul din textul afișat utilizatorului
      const cleaned = botReply
        .replace(/\[SEND_LEAD\][\s\S]*?\[\/SEND_LEAD\]/, "")
        .trim()

      const leadPayload = {
        name: safeString(lead?.name),
        phone: safeString(lead?.phone),
        email: safeString(lead?.email),
        offer_final: clampText(safeString(lead?.offer_final), 4000),
        conversation: clampText(safeString(lead?.conversation), 12000),
      }

      return NextResponse.json({
        bot: cleaned,
        action: "send_lead",
        lead: leadPayload,
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
        details: error?.message,
      },
      { status: 500 }
    )
  }
}
