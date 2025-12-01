// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // cheia ta de proiect
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 1) Creăm un thread nou cu mesajul utilizatorului
    const thread = await client.beta.threads.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    // 2) Pornim un run al asistentului tău pe acest thread
    let run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.TINKA_ASSISTANT_ID!, // asst_...
    });

    // 3) Așteptăm până se termină
    while (run.status === "queued" || run.status === "in_progress") {
      await new Promise((res) => setTimeout(res, 1000));
      run = await client.beta.threads.runs.retrieve(thread.id, run.id);
    }

    if (run.status !== "completed") {
      throw new Error(`Run failed with status: ${run.status}`);
    }

    // 4) Luăm ultimul mesaj al asistentului din thread
    const messages = await client.beta.threads.messages.list(thread.id, {
      order: "desc",
      limit: 1,
    });

    const lastMessage = messages.data[0];
    const textPart = lastMessage?.content.find((c) => c.type === "text");
    const reply =
      textPart?.text?.value ||
      "Îmi pare rău, nu am reușit să generez un răspuns.";

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


export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      assistant_id: process.env.TINKA_ASSISTANT_ID!,
      input: message,
      extra_headers: {
        "OpenAI-Beta": "assistants=v2"
      }
    });

    const output = response.output_text || "Îmi pare rău, nu am reușit să generez un răspuns.";

    return NextResponse.json({ reply: output });
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
