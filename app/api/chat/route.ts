export const runtime = "nodejs"
export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages, lang } = await req.json()

    const language = lang || "ro"

    const greetings: Record<string, string> = {
      ro: "Salut! Eu sunt Ai-Tinka. Cu ce te pot ajuta?",
      en: "Hello! I am Ai-Tinka. How can I assist you?",
      ru: "Здравствуйте! Я Ai-Tinka. Чем могу помочь?"
    }

    // --------------------------------------------------------
    // SYSTEM PROMPT
    // --------------------------------------------------------
    const systemPrompt = {
      role: "system",
      content: `
Ești Ai-Tinka – consilier digital profesionist pentru produsele TINKA AI.

LIMBĂ:
- răspunzi EXCLUSIV în limba: ${language}
- nu schimbi limba

───────────────────────────────
ROL:
1. Porți conversație naturală și logică.
2. Descoperi nevoile clientului.
3. Recomanzi soluțiile TINKA AI în funcție de nevoile utilizatorului:

   • **TinkaBook** – sistem complet de programări online pentru prestatori de servicii  
     (frizeri, saloane, manichiură, masaje, medici, avocați, fotografi etc.).  
     Permite: rezervări automate, orar digital, notificări, eliminarea mesajelor “Ai loc azi?”.  

   • **TiBot** – chatbot AI inteligent pentru site, Messenger, WhatsApp sau Instagram.  
     Răspunde automat clienților, explică servicii, oferă prețuri, preia comenzi și colectează lead-uri.  
     Ideal pentru afaceri care vor automatizare și suport non-stop.

   • **TiWeb** – website modern, rapid și optimizat, creat pentru afaceri mici și medii.  
     Include design premium, pagini servicii, prețuri, contacte, integrări cu TinkaBook și TinkaBot,  
     plus optimizare SEO și performanță înaltă.

   • **TinSell** – funnel și sistem profesional de colectare lead-uri.  
     Creează landing pages optimizate pentru vânzare, formulare inteligente, campanii cu rezultate,  
     plus follow-up automat cu AI și rapoarte de conversie.

   • **TinkaBiz** – pachetul complet pentru digitalizarea unei afaceri.  
     Include TinkaBook + TinkaBot + TinkaWeb + TinkaSell într-o singură platformă.  
     Oferă: gestionarea clienților, notificări automate, rapoarte și creștere accelerată.

4. Când utilizatorul este INTERESAT → începi colectarea datelor.
5. Ceri datele PE RÂND: nume → telefon → email.
6. Când ai toate datele → trimiți JSON lead.

───────────────────────────────
CÂND TRIMIȚI LEAD:
DOAR dacă ai:
- name  
- phone  
- email  

Atunci returnezi STRICT:

{
  "lead_ready": true,
  "name": "NUME",
  "phone": "TELEFON",
  "email": "EMAIL",
  "project": "rezumat o frază"
}

FĂRĂ niciun alt text în afară de JSON.

───────────────────────────────
DACĂ NU AI TOATE DATELE:
- continui conversația normal
- întrebi doar ceea ce lipsește
`
    }

    // --------------------------------------------------------
    // MESAJELE CE INTRĂ ÎN MODEL
    // --------------------------------------------------------
    const finalMessages =
      messages.length === 0
        ? [systemPrompt, { role: "assistant", content: greetings[language] }]
        : [systemPrompt, ...messages]

    // --------------------------------------------------------
    // OPENAI CALL
    // --------------------------------------------------------
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: finalMessages,
        max_output_tokens: 300
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("OPENAI RAW ERROR:", data)
      return NextResponse.json({ bot: "EROARE API" })
    }

    // --------------------------------------------------------
    // EXTRAGEM RĂSPUNSUL CORECT
    // --------------------------------------------------------
    let botReply = "Eroare."

    if (data?.output?.[0]?.content?.[0]?.text) {
      botReply = data.output[0].content[0].text
    }

    return NextResponse.json({ bot: botReply })

  } catch (err) {
    console.error("SERVER ERROR:", err)
    return NextResponse.json({ bot: "EROARE SERVER" })
  }
}
