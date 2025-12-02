// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, language } = await req.json();

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      prompt: {
        id: process.env.TINKA_PROMPT_ID!,   // 👈 AICI e noul sistem
        version: "1"
      },
      input: message
    });

    return NextResponse.json({
      reply: response.output_text ?? "Nu am reușit să generez un răspuns.",
    });

  } catch (error: any) {
    console.error("AI ERROR:", error);
    return NextResponse.json(
      {
        error: true,
        message: "AI failed",
        details: error?.response ?? error?.message,
      },
      { status: 500 }
    );
  }
}
