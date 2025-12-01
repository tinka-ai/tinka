// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  defaultHeaders: {
    "OpenAI-Beta": "assistants=v2"
  }
});

export async function POST(req: Request) {
  try {
    // frontend trimite: { messages: [...], language }
    const { messages, language } = await req.json();

    // Convertim mesajele în formatul cerut de Responses API
    const inputMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.content
    }));

    const response = await client.responses.create({
      model: "gpt-4o",
      assistant_id: process.env.TINKA_ASSISTANT_ID!,
      input: [
        ...inputMessages,
        {
          role: "user",
          content: `User language=${language}. Continue conversation in this language.`
        }
      ]
    });

    // Responses API returnează textul în output_text
    const reply =
      response.output_text ||
      "Îmi pare rău, nu pot genera un răspuns în acest moment.";

    return NextResponse.json({
      reply
    });

  } catch (error: any) {
    console.error("AI ERROR:", error);

    return NextResponse.json(
      {
        error: true,
        message: "AI failed",
        details: error?.response || error?.message
      },
      { status: 500 }
    );
  }
}
