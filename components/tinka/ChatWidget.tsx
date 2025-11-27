"use client"

import { useEffect, useState, useRef } from "react"
import { Send, X, Globe } from "lucide-react"
import Image from "next/image"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages })
    })

    const data = await res.json()
    const reply = data.choices?.[0]?.message?.content || "Eroare răspuns."

    setMessages([...newMessages, { role: "assistant", content: reply }])
  }

  // UI — alegerea limbii (prima interacțiune)
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
          <button
            className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-300 p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700"
            onClick={() => setLanguage("ro")}
          >
            🇷🇴 RO
          </button>
          <button
            className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-300 p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700"
            onClick={() => setLanguage("ru")}
          >
            🇷🇺 RU
          </button>
          <button
            className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-300 p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700"
            onClick={() => setLanguage("en")}
          >
            🇬🇧 EN
          </button>
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

  return (
    <>
      {/* Floating Button — Avatar bubble */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 shadow-2xl p-0 rounded-full w-16 h-16 flex items-center justify-center border-4 border-white dark:border-neutral-900"
      >
        <Image
          src="/tinka-avatar.png"
          alt="TINKA Avatar"
          width={60}
          height={60}
          className="rounded-full"
        />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-[480px] bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl flex flex-col overflow-hidden z-50 border border-neutral-200 dark:border-neutral-700">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex items-center gap-2">
            <Image
              src="/tinka-avatar.png"
              alt="TINKA"
              width={34}
              height={34}
              className="rounded-full border border-white/40"
            />
            <span className="font-semibold text-white">TINKA AI</span>
            <button className="ml-auto" onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
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
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-neutral-200 dark:border-neutral-700 flex gap-2">
            <input
              className="flex-1 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 px-2 py-1 rounded-lg text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Scrie un mesaj..."
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
    </>
  )
}
