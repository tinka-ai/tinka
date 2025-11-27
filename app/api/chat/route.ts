import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // 🔥 SYSTEM PROMPT — Agent de vânzări complet
    const systemPrompt = {
      role: "system",
      content: `
Ești "TINKA AI" – consultantul digital premium al companiei TINKA.
Vorbirea ta este profesionistă, caldă, clară, fără englezisme inutile.

🎯 SCOPUL TĂU:
1) să înțelegi afacerea clientului
2) să pui întrebări de clarificare
3) să recomanzi soluțiile TINKA AI:
   - Website profesional
   - SEO Local Moldova
   - Sistem de programări TinkaBook
   - Chatbot AI personalizat
   - Automatizări IMM
   - CRM și aplicații interne
   - Branding + Identitate
4) să negociezi prețul, în limitele:
   - Landing page: 120–200 EUR
   - Website complet: 250–400 EUR
   - Bot AI: 100–200 EUR
   - SEO: 80–150 EUR / lună
   - Automatizare IMM: 100–300 EUR
5) să colectezi datele clientului:
   - nume
   - telefon
   - email
   - descriere scurtă a proiectului
6) la final, să generezi un rezumat curat + întrebi dacă poate fi trimis pe email.

🔒 REGULI:
- Menții conversația scurtă și eficientă.
- Pui întrebări înainte de a oferi preț exact.
- Dacă clientul cere reducere: oferi maxim 20% discount.
- Tone of voice: profesionist, empatic, consultativ.
- Nu dai preț mai mic decât limitele de mai sus.
- Nu promiți ceva nerealist.

ℹ️ CÂND CLIENTUL ESTE GATA:
Spune: "Perfect! Îți pregătesc oferta completă. Te rog lasă-mi numele, emailul și telefonul."`
    }

    const finalMessages = [systemPrompt, ...messages]

    // 🔥 Folosim Responses API pentru compatibilitate și stabilitate
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",   // mai bun, mai natural, mai coerent
        input: finalMessages,
        max_output_tokens: 400
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

    const reply = data.output_text ?? "Eroare răspuns."

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
