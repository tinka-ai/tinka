"use client"

import { useEffect, useState, useRef } from "react"
import { Send, X, Globe, MessageSquare } from "lucide-react"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll la ultimul mesaj
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Trimitem mesajul la API
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

  // Inițial: alegerea limbii
  if (!language && open) {
    return (
      <div className="fixed bottom-20 right-6 z-50 bg-white shadow-2xl rounded-2xl p-4 w-80">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Globe size={20} /> Alege limba
        </h3>

        <div className="grid grid-cols-3 gap-2">
          <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200" onClick={() => setLanguage("ro")}>
            🇷🇴 Română
          </button>
          <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200" onClick={() => setLanguage("ru")}>
            🇷🇺 Русский
          </button>
          <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200" onClick={() => setLanguage("en")}>
            🇬🇧 English
          </button>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
        >
          <X size={18} />
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl flex items-center justify-center"
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
            <span className="font-semibold">TINKA AI</span>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-100 self-end ml-auto"
                    : "bg-gray-100"
                }`}
              >
                {msg.content}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              className="flex-1 border px-2 py-1 rounded-lg text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Scrie un mesaj..."
            />
            <button onClick={sendMessage} className="bg-blue-600 text-white p-2 rounded-lg">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
