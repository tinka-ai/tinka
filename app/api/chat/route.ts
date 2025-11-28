export const runtime = "nodejs"
export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // 🔥 DEBUG: verificăm dacă Netlify încarcă cheia
    console.log("DEBUG OPENAI KEY:", process.env.OPENAI_API_KEY ? "LOADED" : "UNDEFINED")

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

────────── STRATEGIE DE CONVERSAȚIE ──────────
FAZA 1 — EXPLORARE (întrebări naturale, una câte una)
FAZA 2 — CLARIFICARE (rezumi și ceri confirmare)
FAZA 3 — SOLUȚII (TinkaBook, TinkaBot, TinkaWeb, TinkaSell, TinkaBiz)
FAZA 4 — PREȚ & NEGOCIERE
FAZA 5 — DATE CONTACT (numai DUPĂ ACCEPTARE)
FAZA 6 — GENERARE LEAD

Reguli:
– nu ceri date prea repede  
– nu pui 2 întrebări în același mesaj  
– te porți natural, empatic, profesionist
`
    }

    const finalMessages =
      messages.length === 0
        ? [systemPrompt, { role: "assistant", content: greetings[language] }]
        : [systemPrompt, ...messages]

    // 🔥 CORECP → Unified Completions API
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: finalMessages,
        max_output_tokens: 300,
        temperature: 0.7
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("OPENAI RAW ERROR:", data)
      return NextResponse.json({
        bot:
          language === "ro"
            ? "Eroare API"
            : language === "ru"
            ? "Ошибка API"
            : "API Error"
      })
    }

    // 🔥 Parsare CORECTĂ după noul API
    const botReply =
      data.output_text ??
      data.message ??
      data?.choices?.[0]?.message?.content ??
      "Eroare."

    return NextResponse.json({ bot: botReply.trim() })
  } catch (err) {
    console.error("SERVER ERROR:", err)
    return NextResponse.json({
      bot: "Eroare server. Încearcă din nou."
    })
  }
}
