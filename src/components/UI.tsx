import React from "react";

export function RoyalButton({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "15px",
        borderRadius: "14px",
        border: "none",
        background: "linear-gradient(135deg,#D4AF37,#9A6C00)",
        color: "#000",
        fontWeight: "bold",
        fontSize: "18px",
        cursor: "pointer",
      }}
    >
      {title}
    </button>
  );
}

export function RoyalCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #D4AF37",
        borderRadius: "18px",
        padding: "25px",
      }}
    >
      {children}
    </div>
  );
}

export function RoyalInput(props: any) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "15px",
        borderRadius: "12px",
        border: "1px solid #555",
        background: "#1a1a1a",
        color: "#fff",
        marginBottom: "15px",
      }}
    />
  );
}