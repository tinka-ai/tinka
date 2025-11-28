export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("DEBUG OPENAI KEY LOADED =>", !!process.env.OPENAI_API_KEY);

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

🎯 Limbă: răspunzi exclusiv în limba: ${language}.
Nu schimbi limba.

────────── STRATEGIE DE CONVERSAȚIE ──────────
FAZA 1 — EXPLORARE
FAZA 2 — CLARIFICARE
FAZA 3 — SOLUȚII
FAZA 4 — PREȚ & NEGOCIERE
FAZA 5 — DATE CONTACT (DOAR DUPĂ ACORDUL CLIENTULUI)
FAZA 6 — GENERARE LEAD
`
    };

    const finalMessages =
      messages.length === 0
        ? [systemPrompt, { role: "assistant", content: greetings[language] }]
        : [systemPrompt, ...messages];

    // --- OpenAI Unified API ---
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: finalMessages,
        max_output_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OPENAI RAW ERROR:", data);
      return NextResponse.json({
        bot:
          language === "ro"
            ? "Eroare API"
            : language === "ru"
            ? "Ошибка API"
            : "API Error",
      });
    }

    const botReply =
      data.output_text ??
      data.message ??
      data?.choices?.[0]?.message?.content ??
      "Eroare.";

    return NextResponse.json({ bot: botReply.trim() });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({
      bot: "Eroare server. Încearcă din nou.",
    });
  }
}
