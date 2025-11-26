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
}

export default nextConfig
