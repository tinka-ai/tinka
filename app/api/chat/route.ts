// app/api/chat/route.ts
import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

export async function POST(req: Request) {
  try {
    // ✅ Widget-ul trimite { messages, lang }
    const { messages, lang } = await req.json()
    const language = lang || "ro"

    console.log("📥 Received:", { messagesCount: messages?.length, language })

    const greetings: Record<string, string> = {
      ro: "Salut! Eu sunt Ai-Tinka. Cu ce te pot ajuta?",
      en: "Hello! I am Ai-Tinka. How can I assist you?",
      ru: "Здравствуйте! Я Ai-Tinka. Чем могу помочь?"
    }

    const systemPrompt = `Ești Ai-Tinka – consilier digital profesionist pentru produsele TINKA AI.

Limbă: răspunde DOAR în limba ${language}.

ROL: Consultant de vânzări empatic și profesionist.

STRUCTURĂ CONVERSAȚIE:
1. EXPLORARE - pui întrebări despre afacerea lor (UNA singură pe răspuns)
2. CLARIFICARE - rezumi ce ai înțeles
3. SOLUȚII - recomanzi TinkaBook/TinkaBot/TinkaWeb/TinkaSell/TinkaBiz
4. PREȚ - prezinți și negociezi
5. DATE - ceri nume, telefon, email (DOAR după acceptare, UNA CÂTE UNA)

REGULI IMPORTANTE:
- Răspunde FOARTE SCURT (maxim 2 propoziții)
- Nu ceri contact prea repede
- Pui DOAR 1 întrebare pe răspuns
- Ești calm, empatic, profesionist
- Dacă user spune "salut", întreabă ce afacere are`

    const finalMessages =
      messages.length === 0
        ? [
            { role: "system", content: systemPrompt },
            { role: "assistant", content: greetings[language] }
          ]
        : [{ role: "system", content: systemPrompt }, ...messages]

    console.log("📤 Calling OpenAI chat.completions.create")

    // ✅ FOLOSIM API-UL STANDARD CARE CHIAR EXISTĂ
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: finalMessages,
      max_tokens: 300,
      temperature: 0.7
    })

    const botReply = response.choices[0]?.message?.content || "Eroare răspuns"

    console.log("✅ OpenAI Success:", botReply.substring(0, 80))

    // ✅ Widget-ul așteaptă { bot: "..." }
    return NextResponse.json({ bot: botReply })

  } catch (error: any) {
    console.error("❌ AI ERROR:", error)
    console.error("❌ ERROR MESSAGE:", error?.message)
    
    return NextResponse.json(
      {
        bot: language === "ro" 
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
