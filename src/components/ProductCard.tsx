import React from "react";

type Props = {
  title: string;
  price: string | number;
  image?: string;
  category?: string;
};

export default function ProductCard({
  title,
  price,
  image,
  category,
}: Props) {
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #D4AF37",
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <img
        src={image || "https://placehold.co/600x400?text=ANAQA+CHIC"}
        alt={title}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "18px" }}>
        <h3
          style={{
            color: "#fff",
            margin: 0,
            marginBottom: "10px",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            color: "#D4AF37",
            fontWeight: "bold",
            margin: 0,
            marginBottom: "10px",
          }}
        >
          {price} ر.س
        </p>

        {category && (
          <span
            style={{
              color: "#aaa",
              fontSize: "14px",
            }}
          >
            {category}
          </span>
        )}
      </div>
    </div>
  );
}