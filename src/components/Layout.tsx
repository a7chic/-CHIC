import React from "react";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function Layout({
  title,
  children,
}: LayoutProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#050505",
        color: "white",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <header
        style={{
          height: "70px",
          background: "#111",
          borderBottom: "2px solid #D4AF37",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 25px",
        }}
      >
        <h2 style={{ color: "#D4AF37" }}>👑 أناقة CHIC</h2>

        <span
          style={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {title}
        </span>
      </header>

      <main
        style={{
          flex: 1,
          overflow: "hidden",
          padding: "20px",
        }}
      >
        {children}
      </main>
    </div>
  );
}