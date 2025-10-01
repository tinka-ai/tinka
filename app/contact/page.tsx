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
import { Navbar } from "@/components/ui/navbar"
import { useLocale } from "@/contexts/locale-context"
import { Mail, Phone, Clock, MapPin, Send, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const { t } = useLocale()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">{t.contact.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{t.contact.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{t.contact.info.title}</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">{t.contact.info.email}</p>
                        <a
                          href={`mailto:${t.footer.email}`}
                          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                          {t.footer.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">{t.contact.info.phone}</p>
                        <a
                          href={`tel:${t.footer.phone.replace(/[^0-9]/g, "")}`}
                          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                          {t.footer.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">{t.contact.info.hours}</p>
                        <p className="text-muted-foreground text-sm">{t.footer.hours}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">{t.contact.info.location}</p>
                        <p className="text-muted-foreground text-sm">{t.contact.info.locationDetail}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary-foreground/10 to-chart-4/10 border-primary-foreground/30">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-foreground">{t.contact.quickResponse.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.contact.quickResponse.description}</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="h-16 w-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-success" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{t.contact.form.successTitle}</h3>
                      <p className="text-muted-foreground">{t.contact.form.successMessage}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t.contact.form.name}</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            required
                            placeholder={t.contact.form.namePlaceholder}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">{t.contact.form.email}</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                            placeholder={t.contact.form.emailPlaceholder}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t.contact.form.phone}</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder={t.contact.form.phonePlaceholder}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company">{t.contact.form.company}</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleChange("company", e.target.value)}
                            placeholder={t.contact.form.companyPlaceholder}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="service">{t.contact.form.service}</Label>
                          <Select value={formData.service} onValueChange={(value) => handleChange("service", value)}>
                            <SelectTrigger id="service">
                              <SelectValue placeholder={t.contact.form.servicePlaceholder} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="chatbot">{t.contact.form.serviceOptions.chatbot}</SelectItem>
                              <SelectItem value="website">{t.contact.form.serviceOptions.website}</SelectItem>
                              <SelectItem value="automation">{t.contact.form.serviceOptions.automation}</SelectItem>
                              <SelectItem value="consulting">{t.contact.form.serviceOptions.consulting}</SelectItem>
                              <SelectItem value="other">{t.contact.form.serviceOptions.other}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="budget">{t.contact.form.budget}</Label>
                          <Select value={formData.budget} onValueChange={(value) => handleChange("budget", value)}>
                            <SelectTrigger id="budget">
                              <SelectValue placeholder={t.contact.form.budgetPlaceholder} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-1000">{t.contact.form.budgetOptions.option1}</SelectItem>
                              <SelectItem value="1000-5000">{t.contact.form.budgetOptions.option2}</SelectItem>
                              <SelectItem value="5000-10000">{t.contact.form.budgetOptions.option3}</SelectItem>
                              <SelectItem value="over-10000">{t.contact.form.budgetOptions.option4}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t.contact.form.message}</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          required
                          rows={6}
                          placeholder={t.contact.form.messagePlaceholder}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      >
                        {t.contact.form.submit}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t.contact.faq.title}</h2>
              <p className="text-lg text-muted-foreground">{t.contact.faq.subtitle}</p>
            </div>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">{t.contact.faq.question1.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {t.contact.faq.question1.a}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left">{t.contact.faq.question2.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {t.contact.faq.question2.a}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left">{t.contact.faq.question3.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {t.contact.faq.question3.a}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left">{t.contact.faq.question4.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {t.contact.faq.question4.a}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left">{t.contact.faq.question5.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {t.contact.faq.question5.a}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-left">{t.contact.faq.question6.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {t.contact.faq.question6.a}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-left">{t.contact.faq.question7.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {t.contact.faq.question7.a}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8">
                    <AccordionTrigger className="text-left">{t.contact.faq.question8.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {t.contact.faq.question8.a}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-2xl font-bold text-foreground">{t.footer.company}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.footer.description}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{t.footer.quickLinks}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.home}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.solutions}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.contact}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{t.footer.resources}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.blog}
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.caseStudies}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    {t.footer.faq}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{t.footer.contactInfo}</h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">{t.footer.email}</p>
                <p className="text-muted-foreground">{t.footer.phone}</p>
                <p className="text-muted-foreground">{t.footer.hours}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">{t.footer.copyright}</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
