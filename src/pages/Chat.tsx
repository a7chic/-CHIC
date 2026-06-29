import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessages, sendMessage } from "../services/chatService";
// تم تعديل هذا السطر ليرجع خطوة إضافية للخلف ويصل لمجلد hooks بشكل صحيح
import useAuth from "../hooks/useAuth";

export default function Chat() {
  const { id } = useParams();
  const { user } = useAuth();

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    if (!id) return;
    const data = await getMessages(id);
    setMessages(data);

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  useEffect(() => {
    load();
    const timer = setInterval(load, 3000);
    return () => clearInterval(timer);
  }, [id]);

  const submit = async () => {
    if (!text.trim() || !user || !id) return;
    await sendMessage(id, user.uid, text.trim());
    setText("");
    load();
  };

  return (
    <div style={{ color: "#fff" }}>
      <h1 style={{ color: "#D4AF37" }}>💬 المحادثة</h1>

      <div
        style={{
          background: "#111",
          border: "1px solid #D4AF37",
          borderRadius: "18px",
          padding: "20px",
          height: "500px",
          overflowY: "auto",
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: "flex",
              justify: message.senderId === user?.uid ? "flex-end" : "flex-start",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                background: message.senderId === user?.uid ? "#D4AF37" : "#222",
                color: message.senderId === user?.uid ? "#000" : "#fff",
                padding: "12px",
                borderRadius: "12px",
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="اكتب رسالة..."
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "10px",
            background: "#111",
            border: "1px solid #333",
            color: "#fff",
          }}
        />
        <button
          onClick={submit}
          style={{
            background: "#D4AF37",
            border: "none",
            padding: "0 25px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          إرسال
        </button>
      </div>
    </div>
  );
}
