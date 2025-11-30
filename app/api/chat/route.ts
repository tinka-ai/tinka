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

    // Verifică dacă există API key
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set");
      return NextResponse.json({
        bot: "DEBUG: API key not found in environment",
      });
    }

    console.log("=== CALLING OPENAI ===");
    console.log("Model: gpt-4o-mini");
    console.log("Messages count:", finalMessages.length);

    // Apel către OpenAI
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
      console.error("=== OPENAI ERROR ===");
      console.error("Status:", response.status);
      console.error("Response:", JSON.stringify(data, null, 2));
      
      // RETURNEAZĂ EROAREA EXACTĂ (pentru debug)
      return NextResponse.json({ 
        bot: `🔍 DEBUG ERROR:\n\nStatus: ${response.status}\n\nDetalii: ${JSON.stringify(data, null, 2)}`
      });
    }

    console.log("=== OPENAI SUCCESS ===");

    // Extragem răspunsul corect din structura OpenAI
    const botReply = data.choices?.[0]?.message?.content ?? "Eroare.";

    return NextResponse.json({ bot: botReply.trim() });
  } catch (err: any) {
    console.error("=== SERVER ERROR ===");
    console.error("Error:", err);
    
    return NextResponse.json({ 
      bot: `🔍 DEBUG SERVER ERROR:\n\n${err.message}`
    });
  }
}
