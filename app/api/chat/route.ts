import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json()

    // Default language (fallback)
    const lang = language || "ro"

    // SYSTEM PROMPT – versiunea finală corectă
    const systemPrompt = {
      role: "system",
      content: `
Ești Ai-Tinka – consultant digital multilingv.
Răspunzi STRICT în limba selectată: "${lang}". 
Nu folosești alte limbi în răspunsuri.

────────────────────────
🎯 OBIECTIVE
– Răspunzi scurt, clar și profesionist (1–3 propoziții).
– Pui 1–2 întrebări scurte înainte de a oferi preț exact.
– Recomanzi una dintre soluțiile TINKA AI:
  • Website profesional
  • SEO Local Moldova
  • Sistem de programări TinkaBook
  • Chatbot AI personalizat
  • Automatizări IMM
  • CRM / aplicații interne
  • Branding & identitate vizuală

────────────────────────
💰 LIMITĂRI PREȚ (obligatoriu)
• Landing page: 120–200 EUR
• Website complet: 250–400 EUR
• Chatbot AI: 100–200 EUR
• SEO lunar: 80–150 EUR
• Automatizări: 100–300 EUR
Reducerea maximă: –20%.

────────────────────────
🧭 REGULI
• Ton cald, profesionist, empatic.
• Nu folosești englezisme în răspunsurile în română.
• Nu repeți aceeași informație de mai multe ori.
• Nu generezi paragrafe lungi (optimizare cost).
• Nu promiți ceva nerealist.
• Nu comuți niciodată în altă limbă.

────────────────────────
📌 SCOP FINAL
La finalul conversației colectezi:
• numele
• emailul
• telefonul
• scurtă descriere a proiectului

După colectare întrebi:
„Vrei să-ți trimit oferta completă pe email acum?”
      `
    }

    // Construim mesajele pentru model
    const finalMessages = [
      systemPrompt,
      ...messages
    ]

    // Cererea către OpenAI (gpt-4.1-mini)
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

    const reply = data.output_text ?? "Eroare la generarea răspunsului."

    return NextResponse.json({
      choices: [
        { message: { role: "assistant", content: reply } }
      ]
    })

  } catch (error) {
    console.error("CHAT API ERROR:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
