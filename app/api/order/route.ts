// app/api/order/route.ts
import { NextResponse } from "next/server"
import { createOrder } from "@/lib/orders"
import { sendOrderConfirmation, sendAdminNotification } from "@/lib/mailer"

// Machine ID = SHA256 hex truncat la 32 chars — exact [0-9a-f]{32}
const MACHINE_ID_REGEX = /^[0-9a-f]{32}$/i

export async function POST(request: Request) {
  try {
    const { email, machineId } = await request.json()

    // Validare câmpuri obligatorii
    if (!email?.trim() || !machineId?.trim()) {
      return NextResponse.json(
        { success: false, message: "Email și Machine ID sunt obligatorii." },
        { status: 400 }
      )
    }

    // Validare email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Emailul nu este valid." },
        { status: 400 }
      )
    }

    // Validare strictă Machine ID — exact 32 caractere hex
    const cleanId = machineId.trim().toLowerCase()
    if (!MACHINE_ID_REGEX.test(cleanId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Machine ID invalid.",
          field: "machineId"
        },
        { status: 400 }
      )
    }

    // Salvează comanda
    const order = createOrder({
      email: email.trim().toLowerCase(),
      machineId: cleanId,
    })

    // Trimite emailuri în paralel
    await Promise.all([
      sendOrderConfirmation({ email: order.email, orderId: order.id }),
      sendAdminNotification({ email: order.email, machineId: order.machineId,
                              orderId: order.id }),
    ])

    return NextResponse.json({ success: true, orderId: order.id })

  } catch (error) {
    console.error("[POST /api/order]", error)
    return NextResponse.json(
      { success: false, message: "Eroare internă. Contactează-ne la contact@tinka.md" },
      { status: 500 }
    )
  }
}
