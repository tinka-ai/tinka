export type Locale = "ro" | "ru" | "en"

export type Article = {
  slug: string
  date: string
  readTime: number
  category: string
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
]

export const categories = {
  ro: { "web-design": "Web Design", ai: "AI & Chatboți", seo: "SEO", automation: "Automatizări" },
  ru: { "web-design": "Веб-дизайн", ai: "AI и Чатботы", seo: "SEO", automation: "Автоматизация" },
  en: { "web-design": "Web Design", ai: "AI & Chatbots", seo: "SEO", automation: "Automation" },
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
