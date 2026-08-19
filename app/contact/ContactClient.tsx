"use client"

import Link from "next/link"
import { Mail, Phone, Clock, MapPin, MessageCircle } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLocale } from "@/contexts/locale-context"

const TRANSLATIONS = {
  ro: {
    contactTitle: "Contact",
    contactSubtitle: "Hai să vorbim despre proiectul tău.",
    directContactNote: "Nu colectăm date prin formular. Sună-ne sau scrie-ne direct — răspundem rapid.",
    infoTitle: "Informații de contact",
    infoEmail: "Email",
    infoPhone: "Telefon",
    infoHours: "Program",
    infoLocation: "Locație",
    infoLocationDetail: "Chișinău, Republica Moldova",
    infoMessaging: "Mesagerie",
    quickTitle: "Răspundem rapid",
    quickDescription: "Îți răspundem în 4 ore lucrătoare.",

    formSuccessTitle: "Mulțumim!",
    formSuccessMessage: "Mesajul a fost trimis. Revenim în curând.",

    formName: "Nume",
    formNamePlaceholder: "Numele tău",
    formEmail: "Email",
    formEmailPlaceholder: "ex: nume@domeniu.md",
    formPhone: "Telefon",
    formPhonePlaceholder: "+373…",
    formCompany: "Companie",
    formCompanyPlaceholder: "Numele companiei",
    formService: "Serviciu",
    formServicePlaceholder: "Alege serviciul",
    formBudget: "Buget",
    formBudgetPlaceholder: "Alege bugetul",
    formMessage: "Mesaj",
    formMessagePlaceholder: "Spune-ne câteva detalii…",
    formSubmit: "Trimite",
    formSending: "Se trimite...",

    serviceChatbot: "Chatbot AI",
    serviceWebsite: "Website",
    serviceAutomation: "Automatizări",
    serviceConsulting: "Consultanță",
    serviceOther: "Altceva",

    budget1: "< 1.000 €",
    budget2: "1.000–5.000 €",
    budget3: "5.000–10.000 €",
    budget4: "> 10.000 €",

    faqTitle: "Întrebări frecvente",
    faqSubtitle: "Răspunsuri rapide",

    faq: [
      { q: "Cum începem?", a: "Ne scrii din formular sau WhatsApp și stabilim o discuție scurtă." },
      { q: "În cât timp livrați?", a: "De regulă 2–6 săptămâni, în funcție de complexitatea proiectului." },
      { q: "Lucrați cu contract și factură?", a: "Da, lucrăm doar cu contract + factură. De obicei 30% avans." },
      { q: "Oferiți mentenanță?", a: "Da, avem pachete de mentenanță și suport tehnic." },
      { q: "Mă ajutați și cu conținutul?", a: "Da, putem ajuta cu texte, structură și UX pentru pagini." },
      { q: "Tehnologii folosite?", a: "Next.js, Netlify, Tailwind CSS, integrare cu diverse API-uri." },
      { q: "În ce limbi comunicați?", a: "Română, rusă și engleză." },
      { q: "Cum gestionați datele personale?", a: "Respectăm GDPR și bune practici de securitate." },
    ],

    footerCompany: "TINKA AI",
    footerTagline: "— Digital. Simplu. Eficient.",
    footerDescription: "Soluții AI, dezvoltare web și automatizări pentru afaceri mici din Chișinău și din toată Moldova.",
    footerQuickLinks: "Link-uri rapide",
    footerHome: "Acasă",
    footerSolutions: "Soluții",
    footerAbout: "Despre",
    footerContact: "Contact",
    footerResources: "Resurse",
    footerBlog: "Blog",
    footerCaseStudies: "Cazuri de Studiu",
    footerFaq: "FAQ",
    footerContactInfo: "Informații Contact",
    footerEmail: "office@tinka.md",
    footerPhone: "+373 68 333 899",
    footerHours: "Luni–Duminică 10:00–22:00",
    footerPrivacy: "Politica de Confidențialitate",
    footerTerms: "Termeni și Condiții",
  },

  en: {
    contactTitle: "Contact",
    contactSubtitle: "Let's talk about your project.",
    directContactNote: "We don't collect data through a form. Call or email us directly — we reply fast.",
    infoTitle: "Contact details",
    infoEmail: "Email",
    infoPhone: "Phone",
    infoHours: "Working hours",
    infoLocation: "Location",
    infoLocationDetail: "Chișinău, Republic of Moldova",
    infoMessaging: "Messaging",
    quickTitle: "Fast response",
    quickDescription: "We usually reply within 4 business hours.",

    formSuccessTitle: "Thank you!",
    formSuccessMessage: "Your message has been sent. We’ll get back to you soon.",

    formName: "Name",
    formNamePlaceholder: "Your name",
    formEmail: "Email",
    formEmailPlaceholder: "e.g. name@domain.com",
    formPhone: "Phone",
    formPhonePlaceholder: "+373…",
    formCompany: "Company",
    formCompanyPlaceholder: "Company name",
    formService: "Service",
    formServicePlaceholder: "Select a service",
    formBudget: "Budget",
    formBudgetPlaceholder: "Select your budget",
    formMessage: "Message",
    formMessagePlaceholder: "Tell us a few details…",
    formSubmit: "Send",
    formSending: "Sending...",

    serviceChatbot: "AI Chatbot",
    serviceWebsite: "Website",
    serviceAutomation: "Automations",
    serviceConsulting: "Consulting",
    serviceOther: "Other",

    budget1: "< €1,000",
    budget2: "€1,000–€5,000",
    budget3: "€5,000–€10,000",
    budget4: "> €10,000",

    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Quick answers",

    faq: [
      { q: "How do we start?", a: "Send us a message or WhatsApp and we’ll book a short call." },
      { q: "What is your delivery time?", a: "Typically 2–6 weeks, depending on the project." },
      { q: "Do you work with contracts and invoices?", a: "Yes, always with contract + invoice. Usually 30% upfront." },
      { q: "Do you offer maintenance?", a: "Yes, we provide maintenance and support plans." },
      { q: "Can you help with content?", a: "Yes, we can help with copy, structure and UX." },
      { q: "What technologies do you use?", a: "Next.js, Netlify, Tailwind CSS and various integrations." },
      { q: "What languages do you support?", a: "Romanian, Russian and English." },
      { q: "How do you handle personal data?", a: "We follow GDPR and security best practices." },
    ],

    footerCompany: "TINKA AI",
    footerTagline: "— Digital. Simple. Efficient.",
    footerDescription: "AI solutions, web development and automation for small businesses in Chișinău and across Moldova.",
    footerQuickLinks: "Quick links",
    footerHome: "Home",
    footerSolutions: "Solutions",
    footerAbout: "About",
    footerContact: "Contact",
    footerResources: "Resources",
    footerBlog: "Blog",
    footerCaseStudies: "Case Studies",
    footerFaq: "FAQ",
    footerContactInfo: "Contact Info",
    footerEmail: "office@tinka.md",
    footerPhone: "+373 68 333 899",
    footerHours: "Mon–Sun 10:00–22:00",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms & Conditions",
  },

  ru: {
    contactTitle: "Контакты",
    contactSubtitle: "Давайте поговорим о вашем проекте.",
    directContactNote: "Мы не собираем данные через форму. Позвоните или напишите нам напрямую — отвечаем быстро.",
    infoTitle: "Контактная информация",
    infoEmail: "Email",
    infoPhone: "Телефон",
    infoHours: "График работы",
    infoLocation: "Локация",
    infoLocationDetail: "Кишинёв, Республика Молдова",
    infoMessaging: "Мессенджеры",
    quickTitle: "Быстрый ответ",
    quickDescription: "Обычно отвечаем в течение 4 рабочих часов.",

    formSuccessTitle: "Спасибо!",
    formSuccessMessage: "Ваше сообщение отправлено. Мы скоро свяжемся с вами.",

    formName: "Имя",
    formNamePlaceholder: "Ваше имя",
    formEmail: "Email",
    formEmailPlaceholder: "например, name@domain.com",
    formPhone: "Телефон",
    formPhonePlaceholder: "+373…",
    formCompany: "Компания",
    formCompanyPlaceholder: "Название компании",
    formService: "Услуга",
    formServicePlaceholder: "Выберите услугу",
    formBudget: "Бюджет",
    formBudgetPlaceholder: "Выберите бюджет",
    formMessage: "Сообщение",
    formMessagePlaceholder: "Опишите ваш проект…",
    formSubmit: "Отправить",
    formSending: "Отправка...",

    serviceChatbot: "AI чатбот",
    serviceWebsite: "Веб-сайт",
    serviceAutomation: "Автоматизация",
    serviceConsulting: "Консалтинг",
    serviceOther: "Другое",

    budget1: "< 1.000 €",
    budget2: "1.000–5.000 €",
    budget3: "5.000–10.000 €",
    budget4: "> 10.000 €",

    faqTitle: "Частые вопросы",
    faqSubtitle: "Быстрые ответы",

    faq: [
      { q: "С чего начать?", a: "Напишите нам через форму или WhatsApp, и мы назначим короткий звонок." },
      { q: "Сроки выполнения?", a: "Обычно 2–6 недель, в зависимости от задачи." },
      { q: "Работаете по договору?", a: "Да, всегда по договору и с счетом. Как правило, 30% предоплата." },
      { q: "Есть ли поддержка и сопровождение?", a: "Да, мы предлагаем пакеты технической поддержки." },
      { q: "Помогаете с контентом?", a: "Да, можем помочь с текстами, структурой и UX." },
      { q: "Какие технологии используете?", a: "Next.js, Netlify, Tailwind CSS и различные интеграции." },
      { q: "На каких языках вы общаетесь?", a: "Румынский, русский и английский." },
      { q: "Как вы работаете с персональными данными?", a: "Соблюдаем GDPR и стандарты безопасности." },
    ],

    footerCompany: "TINKA AI",
    footerTagline: "— Цифрово. Просто. Эффективно.",
    footerDescription: "AI-решения, создание сайтов и автоматизация для малого бизнеса в Кишинёве и по всей Молдове.",
    footerQuickLinks: "Быстрые ссылки",
    footerHome: "Главная",
    footerSolutions: "Решения",
    footerAbout: "О нас",
    footerContact: "Контакты",
    footerResources: "Ресурсы",
    footerBlog: "Блог",
    footerCaseStudies: "Кейсы",
    footerFaq: "FAQ",
    footerContactInfo: "Контакты",
    footerEmail: "office@tinka.md",
    footerPhone: "+373 68 333 899",
    footerHours: "Пн–Вс 10:00–22:00",
    footerPrivacy: "Политика конфиденциальности",
    footerTerms: "Условия использования",
  },
} as const

