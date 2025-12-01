// app/api/chat/route.ts
import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  defaultHeaders: {
    "OpenAI-Beta": "assistants=v2"
  }
})

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json()

    // Convertim istoricul în format Responses API
    const formatted = messages.map((m: any) => ({
      role: m.role,
      content: m.content
    }))

    const response = await client.responses.create({
      model: "gpt-4o",
      assistant_id: process.env.TINKA_ASSISTANT_ID!,
      input: [
        {
          role: "system",
          content: `User selected language: ${language}. You must ALWAYS respond in that language.`
        },
        ...formatted
      ]
    })

    return NextResponse.json({
      reply: response.output_text
    })

  } catch (error: any) {
    console.error("AI ERROR:", error)

    return NextResponse.json(
      {
        error: true,
        message: "AI failed",
        details: error?.response ?? error?.message
      },
      { status: 500 }
    )
  }
}
