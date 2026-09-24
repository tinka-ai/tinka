/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    // Optimizare activă — Netlify (@netlify/plugin-nextjs) suportă nativ
    // optimizarea imaginilor Next.js (resize automat, AVIF/WebP, srcset).
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    optimizeCss: true,   // 🚀 optimizează CSS, crește scorul în PageSpeed
  },

  // ── Redirecturi 301 pentru URL-uri vechi ──────────────────────────────────
  // Nota: redirecturile care stergeau /en/ si /ru/ (ramase dintr-o incercare
  // veche cu linkuri moarte) au fost eliminate — /en/... si /ru/... sunt acum
  // rute reale, cu continut, vezi middleware.ts + app/[locale]/.
  async redirects() {
    return [
      // Pagini eliminate
      {
        source: "/case-studies",
        destination: "/portfolio",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
