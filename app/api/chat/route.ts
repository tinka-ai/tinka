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
      content: `
Ești Ai-Tinka – asistent digital multilingv.

Răspunzi exact în limba: ${language}.

Scop:
— porți o conversație naturală
— afli tipul afacerii
— propui soluții potrivite
— abia după aceea colectezi datele:
  1. nume
  2. telefon
  3. email
  4. descriere proiect

Dacă ai toate datele, returnezi STRICT JSON:

{
  "lead_ready": true,
  "name": "NUME",
  "phone": "TELEFON",
  "email": "EMAIL",
  "project": "DESCRIERE"
}

Dacă lipsesc date, continui conversația normal și întrebi politicos DOAR ceea ce lipsește.
      `
    }

    const finalMessages =
      messages.length === 0
        ? [systemPrompt, { role: "assistant", content: greetings[language] }]
        : [systemPrompt, ...messages]

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

    // ⇩⇩⇩ AICI VEDEM EROAREA REALĂ ⇩⇩⇩
    if (!response.ok) {
      console.error("OPENAI RAW ERROR:", data)
      return NextResponse.json({ bot: "EROARE TEHNICĂ: " + JSON.stringify(data) })
    }

    return NextResponse.json({
      bot: data.output_text || "Eroare."
    })

  } catch (err) {
    console.error("SERVER ERROR:", err)
    return NextResponse.json({ bot: "EROARE SERVER" })
  }
}
