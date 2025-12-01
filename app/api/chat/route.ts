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
    const { message } = await req.json();

    const response = await client.responses.create({
      model: "gpt-4o",
      assistant_id: process.env.TINKA_ASSISTANT_ID!,
      input: message
    });

    return NextResponse.json({
      reply: response.output_text ?? "Îmi pare rău, nu am reușit să generez un răspuns."
    });

  } catch (error: any) {
    console.error("AI ERROR:", error);

    return NextResponse.json(
      {
        error: true,
        message: "AI failed",
        details: error?.response ?? error?.message
      },
      { status: 500 }
    );
  }
}
