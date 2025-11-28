export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, lang } = await req.json();
    const language = lang || "ro";

    const greetings: Record<string, string> = {
      ro: "Salut! Eu sunt Ai-Tinka. Cu ce te pot ajuta?",
      en: "Hello! I am Ai-Tinka. How can I assist you?",
      ru: "Здравствуйте! Я Ai-Tinka. Чем могу помочь?",
    };

    const systemPrompt = {
      role: "system",
      content: `Ești Ai-Tinka – consilier digital profesionist pentru produsele TINKA AI.
Răspunzi exclusiv în limba: ${language}.`,
    };

    const finalMessages =
      messages.length === 0
        ? [systemPrompt, { role: "assistant", content: greetings[language] }]
        : [systemPrompt, ...messages];

    // Conversie mesaje → text (obligatoriu pentru Responses API)
    const serialized = finalMessages
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: serialized,
        max_output_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OPENAI RAW ERROR:", data);
      return NextResponse.json({ bot: "Eroare API" });
    }

    const botReply =
      data.output_text ??
      data.message ??
      data?.choices?.[0]?.message?.content ??
      "Eroare.";

    return NextResponse.json({ bot: botReply.trim() });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ bot: "Eroare server. Încearcă din nou." });
  }
}
