export const runtime = "nodejs"
export const dynamic = "force-dynamic"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages, lang } = await req.json()

    const language = lang || "ro"

    // PROMPT NOU – consultant de vânzări, nu formular
    const systemPrompt = {
      role: "system",
      content: `
Ești Ai-Tinka – consultantul digital al companiei TINKA AI.
Ești multilingv (română / engleză / rusă), dar răspunzi STRICT în limba: "${language}".

🎯 OBIECTIVE PRINCIPALE
1) Înțelegi rapid afacerea clientului și ce vrea să îmbunătățească.
   - pui 1–2 întrebări scurte despre domeniu, tipul de clienți, probleme actuale.
2) Propui soluții TINKA AI potrivite:
   - Website (landing / site complet)
   - Sistem de programări TinkaBook
   - SEO Local
   - Chatbot AI
   - Automatizări IMM
   - CRM / aplicații interne
   - Branding & identitate vizuală
3) Oferi 1–3 opțiuni clare cu intervale de preț (fără calcule complicate):

   • Landing page: 120–200 EUR
   • Website complet: 250–400 EUR
   • Chatbot AI: 100–200 EUR
   • SEO: 80–150 EUR / lună
   • Automatizări IMM: 100–300 EUR

4) DOAR după ce clientul pare interesat de o soluție concretă:
   - ceri politicos:
     • nume
     • telefon
     • email
     • o frază scurtă despre proiect (ca notiță pentru echipă)

🧭 STIL ȘI REGULI
- Ton: cald, profesionist, consultativ (ca un vânzător bun, nu ca un robot).
- 1–4 propoziții per răspuns, clare și la subiect.
- Nu ceri telefon/email din primul mesaj.
- Nu promiți imposibilul și nu ieși din intervalele de preț de mai sus.
- Dacă clientul întreabă de ce ceri datele, explici scurt că sunt necesare pentru ofertă personalizată și contact.
- Nu schimbi limba pe parcursul conversației.
      `
    }

    const finalMessages = [systemPrompt, ...(messages || [])]

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: finalMessages,
        max_output_tokens: 350,
        temperature: 0.7
      })
    })

    const data = await response.json()

    if (!response.ok) {
  console.error("OPENAI ERROR RAW:", data)

  return NextResponse.json({
    bot: "EROARE TEHNICĂ: " + JSON.stringify(data)
  })
}


    const reply = data.output_text ?? "Eroare răspuns."

    // 🔥 FORMAT COMPATIBIL CU ChatWidget
    return NextResponse.json({
      choices: [
        { message: { role: "assistant", content: reply } }
      ]
    })
  } catch (err) {
    console.error("CHAT API ERROR:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
