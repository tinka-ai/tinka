"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const msg = input;
    setMessages(prev => [...prev, { sender: "user", text: msg }]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });

    const data = await res.json();
    setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg text-white flex items-center justify-center z-50 transition text-3xl"
      >
        🧠
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white border border-gray-200 shadow-2xl rounded-xl flex flex-col z-50 overflow-hidden">
          
          {/* HEADER — TINKA-AI */}
          <div className="bg-blue-600 text-white p-3 text-center flex items-center justify-center gap-2">
            <span className="text-xl">🧠</span>
            <span className="font-bold tracking-wide">Tinka-AI</span>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 text-sm max-w-[90%] rounded-lg ${
                  m.sender === "user"
                    ? "bg-blue-100 text-right self-end"
                    : "bg-white border text-left"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex p-2 bg-white border-t">
            <input
              className="flex-1 p-2 border rounded-lg text-sm"
              placeholder="Scrie un mesaj..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Trimite
            </button>
          </div>
        </div>
      )}
    </>
  );
}
