import type { Locale } from "@/contexts/locale-context"

type FaqItem = { q: string; a: string }

type LocaleStructuredData = {
  businessDescription: string
  offerNames: string[]
  breadcrumbHome: string
  faq: FaqItem[]
}

const DATA: Record<Locale, LocaleStructuredData> = {
  ro: {
    businessDescription:
      "TINKA AI oferă software personalizat, platforme SaaS, website-uri, chatbot-uri AI, automatizări, conținut AI (dublaj, avatare) și platforme e-learning pentru companii din Republica Moldova.",
    offerNames: [
      "Software Personalizat",
      "Platforme SaaS & Booking",
      "Web Design",
      "Chatbot AI",
      "Automatizări Business",
      "Conținut & Media AI",
      "Platforme E-learning",
      "Consultanță Digitală",
      "Automatizare Social Media",
    ],
    breadcrumbHome: "Acasă",
    faq: [
      {
        q: "Ce servicii oferă TINKA AI?",
        a: "TINKA AI dezvoltă în principal software personalizat (CRM-uri, aplicații desktop și offline) și platforme SaaS, plus website-uri, chatbot-uri AI, automatizări business, conținut generat cu AI (dublaj audio/video, avatare, meniuri audio), platforme de e-learning și consultanță digitală. Toate serviciile sunt adaptate pentru companii din Republica Moldova.",
      },
      {
        q: "TINKA AI dezvoltă software personalizat sau doar website-uri?",
        a: "Website-urile sunt doar una dintre soluțiile oferite. TINKA AI dezvoltă în principal software personalizat — CRM-uri interne, sisteme de gestiune, aplicații desktop sau offline — construite exact pe procesele fiecărui client, fără vendor lock-in.",
      },
      {
        q: "TINKA AI face conținut generat cu AI (dublaj, avatare)?",
        a: "Da. TINKA AI produce conținut și media generate cu AI: dublaj audio/video multilingv, avatare AI (digital humans) pentru prezentări sau customer service, meniuri audio electronice, voce-over și conținut video/social media.",
      },
      {
        q: "TINKA AI construiește platforme de e-learning?",
        a: "Da. TINKA AI construiește platforme LMS personalizate, cursuri online cu certificare automată, teste automate și training corporate, cu conținut video/audio asistat de AI.",
      },
      {
        q: "Cât costă un site web la TINKA AI?",
        a: "Prețurile sunt stabilite individual în funcție de complexitate. TINKA AI oferă prețuri accesibile pentru piața din Moldova, cu evaluare gratuită în 24 de ore.",
      },
      {
        q: "Cât durează crearea unui site web?",
        a: "Un proiect pilot durează 2–4 săptămâni. Site-uri simple pot fi livrate în 5–7 zile lucrătoare.",
      },
      {
        q: "TINKA AI face chatbot-uri AI pentru WhatsApp?",
        a: "Da, TINKA AI dezvoltă chatbot-uri AI integrate pe WhatsApp, Messenger și site web, disponibile 24/7 pentru suport clienți și generare de lead-uri.",
      },
      {
        q: "Ce este TinkaBook?",
        a: "TinkaBook este o platformă SaaS de programări online dezvoltată de TINKA AI, destinată salonelor de frumusețe, cabinetelor medicale și liber-profesioniștilor din Moldova.",
      },
      {
        q: "TINKA AI lucrează și cu companii din afara Moldovei?",
        a: "Da, TINKA AI oferă servicii remote pentru companii din România, Europa de Est și diaspora moldovenească.",
      },
      {
        q: "TINKA AI poate automatiza postările pe Facebook și Instagram?",
        a: "Da. TINKA AI configurează un sistem care generează automat imagini cu AI, scrie textul postării și publică direct pe Facebook și Instagram, după un calendar stabilit — fără să fie nevoie ca cineva să stea zilnic în fața calculatorului.",
      },
      {
        q: "TINKA AI face meniuri digitale sau audio pentru restaurante?",
        a: "Da. TINKA AI creează meniuri digitale QR și meniuri cu ghid audio generat cu AI, disponibile în mai multe limbi, fără să fie nevoie de înregistrarea unei voci reale.",
      },
    ],
  },

  en: {
    businessDescription:
      "TINKA AI builds custom software, SaaS platforms, websites, AI chatbots, automations, AI-generated content (dubbing, avatars) and e-learning platforms for companies in the Republic of Moldova.",
    offerNames: [
      "Custom Software",
      "SaaS & Booking Platforms",
      "Web Design",
      "AI Chatbot",
      "Business Automation",
      "AI Content & Media",
      "E-learning Platforms",
      "Digital Consulting",
      "Social Media Automation",
    ],
    breadcrumbHome: "Home",
    faq: [
      {
        q: "What services does TINKA AI offer?",
        a: "TINKA AI mainly builds custom software (CRMs, desktop and offline applications) and SaaS platforms, plus websites, AI chatbots, business automation, AI-generated content (audio/video dubbing, avatars, audio menus), e-learning platforms and digital consulting. All services are tailored for companies in the Republic of Moldova.",
      },
      {
        q: "Does TINKA AI build custom software or just websites?",
        a: "Websites are just one of the solutions offered. TINKA AI mainly develops custom software — internal CRMs, management systems, desktop or offline applications — built exactly around each client's processes, with no vendor lock-in.",
      },
      {
        q: "Does TINKA AI produce AI-generated content (dubbing, avatars)?",
        a: "Yes. TINKA AI produces AI-generated content and media: multilingual audio/video dubbing, AI avatars (digital humans) for presentations or customer service, electronic audio menus, voice-over and video/social media content.",
      },
      {
        q: "Does TINKA AI build e-learning platforms?",
        a: "Yes. TINKA AI builds custom LMS platforms, online courses with automatic certification, automated tests and corporate training, with AI-assisted video/audio content.",
      },
      {
        q: "How much does a website cost at TINKA AI?",
        a: "Pricing is set individually based on complexity. TINKA AI offers accessible pricing for the Moldovan market, with a free evaluation within 24 hours.",
      },
      {
        q: "How long does it take to build a website?",
        a: "A pilot project takes 2–4 weeks. Simple websites can be delivered in 5–7 business days.",
      },
      {
        q: "Does TINKA AI build AI chatbots for WhatsApp?",
        a: "Yes, TINKA AI develops AI chatbots integrated on WhatsApp, Messenger and websites, available 24/7 for customer support and lead generation.",
      },
      {
        q: "What is TinkaBook?",
        a: "TinkaBook is a SaaS online booking platform developed by TINKA AI, built for beauty salons, medical practices and freelancers in Moldova.",
      },
      {
        q: "Does TINKA AI work with companies outside Moldova?",
        a: "Yes, TINKA AI offers remote services for companies in Romania, Eastern Europe and the Moldovan diaspora.",
      },
      {
        q: "Can TINKA AI automate Facebook and Instagram posting?",
        a: "Yes. TINKA AI sets up a system that automatically generates AI images, writes the post copy and publishes directly to Facebook and Instagram on a set schedule — no one needs to sit at a computer every day.",
      },
      {
        q: "Does TINKA AI build digital or audio menus for restaurants?",
        a: "Yes. TINKA AI creates QR digital menus and AI-generated audio-guided menus, available in multiple languages, without recording a single real voice.",
      },
    ],
  },

  ru: {
    businessDescription:
      "TINKA AI разрабатывает индивидуальное ПО, SaaS-платформы, сайты, AI-чатботов, автоматизацию, AI-контент (дубляж, аватары) и платформы e-learning для компаний Республики Молдова.",
    offerNames: [
      "Индивидуальное ПО",
      "SaaS и платформы бронирования",
      "Веб-дизайн",
      "AI чатбот",
      "Автоматизация бизнеса",
      "AI контент и медиа",
      "Платформы e-learning",
      "Цифровой консалтинг",
      "Автоматизация социальных сетей",
    ],
    breadcrumbHome: "Главная",
    faq: [
      {
        q: "Какие услуги предоставляет TINKA AI?",
        a: "TINKA AI в основном разрабатывает индивидуальное ПО (CRM-системы, десктопные и офлайн-приложения) и SaaS-платформы, а также сайты, AI-чатботов, автоматизацию бизнеса, AI-контент (аудио/видео дубляж, аватары, аудио-меню), платформы e-learning и цифровой консалтинг. Все услуги адаптированы для компаний из Республики Молдова.",
      },
      {
        q: "TINKA AI разрабатывает индивидуальное ПО или только сайты?",
        a: "Сайты — лишь одно из предлагаемых решений. TINKA AI в основном разрабатывает индивидуальное ПО — внутренние CRM, системы управления, десктопные или офлайн-приложения — построенные точно под процессы каждого клиента, без привязки к поставщику.",
      },
      {
        q: "Создаёт ли TINKA AI AI-контент (дубляж, аватары)?",
        a: "Да. TINKA AI создаёт AI-контент и медиа: многоязычный аудио/видео дубляж, AI-аватары (цифровые люди) для презентаций или обслуживания клиентов, электронные аудио-меню, озвучку и видео/контент для соцсетей.",
      },
      {
        q: "Создаёт ли TINKA AI платформы e-learning?",
        a: "Да. TINKA AI создаёт индивидуальные LMS-платформы, онлайн-курсы с автоматической сертификацией, автоматические тесты и корпоративное обучение с AI-контентом (видео/аудио).",
      },
      {
        q: "Сколько стоит сайт в TINKA AI?",
        a: "Цена определяется индивидуально в зависимости от сложности проекта. TINKA AI предлагает доступные цены для молдавского рынка и бесплатную оценку в течение 24 часов.",
      },
      {
        q: "Сколько времени занимает создание сайта?",
        a: "Пилотный проект занимает 2–4 недели. Простые сайты могут быть готовы за 5–7 рабочих дней.",
      },
      {
        q: "Создаёт ли TINKA AI AI-чатботов для WhatsApp?",
        a: "Да, TINKA AI разрабатывает AI-чатботов, интегрированных в WhatsApp, Messenger и сайты, доступных 24/7 для поддержки клиентов и генерации лидов.",
      },
      {
        q: "Что такое TinkaBook?",
        a: "TinkaBook — это SaaS-платформа для онлайн-записи, разработанная TINKA AI для салонов красоты, медицинских кабинетов и частных специалистов в Молдове.",
      },
      {
        q: "Работает ли TINKA AI с компаниями за пределами Молдовы?",
        a: "Да, TINKA AI предоставляет удалённые услуги для компаний из Румынии, Восточной Европы и молдавской диаспоры.",
      },
      {
        q: "Может ли TINKA AI автоматизировать публикации в Facebook и Instagram?",
        a: "Да. TINKA AI настраивает систему, которая автоматически создаёт изображения с помощью AI, пишет текст поста и публикует его напрямую в Facebook и Instagram по заданному расписанию — без необходимости ежедневно сидеть за компьютером.",
      },
      {
        q: "Делает ли TINKA AI цифровые или аудио-меню для ресторанов?",
        a: "Да. TINKA AI создаёт цифровые QR-меню и аудио-меню с голосом, созданным AI, доступные на нескольких языках, без записи ни одного настоящего голоса.",
      },
    ],
  },
}

export function getStructuredData(locale: Locale): LocaleStructuredData {
  return DATA[locale] ?? DATA.ro
}
