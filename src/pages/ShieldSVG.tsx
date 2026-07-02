// src/pages/ShieldSVG.tsx
import React from "react";

const ShieldSVG: React.FC = () => (
  <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="درع">
    <defs>
      <linearGradient id="sg" x1="0" x2="1">
        <stop offset="0" stopColor="#F6D365"/>
        <stop offset="1" stopColor="#C79B34"/>
      </linearGradient>
    </defs>
    <g>
      <path d="M42 6 L62 16 V34 C62 52 50 63 42 68 C34 63 22 52 22 34 V16 L42 6 Z" fill="url(#sg)" stroke="#6a4a11" strokeWidth="1.6"/>
      <circle cx="42" cy="36" r="8" fill="#0b0b0b" stroke="#00000020"/>
      <path d="M30 50 Q42 42 54 50" stroke="#6a4a11" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </g>
  </svg>
);

export default ShieldSVG;