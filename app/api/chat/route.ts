// app/api/chat/route.ts
import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

export async function POST(req: Request) {
  try {
    const { messages, lang } = await req.json()
    const language = lang || "ro"

    const systemPrompt = `Ești Ai-Tinka – consilier digital profesionist pentru TINKA AI.

Răspunzi în limba: ${language}.
Ești empatic, profesionist și pui întrebări naturale.

STRUCTURA:
1. EXPLORARE - înțelegi afacerea
2. CLARIFICARE - rezumi
3. SOLUȚII - recomanzi produse TINKA
4. PREȚ - negociezi
5. DATE - ceri contact (după acceptare)
6. CONFIRMARE`

    const finalMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ]

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: finalMessages,
      max_tokens: 500,
      temperature: 0.8
    })

    const botReply = response.choices[0]?.message?.content || "Eroare"

    return NextResponse.json({ bot: botReply })

  } catch (error: any) {
    console.error("AI ERROR:", error)
    return NextResponse.json(
      { bot: "Eroare server", error: true },
      { status: 500 }
    )
  }
}
