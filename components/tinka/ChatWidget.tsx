"use client"

import { useEffect, useState, useRef } from "react"
import { Send, X, Globe } from "lucide-react"
import TinkaAvatar from "@/components/tinka/TinkaAvatar"

const sendSound =
  "data:audio/mp3;base64,SUQzAwAAAAAAF1RTU0UAAAAPAAADTGF2ZjU2LjI0LjEwMAAAAAAAAAAAAAAA//tQxAADB..."
const receiveSound =
  "data:audio/mp3;base64,SUQzAwAAAAAAF1RTU0UAAAAPAAADTGF2ZjU2LjI0LjEwMAAAAAAAAAAAAAAA//tQxAADB..."

type Lang = "ro" | "ru" | "en"

// Text de consimțământ (bifă) afișat înainte de a trimite datele mai departe.
// Colectăm strict minimul necesar: emailul e obligatoriu, nume/telefon doar dacă
// utilizatorul le-a oferit singur în conversație.
const CONSENT_TEXT: Record<
  Lang,
  { title: string; note: string; checkbox: string; confirm: string; cancel: string; sent: string }
> = {
  ro: {
    title: "Confirmă trimiterea",
    note: "Trimitem către TINKA AI doar datele minime necesare pentru a reveni cu oferta. Nu sunt partajate cu terți.",
    checkbox: "Sunt de acord cu prelucrarea datelor de mai sus pentru a primi oferta solicitată.",
    confirm: "Trimite",
    cancel: "Renunță",
    sent: "✅ Trimis! Revenim cât mai curând, inclusiv pe email.",
  },
  ru: {
    title: "Подтвердите отправку",
    note: "Мы отправим TINKA AI только минимум данных, необходимых для ответа с предложением. Данные не передаются третьим лицам.",
    checkbox: "Я согласен на обработку указанных данных для получения предложения.",
    confirm: "Отправить",
    cancel: "Отмена",
    sent: "✅ Отправлено! Скоро ответим, в том числе на email.",
  },
  en: {
    title: "Confirm sending",
    note: "We'll send TINKA AI only the minimum data needed to follow up with a quote. Not shared with third parties.",
    checkbox: "I agree to the processing of the above data to receive the requested quote.",
    confirm: "Send",
    cancel: "Cancel",
    sent: "✅ Sent! We'll get back to you soon, including by email.",
  },
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState<Lang | null>(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [typing, setTyping] = useState(false)
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [pendingLead, setPendingLead] = useState<any | null>(null)
  const [consentChecked, setConsentChecked] = useState(false)
  const [leadSending, setLeadSending] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, typing, showLanguageSelector, pendingLead])

  // ✅ AUTOSTART - se deschide automat după 2 secunde
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true)

      // ✅ 1) Mesaj de salut (fix cum ai cerut)
      setMessages([
        {
          role: "assistant",
          content: "Salut! 👋 Eu sunt Tinka AI, asistentul tău digital."
        }
      ])

      // ✅ 2) Apoi arată selector limbă
      setTimeout(() => {
        setShowLanguageSelector(true)
      }, 900)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const playSound = (src: string) => {
    const audio = new Audio(src)
    audio.volume = 0.35
    audio.play().catch(() => {})
  }

  const selectLanguage = (code: Lang) => {
    setLanguage(code)
    setShowLanguageSelector(false)

    const greetings: Record<Lang, string> = {
      ro: "Perfect! Spune-mi pe scurt: ce afacere ai? 🙂",
      ru: "Отлично! Расскажите коротко: какой у вас бизнес? 🙂",
      en: "Great! Tell me briefly: what's your business? 🙂"
    }

    setMessages(prev => [...prev, { role: "assistant", content: greetings[code] }])
  }

  const sendMessage = async () => {
    if (!language) return // conversația nu pornește fără limbă
    if (!input.trim()) return

    playSound(sendSound)

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
    setTyping(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          lang: language
        })
      })

      const data = await res.json()
      console.log("📥 API Response:", data)

      const reply = data?.bot?.trim()

      // ✅ dacă backend semnalează un lead -> NU trimitem automat.
      // Arătăm un card de consimțământ (bifă) și trimitem doar după confirmarea explicită.
      if (data?.action === "send_lead" && data?.lead) {
        setPendingLead(data.lead)
        setConsentChecked(false)
      }

      if (!reply || reply.length === 0) {
        console.error("❌ Empty bot reply:", data)
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content:
              language === "ru"
                ? "Произошла ошибка. Попробуйте ещё раз."
                : language === "en"
                ? "An error occurred. Please try again."
                : "A apărut o eroare. Te rog încearcă din nou."
          }
        ])
        setTyping(false)
        return
      }

      playSound(receiveSound)
      setMessages([...newMessages, { role: "assistant", content: reply }])
    } catch (error) {
      console.error("❌ Fetch error:", error)
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            language === "ru"
              ? "Ошибка сети. Попробуйте позже."
              : language === "en"
              ? "Network error. Try again later."
              : "Eroare de conexiune. Încearcă mai târziu."
        }
      ])
    } finally {
      setTyping(false)
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") sendMessage()
  }

  // ✅ Trimite lead-ul DOAR după bifa explicită de consimțământ.
  // Includem textul exact al consimțământului + momentul (client) — pentru
  // demonstrarea acordului (Art. 7(1) GDPR), pe lângă timestamp-ul + IP-ul
  // capturate server-side în /api/lead.
  const confirmSendLead = async () => {
    if (!pendingLead || !consentChecked || leadSending) return
    const lang = language ?? "ro"
    setLeadSending(true)
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pendingLead.name,
          email: pendingLead.email,
          phone: pendingLead.phone,
          offer_final: pendingLead.offer_final,
          conversation: pendingLead.conversation,
          consentText: CONSENT_TEXT[lang].checkbox,
          consentGivenAt: new Date().toISOString(),
        })
      })
      setMessages(prev => [...prev, { role: "assistant", content: CONSENT_TEXT[lang].sent }])
    } catch (e) {
      console.error("❌ Lead send failed:", e)
    } finally {
      setLeadSending(false)
      setPendingLead(null)
      setConsentChecked(false)
    }
  }

  const cancelSendLead = () => {
    setPendingLead(null)
    setConsentChecked(false)
  }

  return (
    <>
      {/* Floating Avatar Button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 shadow-2xl border border-sky-400/40 
          bg-black/70 dark:bg-black/80 p-[4px] rounded-full w-16 h-16 flex items-center justify-center 
          transition-all duration-300 neon-pulse ${open ? "scale-0" : "scale-100"}`}
      >
        <TinkaAvatar className="w-14 h-14" />
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 w-80 h-[480px] bg-white dark:bg-neutral-900 shadow-2xl 
          rounded-2xl flex flex-col overflow-hidden z-50 border border-neutral-200 dark:border-neutral-700
          animate-[slideUp_0.3s_ease-out]"
        >
          {/* Header */}
          <div className="bg-slate-950 text-white p-3 flex items-center gap-2 shadow-md">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-sky-400 shadow-[0_0_8px_#38bdf8]">
              <TinkaAvatar className="w-full h-full" />
            </div>
            <span className="font-semibold text-sm">TINKA AI</span>

            <button className="ml-auto" onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[85%] text-sm leading-snug transition ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 self-end ml-auto"
                    : "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-200"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {/* ✅ Selector de limbă inline (după salut) */}
            {showLanguageSelector && !language && (
              <div className="p-3 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-neutral-800 dark:to-neutral-700 rounded-xl border border-sky-200 dark:border-sky-700 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={16} className="text-sky-600 dark:text-sky-400" />
                  <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Alege limba conversației:
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      ["ro", "🇷🇴 RO"],
                      ["ru", "🇷🇺 RU"],
                      ["en", "🇬🇧 EN"]
                    ] as const
                  ).map(([code, label]) => (
                    <button
                      key={code}
                      className="bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 
                        py-2 px-1 rounded-lg hover:bg-sky-100 dark:hover:bg-neutral-600 
                        transition text-xs font-medium shadow-sm"
                      onClick={() => selectLanguage(code)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ Card de consimțământ — apare doar când AI-ul are datele minime (email) și
                cere confirmare explicită înainte de a trimite orice mai departe. */}
            {pendingLead && (
              <div className="p-3 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-neutral-800 dark:to-neutral-700 rounded-xl border border-sky-200 dark:border-sky-700 animate-[fadeIn_0.3s_ease-out] space-y-2">
                <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  {CONSENT_TEXT[language ?? "ro"].title}
                </div>
                <div className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                  {CONSENT_TEXT[language ?? "ro"].note}
                </div>
                <div className="text-[11px] text-neutral-700 dark:text-neutral-300 bg-white/60 dark:bg-neutral-900/40 rounded-lg px-2 py-1.5">
                  {pendingLead.email && <div>📧 {pendingLead.email}</div>}
                  {pendingLead.name && <div>👤 {pendingLead.name}</div>}
                  {pendingLead.phone && <div>📞 {pendingLead.phone}</div>}
                </div>
                <label className="flex items-start gap-2 text-[11px] text-neutral-700 dark:text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="mt-0.5"
                  />
                  <span>{CONSENT_TEXT[language ?? "ro"].checkbox}</span>
                </label>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={cancelSendLead}
                    className="flex-1 text-[11px] py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 hover:bg-white/50 dark:hover:bg-neutral-600 transition"
                  >
                    {CONSENT_TEXT[language ?? "ro"].cancel}
                  </button>
                  <button
                    onClick={confirmSendLead}
                    disabled={!consentChecked || leadSending}
                    className={`flex-1 text-[11px] py-1.5 rounded-lg font-semibold transition ${
                      consentChecked && !leadSending
                        ? "bg-sky-500 hover:bg-sky-400 text-white"
                        : "bg-neutral-300 dark:bg-neutral-600 text-neutral-500 cursor-not-allowed"
                    }`}
                  >
                    {leadSending ? "…" : CONSENT_TEXT[language ?? "ro"].confirm}
                  </button>
                </div>
              </div>
            )}

            {typing && (
              <div className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 w-14 flex justify-center">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input - disabled până nu alege limba */}
          <div className="p-3 border-t border-neutral-200 dark:border-neutral-700 flex gap-2">
            <input
              className={`flex-1 border border-neutral-300 dark:border-neutral-700 
              bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 
              px-2 py-1 rounded-lg text-sm transition ${
                !language ? "opacity-50 cursor-not-allowed" : ""
              }`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                !language
                  ? "Alege limba mai întâi..."
                  : language === "ro"
                  ? "Scrie un mesaj..."
                  : language === "ru"
                  ? "Введите сообщение..."
                  : "Type a message..."
              }
              disabled={!language}
            />
            <button
              onClick={sendMessage}
              disabled={!language}
              className={`bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow transition ${
                !language ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes neonPulse {
          0% { box-shadow: 0 0 5px #0ff, 0 0 10px #00eaff; }
          50% { box-shadow: 0 0 15px #0ff, 0 0 25px #00eaff; transform: scale(1.05); }
          100% { box-shadow: 0 0 5px #0ff, 0 0 10px #00eaff; }
        }
        .neon-pulse {
          animation: neonPulse 1.8s infinite ease-in-out;
        }
      `}</style>
    </>
  )
}
