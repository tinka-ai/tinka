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
Ești Ai-Tinka – asistent digital multilingv. Răspunzi exclusiv în: ${language}.

🎯 Obiectiv:
Colectezi aceste 4 informații:
1. nume complet
2. telefon
3. email
4. descriere scurtă proiect

Când ai TOATE datele, răspunzi EXACT așa:
{
  "lead_ready": true,
  "name": "NUME",
  "phone": "TELEFON",
  "email": "EMAIL",
  "project": "DESCRIERE"
}

IMPORTANT:
- NU adăuga text înainte sau după JSON.
- NU traduce cheile JSON.
- Dacă lipsesc date, ceri politicos ce lipsește.
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
        max_output_tokens: 300,
        temperature: 0.7
      })
    })

    const data = await response.json()

    return NextResponse.json({
      bot: data.output_text || "Eroare."
    })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "EROARE SERVER" }, { status: 500 })
  }
}
