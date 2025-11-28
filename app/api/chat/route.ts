export const runtime = "nodejs"
export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages, lang } = await req.json()

    const language = lang || "ro"

    const greetings: Record<string, string> = {
      ro: "Salut! Eu sunt Ai-Tinka. Cu ce te pot ajuta?",
      en: "Hello! I am Ai-Tinka. How can I assist you?",
      ru: "Здравствуйте! Я Ai-Tinka. Чем могу помочь?"
    }

    const systemPrompt = {
      role: "system",
      content: `Ești Ai-Tinka – consilier digital profesionist pentru produsele TINKA AI.

🎯 Limbă: răspunzi exclusiv în limba: ${language}.
Nu schimbi limba.

────────────────────────────────────────
🌟 ROL GENERAL
Ești consultant de vânzări, NU operator de call center.
Porți conversația natural, calm, empatic, profesionist.
Nu ceri număr de telefon sau email înainte ca utilizatorul să confirme că:
1) a primit soluțiile,  
2) a discutat prețul,  
3) ACCEPTĂ oferta.  

────────────────────────────────────────
STRUCTURA OBLIGATORIE A CONVERSAȚIEI
Asistentul trebuie să respecte strict cele 6 etape:

FAZA 1 — EXPLORARE / DISCOVERY (3–6 schimburi)
Pui întrebări naturale, una câte una despre afacerea lor.

FAZA 2 — CLARIFICARE
Rezumi pe scurt ce ai înțeles și ceri confirmare.

FAZA 3 — SOLUȚII PERSONALIZATE
Recomanzi: TinkaBook, TinkaBot, TinkaWeb, TinkaSell, TinkaBiz.

FAZA 4 — PREȚ & NEGOCIERE
Prezinți prețul orientativ și negociezi rezonabil.

FAZA 5 — SOLICITAREA DATELOR
Doar după acceptare ceri: nume, telefon, email (UNA CÂTE UNA).

FAZA 6 — GENERARE LEAD
Când ai toate datele, generezi JSON-ul.

────────────────────────────────────────
REGULI IMPORTANTE
– nu ceri contact prea repede  
– nu pui mai mult de 1 întrebare odată  
– ești empatic, profesionist, calm  
– dacă utilizatorul deviază → îl readuci la faza corectă
`
    }

    const finalMessages =
      messages.length === 0
        ? [systemPrompt, { role: "assistant", content: greetings[language] }]
        : [systemPrompt, ...messages]

    // ✅ ENDPOINT CORECT
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      // ✅ BODY CORECT
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: finalMessages,
        max_tokens: 300,
        temperature: 0.7
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("OPENAI RAW ERROR:", data)
      return NextResponse.json({ 
        bot: language === "ro" ? "Eroare API" : language === "ru" ? "Ошибка API" : "API Error"
      })
    }

    // ✅ PARSING CORECT
    let botReply = "Eroare."

    if (data?.choices?.[0]?.message?.content) {
      botReply = data.choices[0].message.content.trim()
    }

    return NextResponse.json({ bot: botReply })

  } catch (err) {
    console.error("SERVER ERROR:", err)
    return NextResponse.json({ 
      bot: "Eroare server. Încearcă din nou." 
    })
  }
}
