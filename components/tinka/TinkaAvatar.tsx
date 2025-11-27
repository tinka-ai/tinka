"use client"

export default function TinkaAvatar({ className = "" }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        {/* Glow energetic */}
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>

        <circle cx="60" cy="60" r="50" fill="url(#glow)">
          <animate
            attributeName="r"
            values="48;50;48"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </circle>

        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="url(#gold)"
          strokeWidth="3"
          opacity="0.85"
        />

        {/* Rețea abstractă */}
        <g stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round">
          <path d="M25 50 Q60 20 95 50" opacity="0.5" />
          <path d="M28 70 Q60 100 92 70" opacity="0.45" />
          <path d="M40 30 Q60 15 80 32" opacity="0.35" />
        </g>

        <g fill="#38bdf8">
          <circle cx="60" cy="20" r="2.5" />
          <circle cx="40" cy="30" r="2.3" />
          <circle cx="80" cy="32" r="2.3" />
        </g>

        {/* Nucleu AI */}
        <circle
          cx="60"
          cy="60"
          r="22"
          fill="#020617"
          stroke="url(#gold)"
          strokeWidth="2"
          opacity="0.9"
        />

        {/* Linie abstractă în nucleu */}
        <g stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round">
          <path d="M48 58 Q60 50 72 58" />
          <path d="M48 63 Q60 70 72 63" opacity="0.8" />
        </g>
      </svg>
    </div>
  )
}
