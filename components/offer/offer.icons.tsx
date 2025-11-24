// components/offer/offer.icons.tsx
// SVG-uri inline, optimizate, fără lucide-react
// ZERO JS runtime, ZERO re-render cost

export const LoaderSvg = (
  <svg
    className="mr-2 h-4 w-4 animate-spin"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
)

export const SendSvg = (
  <svg
    className="mr-2 h-4 w-4"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M22 2L11 13"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 2L15 22L11 13L2 9L22 2Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
