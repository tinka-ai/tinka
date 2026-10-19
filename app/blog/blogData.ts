export type Locale = "ro" | "ru" | "en"

export type Article = {
  slug: string
  date: string
  readTime: number
  category: string
  /** URL public al imaginii generate AI pentru articol (Cloudflare R2). Optional — articolele mai vechi, dinainte de pipeline-ul de generare imagini, nu au acest camp si folosesc og-image.webp ca fallback. */
  image?: string
  translations: Record<Locale, {
    title: string
    description: string
    content: string
  }>
}

export const articles: Article[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // ARTICOL 1
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "cat-costa-un-site-web-in-moldova",
    date: "2025-03-01",
    readTime: 5,
    category: "web-design",
    translations: {
      ro: {
        title: "Cât costă un site web în Moldova în 2025",
        description: "Ghid complet cu prețuri reale pentru site-uri de prezentare, magazine online și landing page-uri în Republica Moldova.",
        content: `
## De ce variază atât de mult prețurile?

Când cauți "creare site Moldova" pe Google, vezi prețuri de la 200 lei până la 50.000 lei. Diferența e uriașă — și asta creează multă confuzie pentru antreprenorii care vor să-și digitalizeze afacerea.

În acest articol îți explicăm **exact** ce include fiecare categorie de preț și cum să alegi corect.

## Tipuri de site-uri și prețuri orientative în 2025

### 1. Site de prezentare simplu — 300–800 USD
Ideal pentru: cabinete medicale, avocați, consultanți, meșteri, freelanceri.

**Ce include:**
- 3–5 pagini (Acasă, Despre, Servicii, Contact)
- Design modern, mobil-friendly
- Formular de contact
- SEO de bază
- Livrare în 5–10 zile

### 2. Site de prezentare avansat — 800–2.000 USD
Ideal pentru: restaurante, hoteluri, firme de construcții, agenții.

**Ce include:**
- 8–15 pagini
- Design personalizat
- Galerie foto/video
- Blog
- SEO avansat local
- Chatbot AI integrat
- Livrare în 2–4 săptămâni

### 3. Magazin online — 1.500–5.000 USD
Ideal pentru: magazine cu produse fizice, branduri locale.

**Ce include:**
- Catalog produse nelimitat
- Coș și plată online (card, PayPal, cash)
- Gestiune stocuri
- Email automat la comandă
- Livrare în 3–6 săptămâni

### 4. Platformă SaaS / aplicație web — 5.000+ USD
Ideal pentru: startup-uri tech, platforme cu utilizatori înregistrați.

## Ce NU ar trebui să cumperi ieftin

Dacă un site costă sub 150 USD — de obicei primești un template Wix sau WordPress cu pluginuri gratuite, fără optimizare SEO, fără suport și fără posibilitate de modificare.

**Costurile ascunse ale site-urilor ieftine:**
- Hosting plătit separat: 50–150 USD/an
- Domeniu: 10–15 USD/an
- Certificat SSL: uneori extra
- Modificări: plătești per oră

## De ce merită să investești în calitate

Un site bine făcut:
- Apare pe prima pagină Google în 60–90 de zile
- Convertește vizitatorii în clienți
- Funcționează fără probleme tehnice
- Nu are nevoie de redesign după 1 an

La TINKA AI oferim **evaluare gratuită** a proiectului tău în 24 de ore. Scrie-ne la office@tinka.md sau sună la +373 68 333 899.
        `,
      },
      ru: {
        title: "Сколько стоит сайт в Молдове в 2025 году",
        description: "Полный гайд с реальными ценами на сайты-визитки, интернет-магазины и лендинги в Республике Молдова.",
        content: `
## Почему цены так сильно различаются?

Когда ищешь «создание сайта Молдова» в Google, видишь цены от 200 леев до 50 000 леев. Разница огромная — и это создаёт много путаницы для предпринимателей, которые хотят перейти в онлайн.

В этой статье объясняем **точно**, что входит в каждую ценовую категорию и как выбрать правильно.

## Типы сайтов и ориентировочные цены в 2025 году

### 1. Простой сайт-визитка — 300–800 USD
Подходит для: медицинских кабинетов, юристов, консультантов, мастеров, фрилансеров.

**Что включает:**
- 3–5 страниц (Главная, О нас, Услуги, Контакты)
- Современный дизайн, адаптивный для мобильных
- Контактная форма
- Базовое SEO
- Срок: 5–10 дней

### 2. Продвинутый сайт-визитка — 800–2 000 USD
Подходит для: ресторанов, отелей, строительных компаний, агентств.

**Что включает:**
- 8–15 страниц
- Индивидуальный дизайн
- Фото/видео галерея
- Блог
- Продвинутое локальное SEO
- Интегрированный AI-чатбот
- Срок: 2–4 недели

### 3. Интернет-магазин — 1 500–5 000 USD
Подходит для: магазинов с физическими товарами, локальных брендов.

**Что включает:**
- Неограниченный каталог товаров
- Корзина и онлайн-оплата (карта, PayPal, наличные)
- Управление складом
- Автоматические письма при заказе
- Срок: 3–6 недель

### 4. SaaS-платформа / веб-приложение — от 5 000 USD
Подходит для: tech-стартапов, платформ с зарегистрированными пользователями.

## Что НЕ стоит покупать дёшево

Если сайт стоит меньше 150 USD — как правило, вы получаете шаблон Wix или WordPress с бесплатными плагинами, без SEO-оптимизации, без поддержки и без возможности изменений.

**Скрытые расходы дешёвых сайтов:**
- Хостинг отдельно: 50–150 USD/год
- Домен: 10–15 USD/год
- SSL-сертификат: иногда доплата
- Правки: платите за каждый час

## Почему стоит инвестировать в качество

Хорошо сделанный сайт:
- Появляется на первой странице Google за 60–90 дней
- Превращает посетителей в клиентов
- Работает без технических проблем
- Не требует редизайна через год

В TINKA AI мы предлагаем **бесплатную оценку** вашего проекта за 24 часа. Пишите на office@tinka.md или звоните +373 68 333 899.
        `,
      },
      en: {
        title: "How much does a website cost in Moldova in 2025",
        description: "Complete guide with real prices for business websites, online stores and landing pages in the Republic of Moldova.",
        content: `
## Why do prices vary so much?

When you search for "website creation Moldova" on Google, you see prices ranging from $50 to $5,000. The difference is enormous — and it creates a lot of confusion for entrepreneurs who want to go digital.

In this article, we explain **exactly** what each price category includes and how to choose correctly.

## Types of websites and estimated prices in 2025

### 1. Simple business website — $300–$800
Best for: medical offices, lawyers, consultants, craftsmen, freelancers.

**Includes:**
- 3–5 pages (Home, About, Services, Contact)
- Modern, mobile-friendly design
- Contact form
- Basic SEO
- Delivery in 5–10 days

### 2. Advanced business website — $800–$2,000
Best for: restaurants, hotels, construction companies, agencies.

**Includes:**
- 8–15 pages
- Custom design
- Photo/video gallery
- Blog
- Advanced local SEO
- Integrated AI chatbot
- Delivery in 2–4 weeks

### 3. Online store — $1,500–$5,000
Best for: stores with physical products, local brands.

**Includes:**
- Unlimited product catalog
- Shopping cart and online payment (card, PayPal, cash)
- Stock management
- Automatic order emails
- Delivery in 3–6 weeks

### 4. SaaS platform / web application — $5,000+
Best for: tech startups, platforms with registered users.

## What you should NOT buy cheap

If a website costs less than $150 — you usually get a Wix or WordPress template with free plugins, no SEO optimization, no support and no ability to modify.

**Hidden costs of cheap websites:**
- Hosting paid separately: $50–$150/year
- Domain: $10–$15/year
- SSL certificate: sometimes extra
- Modifications: you pay per hour

## Why it's worth investing in quality

A well-made website:
- Appears on Google's first page in 60–90 days
- Converts visitors into customers
- Works without technical issues
- Doesn't need a redesign after 1 year

At TINKA AI we offer a **free evaluation** of your project within 24 hours. Email us at office@tinka.md or call +373 68 333 899.
        `,
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ARTICOL 2
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "chatbot-ai-pentru-afaceri-mici",
    date: "2025-03-08",
    readTime: 6,
    category: "ai",
    translations: {
      ro: {
        title: "Chatbot AI pentru afaceri mici — ghid complet 2025",
        description: "Tot ce trebuie să știi despre chatbot-urile AI pentru IMM-uri: cum funcționează, cât costă și cum îți cresc vânzările.",
        content: `
## Ce este un chatbot AI și de ce contează pentru tine

Un chatbot AI este un asistent virtual care răspunde automat la întrebările clienților tăi — pe site, WhatsApp sau Messenger — 24 de ore din 24, 7 zile din 7.

Spre deosebire de chatbot-urile simple (care au răspunsuri fixe), **chatbot-urile AI înțeleg limbajul natural** și pot purta conversații reale cu clienții tăi.

## Problema pe care o rezolvă

Gândește-te la o zi tipică în afacerea ta:
- Clienții întreabă același lucru de zeci de ori: "Ce prețuri aveți?", "Cum fac o programare?", "Livrați și în..."
- Angajații pierd 2–3 ore zilnic pe mesaje repetitive
- Seara și weekendul — nimeni nu răspunde, clienții pleacă la concurență

**Un chatbot AI rezolvă toate acestea automat.**

## Ce poate face un chatbot AI pentru afacerea ta

### Răspunde la întrebări frecvente
Prețuri, program, locație, servicii disponibile — instant, oricând.

### Preia programări și rezervări
Clientul alege data și ora direct în chat, fără să sune.

### Colectează lead-uri
"Lasă-mi numărul tău și te contactez eu" — chatbot-ul face asta automat.

### Procesează comenzi simple
Pentru magazine online sau servicii standardizate.

### Escaladează cazurile complexe
Când nu știe răspunsul — transferă automat la un angajat uman.

## Rezultate reale de la clienții noștri

**Salon de frumusețe din Chișinău:**
- Înainte: 40 apeluri/zi pentru programări
- După chatbot: 80% din programări se fac automat
- Timp economisit: 3 ore zilnic

**Magazin online de cosmetice:**
- Timp de răspuns: de la 4 ore → 30 secunde
- Creștere vânzări: +28% în prima lună

## Cât costă un chatbot AI în 2025

La TINKA AI oferim pachete clare:

| Pachet | Preț | Potrivit pentru |
|--------|------|-----------------|
| Basic | 300–500 USD | FAQ + contact |
| Standard | 500–1.000 USD | Programări + lead-uri |
| Advanced | 1.000–2.500 USD | E-commerce + CRM |

**Integrare WhatsApp Business** — disponibilă în toate pachetele.

## Cum începi

1. Ne contactezi la office@tinka.md
2. Facem un audit gratuit de 30 minute al proceselor tale
3. Îți propunem soluția potrivită
4. Implementare în 1–2 săptămâni
5. Testezi gratuit 14 zile

**Sună acum:** +373 68 333 899
        `,
      },
      ru: {
        title: "AI-чатбот для малого бизнеса — полный гайд 2025",
        description: "Всё, что нужно знать об AI-чатботах для малого и среднего бизнеса: как работают, сколько стоят и как увеличивают продажи.",
        content: `
## Что такое AI-чатбот и почему он важен для вас

AI-чатбот — это виртуальный помощник, который автоматически отвечает на вопросы ваших клиентов — на сайте, в WhatsApp или Messenger — 24 часа в сутки, 7 дней в неделю.

В отличие от простых чатботов (с фиксированными ответами), **AI-чатботы понимают естественный язык** и могут вести настоящие беседы с вашими клиентами.

## Проблема, которую они решают

Представьте типичный день в вашем бизнесе:
- Клиенты задают одно и то же десятки раз: "Какие цены?", "Как записаться?", "Вы доставляете в...?"
- Сотрудники тратят 2–3 часа в день на повторяющиеся сообщения
- Вечером и в выходные — никто не отвечает, клиенты уходят к конкурентам

**AI-чатбот решает всё это автоматически.**

## Что умеет AI-чатбот для вашего бизнеса

### Отвечает на частые вопросы
Цены, расписание, адрес, доступные услуги — мгновенно, в любое время.

### Принимает запись и бронирование
Клиент выбирает дату и время прямо в чате, без звонка.

### Собирает лиды
"Оставьте номер, я перезвоню" — чатбот делает это автоматически.

### Обрабатывает простые заказы
Для интернет-магазинов или стандартизированных услуг.

### Передаёт сложные случаи оператору
Когда не знает ответа — автоматически переключает на живого сотрудника.

## Реальные результаты наших клиентов

**Салон красоты в Кишинёве:**
- До: 40 звонков/день для записи
- После чатбота: 80% записей происходят автоматически
- Сэкономленное время: 3 часа в день

**Онлайн-магазин косметики:**
- Время ответа: с 4 часов → 30 секунд
- Рост продаж: +28% в первый месяц

## Сколько стоит AI-чатбот в 2025 году

В TINKA AI у нас чёткие пакеты:

| Пакет | Цена | Для кого |
|-------|------|----------|
| Basic | 300–500 USD | FAQ + контакт |
| Standard | 500–1 000 USD | Запись + лиды |
| Advanced | 1 000–2 500 USD | E-commerce + CRM |

**Интеграция WhatsApp Business** — доступна во всех пакетах.

## Как начать

1. Пишите на office@tinka.md
2. Проводим бесплатный аудит 30 минут
3. Предлагаем подходящее решение
4. Внедрение за 1–2 недели
5. Тестируете бесплатно 14 дней

**Звоните:** +373 68 333 899
        `,
      },
      en: {
        title: "AI Chatbot for small businesses — complete guide 2025",
        description: "Everything you need to know about AI chatbots for SMEs: how they work, how much they cost and how they increase sales.",
        content: `
## What is an AI chatbot and why does it matter for you

An AI chatbot is a virtual assistant that automatically responds to your customers' questions — on your website, WhatsApp or Messenger — 24 hours a day, 7 days a week.

Unlike simple chatbots (which have fixed responses), **AI chatbots understand natural language** and can hold real conversations with your customers.

## The problem they solve

Think about a typical day in your business:
- Customers ask the same things dozens of times: "What are your prices?", "How do I book?", "Do you deliver to...?"
- Employees waste 2–3 hours daily on repetitive messages
- In the evenings and weekends — no one answers, customers go to competitors

**An AI chatbot solves all of this automatically.**

## What an AI chatbot can do for your business

### Answers frequently asked questions
Prices, schedule, location, available services — instantly, anytime.

### Takes bookings and reservations
The customer chooses the date and time directly in the chat, without calling.

### Collects leads
"Leave your number and I'll contact you" — the chatbot does this automatically.

### Processes simple orders
For online stores or standardized services.

### Escalates complex cases
When it doesn't know the answer — it automatically transfers to a human employee.

## Real results from our clients

**Beauty salon in Chișinău:**
- Before: 40 calls/day for bookings
- After chatbot: 80% of bookings happen automatically
- Time saved: 3 hours daily

**Online cosmetics store:**
- Response time: from 4 hours → 30 seconds
- Sales increase: +28% in the first month

## How much does an AI chatbot cost in 2025

At TINKA AI we offer clear packages:

| Package | Price | Best for |
|---------|-------|----------|
| Basic | $300–$500 | FAQ + contact |
| Standard | $500–$1,000 | Bookings + leads |
| Advanced | $1,000–$2,500 | E-commerce + CRM |

**WhatsApp Business integration** — available in all packages.

## How to get started

1. Contact us at office@tinka.md
2. We do a free 30-minute audit of your processes
3. We propose the right solution
4. Implementation in 1–2 weeks
5. Free 14-day trial

**Call now:** +373 68 333 899
        `,
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ARTICOL 3
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "seo-local-moldova-ghid",
    date: "2025-03-15",
    readTime: 7,
    category: "seo",
    translations: {
      ro: {
        title: "SEO local Moldova 2025 — ghid complet pentru antreprenori",
        description: "Cum să apari pe prima pagină Google în Chișinău și Moldova. Tactici SEO locale dovedite pentru IMM-uri.",
        content: `
## Ce este SEO local și de ce contează în Moldova

SEO local înseamnă să apari în rezultatele Google când cineva caută servicii **în zona ta geografică**.

Exemple de căutări locale în Moldova:
- "salon de frumusețe Chișinău"
- "avocat Bălți"
- "restaurant cu livrare Botanica"
- "service auto Rîșcani"

Dacă nu apari în primele 3 rezultate pentru astfel de căutări — pierzi clienți în fiecare zi.

## Cei 5 factori SEO local cei mai importanți

### 1. Google Business Profile (cel mai important)
Creează și optimizează-ți profilul pe **business.google.com**:
- Adaugă toate informațiile corecte
- Încarcă 10+ fotografii de calitate
- Răspunde la TOATE recenziile
- Postează săptămânal (oferte, noutăți, events)

### 2. Recenzii Google
**Numărul și calitatea recenziilor** e factorul #1 în SEO local.

Cum colectezi recenzii rapid:
- Trimite link direct clienților mulțumiți prin WhatsApp
- Pune un afiș cu QR code în locație
- Oferă 5% reducere la următoarea vizită pentru o recenzie

### 3. NAP consistent (Name, Address, Phone)
Numele, adresa și telefonul tău trebuie să fie **identice** pe:
- Site-ul tău
- Google Business
- Facebook
- Toate directoarele online

### 4. Conținut local pe site
Scrie despre **locurile și zonele** pe care le deservești:
- "Servicii web design în Chișinău, Bălți și Cahul"
- Pagini separate pentru fiecare oraș important

### 5. Backlinks locale
Obține linkuri de pe site-uri locale:
- Camera de Comerț Moldova
- Asociații profesionale
- Parteneri de business
- Ziare locale (unimedia.md, noi.md)

## Greșeli SEO comune în Moldova

**❌ Site fără HTTPS** — Google penalizează site-urile nesigure

**❌ Viteza slabă** — dacă site-ul se încarcă în +3 secunde, pierzi 40% din vizitatori

**❌ Fără versiune mobilă** — 70% din căutările locale se fac de pe telefon

**❌ Google Business neactualizat** — orele greșite sau pozele lipsă scad vizibilitatea

## Timeline realist pentru SEO local în Moldova

| Perioadă | Ce se întâmplă |
|----------|----------------|
| 0–30 zile | Google indexează site-ul, Google Business activ |
| 30–60 zile | Primele poziții pentru cuvinte cheie cu concurență mică |
| 60–90 zile | Prima pagină pentru cuvinte cheie principale |
| 3–6 luni | Trafic organic constant și crescător |

## Vrei să apari pe prima pagină Google?

La TINKA AI facem SEO local complet pentru afaceri din Moldova:
- Audit SEO gratuit
- Optimizare Google Business
- Creare conținut local
- Raport lunar cu progresul

**Contactează-ne:** office@tinka.md | +373 68 333 899
        `,
      },
      ru: {
        title: "Локальное SEO Молдова 2025 — полный гайд для предпринимателей",
        description: "Как появиться на первой странице Google в Кишинёве и Молдове. Проверенные тактики локального SEO для МСП.",
        content: `
## Что такое локальное SEO и почему оно важно в Молдове

Локальное SEO означает появление в результатах Google, когда кто-то ищет услуги **в вашем географическом районе**.

Примеры локальных запросов в Молдове:
- "салон красоты Кишинёв"
- "адвокат Бельцы"
- "ресторан с доставкой Ботаника"
- "автосервис Рышкань"

Если вы не появляетесь в первых 3 результатах по таким запросам — вы теряете клиентов каждый день.

## 5 важнейших факторов локального SEO

### 1. Google Business Profile (самый важный)
Создайте и оптимизируйте профиль на **business.google.com**:
- Добавьте все правильные данные
- Загрузите 10+ качественных фотографий
- Отвечайте на ВСЕ отзывы
- Публикуйте еженедельно (акции, новости, события)

### 2. Отзывы Google
**Количество и качество отзывов** — фактор №1 в локальном SEO.

Как быстро собирать отзывы:
- Отправляйте прямую ссылку довольным клиентам через WhatsApp
- Поставьте табличку с QR-кодом в заведении
- Предлагайте скидку 5% за отзыв

### 3. Единообразие NAP (Название, Адрес, Телефон)
Ваше название, адрес и телефон должны быть **одинаковыми** на:
- Вашем сайте
- Google Business
- Facebook
- Всех онлайн-справочниках

### 4. Локальный контент на сайте
Пишите о **местах и районах**, которые вы обслуживаете:
- "Услуги веб-дизайна в Кишинёве, Бельцах и Кагуле"
- Отдельные страницы для каждого важного города

### 5. Локальные обратные ссылки
Получайте ссылки с местных сайтов:
- Торгово-промышленная палата Молдовы
- Профессиональные ассоциации
- Деловые партнёры
- Местные СМИ (unimedia.md, noi.md)

## Распространённые SEO-ошибки в Молдове

**❌ Сайт без HTTPS** — Google штрафует небезопасные сайты

**❌ Низкая скорость** — если сайт грузится дольше 3 секунд, вы теряете 40% посетителей

**❌ Нет мобильной версии** — 70% локальных запросов делаются с телефона

**❌ Неактуальный Google Business** — неправильные часы или отсутствие фото снижают видимость

## Реалистичные сроки локального SEO в Молдове

| Период | Что происходит |
|--------|----------------|
| 0–30 дней | Google индексирует сайт, Google Business активен |
| 30–60 дней | Первые позиции по низкоконкурентным запросам |
| 60–90 дней | Первая страница по основным запросам |
| 3–6 месяцев | Стабильный и растущий органический трафик |

## Хотите попасть на первую страницу Google?

В TINKA AI мы делаем полное локальное SEO для бизнеса в Молдове:
- Бесплатный SEO-аудит
- Оптимизация Google Business
- Создание локального контента
- Ежемесячный отчёт о прогрессе

**Свяжитесь с нами:** office@tinka.md | +373 68 333 899
        `,
      },
      en: {
        title: "Local SEO Moldova 2025 — complete guide for entrepreneurs",
        description: "How to appear on Google's first page in Chișinău and Moldova. Proven local SEO tactics for SMEs.",
        content: `
## What is local SEO and why does it matter in Moldova

Local SEO means appearing in Google results when someone searches for services **in your geographic area**.

Examples of local searches in Moldova:
- "beauty salon Chișinău"
- "lawyer Bălți"
- "restaurant with delivery Botanica"
- "car service Rîșcani"

If you don't appear in the first 3 results for such searches — you're losing customers every day.

## The 5 most important local SEO factors

### 1. Google Business Profile (most important)
Create and optimize your profile on **business.google.com**:
- Add all correct information
- Upload 10+ quality photos
- Respond to ALL reviews
- Post weekly (offers, news, events)

### 2. Google Reviews
**The number and quality of reviews** is the #1 factor in local SEO.

How to collect reviews quickly:
- Send a direct link to satisfied customers via WhatsApp
- Put a sign with a QR code at your location
- Offer a 5% discount on the next visit for a review

### 3. Consistent NAP (Name, Address, Phone)
Your name, address and phone must be **identical** on:
- Your website
- Google Business
- Facebook
- All online directories

### 4. Local content on the website
Write about the **places and areas** you serve:
- "Web design services in Chișinău, Bălți and Cahul"
- Separate pages for each important city

### 5. Local backlinks
Get links from local websites:
- Moldova Chamber of Commerce
- Professional associations
- Business partners
- Local newspapers (unimedia.md, noi.md)

## Common SEO mistakes in Moldova

**❌ Website without HTTPS** — Google penalizes insecure websites

**❌ Slow speed** — if the website loads in +3 seconds, you lose 40% of visitors

**❌ No mobile version** — 70% of local searches are made from phones

**❌ Outdated Google Business** — wrong hours or missing photos reduce visibility

## Realistic timeline for local SEO in Moldova

| Period | What happens |
|--------|--------------|
| 0–30 days | Google indexes the site, Google Business active |
| 30–60 days | First positions for low-competition keywords |
| 60–90 days | First page for main keywords |
| 3–6 months | Stable and growing organic traffic |

## Want to appear on Google's first page?

At TINKA AI we do complete local SEO for businesses in Moldova:
- Free SEO audit
- Google Business optimization
- Local content creation
- Monthly progress report

**Contact us:** office@tinka.md | +373 68 333 899
        `,
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ARTICOL 4
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "cat-costa-un-crm-personalizat-in-moldova",
    date: "2026-09-24",
    readTime: 8,
    category: "custom-software",
    image: "https://pub-bc5d8e0529324fd4a08614212ba4438b.r2.dev/01aeb806-ce69-4ba8-bc0b-2b4c9b4b267e.png",
    translations: {
      ro: {
        title: "CRM personalizat vs. abonament: cât costă cu adevărat în Moldova",
        description: "Comparăm costul real dintre un abonament CRM importat (Bitrix24, HubSpot, Zoho) și un sistem personalizat, plus prețuri orientative pentru afaceri din Moldova.",
        content: `
## Câți bani "scurgi" lunar pe un CRM pe care nu-l deții?

Dacă firma ta plătește lunar 60, 100 sau 300 de dolari pentru un CRM importat — Bitrix24, HubSpot, Zoho, Pipedrive — probabil crezi că e "costul normal de a face afaceri". Nu e.

În 3 ani, acel abonament ajunge să coste **mai mult decât un sistem construit special pentru afacerea ta**, pe care îl deții definitiv, fără taxă lunară, fără curs valutar și fără limite artificiale de utilizatori.

## Problema reală: Excel, caiete și CRM-uri "la pachet"

Cele mai multe IMM-uri din Moldova gestionează clienții în unul din trei moduri:

- **Excel sau Google Sheets** — se pierd rânduri, nu există istoric, nimeni nu știe cine a sunat ultima dată clientul
- **Caiet de comenzi pe birou** — informația moare dacă angajatul respectiv lipsește sau pleacă din firmă
- **CRM generic importat** — plătit lunar în USD/EUR, cu funcții 80% inutile pentru afacerea ta și 20% din ce chiar ai nevoie

Toate trei variantele au același rezultat: **lead-uri pierdute, follow-up-uri uitate și decizii luate fără date reale.**

## Abonament SaaS vs. sistem personalizat — comparație pe 3 ani

### Ce plătești pentru un CRM importat
Pentru o echipă de 5 utilizatori, prețurile tipice în 2026:

- Bitrix24 (plan business): ~2.400–3.600 USD/3 ani
- HubSpot (Starter, per seat): ~3.600–7.200 USD/3 ani
- Zoho CRM (plan standard): ~2.500–4.000 USD/3 ani

La aceste sume se adaugă **riscul valutar** (plătești în valută, încasezi în lei), limitări la numărul de utilizatori sau înregistrări, și faptul că, dacă renunți la abonament, **pierzi accesul la propriile date**.

### Ce plătești pentru un CRM personalizat
- Cost **unic** de dezvoltare: 800–3.500 USD, în funcție de complexitate
- Mentenanță opțională: 30–80 USD/lună (doar dacă vrei suport continuu)
- **Ești proprietarul codului și al datelor**, fără limită de utilizatori sau înregistrări

## Ce poate face un sistem personalizat pentru afacerea ta

### Gestionează clienți și istoricul complet
Fiecare apel, ofertă, comandă și discuție — într-un singur loc, vizibil pentru toată echipa.

### Generează oferte și facturi automat
Fără copy-paste în Word sau Excel de fiecare dată.

### Se integrează cu WhatsApp și Viber
Mesajele clienților ajung direct în fișa lor din sistem, nu se pierd în telefonul unui angajat.

### Funcționează și offline
Pentru echipe de teren, depozite sau locații cu internet instabil — datele se sincronizează automat când revine conexiunea.

### Oferă rapoarte reale, nu bănuieli
Câte lead-uri intră pe lună, cine convertește cel mai bine, unde se blochează vânzarea.

## Tipuri de proiecte de software personalizat și prețuri orientative

| Tip proiect | Preț estimativ | Potrivit pentru |
|-------------|----------------|------------------|
| CRM simplu (clienți + istoric) | 800–1.500 USD | Firme mici, freelanceri, agenții |
| CRM cu automatizări (oferte, facturi, notificări) | 1.500–3.500 USD | Firme de construcții, service-uri, distribuție |
| Aplicație desktop offline (stoc, comenzi, gestiune) | 2.000–5.000 USD | Depozite, magazine, producție |
| Platformă SaaS completă (multi-utilizator, roluri) | 5.000+ USD | Startup-uri, platforme cu clienți proprii |

## Studiu de caz: firmă de construcții din Chișinău

**Înainte:** ~200 de clienți gestionați în Excel, oferte trimise manual din Word, urmăriri de plată făcute "din memorie".

**După implementarea unui CRM personalizat:**
- Timp de pregătire ofertă: de la 40 de minute la 5 minute
- Zero lead-uri pierdute din lipsă de follow-up
- Rapoarte lunare generate automat, nu manual într-un weekend

## Cum știi dacă afacerea ta are nevoie de software personalizat

Ia în calcul un sistem propriu dacă:

- Plătești deja pentru 2-3 unelte diferite (CRM, facturare, programări) care nu comunică între ele
- Ai procese specifice afacerii tale pe care niciun CRM generic nu le acoperă din start
- Echipa ta lucrează des fără internet stabil (teren, depozit, zone rurale)
- Vrei să deții datele clienților tăi, nu să depinzi de un abonament străin

## Cum începi

1. Ne scrii la office@tinka.md cu o descriere scurtă a proceselor tale
2. Facem un audit gratuit de 30 de minute și îți spunem exact ce ar rezolva un sistem personalizat
3. Primești o ofertă cu preț fix, nu estimare vagă
4. Livrare în 3–6 săptămâni, în funcție de complexitate

**Sună acum:** +373 68 333 899
        `,
      },
      ru: {
        title: "Индивидуальная CRM против подписки: сколько это стоит на самом деле в Молдове",
        description: "Сравниваем реальную стоимость импортной подписки на CRM (Bitrix24, HubSpot, Zoho) и системы, разработанной под конкретный бизнес, с ориентировочными ценами для Молдовы.",
        content: `
## Сколько денег «утекает» ежемесячно на CRM, которой вы не владеете?

Если ваша компания платит 60, 100 или 300 долларов в месяц за импортную CRM — Bitrix24, HubSpot, Zoho, Pipedrive — вы, наверное, считаете это «нормальными расходами на бизнес». Это не так.

За 3 года такая подписка обходится **дороже, чем система, созданная специально под ваш бизнес**, которой вы владеете полностью, без ежемесячной платы, без валютного риска и без искусственных ограничений по числу пользователей.

## Реальная проблема: Excel, тетради и CRM «из коробки»

Большинство МСП в Молдове ведут учёт клиентов одним из трёх способов:

- **Excel или Google Таблицы** — строки теряются, истории нет, никто не помнит, когда клиенту звонили в последний раз
- **Тетрадь заказов на столе** — информация исчезает, если сотрудник в отпуске или уволился
- **Готовая импортная CRM** — оплата ежемесячно в USD/EUR, 80% функций бесполезны для вашего бизнеса, а нужных 20% часто не хватает

Итог одинаков во всех трёх случаях: **потерянные заявки, забытые звонки и решения без реальных данных.**

## Подписка SaaS против собственной системы — сравнение за 3 года

### Сколько стоит импортная CRM
Для команды из 5 пользователей, типичные цены в 2026 году:

- Bitrix24 (бизнес-план): ~2 400–3 600 USD за 3 года
- HubSpot (Starter, за место): ~3 600–7 200 USD за 3 года
- Zoho CRM (стандартный план): ~2 500–4 000 USD за 3 года

К этим суммам добавляется **валютный риск** (платите в валюте, зарабатываете в леях), ограничения по числу пользователей или записей, и то, что при отказе от подписки **вы теряете доступ к собственным данным**.

### Сколько стоит индивидуальная CRM
- **Единоразовая** стоимость разработки: 800–3 500 USD, в зависимости от сложности
- Опциональная поддержка: 30–80 USD/месяц (только если нужна постоянная техподдержка)
- **Вы владеете кодом и данными**, без ограничений по пользователям или записям

## Что умеет индивидуальная система для вашего бизнеса

### Ведёт клиентов и полную историю
Каждый звонок, предложение, заказ и переписка — в одном месте, видно всей команде.

### Автоматически создаёт предложения и счета
Без копирования вручную в Word или Excel каждый раз.

### Интегрируется с WhatsApp и Viber
Сообщения клиентов попадают прямо в их карточку в системе, а не теряются в телефоне сотрудника.

### Работает без интернета
Для выездных бригад, складов или точек с нестабильным интернетом — данные синхронизируются автоматически, когда связь появляется снова.

### Даёт реальные отчёты, а не догадки
Сколько заявок в месяц, кто лучше конвертирует, где теряются продажи.

## Типы проектов индивидуального ПО и ориентировочные цены

| Тип проекта | Ориентировочная цена | Подходит для |
|-------------|----------------------|--------------|
| Простая CRM (клиенты + история) | 800–1 500 USD | Малый бизнес, фрилансеры, агентства |
| CRM с автоматизацией (предложения, счета, уведомления) | 1 500–3 500 USD | Строительные фирмы, сервисы, дистрибуция |
| Офлайн-приложение (склад, заказы, учёт) | 2 000–5 000 USD | Склады, магазины, производство |
| Полноценная SaaS-платформа (мультипользователь, роли) | от 5 000 USD | Стартапы, платформы с собственными клиентами |

## Кейс: строительная компания в Кишинёве

**До:** ~200 клиентов в Excel, предложения отправлялись вручную из Word, контроль оплат «по памяти».

**После внедрения индивидуальной CRM:**
- Время подготовки предложения: с 40 минут до 5 минут
- Ноль потерянных заявок из-за отсутствия напоминаний
- Ежемесячные отчёты формируются автоматически, а не вручную в выходные

## Как понять, что вашему бизнесу нужно индивидуальное ПО

Стоит рассмотреть собственную систему, если:

- Вы уже платите за 2-3 разных инструмента (CRM, выставление счетов, запись), которые не связаны между собой
- У вас есть специфичные процессы, которые не покрывает ни одна готовая CRM
- Ваша команда часто работает без стабильного интернета (выезд, склад, сельская местность)
- Вы хотите владеть данными своих клиентов, а не зависеть от иностранной подписки

## Как начать

1. Напишите на office@tinka.md с коротким описанием ваших процессов
2. Проведём бесплатный аудит за 30 минут и скажем точно, что решит индивидуальная система
3. Получите предложение с фиксированной ценой, а не расплывчатой оценкой
4. Срок реализации: 3–6 недель, в зависимости от сложности

**Звоните сейчас:** +373 68 333 899
        `,
      },
      en: {
        title: "Custom CRM vs. subscription: what it really costs in Moldova",
        description: "We compare the real cost of an imported CRM subscription (Bitrix24, HubSpot, Zoho) versus a system built for your business, with sample pricing for Moldova.",
        content: `
## How much money are you "leaking" every month on a CRM you don't own?

If your company pays 60, 100 or 300 dollars a month for an imported CRM — Bitrix24, HubSpot, Zoho, Pipedrive — you probably think that's just "the normal cost of doing business." It isn't.

Over 3 years, that subscription ends up costing **more than a system built specifically for your business** — one you own outright, with no monthly fee, no exchange-rate risk and no artificial user limits.

## The real problem: spreadsheets, notebooks and off-the-shelf CRMs

Most SMEs in Moldova manage customers in one of three ways:

- **Excel or Google Sheets** — rows get lost, there's no history, nobody knows who last called the client
- **A paper order notebook on the desk** — the information disappears if that employee is out or leaves the company
- **A generic imported CRM** — paid monthly in USD/EUR, with 80% features you'll never use and only 20% of what you actually need

All three lead to the same result: **lost leads, forgotten follow-ups and decisions made without real data.**

## SaaS subscription vs. custom system — a 3-year comparison

### What you pay for an imported CRM
For a team of 5 users, typical 2026 pricing:

- Bitrix24 (business plan): ~$2,400–$3,600 over 3 years
- HubSpot (Starter, per seat): ~$3,600–$7,200 over 3 years
- Zoho CRM (standard plan): ~$2,500–$4,000 over 3 years

On top of that comes **currency risk** (you pay in foreign currency, earn in lei), limits on users or records, and the fact that if you cancel the subscription, **you lose access to your own data**.

### What you pay for a custom CRM
- **One-time** development cost: $800–$3,500, depending on complexity
- Optional maintenance: $30–$80/month (only if you want ongoing support)
- **You own the code and the data**, with no limit on users or records

## What a custom system can do for your business

### Manages customers and their full history
Every call, quote, order and conversation — in one place, visible to the whole team.

### Generates quotes and invoices automatically
No more copy-pasting into Word or Excel every time.

### Integrates with WhatsApp and Viber
Customer messages land directly in their record in the system, instead of getting lost on an employee's phone.

### Works offline too
For field teams, warehouses or locations with unstable internet — data syncs automatically once the connection is back.

### Gives you real reports, not guesses
How many leads come in per month, who converts best, where the sales process stalls.

## Types of custom software projects and sample pricing

| Project type | Estimated price | Best for |
|--------------|------------------|----------|
| Simple CRM (customers + history) | $800–$1,500 | Small businesses, freelancers, agencies |
| CRM with automation (quotes, invoices, notifications) | $1,500–$3,500 | Construction firms, service businesses, distribution |
| Offline desktop app (stock, orders, management) | $2,000–$5,000 | Warehouses, stores, production |
| Full SaaS platform (multi-user, roles) | $5,000+ | Startups, platforms with their own customers |

## Case study: construction company in Chișinău

**Before:** ~200 customers managed in Excel, quotes sent manually from Word, payment follow-ups tracked "from memory."

**After implementing a custom CRM:**
- Quote preparation time: from 40 minutes down to 5 minutes
- Zero leads lost due to missed follow-ups
- Monthly reports generated automatically, not by hand on a weekend

## How to know if your business needs custom software

Consider a system of your own if:

- You already pay for 2-3 different tools (CRM, invoicing, bookings) that don't talk to each other
- You have processes specific to your business that no generic CRM covers out of the box
- Your team often works without a stable internet connection (field work, warehouse, rural areas)
- You want to own your customer data instead of depending on a foreign subscription

## How to get started

1. Email us at office@tinka.md with a short description of your processes
2. We do a free 30-minute audit and tell you exactly what a custom system would solve
3. You get a proposal with a fixed price, not a vague estimate
4. Delivery in 3–6 weeks, depending on complexity

**Call now:** +373 68 333 899
        `,
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ARTICOL 5
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "automatizare-postari-facebook-instagram-ai",
    date: "2026-09-28",
    readTime: 7,
    category: "automation",
    image: "https://pub-bc5d8e0529324fd4a08614212ba4438b.r2.dev/adcabedf-9b1e-42c8-83ca-8192acc402d5.png",
    translations: {
      ro: {
        title: "Automatizare postări Facebook și Instagram cu AI — publici zilnic fără să stai tu la telefon",
        description: "Cum generezi automat imagini cu AI și programezi postări zilnice pe Facebook și Instagram pentru afacerea ta din Moldova, fără un social media manager cu normă întreagă.",
        content: `
## Ultima postare: acum 3 săptămâni

Deschide acum pagina de Facebook a afacerii tale. Când a fost ultima postare? Dacă răspunsul e "acum câteva săptămâni" sau "nu mai știu" — nu ești singurul, dar pierzi bani în fiecare zi în care pagina tace.

Clienții din Moldova verifică pagina unei afaceri **înainte** să sune sau să treacă pe acolo. O pagină cu ultima postare veche transmite un singur mesaj: "poate s-au închis". Iar concurentul care postează constant, chiar cu conținut simplu, câștigă încrederea aceea în locul tău.

## De ce se oprește postarea, deși toată lumea știe că "trebuie"

Problema nu e că antreprenorii nu înțeleg importanța rețelelor sociale. Problema e timpul:

- Găsirea sau crearea unei imagini potrivite durează 20–40 de minute per postare
- Scrierea unui text bun, cu hashtag-uri relevante, încă 10–15 minute
- Postarea manuală pe Facebook ȘI Instagram, cu programare separată pe fiecare
- Un angajat "responsabil cu rețelele" ajunge să facă asta din 2 în 2 săptămâni, când mai are timp

Un social media manager freelance în Moldova costă în general **150–400 USD/lună** pentru 8–12 postări — și tot depinde de disponibilitatea unei singure persoane, care poate fi în concediu, bolnavă sau pur și simplu ocupată cu alți clienți.

## Ce înseamnă automatizare social media cu AI

Automatizarea nu înseamnă postări robotizate și generice. Înseamnă un sistem care face 80% din muncă automat, iar tu (sau un angajat) validezi în 5 minute pe săptămână.

### Generare automată de imagini
AI-ul creează imagini originale, potrivite brandului tău — pentru ofertă, produs nou, citat motivațional, sărbătoare locală — fără să mai cauți poze stock sau să apelezi la un designer pentru fiecare postare.

### Texte și hashtag-uri adaptate pe platformă
Textul pentru Instagram nu e identic cu cel pentru Facebook. Sistemul adaptează tonul, lungimea și hashtag-urile pentru fiecare rețea, pornind de la aceleași informații despre afacerea ta.

### Calendar de publicare automat
Postările se programează în avans — zilnic sau de câte ori decizi — și pleacă automat, la ora optimă, fără să mai deschidă nimeni Facebook manual în fiecare dimineață.

## Cum arată practic, într-o săptămână obișnuită

1. Luni dimineață, sistemul generează 5–7 propuneri de postări pentru săptămâna respectivă, bazate pe promoții, produse sau teme pe care le-ai stabilit
2. Tu (sau un angajat) le validezi în 5–10 minute — aprobi, respingi sau ceri o variantă nouă
3. Postările pleacă automat, programate pe zile și ore diferite pe Facebook și Instagram
4. Săptămâna următoare, procesul se repetă — fără să mai cauți tu imagini sau să scrii texte de la zero

Dacă vrei, sistemul se poate conecta și cu <a href="/solutions/automatizare-social-media" class="text-sky-400 hover:text-sky-300 underline">automatizarea completă a rețelelor sociale</a> pe care o construim la TINKA AI, inclusiv raportare lunară a rezultatelor.

## Rezultate realiste pentru o afacere locală

**Restaurant din Chișinău, 2 locații:**
- Înainte: 2–3 postări/lună, făcute "când e timp"
- După automatizare: postare zilnică, constantă, cu meniul zilei și oferte
- Vizibilitate organică: +45% în 6 săptămâni
- Timp implicat din partea echipei: sub 1 oră/săptămână, față de 4–5 ore înainte

## Pachete și prețuri orientative

| Pachet | Preț | Ce include |
|--------|------|-----------|
| Starter | 150–250 USD/lună | 3–4 postări/săptămână, o singură platformă |
| Business | 250–450 USD/lună | Postare zilnică, Facebook + Instagram, imagini AI |
| Pro | 450–800 USD/lună | Postare zilnică multi-platformă + raport lunar + campanii sezoniere |

## Ai nevoie de automatizare dacă:

- Pagina ta de Facebook sau Instagram nu are postare nouă de peste 2 săptămâni
- Plătești deja un freelancer, dar postările vin inconstant
- Ai mai multe locații sau branduri și nu poți ține pasul cu toate
- Vrei prezență zilnică fără să angajezi pe cineva full-time pentru asta

## Cum începi

1. Ne scrii la office@tinka.md cu link către pagina ta de Facebook sau Instagram
2. Analizăm gratuit ce postezi acum și ce lipsește
3. Îți propunem un calendar de conținut și pachetul potrivit
4. Primele postări automate pleacă în 5–7 zile lucrătoare

**Sună acum:** +373 68 333 899
        `,
      },
      ru: {
        title: "Автоматизация постов в Facebook и Instagram с AI — публикуйте ежедневно, не сидя за телефоном",
        description: "Как автоматически генерировать изображения с помощью AI и планировать ежедневные посты в Facebook и Instagram для вашего бизнеса в Молдове, без SMM-менеджера на полную ставку.",
        content: `
## Последний пост: 3 недели назад

Откройте сейчас страницу Facebook вашего бизнеса. Когда был последний пост? Если ответ «пару недель назад» или «уже не помню» — вы не одиноки, но каждый день молчания страницы стоит вам денег.

Клиенты в Молдове проверяют страницу бизнеса **перед** тем, как позвонить или прийти. Страница с давним последним постом сообщает одно: «может, они закрылись». А конкурент, который постит стабильно, даже простой контент, забирает это доверие себе.

## Почему постинг прекращается, хотя все понимают, что «надо»

Проблема не в том, что предприниматели не понимают важность соцсетей. Проблема — время:

- Поиск или создание подходящего изображения занимает 20–40 минут на пост
- Написание хорошего текста с релевантными хэштегами — ещё 10–15 минут
- Ручная публикация на Facebook И Instagram, с отдельным планированием для каждой
- Сотрудник, «ответственный за соцсети», в итоге делает это раз в 2 недели, когда есть время

SMM-фрилансер в Молдове стоит обычно **150–400 USD/месяц** за 8–12 постов — и всё равно зависит от доступности одного человека, который может быть в отпуске, болеть или просто занят другими клиентами.

## Что значит автоматизация соцсетей с AI

Автоматизация — это не роботизированные и однотипные посты. Это система, которая делает 80% работы автоматически, а вы (или сотрудник) утверждаете за 5 минут в неделю.

### Автоматическая генерация изображений
AI создаёт оригинальные изображения под ваш бренд — для акции, нового товара, мотивационной цитаты, местного праздника — без поиска стоковых фото и без дизайнера для каждого поста.

### Тексты и хэштеги под каждую платформу
Текст для Instagram отличается от текста для Facebook. Система адаптирует тон, длину и хэштеги под каждую сеть, отталкиваясь от одной и той же информации о вашем бизнесе.

### Автоматический календарь публикаций
Посты планируются заранее — ежедневно или с любой периодичностью, которую вы выберете — и выходят автоматически, в оптимальное время, без того, чтобы кто-то каждое утро вручную открывал Facebook.

## Как это выглядит на практике, в обычную неделю

1. В понедельник утром система генерирует 5–7 вариантов постов на неделю, основываясь на акциях, товарах или темах, которые вы задали
2. Вы (или сотрудник) утверждаете их за 5–10 минут — одобряете, отклоняете или просите новый вариант
3. Посты выходят автоматически, распределённые по дням и часам, на Facebook и Instagram
4. На следующей неделе процесс повторяется — без поиска изображений и написания текстов с нуля

При желании систему можно подключить к <a href="/ru/solutions/automatizare-social-media" class="text-sky-400 hover:text-sky-300 underline">полной автоматизации соцсетей</a>, которую мы строим в TINKA AI, включая ежемесячную отчётность по результатам.

## Реалистичные результаты для локального бизнеса

**Ресторан в Кишинёве, 2 точки:**
- До: 2–3 поста/месяц, «когда есть время»
- После автоматизации: ежедневные посты, стабильно, с меню дня и акциями
- Органический охват: +45% за 6 недель
- Время команды: менее 1 часа/неделю, против 4–5 часов раньше

## Пакеты и ориентировочные цены

| Пакет | Цена | Что включает |
|-------|------|--------------|
| Starter | 150–250 USD/месяц | 3–4 поста/неделю, одна платформа |
| Business | 250–450 USD/месяц | Ежедневные посты, Facebook + Instagram, AI-изображения |
| Pro | 450–800 USD/месяц | Ежедневные посты на нескольких платформах + ежемесячный отчёт + сезонные кампании |

## Вам нужна автоматизация, если:

- На странице Facebook или Instagram нет нового поста уже более 2 недель
- Вы уже платите фрилансеру, но посты выходят нестабильно
- У вас несколько точек или брендов, и вы не успеваете за всеми
- Вы хотите ежедневное присутствие без найма отдельного сотрудника на полную ставку

## Как начать

1. Напишите на office@tinka.md со ссылкой на вашу страницу Facebook или Instagram
2. Бесплатно анализируем, что вы публикуете сейчас и чего не хватает
3. Предлагаем контент-календарь и подходящий пакет
4. Первые автоматические посты выходят через 5–7 рабочих дней

**Звоните сейчас:** +373 68 333 899
        `,
      },
      en: {
        title: "AI Facebook & Instagram posting automation — post daily without sitting on your phone",
        description: "How to auto-generate images with AI and schedule daily Facebook and Instagram posts for your business in Moldova, without a full-time social media manager.",
        content: `
## Last post: 3 weeks ago

Open your business's Facebook page right now. When was the last post? If the answer is "a few weeks ago" or "I honestly don't know" — you're not alone, but every day the page stays silent is costing you customers.

People in Moldova check a business's page **before** calling or walking in. A page with an old last post sends one message: "maybe they closed." Meanwhile, the competitor who posts consistently — even simple content — wins that trust instead of you.

## Why posting stops, even though everyone knows it "should" happen

The problem isn't that business owners don't understand social media matters. The problem is time:

- Finding or creating a decent image takes 20–40 minutes per post
- Writing a good caption with relevant hashtags takes another 10–15 minutes
- Manually posting to Facebook AND Instagram, scheduling each separately
- The employee "in charge of social media" ends up doing it once every two weeks, whenever there's time

A freelance social media manager in Moldova typically costs **$150–$400/month** for 8–12 posts — and you're still dependent on one person's availability, who can be on vacation, sick, or simply busy with other clients.

## What AI social media automation actually means

Automation doesn't mean robotic, generic posts. It means a system that does 80% of the work automatically, while you (or an employee) approve it in 5 minutes a week.

### Automatic image generation
AI creates original, on-brand images — for a promotion, a new product, a motivational quote, a local holiday — without hunting for stock photos or briefing a designer for every single post.

### Captions and hashtags adapted per platform
Instagram copy isn't the same as Facebook copy. The system adapts tone, length and hashtags for each network, starting from the same information about your business.

### Automatic publishing calendar
Posts get scheduled in advance — daily, or at whatever frequency you choose — and go out automatically, at the optimal time, without anyone manually opening Facebook every morning.

## What it looks like in practice, in a typical week

1. Monday morning, the system generates 5–7 post ideas for the week, based on promotions, products or themes you've set
2. You (or an employee) review them in 5–10 minutes — approve, reject, or ask for a new version
3. Posts go out automatically, spread across days and times, on Facebook and Instagram
4. The following week, the process repeats — without you hunting for images or writing captions from scratch

If you want, the system can also connect to the <a href="/en/solutions/automatizare-social-media" class="text-sky-400 hover:text-sky-300 underline">full social media automation service</a> we build at TINKA AI, including monthly performance reporting.

## Realistic results for a local business

**Restaurant in Chișinău, 2 locations:**
- Before: 2–3 posts/month, "whenever there was time"
- After automation: daily posts, consistently, with the day's menu and offers
- Organic reach: +45% in 6 weeks
- Team time involved: under 1 hour/week, versus 4–5 hours before

## Packages and sample pricing

| Package | Price | Includes |
|---------|-------|----------|
| Starter | $150–$250/month | 3–4 posts/week, one platform |
| Business | $250–$450/month | Daily posting, Facebook + Instagram, AI images |
| Pro | $450–$800/month | Daily multi-platform posting + monthly report + seasonal campaigns |

## You need automation if:

- Your Facebook or Instagram page hasn't had a new post in over 2 weeks
- You're already paying a freelancer, but posts come inconsistently
- You have multiple locations or brands and can't keep up with all of them
- You want a daily presence without hiring someone full-time for it

## How to get started

1. Email us at office@tinka.md with a link to your Facebook or Instagram page
2. We do a free review of what you're posting now and what's missing
3. We propose a content calendar and the right package
4. Your first automated posts go live within 5–7 business days

**Call now:** +373 68 333 899
        `,
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ARTICOL 6
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "platforma-cursuri-online-lms-moldova",
    date: "2026-10-12",
    readTime: 8,
    category: "elearning",
    image: "https://pub-bc5d8e0529324fd4a08614212ba4438b.r2.dev/2034bcf6-7ff9-41ae-a3b5-b737604f7c4d.png",
    translations: {
      ro: {
        title: "Platformă proprie de cursuri online (LMS): cum transformi cunoștințele în venit lunar, în Moldova",
        description: "Ghid practic pentru traineri, consultanți, școli de limbi și instructori din Moldova care vor să vândă cursuri online printr-o platformă proprie, nu doar prin grupuri de WhatsApp și transferuri bancare.",
        content: `
## Predai același curs a 40-a oară. De ce nu-l vinzi o singură dată, de 40 de ori?

Dacă ești trainer, consultant, instructor de limbi străine sau formator și ții aceeași lecție introductivă lună de lună, grupă după grupă — nu vinzi cunoștințe, îți vinzi timpul la bucată. Și timpul tău are o limită fizică: 8-10 ore pe zi, cel mult 25 de cursanți pe grupă.

O platformă proprie de e-learning (LMS — Learning Management System) rupe exact legătura asta. Înregistrezi o dată lecțiile, le structurezi pe module, iar platforma vinde și livrează cursul automat, 24 de ore din 24 — fie că predai limba engleză, pregătire pentru examenul auto, contabilitate, marketing sau meșteșuguri.

## De ce "grup de WhatsApp + Google Drive + transfer bancar" nu mai ține

E setup-ul clasic pentru cursuri online în Moldova, și funcționează — până la un punct:

- **Materialele se pierd** — PDF-uri trimise acum 3 luni, nimeni nu le mai găsește
- **Plata e manuală** — transfer bancar, urmat de "am trimis, verifică te rog", urmat de tu care verifici contul de 3 ori pe zi
- **Zero control al accesului** — cursantul care nu a plătit luna asta vede exact același conținut ca cel care a plătit
- **Niciun progres urmărit** — nu știi cine a vizionat lecțiile, cine a abandonat la lecția 2, cine e pregătit pentru testul final
- **Nu poți scala** — fiecare grupă nouă înseamnă din nou aceleași mesaje, aceleași linkuri trimise manual, aceleași explicații

Toate astea consumă timpul pe care ar trebui să-l petreci predând, nu administrând un grup de WhatsApp.

## Ce poate face concret o platformă LMS pentru afacerea ta

### Cursuri video structurate pe module
Cursantul avansează lecție după lecție, pe calculator sau telefon, în ritmul lui — nu sincronizat cu programul tău.

### Teste și quiz-uri cu notare automată
Verifici înțelegerea fără să corectezi manual fiecare răspuns.

### Certificate automate la finalizare
Generat și trimis automat când cursantul termină toate modulele — valoros mai ales pentru cursuri de formare profesională sau corporate.

### Plăți online cu cardul, fără transfer manual
Cursantul plătește direct pe platformă — o singură dată sau abonament lunar — iar accesul se activează/dezactivează automat.

### Progres urmărit per cursant
Vezi exact cine a început, cine a abandonat și unde, ca să poți interveni cu un mesaj de reactivare la momentul potrivit.

### Acces controlat și recurent
Membership lunar cu conținut nou adăugat constant, nu un singur produs vândut o dată.

## Cine din Moldova poate monetiza cu propriul LMS

- **Traineri corporate și consultanți business** — vinzi aceleași training-uri de soft skills sau vânzări la zeci de companii, nu la una
- **Școli de limbi străine** — cursuri structurate pe niveluri (A1-C1), cu teste de progres automate
- **Autoșcoli** — partea teoretică (legislație, semne de circulație) livrată online, orele practice rezervate separat
- **Instructori fitness și nutriție** — programe de 4-8 săptămâni, cu video demonstrative și urmărire progres
- **Departamente HR** — onboarding intern și training obligatoriu pentru angajați noi, fără să repete aceeași prezentare de fiecare dată
- **Meșteri și artizani** — cursuri de meserie (cofetărie, tâmplărie, croitorie) vândute dincolo de limitele geografice ale atelierului

## Curs live repetat vs. platformă proprie — comparație directă

| | Curs live repetat | Platformă LMS proprie |
|---|---|---|
| Venit per oră de predare | Limitat la o grupă | Nelimitat, curs vândut de n ori |
| Capacitate maximă | 20-30 cursanți/grupă | Fără limită tehnică |
| Acoperire geografică | Chișinău sau orașul tău | Toată Moldova + diaspora |
| Timp pentru o grupă nouă | Repeți tot cursul | Zero — cursul e deja înregistrat |
| Urmărire progres | Inexistentă sau manuală | Automată, per cursant |

## Studiu de caz: instructoare de limba engleză din Chișinău

**Înainte:** 4 grupe fizice, 15 cursanți/grupă, plăți prin transfer bancar urmărite manual într-un caiet. Venit plafonat de orele fizice disponibile într-o săptămână.

**După platforma proprie:**
- Cursurile de nivel A1-A2 înregistrate o singură dată, vândute lunar unor cursanți noi, fără oră predată în plus
- Timp liber redirecționat spre cursuri live avansate (B2-C1), plătite la preț premium
- Venit lunar recurent din abonamentele la cursurile înregistrate, independent de câte ore predă efectiv

## Cât costă o platformă de e-learning personalizată în 2026

| Tip platformă | Preț estimativ | Potrivit pentru |
|----------------|----------------|------------------|
| LMS simplu (cursuri video + quiz) | 1.200–2.500 USD | Un singur curs sau instructor individual |
| LMS cu plăți online + certificate automate | 2.500–4.500 USD | Școli de limbi, autoșcoli, formatori corporate |
| Platformă completă, multi-curs, membership recurent | 4.500–9.000 USD | Academii online, multiple formatori, abonamente |

Diferența față de platformele gata-făcute (Teachable, Thinkific, Udemy ca marketplace) e esențială: acolo plătești abonament lunar în valută **și** un comision din fiecare vânzare (10-30% la Udemy, de exemplu), iar cursanții tăi rămân "ai platformei", nu ai tăi. Cu un <a href="/solutions/elearning" class="text-sky-400 hover:text-sky-300 underline">LMS construit pentru afacerea ta</a>, plătești o singură dată costul de dezvoltare, deții 100% din datele cursanților și din venitul generat, fără comision pe vânzare.

## Ești pregătit pentru un LMS propriu dacă:

- Predai aceeași lecție sau curs introductiv de mai multe ori pe lună, pentru grupe diferite
- Ai deja cursanți care plătesc, dar gestionarea e manuală (WhatsApp, Drive, transfer bancar)
- Vrei venit recurent, nu doar plăți punctuale pentru fiecare grupă nouă
- Ai cunoștințe specializate pe care le poți preda dincolo de orașul tău, inclusiv diasporei moldovenești

## Cum începi

1. Ne scrii la office@tinka.md cu tipul de curs și câți cursanți ai în prezent
2. Facem un audit gratuit de 30 de minute și îți spunem ce format de LMS se potrivește afacerii tale
3. Primești o ofertă cu preț fix pentru dezvoltare
4. Livrare în 4–8 săptămâni, în funcție de complexitate și numărul de cursuri

**Sună acum:** +373 68 333 899
        `,
      },
      ru: {
        title: "Собственная платформа онлайн-курсов (LMS): как превратить знания в ежемесячный доход в Молдове",
        description: "Практический гайд для тренеров, консультантов, языковых школ и инструкторов в Молдове, которые хотят продавать онлайн-курсы через собственную платформу, а не через группы WhatsApp и банковские переводы.",
        content: `
## Вы ведёте один и тот же курс в 40-й раз. Почему не продать его один раз — 40 раз?

Если вы тренер, консультант, преподаватель иностранного языка или инструктор и месяц за месяцем, группа за группой читаете одну и ту же вводную лекцию — вы не продаёте знания, вы продаёте своё время поштучно. А у времени есть физический предел: 8-10 часов в день, максимум 25 учеников на группу.

Собственная платформа электронного обучения (LMS — Learning Management System) разрывает именно эту связь. Вы записываете уроки один раз, структурируете их по модулям, а платформа продаёт и доставляет курс автоматически, 24 часа в сутки — учите ли вы английскому, готовите к экзамену на права, бухучёту, маркетингу или ремеслу.

## Почему «группа WhatsApp + Google Диск + банковский перевод» уже не работает

Это классическая схема для онлайн-курсов в Молдове, и она работает — до определённого момента:

- **Материалы теряются** — PDF, отправленные 3 месяца назад, уже никто не найдёт
- **Оплата вручную** — банковский перевод, затем «я отправил, проверьте», затем вы проверяете счёт 3 раза в день
- **Нет контроля доступа** — ученик, не оплативший этот месяц, видит ровно тот же контент, что и оплативший
- **Прогресс не отслеживается** — вы не знаете, кто посмотрел уроки, кто бросил на втором уроке, кто готов к финальному тесту
- **Невозможно масштабировать** — каждая новая группа означает те же сообщения, те же ссылки, отправленные вручную, те же объяснения

Всё это съедает время, которое должно уходить на преподавание, а не на администрирование группы в WhatsApp.

## Что конкретно умеет платформа LMS для вашего бизнеса

### Видеокурсы, структурированные по модулям
Ученик проходит урок за уроком, с компьютера или телефона, в своём темпе — не синхронизируясь с вашим расписанием.

### Тесты и квизы с автоматической оценкой
Проверяете понимание без ручной проверки каждого ответа.

### Автоматические сертификаты по завершении
Генерируются и отправляются автоматически, когда ученик завершает все модули — особенно ценно для профессионального обучения или корпоративных курсов.

### Онлайн-оплата картой, без ручных переводов
Ученик платит прямо на платформе — разово или по месячной подписке — а доступ активируется/отключается автоматически.

### Прогресс по каждому ученику
Видите точно, кто начал, кто бросил и на каком этапе, чтобы вовремя отправить сообщение для возвращения.

### Контролируемый и повторяющийся доступ
Месячная подписка с постоянно добавляемым новым контентом, а не разовый продукт.

## Кто в Молдове может монетизировать собственную LMS

- **Корпоративные тренеры и бизнес-консультанты** — продаёте одни и те же тренинги по soft skills или продажам десяткам компаний, а не одной
- **Языковые школы** — курсы по уровням (A1-C1) с автоматическими тестами прогресса
- **Автошколы** — теоретическая часть (ПДД, знаки) онлайн, практические занятия отдельно
- **Фитнес- и нутрициологические инструкторы** — программы на 4-8 недель с демо-видео и отслеживанием прогресса
- **HR-отделы** — внутренний онбординг и обязательное обучение новых сотрудников без повторения одной презентации каждый раз
- **Мастера и ремесленники** — курсы по профессии (кондитерское дело, столярное дело, швейное дело), продаваемые за пределами географии мастерской

## Повторяющийся живой курс vs. собственная LMS-платформа — прямое сравнение

| | Повторяющийся живой курс | Собственная LMS-платформа |
|---|---|---|
| Доход за час преподавания | Ограничен одной группой | Без ограничений, курс продаётся n раз |
| Максимальная вместимость | 20-30 учеников/группа | Без технического лимита |
| Географический охват | Кишинёв или ваш город | Вся Молдова + диаспора |
| Время на новую группу | Повторяете весь курс | Ноль — курс уже записан |
| Отслеживание прогресса | Отсутствует или вручную | Автоматическое, по каждому ученику |

## Кейс: преподавательница английского из Кишинёва

**До:** 4 очные группы, 15 учеников/группа, оплата банковским переводом, учёт вручную в тетради. Доход ограничен физически доступными часами в неделю.

**После собственной платформы:**
- Курсы уровня A1-A2 записаны один раз, продаются ежемесячно новым ученикам, без дополнительных преподанных часов
- Освободившееся время перенаправлено на живые курсы продвинутого уровня (B2-C1) по премиальной цене
- Ежемесячный рекуррентный доход от подписок на записанные курсы, независимо от количества фактически проведённых часов

## Сколько стоит индивидуальная платформа e-learning в 2026 году

| Тип платформы | Ориентировочная цена | Подходит для |
|----------------|----------------------|--------------|
| Простая LMS (видеокурсы + квиз) | 1 200–2 500 USD | Один курс или отдельный инструктор |
| LMS с онлайн-оплатой + автосертификатами | 2 500–4 500 USD | Языковые школы, автошколы, корпоративные тренеры |
| Полная платформа, мультикурс, подписка | 4 500–9 000 USD | Онлайн-академии, несколько преподавателей, подписки |

Разница с готовыми платформами (Teachable, Thinkific, Udemy как маркетплейс) принципиальна: там вы платите ежемесячную подписку в валюте **и** комиссию с каждой продажи (10-30% у Udemy, например), а ваши ученики остаются «учениками платформы», а не вашими. С <a href="/ru/solutions/elearning" class="text-sky-400 hover:text-sky-300 underline">LMS, построенной под ваш бизнес</a>, вы платите один раз за разработку, владеете 100% данных учеников и доходом, без комиссии с продаж.

## Вам стоит задуматься о собственной LMS, если:

- Вы читаете одну и ту же вводную лекцию или курс несколько раз в месяц для разных групп
- У вас уже есть платящие ученики, но управление ведётся вручную (WhatsApp, Диск, банковский перевод)
- Вы хотите рекуррентный доход, а не разовые оплаты за каждую новую группу
- У вас есть специализированные знания, которые можно преподавать за пределами вашего города, включая молдавскую диаспору

## Как начать

1. Напишите на office@tinka.md с типом курса и количеством текущих учеников
2. Проведём бесплатный аудит за 30 минут и скажем, какой формат LMS подходит вашему бизнесу
3. Получите предложение с фиксированной ценой за разработку
4. Срок реализации: 4–8 недель, в зависимости от сложности и количества курсов

**Звоните сейчас:** +373 68 333 899
        `,
      },
      en: {
        title: "Your own online course platform (LMS): turning knowledge into monthly income in Moldova",
        description: "A practical guide for trainers, consultants, language schools and instructors in Moldova who want to sell online courses through their own platform, instead of WhatsApp groups and bank transfers.",
        content: `
## You've taught the same course 40 times. Why not sell it once, 40 times over?

If you're a trainer, consultant, language instructor or coach delivering the same introductory lesson month after month, group after group — you're not selling knowledge, you're selling your time by the hour. And your time has a hard physical limit: 8-10 hours a day, maybe 25 students per group at most.

A custom e-learning platform (LMS — Learning Management System) breaks exactly that link. You record the lessons once, structure them into modules, and the platform sells and delivers the course automatically, 24 hours a day — whether you teach English, driving-test theory, accounting, marketing or a trade skill.

## Why "WhatsApp group + Google Drive + bank transfer" stops working

It's the classic setup for online courses in Moldova, and it works — up to a point:

- **Materials get lost** — PDFs sent 3 months ago, nobody can find them anymore
- **Payment is manual** — a bank transfer, followed by "I sent it, please check," followed by you checking your account 3 times a day
- **No access control** — a student who hasn't paid this month sees exactly the same content as one who has
- **No progress tracking** — you don't know who watched the lessons, who dropped off at lesson 2, who's ready for the final test
- **It doesn't scale** — every new group means the same messages, the same links sent manually, the same explanations all over again

All of that eats into the time you should be spending teaching, not administering a WhatsApp group.

## What an LMS platform can actually do for your business

### Video courses structured into modules
Students move lesson by lesson, on their computer or phone, at their own pace — not synced to your schedule.

### Quizzes and tests with automatic grading
You verify understanding without manually correcting every answer.

### Automatic certificates on completion
Generated and sent automatically once a student finishes all modules — especially valuable for professional training or corporate courses.

### Online card payments, no manual transfers
Students pay directly on the platform — a one-time fee or a monthly subscription — and access turns on or off automatically.

### Per-student progress tracking
See exactly who started, who dropped off and where, so you can send a re-engagement message at the right moment.

### Controlled, recurring access
A monthly membership with new content added continuously, instead of a single product sold once.

## Who in Moldova can monetize their own LMS

- **Corporate trainers and business consultants** — sell the same soft-skills or sales training to dozens of companies, not just one
- **Language schools** — courses structured by level (A1-C1), with automatic progress tests
- **Driving schools** — theory content (traffic rules, road signs) delivered online, practical lessons booked separately
- **Fitness and nutrition coaches** — 4-8 week programs with demonstration videos and progress tracking
- **HR departments** — internal onboarding and mandatory training for new hires, without repeating the same presentation every time
- **Craftsmen and artisans** — trade courses (pastry, carpentry, tailoring) sold beyond the geographic limits of a single workshop

## Repeated live course vs. your own LMS platform — a direct comparison

| | Repeated live course | Your own LMS platform |
|---|---|---|
| Income per teaching hour | Capped by one group | Uncapped, course sold n times |
| Maximum capacity | 20-30 students/group | No technical limit |
| Geographic reach | Chișinău or your city | All of Moldova + the diaspora |
| Time for a new group | Repeat the whole course | Zero — the course is already recorded |
| Progress tracking | None, or manual | Automatic, per student |

## Case study: an English teacher in Chișinău

**Before:** 4 in-person groups, 15 students/group, bank-transfer payments tracked by hand in a notebook. Income capped by the physical hours available in a week.

**After her own platform:**
- A1-A2 level courses recorded once, sold monthly to new students, with no extra hours taught
- Freed-up time redirected to advanced live courses (B2-C1), charged at a premium price
- Monthly recurring income from subscriptions to the recorded courses, independent of how many hours she actually teaches

## What a custom e-learning platform costs in 2026

| Platform type | Estimated price | Best for |
|----------------|------------------|----------|
| Simple LMS (video courses + quiz) | $1,200–$2,500 | A single course or individual instructor |
| LMS with online payments + auto-certificates | $2,500–$4,500 | Language schools, driving schools, corporate trainers |
| Full platform, multi-course, recurring membership | $4,500–$9,000 | Online academies, multiple instructors, subscriptions |

The difference from ready-made platforms (Teachable, Thinkific, Udemy as a marketplace) is fundamental: there, you pay a monthly subscription in foreign currency **and** a commission on every sale (10-30% on Udemy, for example), and your students stay "the platform's" students, not yours. With an <a href="/en/solutions/elearning" class="text-sky-400 hover:text-sky-300 underline">LMS built for your business</a>, you pay once for development, and you own 100% of the student data and the revenue it generates, with no sales commission.

## You're ready for your own LMS if:

- You teach the same introductory lesson or course several times a month, for different groups
- You already have paying students, but management is manual (WhatsApp, Drive, bank transfer)
- You want recurring income, not just one-off payments for each new group
- You have specialized knowledge you could teach beyond your city, including to the Moldovan diaspora abroad

## How to get started

1. Email us at office@tinka.md with your course type and how many students you currently have
2. We do a free 30-minute audit and tell you which LMS format fits your business
3. You get a proposal with a fixed development price
4. Delivery in 4–8 weeks, depending on complexity and number of courses

**Call now:** +373 68 333 899
        `,
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ARTICOL 7
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "meniu-digital-audio-restaurant-ai",
    date: "2026-10-19",
    readTime: 7,
    category: "ai-content",
    image: "https://pub-bc5d8e0529324fd4a08614212ba4438b.r2.dev/b865307b-5d79-4ba5-aaf1-bc06dc0e9029.jpg",
    translations: {
      ro: {
        title: "Meniu digital & audio cu AI pentru restaurante — elimini meniul pe hârtie și câștigi clienții turiști",
        description: "Cum înlocuiești meniul laminat, retipărit de câteva ori pe an, cu un meniu digital accesat prin cod QR și cu descrieri audio AI în mai multe limbi, pentru restaurante din Moldova.",
        content: `
## Câte meniuri a retipărit restaurantul tău anul acesta?

De fiecare dată când crește prețul la o bere sau la o porție de mici, un restaurant clasic din Moldova are două variante proaste: fie retipărește 40-80 de meniuri laminate — timp, bani, deșeuri — fie lipește peste prețul vechi un abțibild cu prețul nou, ceea ce îi face pe clienți să se întrebe ce altceva mai e "vechi" în meniul ăla.

Și asta e doar jumătate din problemă. Cealaltă jumătate apare când la masă se așază un turist care nu citește nici română, nici rusă — și chelnerul traduce din priviri "ce e asta?" pentru fiecare fel de mâncare.

## De ce meniul pe hârtie te costă mai mult decât crezi

Un meniu tipărit clasic pare "gratis" după ce l-ai plătit o dată. În realitate:

- O retipărire completă (40-60 de meniuri laminate, cu design) costă de obicei 800-1.500 lei, iar majoritatea restaurantelor din Chișinău o fac de 2-4 ori pe an — din cauza prețurilor la produse, a felurilor noi sau pur și simplu a uzurii
- Meniurile murdare, rupte sau cu pete sunt primul lucru pe care îl observă un client nou, înainte să guste orice
- Clienții străini sau turiștii nu înțeleg descrierile și aleg "ce li se pare sigur" — de obicei cel mai ieftin fel, nu cel mai profitabil pentru tine
- Un fel nou sau o ofertă de sezon nu poate fi promovată rapid — trebuie să aștepți următoarea tură de printat

## Ce este, concret, un meniu digital & audio cu AI

Nu vorbim despre un simplu PDF încărcat pe un link. Un meniu digital & audio înseamnă:

### Acces instant prin cod QR
Clientul scanează codul de pe masă și vede meniul pe telefonul lui — actualizat în timp real, fără aplicație de instalat.

### Narațiune audio în mai multe limbi
Fiecare fel de mâncare are o scurtă descriere audio generată cu AI, în română, rusă și engleză (sau orice altă limbă ai nevoie) — clientul apasă play și ascultă ce conține felul, fără să te întrebe pe tine sau pe chelner.

### Prețuri și disponibilitate actualizate instant
Se epuizează un fel? Îl marchezi indisponibil în 10 secunde. Crește prețul la ulei? Modifici un singur număr — fără retipărire, fără abțibilduri.

### Recomandări inteligente
Meniul poate sugera automat combinații ("cine alege acest fel, de obicei adaugă...") — un mic upsell care se întâmplă fără presiune din partea chelnerului.

## Cum arată practic, pentru un restaurant din Chișinău

1. Fotografiem sau primim fotografiile existente ale felurilor de mâncare
2. Construim meniul digital cu categoriile și structura localului tău
3. Generăm descrierile audio AI în limbile de care ai nevoie
4. Îți dăm codurile QR, pregătite de pus pe fiecare masă
5. Tu actualizezi prețuri și disponibilitate dintr-un panou simplu, oricând, de pe telefon

Poți vedea și <a href="/solutions/continut-ai-dublaj-avatare" class="text-sky-400 hover:text-sky-300 underline">serviciul nostru de conținut AI, dublaj și avataruri</a> pentru alte formate — de la voci AI pentru reclame, până la avataruri pentru prezentări video.

## Rezultate realiste pentru un restaurant cu clientelă mixtă

**Restaurant cu specific local, zona centrală a Chișinăului:**
- Înainte: meniu tipărit, retipărit de 3 ori anul trecut, fără variantă în engleză
- După meniu digital & audio: zero costuri de retipărire, meniu disponibil instant în 3 limbi
- Timp mediu petrecut de client "citind" meniul: de la 4-5 minute de nedumerire, la sub 1 minut cu audio
- Reclamații legate de "nu am înțeles ce am comandat": aproape eliminate

## Pachete și prețuri orientative

| Pachet | Preț | Ce include |
|--------|------|-----------|
| Starter | 200-350 USD | Meniu digital QR, 1 limbă, actualizare manuală |
| Business | 350-700 USD | Meniu digital + audio AI în 2-3 limbi, panou de administrare |
| Pro | 700-1.200 USD | Multi-locație, recomandări automate, integrare cu sistemul de comenzi |

## Ai nevoie de un meniu digital & audio dacă:

- Retipărești meniul de mai mult de 2 ori pe an din cauza prețurilor
- Primești frecvent clienți care nu vorbesc română sau rusă
- Vrei să promovezi rapid oferte de sezon fără cost de printare
- Ai mai multe locații și vrei prețuri și meniuri sincronizate automat

## Cum începi

1. Ne scrii la office@tinka.md cu fotografii ale meniului actual (sau ale felurilor de mâncare)
2. Analizăm gratuit structura meniului tău și limbile de care ai nevoie
3. Primești o ofertă cu preț fix pentru numărul tău de feluri și limbi
4. Livrare în 1-2 săptămâni, incluzând codurile QR pregătite de montat

**Sună acum:** +373 68 333 899
        `,
      },
      ru: {
        title: "Цифровое и аудио меню с AI для ресторанов — без бумажного меню и с клиентами-туристами",
        description: "Как заменить ламинированное меню, которое перепечатывают несколько раз в год, на цифровое меню с доступом по QR-коду и аудио-описаниями на AI на нескольких языках, для ресторанов в Молдове.",
        content: `
## Сколько меню ваш ресторан перепечатал в этом году?

Каждый раз, когда растёт цена на пиво или порцию мичь, у классического молдавского ресторана два плохих варианта: перепечатать 40-80 ламинированных меню — время, деньги, отходы — или наклеить на старую цену стикер с новой, из-за чего клиент начинает гадать, что ещё в этом меню «устарело».

И это лишь половина проблемы. Вторая половина проявляется, когда за стол садится турист, не читающий ни по-румынски, ни по-русски — и официант начинает жестами объяснять, что это за блюдо.

## Почему бумажное меню стоит дороже, чем кажется

Печатное меню кажется «бесплатным» после того, как вы его один раз оплатили. На самом деле:

- Полная перепечатка (40-60 ламинированных меню, с дизайном) обычно стоит 800-1 500 леев, и большинство ресторанов в Кишинёве делают это 2-4 раза в год — из-за изменения цен, новых блюд или простого износа
- Грязные, порванные или с пятнами меню — первое, что замечает новый клиент, ещё не попробовав ни одного блюда
- Иностранные клиенты или туристы, не понимающие описаний, выбирают «что-то безопасное» — обычно самое дешёвое блюдо, а не самое выгодное для вас
- Новое блюдо или сезонное предложение нельзя быстро продвинуть — нужно ждать следующей печати

## Что такое, конкретно, цифровое и аудио меню с AI

Речь не о простом PDF, загруженном по ссылке. Цифровое и аудио меню означает:

### Мгновенный доступ по QR-коду
Клиент сканирует код на столе и видит меню на своём телефоне — обновлённое в реальном времени, без установки приложения.

### Аудио-рассказ на нескольких языках
У каждого блюда есть короткое аудио-описание, созданное AI, на румынском, русском и английском (или любом другом нужном вам языке) — клиент нажимает play и слышит, что входит в блюдо, не спрашивая вас или официанта.

### Цены и наличие обновляются мгновенно
Блюдо закончилось? Отметьте его недоступным за 10 секунд. Выросла цена на масло? Меняете одну цифру — без перепечатки, без стикеров.

### Умные рекомендации
Меню может автоматически предлагать сочетания («те, кто выбирает это блюдо, обычно добавляют...») — небольшой допродажный приём без давления со стороны официанта.

## Как это выглядит на практике для ресторана в Кишинёве

1. Мы фотографируем блюда или получаем ваши существующие фото
2. Строим цифровое меню со структурой и категориями вашего заведения
3. Генерируем AI-аудио описания на нужных вам языках
4. Передаём вам QR-коды, готовые к размещению на каждом столе
5. Вы обновляете цены и наличие из простой панели, в любое время, с телефона

Также посмотрите нашу <a href="/solutions/continut-ai-dublaj-avatare" class="text-sky-400 hover:text-sky-300 underline">услугу AI-контента, дубляжа и аватаров</a> для других форматов — от AI-голосов для реклам до аватаров для видео-презентаций.

## Реалистичные результаты для ресторана со смешанной клиентурой

**Ресторан с локальной кухней, центр Кишинёва:**
- До: печатное меню, перепечатанное 3 раза за прошлый год, без английской версии
- После цифрового и аудио меню: ноль затрат на перепечатку, меню мгновенно доступно на 3 языках
- Среднее время, которое клиент тратит на «чтение» меню: с 4-5 минут растерянности до менее 1 минуты с аудио
- Жалобы «я не понял, что заказал»: почти исчезли

## Пакеты и ориентировочные цены

| Пакет | Цена | Что включает |
|-------|------|--------------|
| Starter | 200-350 USD | Цифровое QR-меню, 1 язык, ручное обновление |
| Business | 350-700 USD | Цифровое + AI-аудио меню на 2-3 языках, панель администратора |
| Pro | 700-1 200 USD | Мульти-локация, автоматические рекомендации, интеграция с системой заказов |

## Вам нужно цифровое и аудио меню, если:

- Вы перепечатываете меню больше 2 раз в год из-за изменения цен
- У вас часто бывают клиенты, не говорящие по-румынски или по-русски
- Вы хотите быстро продвигать сезонные предложения без затрат на печать
- У вас несколько точек, и вы хотите синхронизированные цены и меню

## Как начать

1. Напишите на office@tinka.md с фотографиями текущего меню (или блюд)
2. Бесплатно анализируем структуру вашего меню и нужные языки
3. Получаете предложение с фиксированной ценой для вашего числа блюд и языков
4. Срок реализации: 1-2 недели, включая готовые к установке QR-коды

**Звоните сейчас:** +373 68 333 899
        `,
      },
      en: {
        title: "AI digital & audio menu for restaurants — ditch the paper menu and win over tourist customers",
        description: "How to replace a laminated menu, reprinted several times a year, with a digital menu accessed via QR code and AI audio descriptions in multiple languages, for restaurants in Moldova.",
        content: `
## How many menus has your restaurant reprinted this year?

Every time the price of a beer or a plate of mici goes up, a classic Moldovan restaurant has two bad options: reprint 40-80 laminated menus — time, money, waste — or stick a sticker with the new price over the old one, which makes customers wonder what else in that menu is "old."

And that's only half the problem. The other half shows up when a tourist who reads neither Romanian nor Russian sits down — and the waiter ends up miming "what is this?" for every single dish.

## Why a paper menu costs you more than you think

A printed menu feels "free" once you've paid for it once. In reality:

- A full reprint (40-60 laminated menus, with design) typically costs 800-1,500 lei, and most restaurants in Chișinău do it 2-4 times a year — because of price changes, new dishes, or simple wear
- Dirty, torn or stained menus are the first thing a new customer notices, before tasting anything
- Foreign customers or tourists who don't understand the descriptions pick "whatever seems safe" — usually the cheapest dish, not the most profitable one for you
- A new dish or seasonal offer can't be promoted quickly — you have to wait for the next print run

## What a digital & audio AI menu actually is

We're not talking about a PDF uploaded to a link. A digital & audio menu means:

### Instant access via QR code
The customer scans the code on the table and sees the menu on their own phone — updated in real time, no app to install.

### Audio narration in multiple languages
Every dish has a short AI-generated audio description, in Romanian, Russian and English (or any other language you need) — the customer taps play and hears what's in the dish, without asking you or the waiter.

### Prices and availability updated instantly
A dish sells out? Mark it unavailable in 10 seconds. Oil prices go up? Change one number — no reprinting, no stickers.

### Smart recommendations
The menu can automatically suggest pairings ("people who order this usually add...") — a small upsell that happens without any pressure from the waiter.

## What it looks like in practice, for a restaurant in Chișinău

1. We photograph or receive your existing dish photos
2. We build the digital menu with your venue's categories and structure
3. We generate the AI audio descriptions in the languages you need
4. We hand you the QR codes, ready to place on every table
5. You update prices and availability from a simple panel, anytime, from your phone

You can also check our <a href="/solutions/continut-ai-dublaj-avatare" class="text-sky-400 hover:text-sky-300 underline">AI content, dubbing and avatar service</a> for other formats — from AI voices for ads to avatars for video presentations.

## Realistic results for a restaurant with mixed clientele

**Local-specialty restaurant, central Chișinău:**
- Before: printed menu, reprinted 3 times last year, no English version
- After the digital & audio menu: zero reprinting costs, menu instantly available in 3 languages
- Average time a customer spends "reading" the menu: from 4-5 minutes of confusion to under 1 minute with audio
- Complaints about "I didn't understand what I ordered": almost eliminated

## Packages and sample pricing

| Package | Price | Includes |
|---------|-------|----------|
| Starter | $200-$350 | Digital QR menu, 1 language, manual updates |
| Business | $350-$700 | Digital + AI audio menu in 2-3 languages, admin panel |
| Pro | $700-$1,200 | Multi-location, automatic recommendations, order-system integration |

## You need a digital & audio menu if:

- You reprint your menu more than twice a year because of price changes
- You regularly get customers who don't speak Romanian or Russian
- You want to promote seasonal offers quickly without printing costs
- You have multiple locations and want synchronized prices and menus

## How to get started

1. Email us at office@tinka.md with photos of your current menu (or your dishes)
2. We analyze your menu structure and the languages you need, for free
3. You get a fixed-price offer for your number of dishes and languages
4. Delivery in 1-2 weeks, including QR codes ready to install

**Call now:** +373 68 333 899
        `,
      },
    },
  },
]

export const categories = {
  ro: { "web-design": "Web Design", ai: "AI & Chatboți", seo: "SEO", automation: "Automatizări", "custom-software": "Software Personalizat", elearning: "E-Learning", "ai-content": "Conținut AI & Media" },
  ru: { "web-design": "Веб-дизайн", ai: "AI и Чатботы", seo: "SEO", automation: "Автоматизация", "custom-software": "Индивидуальное ПО", elearning: "Электронное обучение", "ai-content": "AI-контент и медиа" },
  en: { "web-design": "Web Design", ai: "AI & Chatbots", seo: "SEO", automation: "Automation", "custom-software": "Custom Software", elearning: "E-Learning", "ai-content": "AI Content & Media" },
}

export const blogUI = {
  ro: {
    title: "Blog TINKA AI",
    subtitle: "Sfaturi practice despre web design, AI și digitalizare pentru afaceri din Moldova",
    readMore: "Citește articolul",
    readTime: "min citire",
    backToBlog: "← Înapoi la blog",
    by: "De TINKA AI",
    share: "Distribuie:",
    cta: "Ai întrebări? Contactează-ne",
  },
  ru: {
    title: "Блог TINKA AI",
    subtitle: "Практические советы по веб-дизайну, AI и цифровизации для бизнеса в Молдове",
    readMore: "Читать статью",
    readTime: "мин чтения",
    backToBlog: "← Назад в блог",
    by: "Команда TINKA AI",
    share: "Поделиться:",
    cta: "Есть вопросы? Свяжитесь с нами",
  },
  en: {
    title: "TINKA AI Blog",
    subtitle: "Practical advice on web design, AI and digitalization for businesses in Moldova",
    readMore: "Read article",
    readTime: "min read",
    backToBlog: "← Back to blog",
    by: "By TINKA AI",
    share: "Share:",
    cta: "Have questions? Contact us",
  },
}
