/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  experimental: {
    optimizeCss: true,   // 🚀 optimizează CSS, crește scorul în PageSpeed
  },

  // ── Redirecturi 301 pentru URL-uri vechi ──────────────────────────────────
  async redirects() {
    return [
      // Pagini cu prefix limbă vechi (/ru/, /en/) → fără prefix
      {
        source: "/ru/privacy",
        destination: "/privacy",
        permanent: true,  // 301
      },
      {
        source: "/en/privacy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/ro/privacy",
        destination: "/privacy",
        permanent: true,
      },
      // Pagini eliminate
      {
        source: "/case-studies",
        destination: "/portfolio",
        permanent: true,
      },
      // Orice alt prefix limbă → pagina fără prefix
      {
        source: "/ru/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/en/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/ro/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
