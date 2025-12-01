// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { thread_id, message } = await req.json();

  try {
    // 1. Thread
    const thread = thread_id
      ? { id: thread_id }
      : await client.beta.threads.create();

    // 2. mesajul userului
    await client.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    // 3. Assistantul AiTinka
    const run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: "asst_VqzRBO3gzxzAf3M51t25PgQn", 
    });

    // 4. Așteptăm răspunsul
    let completed;
    while (!completed) {
      const check = await client.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
      if (check.status === "completed") {
        completed = true;
      } else {
        await new Promise((res) => setTimeout(res, 1000));
      }
    }

    // 5. Luăm mesajul
    const messages = await client.beta.threads.messages.list(thread.id);
    const last = messages.data[0].content[0].text.value;

    return NextResponse.json({
      reply: last,
      thread_id: thread.id,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
