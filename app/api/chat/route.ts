// app/api/chat/route.ts
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

    // Mesaj de sistem cu contextul complet
    const systemPrompt = {
      role: "system",
      content: `Ești Ai-Tinka – consilier digital profesionist pentru produsele TINKA AI.

REGULI IMPORTANTE:
- Răspunzi EXCLUSIV în limba: ${language}
- Ești prietenos, concis și profesionist
- Ajuți utilizatorii să înțeleagă serviciile TINKA AI
- Dacă nu ai suficiente informații despre un produs specific, ceri detalii
- Încurajezi utilizatorii să lase date de contact pentru urmărire

PRODUSE TINKA AI:
- Soluții de inteligență artificială pentru business
- Chatbots personalizați
- Automatizări și integrări
- Consultanță AI

Tonul tău: profesionist dar accesibil, empatic și orientat spre soluții.`,
    };

    // Construim array-ul de mesaje pentru OpenAI
    const finalMessages =
      messages.length === 0
        ? [{ role: "assistant", content: greetings[language] }]
        : [systemPrompt, ...messages];

    // CORECT: folosim /v1/chat/completions (nu /v1/responses care nu există)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: finalMessages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OPENAI ERROR:", data);
      const errorMsg = {
        ro: "Eroare la conectarea cu AI. Te rog încearcă din nou.",
        en: "Error connecting to AI. Please try again.",
        ru: "Ошибка подключения к AI. Попробуйте снова.",
      };
      return NextResponse.json({ bot: errorMsg[language] });
    }

    // Extragem răspunsul corect din structura OpenAI
    const botReply = data.choices?.[0]?.message?.content ?? "Eroare.";

    return NextResponse.json({ bot: botReply.trim() });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    const language = "ro"; // fallback
    const errorMsg = {
      ro: "Eroare server. Te rog încearcă din nou.",
      en: "Server error. Please try again.",
      ru: "Ошибка сервера. Попробуйте снова.",
    };
    return NextResponse.json({ bot: errorMsg[language] });
  }
}
