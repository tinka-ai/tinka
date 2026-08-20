// app/api/admin/consents/route.ts
import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabaseAdmin"

export async function GET(request: Request) {
  const adminPass = request.headers.get("x-admin-password")
  if (adminPass !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, message: "Neautorizat." }, { status: 401 })
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return NextResponse.json(
      { success: false, message: "Supabase nu e configurat (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY lipsesc)." },
      { status: 500 }
    )
  }

  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")?.trim() || ""

  let query = supabase
    .from("consents")
    .select("*")
    .order("consent_given_at_server", { ascending: false })
    .limit(500)

  if (q) {
    // căutare simplă după email (case-insensitive, potrivire parțială)
    query = query.ilike("email", `%${q}%`)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, consents: data })
}
