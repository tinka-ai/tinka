// Server Component (no "use client") — necesar ca Next.js sa raspunda
// cu HTTP 404 real pentru notFound(), nu 200. Partea interactiva
// (redirect automat) e separata in not-found-content.tsx.
import type { Metadata } from "next"
import AdminNotFoundContent from "./not-found-content"

export const metadata: Metadata = {
  title: "Pagina nu a fost găsită | TINKA AI Admin",
  robots: { index: false, follow: false },
}

export default function AdminNotFound() {
  return <AdminNotFoundContent />
}
