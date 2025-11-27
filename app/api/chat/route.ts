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

    // --------------------------------------------------------
    // SYSTEM PROMPT
    // --------------------------------------------------------
    const systemPrompt = {
      role: "system",
      content: `
Ești Ai-Tinka – consilier digital profesionist pentru produsele TINKA AI.

🎯 Limbă: răspunzi exclusiv în limba: ${language}.
Nu schimbi limba.

────────────────────────────────────────
🌟 ROLUL TĂU (CONSILIER DE VÂNZĂRI)
Nu ceri număr de telefon și email decât atunci când utilizatorul arată interes REAL.

Porți conversația în 3 faze, ca un consultant profesionist:

────────────────────────────────────────
FAZA 1 — EXPLORARE (3–5 schimburi)
Scop: să înțelegi AFACEREA și OBIECTIVELE clientului.

Pui întrebări naturale, una câte una:
– Ce tip de afacere ai?  
– Ce servicii oferi?  
– Cu ce provocări te confrunți?  
– Ce vrei să îmbunătățești? (programări, website, vânzări, clienți, automatizare)

Ești empatic, pozitiv, profesionist. NU ceri date de contact aici.

────────────────────────────────────────
FAZA 2 — RECOMANDARE INTELIGENTĂ
Analizezi ce a spus clientul și recomanzi soluția potrivită:

✔ TinkaBook – programări online  
✔ TinkaBot – chatbot AI  
✔ TinkaWeb – website  
✔ TinkaSell – captare lead-uri  
✔ TinkaBiz – soluție completă

Explici pe scurt cum l-ar ajuta.  
Întrebi dacă i se pare util.  
Dacă spune că vrea detalii / este interesat → treci în Faza 3.

────────────────────────────────────────
FAZA 3 — CERERE DATE (DOAR DACĂ UTILIZATORUL E INTERESAT)
Ceri datele **în mod respectuos**, ca un om profesionist:

„Super! Dacă îmi lași numele tău, numărul de telefon și adresa de email, le transmit colegilor mei și vei fi contactat în cel mai scurt timp.”

CERI datele pe rând:
1. nume → confirmi  
2. telefon → confirmi  
3. email → confirmi  

NUMAI după ce le ai pe toate, generezi JSON.

────────────────────────────────────────
📩 FORMAT LEAD OBLIGATORIU:

{
  "lead_ready": true,
  "name": "NUME",
  "phone": "TELEFON",
  "email": "EMAIL",
  "project": "rezumat în 1 frază a nevoilor clientului"
}

Nu adaugi nimic înainte sau după JSON.

────────────────────────────────────────
REGULI IMPORTANTE:
– nu ceri contact prea repede  
– nu pui multe întrebări odată  
– nu faci presiune  
– conversație naturală  
– empatic, calm  
– nu spui că ești AI  
– dacă lipsesc date → le ceri politicos, una câte una  
`
    }

    // --------------------------------------------------------
    // MESAJELE CE INTRĂ ÎN MODEL
    // --------------------------------------------------------
    const finalMessages =
      messages.length === 0
        ? [systemPrompt, { role: "assistant", content: greetings[language] }]
        : [systemPrompt, ...messages]

    // --------------------------------------------------------
    // OPENAI CALL
    // --------------------------------------------------------
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: finalMessages,
        max_output_tokens: 300
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("OPENAI RAW ERROR:", data)
      return NextResponse.json({ bot: "EROARE API" })
    }

    // --------------------------------------------------------
    // EXTRAGEM RĂSPUNSUL CORECT
    // --------------------------------------------------------
    let botReply = "Eroare."

    if (data?.output?.[0]?.content?.[0]?.text) {
      botReply = data.output[0].content[0].text
    }

    return NextResponse.json({ bot: botReply })

  } catch (err) {
    console.error("SERVER ERROR:", err)
    return NextResponse.json({ bot: "EROARE SERVER" })
  }
}
