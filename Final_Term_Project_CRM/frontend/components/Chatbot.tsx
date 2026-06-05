"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface Message {
  id: string;
  from: "bot" | "user";
  text: string;
}

const HELP_TEXT = `I can help with:
• **show customers** — View all customers
• **add customer** — Go to add customer form
• **invoice** — Open invoices page
• **dashboard** — Go to overview
• **help** — Show this menu`;

const getBotReply = (input: string): { text: string; navigate?: string } => {
  const msg = input.toLowerCase().trim();
  if (msg.includes("customer") && (msg.includes("show") || msg.includes("list") || msg.includes("view") || msg.includes("all"))) {
    return { text: "📋 Navigating to the customer list...", navigate: "/dashboard/customers" };
  }
  if (msg.includes("add") && msg.includes("customer")) {
    return { text: "➕ Opening the Add Customer form...", navigate: "/dashboard/customers/add" };
  }
  if (msg.includes("invoice") || msg.includes("billing")) {
    return { text: "🧾 Opening the Invoices module...", navigate: "/dashboard/invoices" };
  }
  if (msg.includes("dashboard") || msg.includes("home") || msg.includes("overview")) {
    return { text: "📊 Going to the dashboard overview...", navigate: "/dashboard" };
  }
  if (msg.includes("help") || msg.includes("what can you do") || msg.includes("commands")) {
    return { text: HELP_TEXT };
  }
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return { text: "👋 Hello! I'm your CRM assistant. Type **help** to see what I can do." };
  }
  return {
    text: "🤔 I didn't understand that. Try commands like:\n• show customers\n• add customer\n• invoice\n• help",
  };
};

const formatText = (text: string) => {
  return text.split("\n").map((line, i) => (
    <span key={i}>
      {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
      )}
      {i < text.split("\n").length - 1 && <br />}
    </span>
  ));
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      from: "bot",
      text: "👋 Hi! I'm your CRM assistant. Type **help** to see available commands.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), from: "user", text: input };
    const { text, navigate } = getBotReply(input);
    const botMsg: Message = { id: Date.now().toString() + "_bot", from: "bot", text };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");

    if (navigate) {
      setTimeout(() => {
        router.push(navigate);
        setOpen(false);
      }, 800);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        id="chatbot-toggle"
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", bottom: "1.5rem", right: "1.5rem",
          width: "56px", height: "56px",
          background: "linear-gradient(135deg, var(--color-mauve), var(--color-blue))",
          borderRadius: "50%", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.375rem", zIndex: 100,
          boxShadow: "0 8px 24px rgba(203,166,247,0.4)",
          transition: "transform 0.2s ease",
        }}
        title="Open CRM Chatbot"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat Window */}
      {open && (
        <div style={{
          position: "fixed", bottom: "5rem", right: "1.5rem",
          width: "340px", height: "480px",
          background: "var(--color-mantle)",
          border: "1px solid var(--color-surface0)",
          borderRadius: "1.25rem",
          display: "flex", flexDirection: "column",
          zIndex: 99,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          animation: "fadeInUp 0.25s ease",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, var(--color-mauve), var(--color-blue))",
            padding: "1rem 1.25rem",
            display: "flex", alignItems: "center", gap: "0.75rem",
          }}>
            <span style={{ fontSize: "1.25rem" }}>🤖</span>
            <div>
              <div style={{ fontWeight: 700, color: "var(--color-crust)", fontSize: "0.9rem" }}>CRM Assistant</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(17,17,27,0.7)" }}>Rule-based chatbot</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{
                display: "flex",
                justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "85%",
                  padding: "0.5rem 0.875rem",
                  borderRadius: msg.from === "user" ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
                  background: msg.from === "user"
                    ? "linear-gradient(135deg, var(--color-mauve), var(--color-blue))"
                    : "var(--color-surface0)",
                  color: msg.from === "user" ? "var(--color-crust)" : "var(--color-text)",
                  fontSize: "0.8125rem",
                  lineHeight: 1.5,
                }}>
                  {formatText(msg.text)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid var(--color-surface0)", display: "flex", gap: "0.5rem" }}>
            <input
              id="chatbot-input"
              type="text"
              className="input-base"
              placeholder="Type a command..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{ flex: 1 }}
            />
            <button
              id="chatbot-send"
              onClick={sendMessage}
              className="btn-primary"
              style={{ padding: "0.5rem 0.75rem", whiteSpace: "nowrap" }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
