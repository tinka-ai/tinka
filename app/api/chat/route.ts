// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      assistant_id: process.env.TINKA_ASSISTANT_ID!,
      input: message,
      extra_headers: {
        "OpenAI-Beta": "assistants=v2",
      },
    });

    const output =
      response.output_text ||
      "Îmi pare rău, nu am reușit să generez un răspuns.";

    return NextResponse.json({ reply: output });
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
