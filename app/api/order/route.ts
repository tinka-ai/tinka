// app/api/order/route.ts
import { NextResponse } from "next/server"
import { createOrder } from "@/lib/orders"
import { sendOrderConfirmation, sendAdminNotification } from "@/lib/mailer"

export async function POST(request: Request) {
  try {
    const { name, email, phone, machineId, message } = await request.json()

    // Validare
    if (!name?.trim() || !email?.trim() || !machineId?.trim()) {
      return NextResponse.json(
        { success: false, message: "Câmpurile Nume, Email și Machine ID sunt obligatorii." },
        { status: 400 }
      )
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Emailul nu este valid." },
        { status: 400 }
      )
    }
    if (machineId.trim().length < 16) {
      return NextResponse.json(
        { success: false, message: "Machine ID invalid. Copiază-l exact din aplicație." },
        { status: 400 }
      )
    }

    // Salvează comanda
    const order = createOrder({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      machineId: machineId.trim(),
      message: message?.trim() || undefined,
    })

    // Trimite emailuri (în paralel pentru viteză)
    await Promise.all([
      sendOrderConfirmation({ name, email: order.email, orderId: order.id }),
      sendAdminNotification({ name, email: order.email, machineId: order.machineId,
                              orderId: order.id, phone, message }),
    ])

    return NextResponse.json({ success: true, orderId: order.id })

  } catch (error) {
    console.error("[POST /api/order]", error)
    return NextResponse.json(
      { success: false, message: "Eroare internă. Contactează-ne la office@tinka.md" },
      { status: 500 }
    )
  }
}
