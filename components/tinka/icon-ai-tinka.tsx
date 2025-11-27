export default function IconTinkaAI({ size = 42 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="tinka-ai-icon"
    >
      <circle cx="100" cy="100" r="96" stroke="#00C8FF" strokeWidth="3" opacity="0.5" />

      {/* Stratul exterior – "rețea neurală" */}
      <g stroke="#00C8FF" strokeWidth="1.4" opacity="0.5">
        <path d="M20 100 Q100 20 180 100" />
        <path d="M20 100 Q100 180 180 100" />
        <path d="M60 40 Q100 100 140 40" />
        <path d="M60 160 Q100 100 140 160" />
      </g>

      {/* Chip AI – silueta feței */}
      <path
        d="
          M100 55
          C78 55 65 70 65 95
          C65 125 85 150 100 150
          C115 150 135 125 135 95
          C135 70 122 55 100 55
        "
        stroke="#00C8FF"
        strokeWidth="2.2"
        fill="none"
      />

      {/* Ochi – lumină digitală */}
      <circle cx="85" cy="100" r="4" fill="#00C8FF" />
      <circle cx="115" cy="100" r="4" fill="#00C8FF" />

      {/* Nas / gură minimală */}
      <path d="M100 110 L100 120" stroke="#00C8FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M92 130 Q100 135 108 130" stroke="#00C8FF" strokeWidth="2" />

      {/* Litera T – logo TINKA AI */}
      <text
        x="100"
        y="82"
        textAnchor="middle"
        fontSize="20"
        fontWeight="700"
        fill="#00C8FF"
      >
        T
      </text>
    </svg>
  );
}
