"use client"

import { useEffect, useState, useRef } from "react"
import { Send, X, Globe, CheckCircle } from "lucide-react"
import TinkaAvatar from "@/components/tinka/TinkaAvatar"

type Locale = "ro" | "ru" | "en"

type Offer = {
  type: "subscription" | "one_time" | "automation"
  title: string
  monthly_mdl: number | null
  one_time_mdl: number | null
  setup_mdl_range: [number, number] | null
  items: string[]
  assumptions: string[]
  next_step: string
}

type ApiReply = {
  ok: boolean
  reply: string
  stage?: string
  offer?: Offer | null
  require_language?: boolean
}

const sendSound = "data:audio/mp3;base64,SUQzAwAAAAAAF1RTU0UAAAAPAAADTGF2ZjU2LjI0LjEwMAAAAAAAAAAAAAAA//tQxAADB..."
const receiveSound = "data:audio/mp3;base64,SUQzAwAAAAAAF1RTU0UAAAAPAAADTGF2ZjU2LjI0LjEwMAAAAAAAAAAAAAAA//tQxAADB..."

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState<Locale | null>(null)

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [typing, setTyping] = useState(false)
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)

  const [pendingOffer, setPendingOffer] = useState<Offer | null>(null)

  // lead capture (după accept)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadName, setLeadName] = useState("")
  const [leadPhone, setLeadPhone] = useState("")
  const [leadEmail, setLeadEmail] = useState("")
  const [sendingLead, setSendingLead] = useState(false)
  const [leadSent, setLeadSent] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  useEffect(() => scrollToBottom(), [messages, pendingOffer, showLeadForm])

  // Autostart: se deschide fereastra și cere limba (fără mesaj de “conversație” până nu aleg)
  useEffect(() => {
    const t = setTimeout(() => {
      setOpen(true)
      setMessages([]) // fără greeting înainte de limbă
      setShowLanguageSelector(true)
      setPendingOffer(null)
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  const playSound = (src: string) => {
    const audio = new Audio(src)
    audio.volume = 0.35
    audio.play().catch(() => {})
  }

  const selectLanguage = (code: Locale) => {
    setLanguage(code)
    setShowLanguageSelector(false)
    setLeadSent(false)
    setShowLeadForm(false)
    setPendingOffer(null)

    const greetings: Record<Locale, string> = {
      ro: "Perfect 🙂 Ce afacere ai și ce vrei să rezolvăm?",
      ru: "Отлично 🙂 Какой у вас бизнес и что нужно решить?",
      en: "Great 🙂 What business do you have and what should we fix?",
    }

    setMessages([{ role: "assistant", content: greetings[code] }])
  }

  const sendMessage = async () => {
    if (!language) return
    if (!input.trim()) return

    playSound(sendSound)

    const newMessages = [...messages, { role: "user" as const, content: input }]
    setMessages(newMessages)
    setInput("")
    setTyping(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, lang: language }),
      })

      const data: ApiReply = await res.json()
      const reply = (data?.reply || "").trim()

      if (!reply) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: language === "ru" ? "Ошибка. Попробуйте ещё раз." : language === "en" ? "Error. Try again." : "Eroare. Încearcă din nou." },
        ])
        setTyping(false)
        return
      }

      playSound(receiveSound)
      setMessages([...newMessages, { role: "assistant", content: reply }])

      // dacă vine ofertă structurată, o afișăm
      if (data?.offer) {
        setPendingOffer(data.offer)
      } else {
        setPendingOffer(null)
      }
    } catch (e) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: language === "ru" ? "Ошибка сети. Попробуйте позже." : language === "en" ? "Network error. Try later." : "Eroare de conexiune. Încearcă mai târziu." },
      ])
    } finally {
      setTyping(false)
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") sendMessage()
  }

  const acceptOffer = () => {
    // Accept explicit -> cerem date
    setShowLeadForm(true)
  }

  const submitLead = async () => {
    if (!pendingOffer) return
    if (!leadName.trim() || !leadPhone.trim() || !leadEmail.trim()) return

    setSendingLead(true)
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName.trim(),
          phone: leadPhone.trim(),
          email: leadEmail.trim(),
          acceptedAt: new Date().toISOString(),
          offer: pendingOffer,
          conversation: messages,
        }),
      })

      const data = await res.json()
      if (data?.success) {
        setLeadSent(true)
        setShowLeadForm(false)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              language === "ru"
                ? "Готово ✅ Я передал(а) заявку команде; вас скоро наберут."
                : language === "en"
                ? "Done ✅ I sent everything to the team; they’ll contact you soon."
                : "Gata ✅ Am trimis totul echipei; te contactăm în scurt timp.",
          },
        ])
      }
    } finally {
      setSendingLead(false)
    }
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
          <div className="flex-1 p-3 overflow-y-auto space-y-3 flex flex-col">
            {/* Selector de limbă = primul pas obligatoriu */}
            {showLanguageSelector && !language && (
              <div className="p-3 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-neutral-800 dark:to-neutral-700 rounded-xl border border-sky-200 dark:border-sky-700 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={16} className="text-sky-600 dark:text-sky-400" />
                  <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Alege limba conversației ca să începem:
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    ["ro", "🇷🇴 RO"],
                    ["ru", "🇷🇺 RU"],
                    ["en", "🇬🇧 EN"],
                  ] as const).map(([code, label]) => (
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

            {/* Conversația */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[85%] text-sm leading-snug transition ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 self-end ml-auto"
                    : "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-200 self-start"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {/* Card ofertă (dacă există) */}
            {pendingOffer && !showLeadForm && !leadSent && (
              <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30">
                <div className="text-sm font-semibold mb-1">{pendingOffer.title}</div>

                <div className="text-xs space-y-1">
                  {pendingOffer.monthly_mdl != null && <div>Abonament: <b>{pendingOffer.monthly_mdl} MDL/lună</b></div>}
                  {pendingOffer.one_time_mdl != null && <div>Plată unică: <b>{pendingOffer.one_time_mdl} MDL</b></div>}
                  {pendingOffer.setup_mdl_range && (
                    <div>Setup: <b>{pendingOffer.setup_mdl_range[0]}–{pendingOffer.setup_mdl_range[1]} MDL</b></div>
                  )}
                  {pendingOffer.items?.length > 0 && (
                    <div className="mt-2">
                      <div className="font-semibold">Include:</div>
                      <ul className="list-disc pl-4">
                        {pendingOffer.items.slice(0, 6).map((x, idx) => <li key={idx}>{x}</li>)}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  onClick={acceptOffer}
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium"
                >
                  <CheckCircle size={18} /> Accept oferta
                </button>
              </div>
            )}

            {/* Formular lead după accept */}
            {showLeadForm && pendingOffer && (
              <div className="p-3 rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30">
                <div className="text-sm font-semibold mb-2">
                  Perfect — trimitem oferta la echipă ✅
                </div>

                <div className="space-y-2">
                  <input
                    className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 py-2 rounded-lg text-sm"
                    placeholder="Nume"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                  />
                  <input
                    className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 py-2 rounded-lg text-sm"
                    placeholder="Telefon"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                  />
                  <input
                    className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 py-2 rounded-lg text-sm"
                    placeholder="Email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                  />

                  <button
                    onClick={submitLead}
                    disabled={sendingLead || !leadName.trim() || !leadPhone.trim() || !leadEmail.trim()}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium ${
                      sendingLead ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {sendingLead ? "Se trimite..." : "Trimite către echipă"}
                  </button>
                </div>
              </div>
            )}

            {typing && (
              <div className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 w-14 flex justify-center self-start">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input: blocat până nu e aleasă limba */}
          <div className="p-3 border-t border-neutral-200 dark:border-neutral-700 flex gap-2">
            <input
              className={`flex-1 border border-neutral-300 dark:border-neutral-700 
              bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 
              px-2 py-1 rounded-lg text-sm transition ${!language ? "opacity-50 cursor-not-allowed" : ""}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={!language ? "Alege limba mai întâi..." : language === "ru" ? "Введите сообщение..." : language === "en" ? "Type a message..." : "Scrie un mesaj..."}
              disabled={!language}
            />
            <button
              onClick={sendMessage}
              disabled={!language}
              className={`bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow transition ${!language ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes neonPulse {
          0% { box-shadow: 0 0 5px #0ff, 0 0 10px #00eaff; }
          50% { box-shadow: 0 0 15px #0ff, 0 0 25px #00eaff; transform: scale(1.05); }
          100% { box-shadow: 0 0 5px #0ff, 0 0 10px #00eaff; }
        }
        .neon-pulse { animation: neonPulse 1.8s infinite ease-in-out; }
      `}</style>
    </>
  )
}
