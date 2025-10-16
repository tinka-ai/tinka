"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/contexts/locale-context"

type Section =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h2"; text: string }

type TermsT = {
  back: string
  title: string
  updated: string
  sections: { h2: string; body: Section[] }[]
  contactLabel: string
  contactEmailLabel: string
  email: string
}

const TERMS: Record<"ro" | "ru" | "en", TermsT> = {
  ro: {
    back: "Acasă",
    title: "Termeni și condiții",
    updated: "Ultima actualizare: August 2025",
    sections: [
      {
        h2: "1. Acceptarea Termenilor",
        body: [
          {
            type: "p",
            text:
              "Prin accesarea și utilizarea serviciilor TINKA AI, acceptați și sunteți de acord să fiți obligat de termenii și prevederile acestui acord. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați serviciile noastre.",
          },
        ],
      },
      {
        h2: "2. Descrierea Serviciului",
        body: [
          {
            type: "p",
            text:
              "TINKA AI furnizează soluții IT, web și de inteligență artificială, incluzând dar fără a se limita la:",
          },
          {
            type: "ul",
            items: [
              "Dezvoltare și implementare de chatbot-uri și asistenți AI",
              "Sisteme de automatizare a fluxurilor de lucru",
              "Servicii de integrare AI în sisteme existente",
              "Dezvoltare de soluții AI personalizate",
              "Dezvoltare și design pagini web responsive",
              "Dezvoltare software personalizat",
              "Dezvoltare platforme comerciale/sociale tip SaaS sau locale (offline)",
              "Creare material foto, video și text pentru Social Media Marketing (SMM)",
              "Crearea și administrarea bazelor de date pentru magazine online",
              "Consultanță IT și AI",
            ],
          },
        ],
      },
      {
        h2: "3. Drepturile de Proprietate Intelectuală",
        body: [
          {
            type: "ul",
            items: [
              "3.1. Drepturile asupra soluțiilor dezvoltate rămân la TINKA AI până la plata integrală conform contractului.",
              "3.2. După plata integrală, clientul dobândește dreptul de utilizare conform contractului individual.",
              "3.3. Codul sursă, metodologiile și tehnologiile proprietare rămân ale TINKA AI, dacă nu se prevede altfel în contract.",
            ],
          },
        ],
      },
      {
        h2: "4. Responsabilitățile Utilizatorului",
        body: [
          {
            type: "p",
            text: "Clientul se angajează să:",
          },
          {
            type: "ul",
            items: [
              "Furnizeze informații precise, complete și actualizate",
              "Utilizeze serviciile conform legislației aplicabile (RM și internațională)",
              "Nu interfereze și nu încerce acces neautorizat la sisteme/servicii",
              "Mențină confidențialitatea acreditărilor",
              "Respecte termenii de plată stabiliți în contract",
              "Nu folosească serviciile pentru activități ilegale sau care încalcă drepturile terților",
              "Nu reproducă/redistribuie soluții fără acordul scris al TINKA AI",
            ],
          },
        ],
      },
      {
        h2: "5. Confidențialitate și Protecția Datelor",
        body: [
          {
            type: "ul",
            items: [
              "5.1. TINKA AI protejează datele conform Politicii de Confidențialitate și legislației aplicabile.",
              "5.2. Părțile păstrează confidențialitatea informațiilor sensibile din colaborare.",
            ],
          },
        ],
      },
      {
        h2: "6. Garanții și Mentenanță",
        body: [
          {
            type: "ul",
            items: [
              "6.1. Garanțiile sunt oferite conform contractului individual.",
              "6.2. Mentenanță și suport tehnic conform pachetului ales.",
              "6.3. Nu se garantează funcționare neîntreruptă în caz de forță majoră, defecțiuni terțe sau utilizare necorespunzătoare.",
            ],
          },
        ],
      },
      {
        h2: "7. Limitarea Răspunderii",
        body: [
          {
            type: "ul",
            items: [
              "7.1. Răspunderea TINKA AI nu va depăși sumele plătite pentru serviciul ce a generat reclamația în ultimele 12 luni.",
              "7.2. TINKA AI nu răspunde pentru: pierderi indirecte, profituri/operațiuni pierdute, defecțiuni din modificări neautorizate, probleme din integrarea cu terți sau utilizare necorespunzătoare.",
              "7.3. Clientul își face backup regulat al datelor.",
            ],
          },
        ],
      },
      {
        h2: "8. Prețuri și Plăți",
        body: [
          {
            type: "ul",
            items: [
              "8.1. Prețurile sunt în oferte/contracte individuale.",
              "8.2. Plățile urmează graficul din contract.",
              "8.3. Serviciile pot fi suspendate pentru neplată.",
              "8.4. Moneda și TVA conform contractului și legii în vigoare.",
            ],
          },
        ],
      },
      {
        h2: "9. Încetarea Serviciilor",
        body: [
          {
            type: "ul",
            items: [
              "9.1. Oricare parte poate înceta cu preaviz de min. 30 de zile, conform contractului.",
              "9.2. TINKA AI poate înceta imediat în caz de încălcări grave.",
              "9.3. La încetare, se achită toate serviciile prestate până la data încetării.",
            ],
          },
        ],
      },
      {
        h2: "10. Modificări ale Termenilor",
        body: [
          {
            type: "p",
            text:
              "TINKA AI poate modifica acești termeni. Modificările majore vor fi comunicate. Utilizarea în continuare înseamnă acceptare.",
          },
        ],
      },
      {
        h2: "11. Impediment (Forță Majoră)",
        body: [
          {
            type: "p",
            text:
              "Nicio parte nu răspunde pentru neexecutare dacă aceasta este cauzată de un impediment în afara controlului (calamități, război, pandemii, restricții etc.).",
          },
        ],
      },
      {
        h2: "12. Legea Aplicabilă și Jurisdicție",
        body: [
          {
            type: "ul",
            items: [
              "12.1. Se aplică legea Republicii Moldova.",
              "12.2. Litigiile: pe cale amiabilă, iar în caz contrar — instanțele competente din RM.",
            ],
          },
        ],
      },
      {
        h2: "13. Informații de Contact",
        body: [
          {
            type: "p",
            text:
              "Pentru întrebări sau suport privind acești Termeni și Condiții, ne puteți contacta:",
          },
          {
            type: "ul",
            items: ["Email: office@tinka.md", "Nume companie: SRL „TINKA AI”"],
          },
          {
            type: "p",
            text:
              "Prin utilizarea serviciilor TINKA AI, confirmați că ați citit, înțeles și acceptat acești Termeni și Condiții.",
          },
        ],
      },
    ],
    contactLabel: "Întrebări despre acești termeni?",
    contactEmailLabel: "Scrie-ne la",
    email: "office@tinka.md",
  },

  ru: {
    back: "На главную",
    title: "Условия и положения",
    updated: "Последнее обновление: Август 2025",
    sections: [
      {
        h2: "1. Принятие условий",
        body: [
          {
            type: "p",
            text:
              "Используя сервисы TINKA AI, вы подтверждаете, что ознакомлены и согласны с настоящими условиями. Если вы не согласны — пожалуйста, не используйте наши услуги.",
          },
        ],
      },
      {
        h2: "2. Описание сервиса",
        body: [
          {
            type: "p",
            text: "TINKA AI предоставляет ИТ-, веб- и AI-решения, включая, но не ограничиваясь:",
          },
          {
            type: "ul",
            items: [
              "Разработка и внедрение чат-ботов и AI-ассистентов",
              "Системы автоматизации бизнес-процессов",
              "Интеграция AI с существующими системами",
              "Индивидуальные AI-решения",
              "Разработка и дизайн адаптивных веб-сайтов",
              "Индивидуальная разработка ПО",
              "SaaS-платформы/локальные решения",
              "Создание фото/видео/текстов для SMM",
              "Создание и администрирование БД для онлайн-магазинов",
              "ИТ- и AI-консалтинг",
            ],
          },
        ],
      },
      {
        h2: "3. Интеллектуальная собственность",
        body: [
          {
            type: "ul",
            items: [
              "3.1. Права на решения принадлежат TINKA AI до полной оплаты.",
              "3.2. После полной оплаты клиент получает право использования согласно договору.",
              "3.3. Исходный код, методологии и проприетарные технологии остаются у TINKA AI, если иное не указано в договоре.",
            ],
          },
        ],
      },
      {
        h2: "4. Обязанности пользователя",
        body: [
          { type: "p", text: "Клиент обязуется:" },
          {
            type: "ul",
            items: [
              "Предоставлять точные и актуальные данные",
              "Использовать сервисы согласно применимому законодательству",
              "Не вмешиваться и не пытаться получить несанкционированный доступ",
              "Сохранять конфиденциальность учетных данных",
              "Соблюдать платежные условия договора",
              "Не использовать сервисы для незаконной деятельности/нарушения прав третьих лиц",
              "Не копировать/распространять решения без письменного согласия TINKA AI",
            ],
          },
        ],
      },
      {
        h2: "5. Конфиденциальность и данные",
        body: [
          {
            type: "ul",
            items: [
              "5.1. TINKA AI защищает данные согласно Политике конфиденциальности и применимому законодательству.",
              "5.2. Стороны сохраняют конфиденциальность чувствительной информации.",
            ],
          },
        ],
      },
      {
        h2: "6. Гарантия и поддержка",
        body: [
          {
            type: "ul",
            items: [
              "6.1. Гарантии — по индивидуальному договору.",
              "6.2. Поддержка и обслуживание — согласно выбранному пакету.",
              "6.3. Не гарантируется бесперебойная работа при форс-мажоре, сбоях у третьих лиц или неправильном использовании.",
            ],
          },
        ],
      },
      {
        h2: "7. Ограничение ответственности",
        body: [
          {
            type: "ul",
            items: [
              "7.1. Ответственность TINKA AI ограничена суммой, уплаченной за соответствующую услугу за последние 12 месяцев.",
              "7.2. Не отвечает за косвенные/сопутствующие убытки, упущенную выгоду/данные, проблемы от несанкционированных изменений, интеграции с третьими лицами и неверного использования.",
              "7.3. Клиент самостоятельно делает регулярные резервные копии данных.",
            ],
          },
        ],
      },
      {
        h2: "8. Цены и платежи",
        body: [
          {
            type: "ul",
            items: [
              "8.1. Цены указаны в коммерческих предложениях и договорах.",
              "8.2. Платежи — по графику договора.",
              "8.3. Возможна приостановка услуг при просрочке.",
              "8.4. Валюта/НДС — согласно договору и закону.",
            ],
          },
        ],
      },
      {
        h2: "9. Прекращение услуг",
        body: [
          {
            type: "ul",
            items: [
              "9.1. Каждая сторона может прекратить с уведомлением минимум за 30 дней согласно договору.",
              "9.2. Немедленное прекращение — при существенных нарушениях.",
              "9.3. При прекращении оплачиваются все оказанные услуги.",
            ],
          },
        ],
      },
      {
        h2: "10. Изменения условий",
        body: [
          {
            type: "p",
            text:
              "TINKA AI может изменять условия. Существенные изменения будут сообщены. Дальнейшее использование означает согласие.",
          },
        ],
      },
      {
        h2: "11. Форс-мажор",
        body: [
          {
            type: "p",
            text:
              "Стороны не несут ответственности за неисполнение при обстоятельствах непреодолимой силы (стихии, войны, пандемии, ограничения и т. п.).",
          },
        ],
      },
      {
        h2: "12. Применимое право и юрисдикция",
        body: [
          {
            type: "ul",
            items: [
              "12.1. Применяется право Республики Молдова.",
              "12.2. Споры: сначала урегулирование, иначе — компетентные суды РМ.",
            ],
          },
        ],
      },
      {
        h2: "13. Контакты",
        body: [
          { type: "p", text: "По вопросам условий обращайтесь:" },
          { type: "ul", items: ["Email: office@tinka.md", "Компания: SRL «TINKA AI»"] },
          {
            type: "p",
            text:
              "Используя сервисы TINKA AI, вы подтверждаете, что прочитали, поняли и приняли настоящие условия.",
          },
        ],
      },
    ],
    contactLabel: "Вопросы по условиям?",
    contactEmailLabel: "Пишите на",
    email: "office@tinka.md",
  },

  en: {
    back: "Back to Home",
    title: "Terms & Conditions",
    updated: "Last updated: August 2025",
    sections: [
      {
        h2: "1. Acceptance of Terms",
        body: [
          {
            type: "p",
            text:
              "By accessing and using TINKA AI services, you acknowledge and agree to be bound by these Terms. If you do not agree, please do not use our services.",
          },
        ],
      },
      {
        h2: "2. Service Description",
        body: [
          {
            type: "p",
            text: "TINKA AI provides IT, web and AI solutions, including but not limited to:",
          },
          {
            type: "ul",
            items: [
              "AI chatbots and assistants development & implementation",
              "Workflow automation systems",
              "AI integrations with existing systems",
              "Custom AI solution development",
              "Responsive website design and development",
              "Custom software development",
              "SaaS or on-premise functional platforms",
              "Photo, video and copy for Social Media Marketing (SMM)",
              "Databases for online shops — creation & administration",
              "IT & AI consulting",
            ],
          },
        ],
      },
      {
        h2: "3. Intellectual Property",
        body: [
          {
            type: "ul",
            items: [
              "3.1. IP rights remain with TINKA AI until full payment per contract.",
              "3.2. After full payment, the client obtains usage rights as per the individual contract.",
              "3.3. Source code, methodologies and proprietary tech remain with TINKA AI unless otherwise agreed in writing.",
            ],
          },
        ],
      },
      {
        h2: "4. User Responsibilities",
        body: [
          { type: "p", text: "The client agrees to:" },
          {
            type: "ul",
            items: [
              "Provide accurate, complete and up-to-date information",
              "Use services in compliance with applicable laws",
              "Not interfere with or attempt unauthorized access",
              "Keep credentials confidential",
              "Follow payment terms set in the contract",
              "Not use services for illegal or infringing activities",
              "Not reproduce/redistribute deliverables without written consent",
            ],
          },
        ],
      },
      {
        h2: "5. Privacy & Data Protection",
        body: [
          {
            type: "ul",
            items: [
              "5.1. TINKA AI protects data per its Privacy Policy and applicable law.",
              "5.2. Both parties keep sensitive collaboration information confidential.",
            ],
          },
        ],
      },
      {
        h2: "6. Warranty & Maintenance",
        body: [
          {
            type: "ul",
            items: [
              "6.1. Warranty per individual contract.",
              "6.2. Support and maintenance per selected plan.",
              "6.3. No uptime guarantee in force majeure, third-party outages or misuse.",
            ],
          },
        ],
      },
      {
        h2: "7. Limitation of Liability",
        body: [
          {
            type: "ul",
            items: [
              "7.1. Liability is limited to fees paid for the specific service in the last 12 months.",
              "7.2. No liability for indirect/consequential losses, lost profit/data, issues from unauthorized changes, third-party integrations or misuse.",
              "7.3. Client is responsible for regular backups.",
            ],
          },
        ],
      },
      {
        h2: "8. Pricing & Payments",
        body: [
          {
            type: "ul",
            items: [
              "8.1. Pricing is set in offers and contracts.",
              "8.2. Payments follow the contractual schedule.",
              "8.3. Service may be suspended for non-payment.",
              "8.4. Currency and VAT per contract and applicable law.",
            ],
          },
        ],
      },
      {
        h2: "9. Termination",
        body: [
          {
            type: "ul",
            items: [
              "9.1. Either party may terminate with at least 30 days’ notice per contract.",
              "9.2. Immediate termination for material breaches.",
              "9.3. Upon termination, all services rendered remain payable.",
            ],
          },
        ],
      },
      {
        h2: "10. Changes to Terms",
        body: [
          {
            type: "p",
            text:
              "TINKA AI may update these Terms. Material changes will be communicated; continued use constitutes acceptance.",
          },
        ],
      },
      {
        h2: "11. Force Majeure",
        body: [
          {
            type: "p",
            text:
              "No party is liable for non-performance caused by events beyond reasonable control (natural disasters, war, pandemics, restrictions, etc.).",
          },
        ],
      },
      {
        h2: "12. Governing Law & Jurisdiction",
        body: [
          {
            type: "ul",
            items: [
              "12.1. Governed by the laws of the Republic of Moldova.",
              "12.2. Disputes: amicable resolution first; otherwise, competent courts in Moldova.",
            ],
          },
        ],
      },
      {
        h2: "13. Contact",
        body: [
          { type: "p", text: "For questions about these Terms & Conditions:" },
          { type: "ul", items: ["Email: office@tinka.md", "Company: SRL “TINKA AI”"] },
          {
            type: "p",
            text:
              "By using TINKA AI services you confirm that you have read, understood, and accepted these Terms & Conditions.",
          },
        ],
      },
    ],
    contactLabel: "Questions about these terms?",
    contactEmailLabel: "Email us at",
    email: "office@tinka.md",
  },
}

