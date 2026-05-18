// app/api/deliver-key/route.ts
import { NextResponse } from "next/server"
import { getOrder, updateOrder } from "@/lib/orders"
import { generateLicenseKey } from "@/lib/licenseGenerator"
import { sendLicenseKey } from "@/lib/mailer"

export async function POST(request: Request) {
  // Verificare parolă admin
  const adminPass = request.headers.get("x-admin-password")
  if (adminPass !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, message: "Neautorizat." }, { status: 401 })
  }

  try {
    const { orderId, paymentRef } = await request.json()

    if (!orderId) {
      return NextResponse.json({ success: false, message: "orderId lipsă." }, { status: 400 })
    }

    const order = getOrder(orderId)
    if (!order) {
      return NextResponse.json({ success: false, message: "Comanda nu a fost găsită." }, { status: 404 })
    }

    if (order.status === "delivered") {
      return NextResponse.json({
        success: false,
        message: "Cheia a fost deja livrată.",
        licenseKey: order.licenseKey,
      }, { status: 409 })
    }

    // Generează cheia
    const licenseKey = generateLicenseKey(order.machineId)

    // Actualizează comanda
    updateOrder(orderId, {
      status: "delivered",
      licenseKey,
      deliveredAt: new Date().toISOString(),
      paymentRef: paymentRef || undefined,
    })

    // Trimite emailul cu cheia
    await sendLicenseKey({ name: order.name, email: order.email, licenseKey })

    return NextResponse.json({
      success: true,
      licenseKey,
      message: `Cheia a fost trimisă la ${order.email}`,
    })

  } catch (error) {
    console.error("[POST /api/deliver-key]", error)
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 })
  }
}
