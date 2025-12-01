// components/tinka/TinkaAvatar.tsx

export default function TinkaAvatar({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Glow */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circle */}
      <circle
        cx="100"
        cy="100"
        r="88"
        stroke="#38bdf8"
        strokeWidth="6"
        fill="none"
        filter="url(#glow)"
      />

      {/* Brain Circuit */}
      <path
        d="
        M70 60 
        C40 80, 40 120, 70 140
        L90 140 
        L90 115 
        C60 110, 60 90, 90 85
        L90 60 
        Z

        M130 60
        C160 80, 160 120, 130 140
        L110 140
        L110 115
        C140 110, 140 90, 110 85
        L110 60
        Z

        M90 85 L110 85
        M90 115 L110 115
        "
        stroke="#38bdf8"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
      />

      {/* Dots (neural nodes) */}
      <circle cx="90" cy="60" r="6" fill="#38bdf8" filter="url(#glow)" />
      <circle cx="110" cy="60" r="6" fill="#38bdf8" filter="url(#glow)" />
      <circle cx="90" cy="140" r="6" fill="#38bdf8" filter="url(#glow)" />
      <circle cx="110" cy="140" r="6" fill="#38bdf8" filter="url(#glow)" />
      <circle cx="100" cy="85" r="6" fill="#38bdf8" filter="url(#glow)" />
      <circle cx="100" cy="115" r="6" fill="#38bdf8" filter="url(#glow)" />
    </svg>
  );
}
