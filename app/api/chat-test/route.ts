import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "test" }]
      })
    })

    const data = await response.json()

    return NextResponse.json({ openai_raw: data }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: "Internal error", details: e }, { status: 500 })
  }
}
