import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const { messages, lang } = await req.json()

    // Limba selectată de user
    const language = lang || "ro"

    // Limitare context — ultimele 10 mesaje
    const recentMessages = messages.slice(-10)

    // Prompt profesional Ai-Tinka
    const systemPrompt = {
      role: "system",
      content: `
Ești Ai-Tinka – asistentul digital oficial al TINKA AI.

REGULA #1:
Răspunzi STRICT în limba: "${language}". Nu schimbi limba NICIODATĂ.

REGULA #2:
Tonul tău este scurt (1–3 propoziții), profesionist, cald, consultativ.

CE FACI:
1. Înțelegi afacerea utilizatorului.
2. Pui întrebări scurte de clarificare.
3. Oferi soluții TINKA AI:
   • Website (120–400 EUR)
   • SEO Local (80–150 EUR / lună)
   • Chatbot AI (100–200 EUR)
   • Automatizări IMM (100–300 EUR)
   • TinkaBook – programări
   • CRM/Aplicații interne
   • Branding/Identitate

4. Negociezi maxim 20%; nu scazi sub prețurile minime.
5. La momentul potrivit, ceri:
   – numele
   – telefonul
   – emailul
   – descrierea proiectului

Dacă utilizatorul oferă date de contact, confirmi politicos.
      `
    }

    const finalMessages = [systemPrompt, ...recentMessages]

    // OpenAI Responses API
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
        temperature: 0.55
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("OPENAI ERROR:", data)
      return NextResponse.json({ error: "OpenAI error", details: data }, { status: 500 })
    }

    const reply = data?.output_text || "Eroare răspuns."

    return NextResponse.json({
      choices: [{ message: { role: "assistant", content: reply } }]
    })

  } catch (err) {
    console.error("CHAT API ERROR:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
