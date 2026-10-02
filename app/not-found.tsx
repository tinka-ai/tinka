// Not-found la radacina site-ului (in afara app/[locale]/) — se activeaza
// specific cand o ruta e respinsa de dynamicParams=false (ex. slug invalid
// la /solutions/<slug> sau /blog/<slug>) INAINTE ca layout-ul [locale] sa
// fie intrat, deci not-found.tsx de acolo nu ajunge sa randeze. Fara acest
// fisier, Next afiseaza propria pagina 404 generica, nestilizata.
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pagina nu a fost găsită | TINKA AI",
  robots: { index: false, follow: false },
}

export default function RootNotFound() {
  return (
    <html lang="ro">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#e5e5e5",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div style={{ maxWidth: "28rem", width: "100%", textAlign: "center", padding: "0 1rem" }}>
          <h1
            style={{
              fontSize: "4.5rem",
              fontWeight: 800,
              margin: "0 0 0.5rem",
              backgroundImage: "linear-gradient(90deg, #f472b6, #38bdf8, #8b5cf6)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            404
          </h1>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "0 0 0.5rem" }}>
            Pagina nu a fost găsită
          </h2>
          <p style={{ color: "#a3a3a3", margin: "0 0 1.5rem", lineHeight: 1.6 }}>
            Această pagină nu există sau a fost mutată.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.75rem",
              background: "#0ea5e9",
              color: "#fff",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ← Înapoi acasă
          </Link>
        </div>
      </body>
    </html>
  )
}
