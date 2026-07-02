// src/pages/ThroneSVG.tsx
import React from "react";

const ThroneSVG: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="كرسي ملكي">
    <defs>
      <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#F6D365"/>
        <stop offset="1" stopColor="#C79B34"/>
      </linearGradient>
      <filter id="sh" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#000" floodOpacity="0.6"/>
      </filter>
    </defs>
    <g filter="url(#sh)">
      <rect x="30" y="24" width="220" height="150" rx="18" fill="#0b0b0b" stroke="url(#g1)" strokeWidth="4"/>
      <path d="M50 160 C80 130,200 130,230 160" stroke="url(#g1)" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <g transform="translate(40,12)">
        <ellipse cx="60" cy="26" rx="60" ry="26" fill="#080707" stroke="url(#g1)" strokeWidth="3"/>
      </g>
      <g transform="translate(56,56)">
        <rect x="0" y="0" width="168" height="86" rx="12" fill="#0b0b0b" opacity="0.95"/>
        <path d="M12 12 Q94 0 156 12" stroke="url(#g1)" strokeWidth="3" fill="none"/>
      </g>
      <g transform="translate(92,6)">
        <polygon points="28,0 42,28 14,28" fill="url(#g1)"/>
      </g>
    </g>
  </svg>
);

export default ThroneSVG;