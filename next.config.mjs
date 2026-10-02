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
  // rute reale, cu continut, vezi app/[locale]/.
  async redirects() {
    return [
      // Pagini eliminate
      {
        source: "/case-studies",
        destination: "/portfolio",
        permanent: true,
      },
      // /ro/... nu trebuie sa existe ca URL public (romana e varianta
      // canonica, fara prefix) — redirect permanent catre echivalentul fara
      // prefix. Mutat aici din middleware.ts: un redirects() din next.config
      // e procesat de routerul intern al Next, nu de edge middleware.
      {
        source: "/ro/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ]
  },

  // ── Locale implicit (ro) fara prefix in URL ───────────────────────────────
  // app/[locale]/... cere un segment real de limba (ro/en/ru) ca sa randeze.
  // Pentru ca "ro" sa ramana fara prefix in bara de adrese, orice cale care
  // nu a fost deja rezolvata ca pagina reala sau fisier static e re-scrisa
  // intern catre /ro/<cale>. Facut intentionat aici (next.config), nu in
  // middleware.ts — un rewrite facut in edge middleware (sau chiar simpla
  // prezenta a unui fisier middleware.ts in proiect) maschează statusul HTTP
  // real al paginii tinta: un notFound()/dynamicParams=false in spate ajunge
  // sa raspunda 200 in loc de 404 (bug/comportament cunoscut Next.js 15,
  // verificat empiric — a disparut complet dupa eliminarea middleware.ts).
  //
  // Pentru /solutions/<slug> si /blog/<slug> (singurele rute cu continut
  // dinamic pe baza unui slug), slug-urile valide sunt enumerate explicit ca
  // alternativa regex — un slug care NU e in lista nu se potriveste cu nicio
  // regula de rescriere si ajunge la un 404 real (Next nu gaseste nicio ruta
  // care sa se potriveasca), in loc sa fie rescris oricum catre
  // /ro/solutions/<slug-invalid> de o regula catch-all generica.
  //
  // Restul paginilor (fara slug dinamic) sunt enumerate explicit mai jos —
  // nu exista un catch-all generic "/:path* -> /ro/:path*", pentru ca un
  // asemenea catch-all ar prinde si slug-urile invalide de mai sus inainte
  // sa ajunga la un 404 real (si pentru ca path-to-regexp-ul folosit de Next
  // pentru rewrites nu a acceptat un negative-lookahead pentru a le exclude
  // explicit — testat empiric, regula respectiva nu s-a potrivit deloc).
  //
  // ATENTIE la adaugarea de continut nou:
  // - serviciu nou (services-data.ts) sau articol nou (blogData.ts) → adauga
  //   slug-ul in lista corespunzatoare de mai jos;
  // - sectiune noua de site (folder nou in app/[locale]/, ex. app/[locale]/preturi)
  //   → adauga o linie noua in lista PAGES de mai jos.
  // Altfel pagina noua va raspunde cu 404 in loc de continut pe URL-ul fara prefix.
  async rewrites() {
    const serviceSlugs = "chatbot-ai|software-personalizat|website-uri|platforme-saas|automatizari-business|continut-ai-dublaj-avatare|elearning|consultanta-digitala|automatizare-social-media"
    const blogSlugs = "cat-costa-un-site-web-in-moldova|chatbot-ai-pentru-afaceri-mici|seo-local-moldova-ghid|cat-costa-un-crm-personalizat-in-moldova|automatizare-postari-facebook-instagram-ai"
    const PAGES = ["about", "blog", "contact", "cumparare", "download", "portfolio", "privacy", "solutions", "terms"]

    return {
      beforeFiles: [],
      afterFiles: [
        { source: `/solutions/:slug(${serviceSlugs})`, destination: "/ro/solutions/:slug" },
        { source: `/blog/:slug(${blogSlugs})`, destination: "/ro/blog/:slug" },
        ...PAGES.map((page) => ({ source: `/${page}`, destination: `/ro/${page}` })),
      ],
      fallback: [
        { source: "/", destination: "/ro" },
      ],
    }
  },
}

export default nextConfig
