"use client"

import { useEffect, useState, useRef } from "react"
import { Send, X, Globe } from "lucide-react"
import TinkaAvatar from "@/components/tinka/TinkaAvatar"

const sendSound =
  "data:audio/mp3;base64,SUQzAwAAAAAAF1RTU0UAAAAPAAADTGF2ZjU2LjI0LjEwMAAAAAAAAAAAAAAA//tQxAADB..."
const receiveSound =
  "data:audio/mp3;base64,SUQzAwAAAAAAF1RTU0UAAAAPAAADTGF2ZjU2LjI0LjEwMAAAAAAAAAAAAAAA//tQxAADB..."

type Lang = "ro" | "ru" | "en"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState<Lang | null>(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [typing, setTyping] = useState(false)
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [leadSent, setLeadSent] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, typing])

  const playSound = (src: string) => {
    const audio = new Audio(src)
    audio.volume = 0.35
    audio.play().catch(() => {})
  }

  const getStoredLanguage = (): Lang | null => {
    try {
      const v = localStorage.getItem("tinka_chat_lang")
      if (v === "ro" || v === "ru" || v === "en") return v
      return null
    } catch {
      return null
    }
  }

  const setStoredLanguage = (code: Lang) => {
    try {
      localStorage.setItem("tinka_chat_lang", code)
    } catch {}
  }

  // ✅ AUTOSTART + salut + selector limbă
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true)

      // Salutul trebuie să apară MEREU, înainte de selector
      setMessages([
        {
          role: "assistant",
          content: "Salut! 👋 Eu sunt Tinka AI, asistentul tău digital."
        }
      ])

      // Dacă există limbă memorată, o folosim (dar salutul rămâne)
      const stored = getStoredLanguage()
      if (stored) {
        setLanguage(stored)
        setShowLanguageSelector(false)
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content:
              stored === "ro"
                ? "Continuăm în Română. Dacă vrei, poți schimba limba din selector."
                : stored === "ru"
                ? "Продолжаем на русском. Если хотите — можете сменить язык в селекторе."
                : "Continuing in English. If you want, you can change the language in the selector."
          }
        ])
      } else {
        // arată selector după 0.8s
        setTimeout(() => setShowLanguageSelector(true), 800)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const selectLanguage = (code: Lang) => {
    setLanguage(code)
    setStoredLanguage(code)
    setShowLanguageSelector(false)

    const greetings: Record<Lang, string> = {
      ro: "Perfect. Spune-mi pe scurt: ce afacere ai? 🙂",
      ru: "Отлично. Скажите коротко: какой у вас бизнес? 🙂",
      en: "Great. Tell me briefly: what business do you have? 🙂"
    }

    setMessages(prev => [...prev, { role: "assistant", content: greetings[code] }])
  }

  const ensureSelectorVisible = () => {
    setShowLanguageSelector(true)
  }

  // ✅ Trimite lead (conversație + ofertă)
  const sendLeadEmail = async (payload: any) => {
    if (leadSent) return
    setLeadSent(true)

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
    } catch {
      // dacă pică emailul, nu blocăm utilizatorul; doar permitem reîncercare din conversație
      setLeadSent(false)
    }
  }

  const sendMessage = async () => {
    if (!language) return
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
      const reply = (data?.bot || "").trim()

      if (!reply) {
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
        return
      }

      playSound(receiveSound)
      setMessages([...newMessages, { role: "assistant", content: reply }])

      // ✅ dacă AI cere trimiterea ofertei + conversației pe email
      if (data?.action === "send_lead" && data?.lead) {
        await sendLeadEmail(data.lead)
      }
    } catch (error) {
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

            {/* ✅ Selector limbă: apare după salut, înainte de conversație */}
            {showLanguageSelector && !language && (
              <div className="p-3 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-neutral-800 dark:to-neutral-700 rounded-xl border border-sky-200 dark:border-sky-700 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={16} className="text-sky-600 dark:text-sky-400" />
                  <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Alege limba conversației:
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    ["ro", "🇷🇴 RO"],
                    ["ru", "🇷🇺 RU"],
                    ["en", "🇬🇧 EN"]
                  ].map(([code, label]) => (
                    <button
                      key={code}
                      className="bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 
                        py-2 px-1 rounded-lg hover:bg-sky-100 dark:hover:bg-neutral-600 
                        transition text-xs font-medium shadow-sm"
                      onClick={() => selectLanguage(code as Lang)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ dacă are limbă memorată, oferim opțiune de schimbare fără să stricăm regula */}
            {language && (
              <button
                onClick={ensureSelectorVisible}
                className="text-xs text-sky-600 dark:text-sky-400 underline underline-offset-2"
              >
                Schimbă limba
              </button>
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
