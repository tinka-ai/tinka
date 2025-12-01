// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  defaultHeaders: {
    "OpenAI-Beta": "assistants=v2",
  },
});

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: true, message: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Construim un "transcript" simplu din conversație
    const transcript = messages
      .map((m: any) =>
        m.role === "user"
          ? `CLIENT: ${m.content}`
          : `AITINKA: ${m.content}`
      )
      .join("\n");

    const langHint =
      language === "ru"
        ? "User interface language: Russian. Answer strictly in Russian."
        : language === "en"
        ? "User interface language: English. Answer strictly in English."
        : "User interface language: Romanian. Answer strictly in Romanian.";

    const prompt = `
${langHint}

Below is the conversation so far between CLIENT and AITINKA (digital consultant of TINKA AI from Moldova).
Continue the conversation as AiTinka, following your system instructions from the assistant configuration.

${transcript}

Now respond as AiTinka with the next reply only.
`.trim();

    const response = await client.responses.create({
      assistant_id: process.env.TINKA_ASSISTANT_ID!,
      input: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply =
      (response as any).output_text ||
      "Îmi pare rău, nu pot genera un răspuns în acest moment.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("AI ERROR:", error);

    return NextResponse.json(
      {
        error: true,
        message: "AI failed",
        details: error?.error || error?.message,
      },
      { status: 500 }
    );
  }
}
