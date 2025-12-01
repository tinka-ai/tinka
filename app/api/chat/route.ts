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
    const { messages, language } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: true, message: "Invalid messages format" }, { status: 400 });
    }

    // 🔥 Instrucțiuni în funcție de limba selectată
    const languageInstruction = {
      ro: "Răspunde exclusiv în limba română, într-un stil politicos, prietenos și profesionist.",
      ru: "Отвечай исключительно на русском языке, вежливо и профессионально.",
      en: "Respond strictly in English, in a helpful, friendly, professional tone."
    }[language || "ro"];

    // 🔥 Construim input-ul pentru Responses API
    const input = [
      {
        role: "system",
        content: `
Tu ești TINKA AI, asistentul digital al companiei TINKA AI Moldova. 
Răspunde într-o manieră clară, profesionistă, concisă.
${languageInstruction}
        `.trim()
      },
      ...messages.map((m: any) => ({
        role: m.role,
        content: m.content
      }))
    ];

    // 🔥 Rulăm asistentul
    const response = await client.responses.create({
      model: "gpt-4o", // model complet și corect
      assistant_id: process.env.TINKA_ASSISTANT_ID!,
      input
    });

    const reply = response.output_text || "Îmi pare rău, nu am putut genera un răspuns.";

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("AI ERROR:", error);

    return NextResponse.json(
      {
        error: true,
        message: "AI failed",
        details: error?.error || error?.message
      },
      { status: 500 }
    );
  }
}
