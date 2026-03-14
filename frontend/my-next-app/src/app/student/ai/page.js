"use client";

import { useState, useRef } from "react";
import axios from "axios";

export default function StudentChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi I’m your virtual tutor. Ask me anything about courses, lessons, or teachers."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText }
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/student/chat",
        { message: userText },
        { withCredentials: true }
      );

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: res.data }
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: " Sorry, I couldn’t answer that. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
      setTimeout(
        () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Virtual Tutor</h2>

    
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "#2563eb" : "#f1f5f9",
              color: msg.role === "user" ? "white" : "#111"
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      
      <div style={styles.inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about courses, lessons, teachers..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}



const styles = {
  page: {
    maxWidth: "800px",
    margin: "40px auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  title: {
    textAlign: "center"
  },
  chatBox: {
    height: "450px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
    background: "#fafafa"
  },
  message: {
    maxWidth: "75%",
    padding: "10px 14px",
    borderRadius: "12px",
    fontSize: "14px",
    lineHeight: "1.5",
    wordBreak: "break-word"
  },
  inputBox: {
    display: "flex",
    gap: "10px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none"
  },
  button: {
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#111",
    color: "white"
  }
};
