// app/api/chat/route.ts
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Message required" }, { status: 400 });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      prompt: {
        id: "pmpt_692c1b1b28a08195bbd6a8430b46404a04215f08f30a67fb",
        version: "1",
      },
      input: message,
    });

    return Response.json({ reply: response.output_text });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
