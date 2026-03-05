"use client"

import Link from "next/link"
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
    title: "Termeni și Condiții",
    updated: "Ultima actualizare: Martie 2025",
    sections: [
      {
        h2: "1. Acceptarea Termenilor",
        body: [
          { type: "p", text: "Prin accesarea și utilizarea website-ului tinka.md și a serviciilor oferite de TINKA AI, confirmați că ați citit, înțeles și acceptați prezentii Termeni și Condiții. Dacă nu sunteți de acord, vă rugăm să nu utilizați serviciile noastre." },
        ],
      },
      {
        h2: "2. Descrierea Serviciilor",
        body: [
          { type: "p", text: "TINKA AI oferă următoarele servicii:" },
          { type: "ul", items: ["Creare și design website-uri profesionale", "Dezvoltare și integrare chatbot-uri AI", "Automatizări business și integrări software", "Consultanță digitală și strategie online", "Magazine online și soluții e-commerce", "Optimizare SEO și marketing digital"] },
        ],
      },
      {
        h2: "3. Comenzi și Contracte",
        body: [
          { type: "p", text: "3.1. Fiecare proiect este supus unui contract individual semnat de ambele părți, care specifică scopul, termenele, costul și condițiile de livrare." },
          { type: "p", text: "3.2. Comanda devine fermă după confirmarea în scris (email sau contract semnat) și achitarea avansului convenit." },
          { type: "p", text: "3.3. Modificările de scop solicitate după semnarea contractului pot atrage costuri și termene suplimentare." },
        ],
      },
      {
        h2: "4. Prețuri și Plăți",
        body: [
          { type: "p", text: "4.1. Prețurile sunt stabilite individual, în funcție de complexitatea proiectului, și sunt indicate în oferta/contractul transmis clientului." },
          { type: "p", text: "4.2. Plata se efectuează conform graficului stabilit în contract (de regulă: avans + plată finală la livrare)." },
          { type: "p", text: "4.3. Toate prețurile sunt exprimate în MDL sau EUR și includ TVA acolo unde este aplicabil conform legislației Republicii Moldova." },
        ],
      },
      {
        h2: "5. Drepturi de Proprietate Intelectuală",
        body: [
          { type: "p", text: "5.1. La finalizarea plății integrale, drepturile de autor asupra produsului livrat (cod, design, conținut creat de TINKA AI) se transferă clientului, cu excepția componentelor terțe (biblioteci, teme, plugin-uri) care rămân sub licențele lor originale." },
          { type: "p", text: "5.2. TINKA AI își rezervă dreptul de a prezenta proiectul în portofoliu, cu acordul clientului." },
          { type: "p", text: "5.3. Clientul garantează că materialele furnizate (logo, texte, imagini) nu încalcă drepturile terților." },
        ],
      },
      {
        h2: "6. Garanție și Suport",
        body: [
          { type: "p", text: "6.1. TINKA AI oferă o perioadă de garanție de 30 de zile pentru corectarea erorilor tehnice apărute din vina noastră după livrare." },
          { type: "p", text: "6.2. Serviciile de suport și mentenanță pe termen lung sunt disponibile prin pachete separate, stabilite contractual." },
        ],
      },
      {
        h2: "7. Limitarea Răspunderii",
        body: [
          { type: "p", text: "7.1. TINKA AI nu este responsabilă pentru pierderi indirecte, pierderi de profit, pierderi de date sau daune rezultate din utilizarea sau imposibilitatea utilizării serviciilor noastre, în afara cazurilor prevăzute de lege." },
          { type: "p", text: "7.2. Răspunderea maximă a TINKA AI este limitată la valoarea contractului aferent proiectului în cauză." },
        ],
      },
      {
        h2: "8. Confidențialitate",
        body: [
          { type: "p", text: "Colectarea și prelucrarea datelor cu caracter personal sunt descrise în Politica de Confidențialitate, care face parte integrantă din acești Termeni." },
        ],
      },
      {
        h2: "9. Modificarea Termenilor",
        body: [
          { type: "p", text: "TINKA AI își rezervă dreptul de a modifica acești Termeni și Condiții în orice moment. Modificările vor fi publicate pe această pagină cu data actualizării. Continuarea utilizării serviciilor după publicarea modificărilor constituie acceptarea noilor termeni." },
        ],
      },
      {
        h2: "10. Legea Aplicabilă",
        body: [
          { type: "p", text: "Acești Termeni sunt guvernați de legislația Republicii Moldova. Orice litigiu va fi soluționat pe cale amiabilă sau, în caz de eșec, de instanțele competente din Republica Moldova." },
        ],
      },
      {
        h2: "11. Contact",
        body: [
          { type: "ul", items: ["Email: office@tinka.md", "Telefon: +373 68 333 899", "Adresa: Chișinău, Republica Moldova"] },
        ],
      },
    ],
    contactLabel: "Întrebări despre acești Termeni?",
    contactEmailLabel: "Scrie-ne la",
    email: "office@tinka.md",
  },

  ru: {
    back: "На главную",
    title: "Условия использования",
    updated: "Последнее обновление: Март 2025",
    sections: [
      {
        h2: "1. Принятие условий",
        body: [
          { type: "p", text: "Используя сайт tinka.md и услуги TINKA AI, вы подтверждаете, что прочитали, поняли и принимаете настоящие Условия. Если вы не согласны, пожалуйста, не используйте наши услуги." },
        ],
      },
      {
        h2: "2. Описание услуг",
        body: [
          { type: "p", text: "TINKA AI предоставляет следующие услуги:" },
          { type: "ul", items: ["Создание и дизайн профессиональных сайтов", "Разработка и интеграция AI-чатботов", "Автоматизация бизнеса и интеграции ПО", "Цифровой консалтинг и онлайн-стратегия", "Интернет-магазины и e-commerce решения", "SEO-оптимизация и digital-маркетинг"] },
        ],
      },
      {
        h2: "3. Заказы и контракты",
        body: [
          { type: "p", text: "3.1. Каждый проект оформляется индивидуальным договором, подписанным обеими сторонами, с указанием объёма, сроков, стоимости и условий поставки." },
          { type: "p", text: "3.2. Заказ считается подтверждённым после письменного согласования (email или подписанный договор) и оплаты аванса." },
          { type: "p", text: "3.3. Изменения объёма после подписания договора могут повлечь дополнительные расходы и сроки." },
        ],
      },
      {
        h2: "4. Цены и оплата",
        body: [
          { type: "p", text: "4.1. Цены устанавливаются индивидуально в зависимости от сложности проекта и указываются в коммерческом предложении/договоре." },
          { type: "p", text: "4.2. Оплата производится по графику, установленному в договоре (как правило: аванс + итоговый платёж при сдаче)." },
          { type: "p", text: "4.3. Все цены указаны в MDL или EUR и включают НДС там, где это применимо согласно законодательству Республики Молдова." },
        ],
      },
      {
        h2: "5. Права интеллектуальной собственности",
        body: [
          { type: "p", text: "5.1. После полной оплаты авторские права на поставленный продукт (код, дизайн, контент, созданный TINKA AI) переходят к клиенту, за исключением сторонних компонентов (библиотеки, темы, плагины), остающихся под своими лицензиями." },
          { type: "p", text: "5.2. TINKA AI оставляет за собой право представить проект в портфолио с согласия клиента." },
          { type: "p", text: "5.3. Клиент гарантирует, что предоставленные материалы (логотип, тексты, изображения) не нарушают права третьих лиц." },
        ],
      },
      {
        h2: "6. Гарантия и поддержка",
        body: [
          { type: "p", text: "6.1. TINKA AI предоставляет 30-дневный гарантийный период для исправления технических ошибок, возникших по нашей вине после сдачи." },
          { type: "p", text: "6.2. Долгосрочная поддержка и обслуживание доступны по отдельным пакетам, согласованным в договоре." },
        ],
      },
      {
        h2: "7. Ограничение ответственности",
        body: [
          { type: "p", text: "7.1. TINKA AI не несёт ответственности за косвенные убытки, упущенную выгоду, потерю данных или ущерб, возникший в результате использования или невозможности использования наших услуг, за исключением случаев, предусмотренных законом." },
          { type: "p", text: "7.2. Максимальная ответственность TINKA AI ограничена стоимостью соответствующего договора." },
        ],
      },
      {
        h2: "8. Конфиденциальность",
        body: [
          { type: "p", text: "Сбор и обработка персональных данных описаны в Политике конфиденциальности, которая является неотъемлемой частью настоящих Условий." },
        ],
      },
      {
        h2: "9. Изменение условий",
        body: [
          { type: "p", text: "TINKA AI оставляет за собой право изменять настоящие Условия в любое время. Изменения публикуются на этой странице с датой обновления. Продолжение использования услуг после публикации изменений означает их принятие." },
        ],
      },
      {
        h2: "10. Применимое право",
        body: [
          { type: "p", text: "Настоящие Условия регулируются законодательством Республики Молдова. Любые споры решаются в досудебном порядке или, при его неудаче, в компетентных судах Республики Молдова." },
        ],
      },
      {
        h2: "11. Контакты",
        body: [
          { type: "ul", items: ["Email: office@tinka.md", "Телефон: +373 68 333 899", "Адрес: Кишинёв, Республика Молдова"] },
        ],
      },
    ],
    contactLabel: "Вопросы по этим Условиям?",
    contactEmailLabel: "Пишите нам на",
    email: "office@tinka.md",
  },

  en: {
    back: "Back to Home",
    title: "Terms and Conditions",
    updated: "Last updated: March 2025",
    sections: [
      {
        h2: "1. Acceptance of Terms",
        body: [
          { type: "p", text: "By accessing and using tinka.md and the services offered by TINKA AI, you confirm that you have read, understood and accept these Terms and Conditions. If you do not agree, please do not use our services." },
        ],
      },
      {
        h2: "2. Description of Services",
        body: [
          { type: "p", text: "TINKA AI provides the following services:" },
          { type: "ul", items: ["Professional website creation and design", "AI chatbot development and integration", "Business automation and software integrations", "Digital consulting and online strategy", "Online stores and e-commerce solutions", "SEO optimization and digital marketing"] },
        ],
      },
      {
        h2: "3. Orders and Contracts",
        body: [
          { type: "p", text: "3.1. Each project is subject to an individual contract signed by both parties, specifying scope, deadlines, cost and delivery conditions." },
          { type: "p", text: "3.2. An order becomes firm after written confirmation (email or signed contract) and payment of the agreed advance." },
          { type: "p", text: "3.3. Scope changes requested after signing the contract may incur additional costs and timelines." },
        ],
      },
      {
        h2: "4. Prices and Payments",
        body: [
          { type: "p", text: "4.1. Prices are set individually based on project complexity and are stated in the offer/contract sent to the client." },
          { type: "p", text: "4.2. Payment is made according to the schedule in the contract (typically: advance + final payment on delivery)." },
          { type: "p", text: "4.3. All prices are expressed in MDL or EUR and include VAT where applicable under Moldovan law." },
        ],
      },
      {
        h2: "5. Intellectual Property Rights",
        body: [
          { type: "p", text: "5.1. Upon full payment, copyright over the delivered product (code, design, content created by TINKA AI) transfers to the client, except for third-party components (libraries, themes, plugins) which remain under their original licenses." },
          { type: "p", text: "5.2. TINKA AI reserves the right to showcase the project in its portfolio with the client's consent." },
          { type: "p", text: "5.3. The client guarantees that provided materials (logo, texts, images) do not infringe third-party rights." },
        ],
      },
      {
        h2: "6. Warranty and Support",
        body: [
          { type: "p", text: "6.1. TINKA AI provides a 30-day warranty period for correcting technical errors arising from our fault after delivery." },
          { type: "p", text: "6.2. Long-term support and maintenance services are available through separate packages agreed in the contract." },
        ],
      },
      {
        h2: "7. Limitation of Liability",
        body: [
          { type: "p", text: "7.1. TINKA AI is not liable for indirect losses, loss of profit, data loss or damages resulting from the use or inability to use our services, except as required by law." },
          { type: "p", text: "7.2. TINKA AI's maximum liability is limited to the value of the relevant contract." },
        ],
      },
      {
        h2: "8. Privacy",
        body: [
          { type: "p", text: "The collection and processing of personal data are described in the Privacy Policy, which forms an integral part of these Terms." },
        ],
      },
      {
        h2: "9. Modification of Terms",
        body: [
          { type: "p", text: "TINKA AI reserves the right to modify these Terms at any time. Changes will be published on this page with the update date. Continued use of services after publication of changes constitutes acceptance of the new terms." },
        ],
      },
      {
        h2: "10. Applicable Law",
        body: [
          { type: "p", text: "These Terms are governed by the laws of the Republic of Moldova. Any disputes shall be resolved amicably or, failing that, by the competent courts of the Republic of Moldova." },
        ],
      },
      {
        h2: "11. Contact",
        body: [
          { type: "ul", items: ["Email: office@tinka.md", "Phone: +373 68 333 899", "Address: Chișinău, Republic of Moldova"] },
        ],
      },
    ],
    contactLabel: "Questions about these Terms?",
    contactEmailLabel: "Email us at",
    email: "office@tinka.md",
  },
}

