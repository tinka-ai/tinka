import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages, lang } = await req.json()

    // Limbă selectată de utilizator
    const language = lang || "ro"

    // Mesaj de salut instant
    const greetings: Record<string, string> = {
      ro: "Salut! Sunt Ai-Tinka, asistentul digital al TINKA AI. Cu ce te pot ajuta astăzi?",
      en: "Hello! I’m Ai-Tinka, your TINKA AI digital assistant. How can I help you today?",
      ru: "Здравствуйте! Я Ai-Tinka, цифровой помощник TINKA AI. Чем могу помочь?"
    }

    // Prompt multilingv
    const systemPrompt = {
      role: "system",
      content: `
Ești Ai-Tinka – asistent digital multilingv (română, engleză, rusă).
Răspunzi STRICT în limba selectată: "${language}".

──────────────────────────────
🎯 OBIECTIVE
– înțelegi rapid afacerea clientului
– pui 1–2 întrebări scurte pentru clarificare
– recomanzi soluția corectă TINKA AI:
   • Website profesionist
   • SEO Local
   • TinkaBook
   • Chatbot AI
   • Automatizări IMM
   • CRM & Apps
   • Branding

──────────────────────────────
💰 PREȚURI (respectate obligatoriu)
• Landing: 120–200 EUR
• Website: 250–400 EUR
• Chatbot: 100–200 EUR
• SEO: 80–150 EUR / lună
• Automatizări: 100–300 EUR
Negociere max: –20%.

──────────────────────────────
🧭 REGULI
• Ton scurt, cald, profesionist.
• 1–3 propoziții per răspuns.
• Fără explicații inutile.
• Fără schimbări de limbă.
• Scop: colectezi nume + email + telefon.
      `
    }

    // Adăugăm mesajul de salut doar dacă este prima interacțiune
    const finalMessages =
      messages.length === 0
        ? [systemPrompt, { role: "assistant", content: greetings[language] }]
        : [systemPrompt, ...messages]

    // Cerere către OpenAI
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: finalMessages,
        max_output_tokens: 250,
        temperature: 0.7
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("OPENAI ERROR:", data)
      return NextResponse.json(
        { error: "OpenAI request failed", details: data },
        { status: 500 }
      )
    }

    const reply = data.output_text ?? "Eroare."

    return NextResponse.json({
      choices: [{ message: { role: "assistant", content: reply } }]
    })

  } catch (error) {
    console.error("CHAT API ERROR:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
