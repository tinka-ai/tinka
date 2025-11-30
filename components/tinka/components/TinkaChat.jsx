"use client";
import { useState } from "react";

export default function TinkaChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    const msgToSend = input;
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msgToSend }),
    });

    const data = await res.json();

    const botMsg = { sender: "bot", text: data.reply };
    setMessages(prev => [...prev, botMsg]);
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white shadow-xl border rounded-xl flex flex-col">
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={`p-2 rounded-lg text-sm ${m.sender === "user" 
            ? "bg-blue-100 text-right" 
            : "bg-gray-100"
          }`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex p-2 border-t">
        <input
          className="flex-1 border p-2 rounded-lg text-sm"
          placeholder="Scrie un mesaj..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Trimite
        </button>
      </div>
    </div>
  );
}