export default function TermsPage() {
  const { locale, t: T } = useLocale() as any
  const L = (TERMS as any)[locale as "ro" | "ru" | "en"] ?? TERMS.ro

  const subjects = {
    ro: "Întrebare privind Termenii și Condițiile",
    ru: "Вопрос по Условиям использования",
    en: "Question about the Terms and Conditions",
  } as const

  const lang = (["ro", "ru", "en"] as const).includes(locale as any)
    ? (locale as "ro" | "ru" | "en")
    : "ro"

  const mailHref = `mailto:${L.email}?subject=${encodeURIComponent(subjects[lang])}`

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">

          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            ← {L.back}
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-2">{L.title}</h1>
          <p className="text-sm text-muted-foreground mb-8">{L.updated}</p>

          <article className="prose prose-invert max-w-none">
            {L.sections.map((s: any, i: number) => (
              <section key={i} className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">{s.h2}</h2>
                <div className="space-y-4 text-muted-foreground">
                  {s.body.map((b: any, j: number) => {
                    if (b.type === "p") return <p key={j}>{b.text}</p>
                    if (b.type === "ul") return (
                      <ul key={j} className="list-disc pl-6 space-y-1">
                        {b.items.map((it: string, k: number) => <li key={k}>{it}</li>)}
                      </ul>
                    )
                    if (b.type === "h2") return <h3 key={j} className="text-xl font-semibold text-foreground">{b.text}</h3>
                    return null
                  })}
                </div>
              </section>
            ))}
          </article>

          <div className="mt-10 rounded-lg border border-border p-4 text-sm text-muted-foreground">
            <p>
              {L.contactLabel}{" "}
              <a href={mailHref} className="text-sky-400 hover:underline">
                {L.contactEmailLabel} {L.email}
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
