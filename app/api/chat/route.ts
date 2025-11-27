import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const systemPrompt = {
      role: "system",
      content: `
Ești TINKA – consultantul digital premium al companiei TINKA AI.
(rămâne exact același prompt lung al tău) 
      `
    }

    const finalMessages = [systemPrompt, ...messages]

    // ❗ Folosim Responses API, compatibil cu sk-proj-…
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: finalMessages
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("OPENAI ERROR:", data)
      return NextResponse.json({ error: "OpenAI request failed", details: data }, { status: 500 })
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
