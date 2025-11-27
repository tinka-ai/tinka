// components/tinka/TinkaAvatar.tsx
"use client"

import React from "react"

export default function TinkaAvatar({
  className = "",
}: {
  className?: string
}) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Orbă de energie albastră */}
        <defs>
          <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#1d4ed8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="circuit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>

        {/* Glow de fundal */}
        <circle cx="60" cy="60" r="54" fill="url(#orbGlow)" />

        {/* Contur subtil */}
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="url(#circuit)"
          strokeWidth="2"
          opacity="0.8"
        />

        {/* Linii abstracte tip „neural network” */}
        <g stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round">
          <path d="M20 48 Q40 30 60 36 T100 40" opacity="0.7" />
          <path d="M18 70 Q40 88 64 84 T102 76" opacity="0.55" />
          <path d="M32 28 Q52 22 72 30 T96 54" opacity="0.35" />
          <path d="M26 90 Q46 96 68 94 T96 88" opacity="0.35" />
        </g>

        {/* Noduri de rețea */}
        <g fill="#38bdf8">
          <circle cx="40" cy="34" r="2.4" />
          <circle cx="60" cy="36" r="2.4" />
          <circle cx="82" cy="38" r="2.4" />
          <circle cx="44" cy="86" r="2.2" />
          <circle cx="68" cy="84" r="2.2" />
          <circle cx="90" cy="76" r="2.2" />
        </g>

        {/* „Nucleu” AI abstract – fără față, doar energie */}
        <circle
          cx="60"
          cy="60"
          r="20"
          fill="#020617"
          stroke="url(#circuit)"
          strokeWidth="2"
        />
        <g stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round">
          <path d="M50 56 Q60 48 70 56" opacity="0.9" />
          <path d="M50 64 Q60 72 70 64" opacity="0.75" />
        </g>
        <g fill="#38bdf8">
          <circle cx="52" cy="60" r="1.8" />
          <circle cx="68" cy="60" r="1.8" />
        </g>
      </svg>
    </div>
  )
}
