"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLocale } from "@/contexts/locale-context"
import { Mail, Phone, Clock, MapPin, Send, CheckCircle, AlertTriangle, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ContactClient() {
  const { t: tFunc } = useLocale()
  const t = tFunc

  // Folosește contactPage, nu contact
  const C = t.contactPage
  const F = t.footer

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const phoneNumber = "37368333899"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const payload = {
        "form-name": "contact",
        ...formData,
      }

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload as any).toString(),
      })

      if (!res.ok) throw new Error("Send error")

      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" })
      setTimeout(() => setSubmitted(false), 7000)
    } catch (err: any) {
      setError(err?.message || "Send error")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{C.title}</h1>
            <p className="text-xl text-muted-foreground">{C.subtitle}</p>
          </div>
        </div>
      </section>

      {/* AICI URMEAZĂ TOT CODUL TĂU UI IDENTIC, DOAR SCHIMBI t.contact → C și t.footer → F */}

