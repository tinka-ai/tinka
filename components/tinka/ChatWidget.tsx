"use client"

import { useEffect, useState, useRef } from "react"
import { Send, X, Globe } from "lucide-react"
import TinkaAvatar from "@/components/tinka/TinkaAvatar"

// Sunete trimise / primite
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

  // Să nu trimitem lead de 2 ori
  const [leadSent, setLeadSent] = useState(false)

  // Buffer pentru date detectate
  const [detectedLead, setDetectedLead] = useState({
    name: "",
    email: "",
    phone: ""
  })

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

  // Helpers validare
  const isValidName = (name: string) =>
    name.trim().length >= 3 &&
    /^[a-zA-ZăâîșțĂÂÎȘȚА-Яа-яёЁ\s-]+$/.test(name.trim())

  const isValidEmail = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())

  const isValidPhone = (phone: string) => {
    const clean = phone.replace(/\s|-/g, "")
    return /^(\+373\d{8}|0\d{8,9}|\+?\d{7,14})$/.test(clean)
  }

  // ---------------------------------------------------------
  // TRIMITERE MESAJ + DETECTARE DATE + AI + LEAD
  // ---------------------------------------------------------
  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    // Protecție anti-bot foarte simplă
    if (trimmed.length > 800) return

    playSound(sendSound)

    const newMessages = [...messages, { role: "user", content: trimmed }]
    setMessages(newMessages)
    setInput("")
    setTyping(true)

    // ---------------------------------------------------------
    // DETECTARE DATE CONTACT (în mesajul curent)
    // ---------------------------------------------------------
    const rawText = trimmed.toLowerCase()

    const emailMatch = rawText.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i)
    const phoneMatch = rawText.match(/(\+?\d[\d\s-]{6,14}\d)/)
    const nameCandidate =
      trimmed.length >= 3 &&
      !trimmed.includes("@") &&
      !/\d/.test(trimmed) &&
      /^[a-zA-ZăâîșțĂÂÎȘȚА-Яа-яёЁ\s-]+$/.test(trimmed)

    const hasContactHint = !!emailMatch || !!phoneMatch || nameCandidate

    let nextLead = { ...detectedLead }

    if (nameCandidate && isValidName(trimmed) && !nextLead.name) {
      nextLead.name = trimmed
    }
    if (emailMatch && isValidEmail(emailMatch[0])) {
      nextLead.email = emailMatch[0]
    }
    if (phoneMatch && isValidPhone(phoneMatch[0])) {
      nextLead.phone = phoneMatch[0]
    }

    if (hasContactHint) {
      setDetectedLead(nextLead)
    }

    // ---------------------------------------------------------
    // RĂSPUNS AI (indiferent de lead)
    // ---------------------------------------------------------
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

      const reply =
        data?.output_text ||
        data?.message ||
        data?.choices?.[0]?.message?.content ||
        "Eroare răspuns."

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: reply }
      ])

      playSound(receiveSound)
    } catch (err) {
      console.error("CHAT ERROR:", err)
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content:
            language === "ru"
              ? "Произошла ошибка. Попробуйте ещё раз чуть позже."
              : language === "en"
              ? "An error occurred. Please try again later."
              : "A apărut o eroare. Te rog să încerci din nou mai târziu."
        }
      ])
    } finally {
      setTyping(false)
    }

    // ---------------------------------------------------------
    // LOGICĂ LEAD – validare + trimitere + confirmare
    // ---------------------------------------------------------
    if (!leadSent && hasContactHint) {
      const nameOk = isValidName(nextLead.name)
      const emailOk = isValidEmail(nextLead.email)
      const phoneOk = isValidPhone(nextLead.phone)

      // Dacă lipsesc câmpuri -> cerem politicos exact ce lipsește
      if (!nameOk || !emailOk || !phoneOk) {
        let msg = ""

        if (!nameOk) {
          msg +=
            language === "ru"
              ? "Как Вас зовут? "
              : language === "en"
              ? "What is your name? "
              : "Cum te numești? "
        }

        if (!phoneOk) {
          msg +=
            language === "ru"
              ? "Какой у Вас номер телефона? "
              : language === "en"
              ? "What is your phone number? "
              : "Care este numărul tău de telefon? "
        }

        if (!emailOk) {
          msg +=
            language === "ru"
              ? "Какой у Вас адрес электронной почты? "
              : language === "en"
              ? "What is your email address? "
              : "Care este adresa ta de email? "
        }

        if (msg.trim().length > 0) {
          setMessages(prev => [
            ...prev,
            { role: "assistant", content: msg.trim() }
          ])
        }
      }

      // Dacă toate sunt valide -> trimitem lead o singură dată
      if (nameOk && emailOk && phoneOk) {
        try {
          setLeadSent(true)

          await fetch("/api/chat-send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: nextLead.name,
              email: nextLead.email,
              phone: nextLead.phone,
              lang: language,
              conversation: newMessages
            })
          })

          const confirmations = {
            ro: "Mulțumesc! Am transmis datele tale echipei TINKA AI. Te contactăm în scurt timp.",
            ru: "Спасибо! Мы передали ваши данные команде TINKA AI. Мы свяжемся с вами в ближайшее время.",
            en: "Thank you! Your details have been sent to the TINKA AI team. We will contact you shortly."
          }

          setMessages(prev => [
            ...prev,
            { role: "assistant", content: confirmations[language || "ro"] }
          ])
        } catch (err) {
          console.error("CHAT-SEND ERROR:", err)
        }
      }
    }
  }

  // ---------------------------------------------------------
  // SELECTARE LIMBĂ (ecran inițial)
  // ---------------------------------------------------------
  if (!language && open) {
    return (
      <div className="fixed bottom-24 right-6 z-50 bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl p-5 w-80 border border-neutral-200 dark:border-neutral-700">
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

                const greetings: Record<string, string> = {
                  ro: "Salut! Eu sunt Ai-Tinka. Cu ce te pot ajuta?",
                  ru: "Привет! Я Ai-Tinka. Чем могу помочь?",
                  en: "Hello! I’m Ai-Tinka. How can I assist you?"
                }

                setMessages([{ role: "assistant", content: greetings[code] }])
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
    )
  }

  // ---------------------------------------------------------
  // CHAT COMPLET
  // ---------------------------------------------------------
  return (
    <>
      {/* Avatar plutitor */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 shadow-2xl border border-sky-400/40 bg-black/70 dark:bg-black/80 p-[4px] rounded-full w-16 h-16 flex items-center justify-center transition-transform ${
          typing ? "animate-[pulseGlow_1.6s_infinite]" : "hover:scale-105"
        }`}
      >
        <TinkaAvatar className="w-14 h-14" />
      </button>

      {/* Fereastra chat */}
      {open && language && (
        <div className="fixed bottom-24 right-6 w-80 h-[480px] bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl flex flex-col overflow-hidden z-50 border border-neutral-200 dark:border-neutral-700">
          {/* Header */}
          <div className="bg-slate-950 text-white p-3 flex items-center gap-2">
            <div
              className={`w-9 h-9 rounded-full overflow-hidden border transition ${
                typing
                  ? "border-sky-400 shadow-[0_0_10px_#38bdf8]"
                  : "border-sky-400/40"
              }`}
            >
              <TinkaAvatar className="w-full h-full" />
            </div>
            <span className="font-semibold text-sm">Ai-Tinka</span>
            <button className="ml-auto" onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Mesaje */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[85%] text-sm leading-snug ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 self-end ml-auto"
                    : "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-200"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {typing && (
              <div className="p-2 bg-neutral-200 dark:bg-neutral-800 w-14 rounded-lg flex justify-center">
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
              className="flex-1 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 px-2 py-1 rounded-lg text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === "ro"
                  ? "Scrie un mesaj..."
                  : language === "ru"
                  ? "Введите сообщение..."
                  : "Type a message..."
              }
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Animație */}
      <style>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 6px #38bdf8; }
          50% { box-shadow: 0 0 16px #38bdf8; transform: scale(1.05); }
          100% { box-shadow: 0 0 6px #38bdf8; }
        }
      `}</style>
    </>
  )
}
