// app/providers.tsx
"use client"

import type { ReactNode } from "react"
import { LocaleProvider } from "@/contexts/locale-context"

export default function Providers({ children }: { children: ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>
}
