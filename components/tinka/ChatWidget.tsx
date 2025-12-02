"use client"

import { useEffect, useState, useRef } from "react"
import { Send, X, Globe } from "lucide-react"
import TinkaAvatar from "@/components/tinka/TinkaAvatar"

const sendSound =
  "data:audio/mp3;base64,SUQzAwAAAAAAF1RTU0UAAAAPAAADTGF2ZjU2LjI0LjEwMAAAAAAAAAAAAAAA//tQxAADB..."
const receiveSound =
  "data:audio/mp3;base64,SUQzAwAAAAAAF1RTU0UAAAAPAAADTGF2ZjU2LjI0LjEwMAAAAAAAAAAAAAAA//tQxAADB..."

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [typing, setTyping] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const playSound = (src: string) => {
    const audio = new Audio(src)
    audio.volume = 0.35
    audio.play().catch(() => {})
  }

  const sendMessage = async () => {
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
          lang: language  // ✅ Trimitem "lang", nu "language"
        })
      })

      const data = await res.json()
      
      console.log("📥 API Response:", data)

      // ✅ API-ul returnează "bot", nu "reply"
      const reply = data?.bot?.trim()

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

      console.log("✅ Bot reply:", reply)

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

  // ENTER to send
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") sendMessage()
  }

  // Selectare limbă + greeting automat
  if (!language && open) {
    return (
      <>
        <div className="fixed bottom-24 right-6 z-50 bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl p-5 w-80 border border-neutral-200 dark:border-neutral-700 animate-[fadeUp_0.25s_ease-out]">
          <div className="flex items-center mb-4 gap-2">
            <Globe size={20} className="text-neutral-700 dark:text-neutral-300" />
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
              Alege limba
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              ["ro", "🇷🇴 RO"],
              ["ru", "🇷🇺 RU"],
              ["en", "🇬🇧 EN"]
            ].map(([code, label]) => (
              <button
                key={code}
                className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-300 p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
                onClick={() => {
                  setLanguage(code)

                  // GREETING AUTOMAT
                  if (code === "ro") {
                    setMessages([
                      {
                        role: "assistant",
                        content:
                          "Salut! Eu sunt Tinka AI, consultantul tău digital. Spune-mi pe scurt ce îți dorești să primești — mai mulți clienți, un site mai bun, automatizări sau altceva? 🙂"
                      }
                    ])
                  } else if (code === "ru") {
                    setMessages([
                      {
                        role: "assistant",
                        content:
                          "Здравствуйте! Я Tinka AI, ваш цифровой консультант. Расскажите, чего желаете достичь — больше клиентов, удобный своременный сайт, автоматизацию или что-то ещё? 🙂"
                      }
                    ])
                  } else {
                    setMessages([
                      {
                        role: "assistant",
                        content:
                          "Hi! I'm Tinka AI, the digital consultant. Tell me briefly what you'd like to achieve — more clients, a better website, automations, or something else? 🙂"
                      }
                    ])
                  }
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
          >
            <X size={18} />
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Floating Avatar Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 shadow-2xl border border-sky-400/40 
          bg-black/70 dark:bg-black/80 p-[4px] rounded-full w-16 h-16 flex items-center justify-center 
          transition-transform neon-pulse"
      >
        <TinkaAvatar className="w-14 h-14" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-[480px] bg-white dark:bg-neutral-900 shadow-2xl 
          rounded-2xl flex flex-col overflow-hidden z-50 border border-neutral-200 dark:border-neutral-700
          animate-[slideUp_0.3s_ease-out]">

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

          {/* Input */}
          <div className="p-3 border-t border-neutral-200 dark:border-neutral-700 flex gap-2">
            <input
              className="flex-1 border border-neutral-300 dark:border-neutral-700 
              bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 
              px-2 py-1 rounded-lg text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrie un mesaj..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow"
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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
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
