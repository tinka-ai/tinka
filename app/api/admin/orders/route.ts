// app/api/admin/orders/route.ts
import { NextResponse } from "next/server"
import { readOrders } from "@/lib/orders"

export async function GET(request: Request) {
  const adminPass = request.headers.get("x-admin-password")
  if (adminPass !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, message: "Neautorizat." }, { status: 401 })
  }

  const orders = readOrders().reverse() // cele mai noi primele
  return NextResponse.json({ success: true, orders })
}