export default function ContactClient() {
  const { locale } = useLocale() as any
  const L = (TRANSLATIONS as any)[locale] ?? TRANSLATIONS.ro

  const phoneNumber = "37368333899" // fără +

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              {L.contactTitle}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {L.contactSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Info */}
            <div>
              <Card className="bg-card/80 backdrop-blur-sm border-border">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {L.infoTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {L.directContactNote}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">
                          {L.infoEmail}
                        </p>
                        <a
                          href={`mailto:${L.footerEmail}`}
                          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                          {L.footerEmail}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">
                          {L.infoPhone}
                        </p>
                        <a
                          href={`tel:${L.footerPhone.replace(/[^0-9]/g, "")}`}
                          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                          {L.footerPhone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">
                          {L.infoHours}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {L.footerHours}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">
                          {L.infoLocation}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {L.infoLocationDetail}
                        </p>
                      </div>
                    </div>

                    {/* Mesagerie */}
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm mb-2">
                          {L.infoMessaging}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={`https://wa.me/${phoneNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-8 px-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-md text-xs font-medium transition-colors"
                          >
                            WhatsApp
                          </a>
                          <a
                            href={`viber://chat?number=%2B${phoneNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-8 px-3 bg-[#7360F2] hover:bg-[#665AC8] text-white rounded-md text-xs font-medium transition-colors"
                          >
                            Viber
                          </a>
                          <a
                            href={`tg://resolve?phone=+${phoneNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center h-8 px-3 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-md text-xs font-medium transition-colors"
                          >
                            Telegram
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary-foreground/10 to-chart-4/10 border-primary-foreground/30">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-foreground">
                    {L.quickTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {L.quickDescription}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {L.faqTitle}
              </h2>
              <p className="text-lg text-muted-foreground">{L.faqSubtitle}</p>
            </div>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="w-full">
                  {L.faq.map((item: any, idx: number) => (
                    <AccordionItem key={idx} value={`item-${idx + 1}`}>
                      <AccordionTrigger className="text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer simplu, dar coerent cu restul site-ului */}
      <footer className="relative py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-2xl font-bold text-foreground">{L.footerCompany}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {L.footerTagline}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {L.footerDescription}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{L.footerQuickLinks}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    {L.footerHome}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">
                    {L.footerSolutions}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    {L.footerAbout}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    {L.footerContact}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{L.footerResources}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    {L.footerBlog}
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors">
                    {L.footerCaseStudies}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    {L.footerFaq}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">{L.footerContactInfo}</h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">{L.footerEmail}</p>
                <p className="text-muted-foreground">{L.footerPhone}</p>
                <p className="text-muted-foreground">{L.footerHours}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TINKA AI
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                {L.footerPrivacy}
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                {L.footerTerms}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
