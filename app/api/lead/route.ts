// app/api/chat/route.ts
import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

type Locale = "ro" | "ru" | "en"

const greetings: Record<Locale, string> = {
  ro: "Alege limba conversației ca să începem 🙂",
  ru: "Выберите язык разговора, чтобы начать 🙂",
  en: "Choose the conversation language to begin 🙂",
}

// Date suport (salariu mediu + curs EUR/MDL) — pot varia în timp.
// Salariu mediu lunar (ex. NBS, Q1 2025): 14567.5 MDL. :contentReference[oaicite:0]{index=0}
const AVG_SALARY_MDL = 14568
// Curs EUR/MDL (BNM, exemplu 06.01.2026: 19.74). :contentReference[oaicite:1]{index=1}
const EUR_MDL = 19.74

function clampLocale(x: any): Locale {
  return x === "ru" || x === "en" || x === "ro" ? x : "ro"
}

/**
 * Oferta “Automatizări + Agenți AI”:
 * - 1–3 agenți = echivalent salariu mediu pe economie (MDL) / lună (cerința ta)
 * - one-time setup (analiză + implementare inițială) = interval (depinde de complexitate)
 */
function automationPricing(agentsCount: number) {
  const agents = Math.max(1, Math.min(agentsCount || 1, 12))
  const monthlyBase = AVG_SALARY_MDL // 1–3 agenți = 1 salariu mediu
  const multiplier = agents <= 3 ? 1 : Math.ceil(agents / 3) // 4–6 = 2x, 7–9 = 3x, etc.
  const monthly = monthlyBase * multiplier

  // Setup “de la” (one-time) – păstrăm interval ca să nu inventăm ore exacte din aer.
  const setupFrom = 8000 * multiplier
  const setupTo = 18000 * multiplier

  const anchor3AgentsFromEur = 400
  const anchor3AgentsFromMdl = Math.round(anchor3AgentsFromEur * EUR_MDL)

  return {
    agents,
    monthly_mdl: monthly,
    setup_mdl_range: [setupFrom, setupTo],
    anchor_3agents_from_mdl: anchor3AgentsFromMdl,
  }
}

export async function POST(req: Request) {
  try {
    const { messages, lang } = await req.json()
    const language = clampLocale(lang)

    // Dacă widget-ul trimite conversația fără limbă, întoarcem “stop” (nu pornim).
    if (!lang) {
      return NextResponse.json({
        ok: true,
        reply: greetings[language],
        require_language: true,
      })
    }

    // Knowledge + reguli (include și conceptul TINKA: Technologies • Innovation • Networking • Knowledge • Automation)
    const systemPrompt = `
Ești TINKA AI (Technologies • Innovation • Networking • Knowledge • Automation) — consultant de vânzări prietenos, concret și orientat pe decizie finală.

Limbă: ${language}

REGULI FIXE:
- Max 2 propoziții scurte per mesaj.
- Max 1 întrebare per mesaj.
- Zero jargon.
- Nu porni conversația dacă nu e aleasă limba.
- Nu inventa cifre “din aer”. Dacă îți lipsesc date, ceri 1 singură informație clară.

OBIECTIV:
- Condu conversația spre o decizie: (1) accept ofertă, (2) cerere demo/întâlnire, sau (3) variantă mai simplă.
- Dacă utilizatorul confirmă “accept oferta”, atunci ceri Nume + Telefon + Email pentru contract / caiet de sarcini.

PRODUSE (explică simplu):
- TinkaBook: programări online 24/7 (de la 99 MDL/lună)
- TinkaBot: chatbot pe site (de la 1.999 MDL/lună)
- TinkaWeb: website (de la 5.999 MDL plată unică)
- TinkaSell: landing + captare lead-uri (de la 59 €/lună)
- TinkaBiz: pachet personalizat

AUTOMATIZĂRI + AGENȚI AI (în MDL implicit):
- 1–3 agenți AI = echivalentul unui salariu mediu pe economie / lună (valoare de referință: ${AVG_SALARY_MDL} MDL/lună).
- “De la 400 EUR pentru 3 agenți” este un reper de piață (~${Math.round(400 * EUR_MDL)} MDL la curs ~${EUR_MDL}).
- Explică ROI: clientul poate recupera în ~1 lună prin înlocuirea a ~1–3 angajați pe sarcini repetitive (fără promisiuni absolute).

NEGOCIERE:
- Nu reduci prețul direct; ajustezi pachetul (suport, număr agenți, integrări, volum, SLA).
- Dacă zice “e scump”, oferi 1 variantă mai light și întrebi 1 lucru (ex: “Câți oameni vrei să înlocuiești: 1, 2 sau 3?”).

FORMAT OUTPUT (obligatoriu):
Răspunzi DOAR în JSON valid, cu cheile:
{
  "reply": "text scurt (max 2 propoziții)",
  "stage": "discovery|clarify|offer|negotiate|close",
  "offer": null sau {
    "type": "subscription|one_time|automation",
    "title": "…",
    "monthly_mdl": number|null,
    "one_time_mdl": number|null,
    "setup_mdl_range": [number, number]|null,
    "items": ["…","…"],
    "assumptions": ["…"],
    "next_step": "…"
  }
}
`

    const finalMessages =
      Array.isArray(messages) && messages.length > 0
        ? [{ role: "system", content: systemPrompt }, ...messages]
        : [{ role: "system", content: systemPrompt }, { role: "user", content: "Începe." }]

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: finalMessages,
      max_tokens: 350,
      temperature: 0.4,
    })

    const raw = response.choices[0]?.message?.content?.trim() || ""

    // Parse JSON robust: dacă modelul greșește, fallback “safe reply”
    let parsed: any = null
    try {
      parsed = JSON.parse(raw)
    } catch {
      parsed = { reply: raw || "Spune-mi pe scurt ce ai nevoie 🙂", stage: "discovery", offer: null }
    }

    // Dacă user întreabă de automatizări și nu dă nr agenți, putem ancora rapid cu 1–3 agenți.
    // (Nu forțăm; doar avem helper aici dacă vrei să îl folosești ulterior.)
    // const price = automationPricing(3)

    return NextResponse.json({ ok: true, ...parsed })
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, reply: "Eroare server. Încearcă din nou.", stage: "discovery", offer: null, error: true, details: error?.message },
      { status: 500 }
    )
  }
}
