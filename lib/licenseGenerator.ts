// lib/licenseGenerator.ts
// Același algoritm ca license_manager.py din aplicația desktop
// IMPORTANT: LICENSE_SECRET trebuie să fie IDENTIC în ambele locuri!

import { createHmac } from "crypto"

export function generateLicenseKey(machineId: string): string {
  const secret = process.env.LICENSE_SECRET
  if (!secret) throw new Error("LICENSE_SECRET nu este setat în .env.local")

  const raw = createHmac("sha256", secret)
    .update(machineId.trim() + "TINKA-LIFETIME")
    .digest("hex")
    .toUpperCase()
    .slice(0, 25)

  return raw.match(/.{5}/g)!.join("-")
}
