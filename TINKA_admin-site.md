# TINKA AI — Administrare Site (context pentru chat nou)

Acest fișier e context de pornire pentru un chat NOU dedicat exclusiv administrării/dezvoltării site-ului tinka.md (design, bug-uri, SEO, funcționalități). Pentru automatizarea de blog/Facebook, vezi fișierul separat `TINKA_blog-facebook-automation.md`.

## Repo & stack
- Proiect: `D:\TINKA\WEBSITE\tinka` (Next.js App Router v15.5.25, React 19, TypeScript, Tailwind v4)
- Repo GitHub: `tinka-ai/tinka`, branch `main`
- i18n: client-side prin `useLocale()` / locale-context (RO/EN/RU), NU routing pe URL — fișiere `locales/ro.ts`, `locales/en.ts`, `locales/ru.ts`
- Animații: `framer-motion` via componentele `Reveal`/`RevealGroup`/`RevealItem` din `components/ui/reveal.tsx`
- **Regulă permanentă a userului**: după fiecare modificare finalizată, arată preview-ul live pe localhost ca userul să verifice singur (nu doar rezumat text).

## Constrângeri tehnice cunoscute
- `next/dynamic` evitat pentru hero-ul 3D (regresie cunoscută) — import static păstrat.
- Un component `"use client"` NU poate exporta `metadata` din Next.js — pattern-ul din repo: `page.tsx` (server component, metadata + JSON-LD) + `XClient.tsx` separat (client component cu conținutul). Aplicat deja la about, contact, privacy, terms.
- Bug recurent de SEO: `title.template: "%s | TINKA AI"` din root layout dublează sufixul dacă title-ul paginii îl conține deja — verifică orice title nou nu conține deja " | TINKA AI".
- OpenAI Node SDK: în dev mode, HMR poate rupe conexiunile keep-alive → folosește `httpAgent: new https.Agent({ keepAlive: false })` la instanțierea clientului (vezi `app/api/chat/route.ts`).

## Fișiere/componente cheie deja modificate
- `components/sections/AiPortraitHero.tsx` — hero 3D, layout centrat, responsive breakpoints (`21/9` desktop, `16/9` ≤860px, `4/3` ≤520px).
- `components/ui/navbar.tsx` + `app/globals.css` — marquee full-width continuu ("• Technologies • Innovation • Networking • Knowledge • Automation •"), clasa `.marquee-track` cu `@keyframes tinkaMarquee`, respectă `prefers-reduced-motion`.
- `components/tinka/ChatWidget.tsx` — widget chat AI; logica de start conversație extrasă în `startConversation()` + `handleOpen()` ca să nu rămână gol la redeschidere manuală.
- `app/api/chat/route.ts` — endpoint chat, folosește OpenAI (necesită `OPENAI_API_KEY` în `.env.local`).
- Pagini restructurate server+client: `app/privacy/page.tsx`+`PrivacyClient.tsx`, `app/terms/page.tsx`+`TermsClient.tsx`, plus `about`, `contact` deja existente în același pattern.
- JSON-LD: `LocalBusiness`/`WebSite`/`BreadcrumbList`/`FAQPage` în root layout (toate referă `"@id": "https://tinka.md/#business"`), `WebPage` în privacy/terms, `BlogPosting` în `app/blog/[slug]/page.tsx`.
- Reveal/animații aplicate pe: About, Contact, Blog, Portfolio (secțiuni + carduri cu `delay` progresiv).

## Chatbot AI — Supabase & GDPR
Site-ul folosește Supabase pentru a stoarce conversațiile chatbot-ului și consimțământul GDPR. Pentru a accesa dovezile de consimțământ: login în dashboard-ul Supabase al proiectului, tabelul relevant de conversații/consimțământ (verifică denumirea exactă a tabelului în cod dacă e nevoie — caută în `app/api/chat/` sau `lib/` după `supabase`).

## Probleme rezolvate (istoric, pentru referință)
- Widget chat rămânea gol/blocat la redeschidere manuală → fix prin `handleOpen()`.
- „Eroare de conexiune" chatbot → lipsă `OPENAI_API_KEY`, apoi bug separat de keep-alive HTTP (fix cu `https.Agent({keepAlive:false})`).
- Title-uri SEO duplicate pe About/Portfolio/Solutions/articole blog → sufix redundant eliminat.
- `app/about/metadata.ts` — fișier mort, șters (nefolosit, suprapus de `metadata` inline din `page.tsx`).

## Ce NU e blocant pentru site (dar afectează publicarea automată)
Accesul de push GitHub pentru `tinka-ai/tinka` e stricat pentru sesiunile Claude Code cloud (403, GitHub App neinstalat cu drepturi de scriere pe org). Userul repară asta singur mai târziu — nu bloca alte task-uri de site din cauza asta. (Detalii complete despre impactul asupra publicării automate → vezi celălalt fișier.)

## Pentru chat-ul nou
Poți continua direct orice task de design/bug-fix/SEO pe acest site pornind de la contextul de mai sus — structura, convențiile și constrângerile tehnice rămân valabile. Verifică mereu starea curentă a fișierelor (nu presupune neschimbate) înainte de a acționa pe baza acestui rezumat.
