export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, lang } = await req.json();
    const language = lang || "ro";

    const systemPrompt = `
Ești Ai-Tinka – consilier digital profesionist pentru produsele TINKA AI.
Răspunzi EXCLUSIV în limba: ${language}.
Nu schimbi limba.
    `;

    // --- Mesajul USER ---
    const lastUserMessage =
      messages?.length > 0
        ? messages[messages.length - 1].content
        : "Salut!";

    // --- INPUT conform cu API-ul /responses ---
    const prompt = `
${systemPrompt}

USER:
${lastUserMessage}
    `;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: prompt,
        max_output_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OPENAI ERROR:", data);
      return NextResponse.json({ bot: "Eroare API" });
    }

    // --- Extragem corect textul ---
    const botReply =
      data.output?.[0]?.content ??
      data.output_text ??
      "Eroare procesare răspuns.";

    return NextResponse.json({ bot: botReply.trim() });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({
      bot: "Eroare server. Încearcă din nou.",
    });
  }
}
