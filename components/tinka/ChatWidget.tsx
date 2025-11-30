"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const msgToSend = input;
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msgToSend }),
    });

    const data = await res.json();
    const botMsg = { sender: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMsg]);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg z-50 text-lg"
      >
        💬
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white border shadow-xl rounded-xl flex flex-col z-50">
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 text-sm rounded-lg ${
                  m.sender === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex p-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 border rounded-lg text-sm"
              placeholder="Scrie un mesaj..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 px-2 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              Trimite
            </button>
          </div>
        </div>
      )}
    </>
  );
}