export default function TermsPage() {
  const { locale, t: T } = useLocale() as any
  const L = (TERMS as any)[locale as "ro" | "ru" | "en"] ?? TERMS.ro

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="text-foreground hover:bg-muted mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {T?.nav?.home ?? L.back}
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-2">{L.title}</h1>
          <p className="text-sm text-muted-foreground mb-8">{L.updated}</p>

          <article className="prose prose-invert max-w-none">
            {L.sections.map((s, i) => (
              <section key={i} className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">{s.h2}</h2>
                <div className="space-y-4 text-muted-foreground">
                  {s.body.map((b, j) => {
                    if (b.type === "p") return <p key={j}>{b.text}</p>
                    if (b.type === "ul")
                      return (
                        <ul key={j} className="list-disc pl-6 space-y-1">
                          {b.items.map((it, k) => (
                            <li key={k}>{it}</li>
                          ))}
                        </ul>
                      )
                    if (b.type === "h2")
                      return (
                        <h3 key={j} className="text-xl font-semibold text-foreground">
                          {b.text}
                        </h3>
                      )
                    return null
                  })}
                </div>
              </section>
            ))}
          </article>

          <div className="mt-10 rounded-lg border border-border p-4 text-sm text-muted-foreground">
            <p>
              {L.contactLabel}{" "}
              <a href={`mailto:${L.email}`} className="text-info hover:underline">
                {L.contactEmailLabel} {L.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
