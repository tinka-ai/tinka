// app/api/chat/route.js
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message required" }), { status: 400 });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      prompt: {
        id: "pmpt_692c1b1b28a08195bbd6a8430b46404a04215f08f30a67fb",
        version: "1"
      },
      input: message,
    });

    return new Response(JSON.stringify({ reply: response.output_text }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
