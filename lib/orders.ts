// lib/orders.ts
// Stochează comenzile într-un fișier JSON local pe server.
// Perfect pentru volume mici (sub 1000 comenzi/an).
// Când crești, înlocuiești cu Supabase/PostgreSQL fără să schimbi API routes.

import fs from "fs"
import path from "path"
import { randomUUID } from "crypto"

export interface Order {
  id: string
  createdAt: string
  email: string
  phone?: string
  machineId: string
  message?: string
  status: "pending" | "paid" | "delivered" | "cancelled"
  licenseKey?: string
  deliveredAt?: string
  paymentRef?: string
  amount: number
  currency: string
}

// Pe Netlify, /tmp este singurul folder writable la runtime
// Local (dev), salvăm în rădăcina proiectului
const DATA_DIR = process.env.NODE_ENV === "production"
  ? "/tmp"
  : path.join(process.cwd(), "data")

const DATA_FILE = path.join(DATA_DIR, "tinka_orders.json")

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function readOrders(): Order[] {
  ensureDir()
  if (!fs.existsSync(DATA_FILE)) return []
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as Order[]
  } catch {
    return []
  }
}

function writeOrders(orders: Order[]) {
  ensureDir()
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2), "utf-8")
}

export function createOrder(data: Omit<Order, "id" | "createdAt" | "status" | "amount" | "currency">): Order {
  const orders = readOrders()
  const order: Order = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
    amount: 490,
    currency: "MDL",
    ...data,
  }
  orders.push(order)
  writeOrders(orders)
  return order
}

export function updateOrder(id: string, updates: Partial<Order>): Order | null {
  const orders = readOrders()
  const idx = orders.findIndex(o => o.id === id)
  if (idx === -1) return null
  orders[idx] = { ...orders[idx], ...updates }
  writeOrders(orders)
  return orders[idx]
}

export function getOrder(id: string): Order | null {
  return readOrders().find(o => o.id === id) ?? null
}
