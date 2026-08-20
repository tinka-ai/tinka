// lib/supabaseAdmin.ts
// Client Supabase pentru uz EXCLUSIV server-side (API routes din app/api/**).
// Folosește cheia service_role — are voie să scrie/citească direct, ignorând
// Row Level Security. NU importa acest fișier în componente client ("use client")
// și NU expune SUPABASE_SERVICE_ROLE_KEY către browser.

import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

/**
 * Returnează un client Supabase, sau `null` dacă variabilele de mediu
 * nu sunt configurate (ex. local, înainte să completezi .env.local).
 * Codul care îl folosește trebuie să trateze cazul `null` fără să crape.
 */
export function getSupabaseAdmin() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })
}
