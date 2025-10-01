export type Locale = "ro" | "ru" | "en"

export const defaultLocale: Locale = "ro"

export const locales: Locale[] = ["ro", "ru", "en"]

export const localeNames: Record<Locale, string> = {
  ro: "Română",
  ru: "Русский",
  en: "English",
}

export const translations = {
  ro: {
    // Navigation
    nav: {
      home: "Acasă",
      services: "Servicii",
      testimonials: "Testimoniale",
      pricing: "Prețuri",
      contact: "Contact",
      about: "Despre Noi",
    },
    // Hero Section
    hero: {
      title: "Aducem Inteligența Artificială în Business-ul Tău",
      subtitle: "Companie tânără, tech avansat. Soluții AI personalizate pentru eficiență maximă",
      cta: "Hai să Discutăm Gratuit",
    },
    // What We Offer
    whatWeOffer: {
      title: "Ce Oferim",
      chatbots: {
        name: "Chatbot-uri Inteligente 24/7",
        description: "Răspunsuri automate instant pentru clienții tăi, oricând",
      },
      websites: {
        name: "Site-uri Moderne cu AI",
        description: "Platforme web rapide, responsive și inteligente",
      },
      automation: {
        name: "Automatizare Procese",
        description: "Elimină sarcinile repetitive și economisește timp prețios",
      },
      consulting: {
        name: "Consultanță AI",
        description: "Strategii personalizate pentru integrarea AI în afacerea ta",
      },
    },
    // Why AI Now
    whyAI: {
      title: "De Ce AI Acum?",
      benefit1: {
        title: "Economii de Timp",
        description: "Automatizează sarcini repetitive și concentrează-te pe creștere",
      },
      benefit2: {
        title: "Reducere Costuri",
        description: "Eficientizează operațiunile și reduce cheltuielile operaționale",
      },
      benefit3: {
        title: "Scalabilitate",
        description: "Crește capacitatea fără a angaja mai mult personal",
      },
      benefit4: {
        title: "Disponibilitate 24/7",
        description: "Servicii automate care lucrează non-stop pentru tine",
      },
    },
    // Technologies
    technologies: {
      title: "Tehnologii pe Care le Folosim",
      subtitle: "Stack modern și actualizat pentru soluții de top",
    },
    // Special Offer
    specialOffer: {
      badge: "Ofertă Limitată",
      title: "Proiect Pilot cu Discount",
      description: "Primii 10 clienți primesc 30% discount la primul proiect",
      cta: "Profită Acum",
    },
    // Solutions Page
    solutions: {
      title: "Soluțiile Noastre",
      subtitle: "Servicii AI complete pentru transformarea afacerii tale",
      // Detailed Services
      chatbotDetail: {
        title: "Chatbot-uri Inteligente 24/7",
        problem: "Ce Rezolvă",
        problemText:
          "Clienții tăi așteaptă răspunsuri instant, dar nu poți fi disponibil non-stop. Pierzi vânzări și frustrezi clienți pentru că nu răspunzi la timp.",
        how: "Cum Funcționează",
        howText:
          "Chatbot-ul nostru AI învață din conversațiile tale, înțelege întrebările clienților în limbaj natural și oferă răspunsuri precise instant. Se integrează pe site, Facebook, WhatsApp.",
        forWho: "Pentru Cine E Ideal",
        forWhoText:
          "E-commerce, servicii, restaurante, clinici - orice business care primește întrebări repetitive de la clienți.",
        tech: "Tehnologii",
        example: "Exemplu Practic",
        exampleText:
          "Imaginează-ți un chatbot care răspunde automat la 80% din întrebările despre produse, prețuri, disponibilitate - în timp ce tu dormi.",
      },
      websiteDetail: {
        title: "Site-uri Moderne cu AI",
        problem: "Ce Rezolvă",
        problemText:
          "Site-ul tău e lent, învechit sau nu convertește vizitatori în clienți. Pierzi oportunități pentru că experiența utilizatorului e slabă.",
        how: "Cum Funcționează",
        howText:
          "Construim site-uri rapide, responsive, optimizate SEO cu funcționalități AI integrate: recomandări personalizate, search inteligent, formulare smart.",
        forWho: "Pentru Cine E Ideal",
        forWhoText:
          "Startup-uri, IMM-uri, freelanceri, agenții - oricine vrea o prezență online profesională și eficientă.",
        tech: "Tehnologii",
        example: "Exemplu Practic",
        exampleText:
          "Un site de prezentare cu chatbot integrat, formulare inteligente și analiză comportament vizitatori - totul optimizat pentru conversii.",
      },
      automationDetail: {
        title: "Automatizare Procese",
        problem: "Ce Rezolvă",
        problemText:
          "Echipa ta pierde ore întregi pe sarcini repetitive: procesare comenzi, răspuns email-uri, actualizare date. Timpul e bani pierduți.",
        how: "Cum Funcționează",
        howText:
          "Analizăm fluxurile tale de lucru și creăm automatizări inteligente: de la procesare documente la sincronizare sisteme, totul rulează automat.",
        forWho: "Pentru Cine E Ideal",
        forWhoText: "Orice business cu procese repetitive: contabilitate, HR, vânzări, logistică, customer service.",
        tech: "Tehnologii",
        example: "Exemplu Practic",
        exampleText:
          "Automatizare completă: comenzile noi se procesează automat, facturile se generează și trimit, stocul se actualizează - fără intervenție manuală.",
      },
      consultingDetail: {
        title: "Consultanță AI",
        problem: "Ce Rezolvă",
        problemText:
          "Știi că AI poate ajuta business-ul tău, dar nu știi de unde să începi sau ce soluții sunt potrivite pentru nevoile tale specifice.",
        how: "Cum Funcționează",
        howText:
          "Analizăm afacerea ta, identificăm oportunități de automatizare și AI, și creăm o strategie personalizată cu pași concreți de implementare.",
        forWho: "Pentru Cine E Ideal",
        forWhoText: "Companii care vor să adopte AI strategic, nu haotic - de la startup-uri la IMM-uri în creștere.",
        tech: "Tehnologii",
        example: "Exemplu Practic",
        exampleText:
          "Consultație completă: audit procese, identificare oportunități AI, roadmap implementare, estimări costuri și ROI.",
      },
      // Process
      process: {
        title: "Procesul Nostru",
        step1: {
          title: "Consultație Gratuită",
          description: "Înțelegem nevoile tale și identificăm oportunități",
        },
        step2: {
          title: "Demonstrație / Proof of Concept",
          description: "Îți arătăm cum va funcționa soluția înainte să investești",
        },
        step3: {
          title: "Dezvoltare Rapidă & Iterativă",
          description: "Construim soluția în etape, cu feedback constant",
        },
        step4: {
          title: "Training & Suport Dedicat",
          description: "Te învățăm să folosești sistemul și rămânem alături de tine",
        },
      },
      // First Client Story
      firstClient: {
        badge: "Povestea Noastră de Succes",
        title: "Primul Nostru Client",
        story:
          "Am construit un chatbot inteligent pentru un magazin online local care primea peste 100 de întrebări pe zi despre produse și disponibilitate. Proprietarul petrecea 4-5 ore zilnic răspunzând la mesaje.",
        results: "Rezultate",
        result1: "80% din întrebări primesc răspuns automat instant",
        result2: "Proprietarul economisește 20+ ore pe săptămână",
        result3: "Rata de conversie a crescut cu 35%",
        result4: "Clienții sunt mai mulțumiți - răspunsuri instant 24/7",
        testimonial:
          '"Nu mai pierd timp răspunzând la aceleași întrebări. Chatbot-ul lucrează non-stop, iar eu mă pot concentra pe dezvoltarea afacerii. Investiția s-a recuperat în prima lună!"',
        author: "Alexandru M.",
        role: "Proprietar Magazin Online",
      },
      // Special Offer
      specialOffer: {
        badge: "Ofertă Specială",
        title: "Primii 10 Clienți Primesc 30% Discount",
        description:
          "Consultație + Proof of Concept complet gratuit. Fără riscuri, vezi rezultatele înainte să investești.",
        cta: "Rezervă Locul Tău",
        urgency: "Mai sunt doar 7 locuri disponibile",
      },
    },
    // About Page
    about: {
      title: "About TINKA AI",
      subtitle: "Young company, cutting-edge tech, real results",
      // Story
      story: {
        title: "Our Story",
        paragraph1:
          "We founded TINKA AI out of passion for technology and a desire to make artificial intelligence accessible for small and medium businesses. We see daily how large companies use AI to dominate the market, while SMEs fall behind due to high costs and complexity.",
        paragraph2:
          "We are a young team of developers and AI specialists who believe that technology should be accessible to everyone. We don't want to be just a service provider - we want to be your partner in digital transformation.",
        paragraph3:
          "Our mission is simple: bring the power of AI into your business without prohibitive costs and without complex technical jargon. We speak your language, understand your challenges, and build solutions that work.",
      },
      // Mission & Vision
      mission: {
        title: "Our Mission",
        description:
          "To democratize access to AI technology for SMEs, offering personalized, affordable, and efficient solutions that transform challenges into growth opportunities.",
      },
      vision: {
        title: "Our Vision",
        description:
          "To become the preferred AI partner for growing companies in Romania and Eastern Europe, helping over 100 businesses automate their processes and grow efficiently in the next 2-3 years.",
      },
      // Values
      values: {
        title: "Our Values",
        value1: {
          title: "Total Transparency",
          description:
            "Open communication without exaggerated promises. We tell you exactly what to expect and how we get there.",
        },
        value2: {
          title: "Practical Innovation",
          description:
            "Creative solutions tailored to your unique needs, not generic templates. Every project is personalized.",
        },
        value3: {
          title: "Real Partnership",
          description: "Your success is our success. We stay with you even after launch because we care about results.",
        },
        value4: {
          title: "Modern Technology",
          description: "We use the latest AI technologies without legacy code. Our stack is always up to date.",
        },
      },
      // Team
      team: {
        title: "Our Team",
        founder: {
          name: "TINKA AI Team",
          role: "Founders & Developers",
          bio1: "Combined experience of over 10 years in software development, machine learning, and AI. We previously worked for tech startups and international companies, where we saw how AI can completely transform a business.",
          bio2: "We decided to found TINKA AI to bring this expertise to small and medium companies that can't afford internal AI teams or expensive consultants.",
        },
        approach: {
          title: "Our Approach",
          description:
            "We work directly with you, no intermediaries. You talk to the people building your solution. Fast communication, constant feedback, measurable results.",
        },
      },
      // Why Choose Us
      whyUs: {
        title: "Why TINKA AI?",
        reason1: {
          stat: "100%",
          title: "Personalized Attention",
          description: "Every client receives personalized solutions, not generic templates",
        },
        reason2: {
          stat: "< 4h",
          title: "Quick Response",
          description: "We respond within 4 hours during business hours, no bureaucracy",
        },
        reason3: {
          stat: "30%",
          title: "First Client Discount",
          description: "First 10 clients receive 30% discount on their first project",
        },
      },
      // CTA
      cta: {
        title: "Let's Build Something Together",
        description: "Free consultation + proof of concept. No risk, see results before investing.",
        button: "Schedule Free Consultation",
      },
    },
    // Contact Page
    contact: {
      title: "Hai Să Vorbim",
      subtitle: "Răspundem în maxim 4 ore în timpul zilei de lucru",
      // Form
      form: {
        title: "Trimite-ne un Mesaj",
        name: "Nume",
        namePlaceholder: "Numele tău",
        email: "Email",
        emailPlaceholder: "email@exemplu.ro",
        challenge: "Ce provocare vrei să rezolvi cu AI?",
        challengePlaceholder: "Descrie-ne pe scurt ce probleme întâmpini sau ce vrei să automatizezi...",
        budget: "Bugetul Tău",
        budgetOption1: "Până la 1000€",
        budgetOption2: "1000€ - 3000€",
        budgetOption3: "3000€+",
        budgetOption4: "Să discutăm",
        demo: "Vreau demo / proof of concept gratuit",
        submit: "Trimite Mesajul",
        sending: "Se trimite...",
        success: "Mesaj trimis! Îți răspundem în maxim 4 ore.",
        error: "Eroare la trimitere. Te rugăm să ne contactezi direct pe email.",
      },
      // Contact Info
      info: {
        title: "Contactează-ne Direct",
        email: "Email",
        phone: "Telefon / WhatsApp",
        hours: "Program",
        hoursText: "Luni - Vineri: 9:00 - 18:00",
        response: "Timp de răspuns: maxim 4 ore",
        calendar: "Sau rezervă direct o întâlnire",
        calendarCta: "Programează Apel",
      },
      // Live Chat
      liveChat: {
        title: "Chat Live",
        description: "Acest chatbot e construit de noi. Cool, nu?",
        cta: "Începe Conversația",
      },
      // FAQ
      faq: {
        title: "Întrebări Frecvente",
        q1: {
          question: "Sunteți noi pe piață. De ce să vă aleg?",
          answer:
            "Tocmai pentru că suntem noi! Folosim cele mai recente tehnologii AI (fără legacy code), oferim atenție personalizată (nu ești un număr într-o corporație) și avem prețuri competitive pentru că vrem să construim o bază solidă de clienți mulțumiți. Plus, oferim proof of concept gratuit - vezi rezultatele înainte să investești.",
        },
        q2: {
          question: "Cât costă un proiect?",
          answer:
            "Depinde de complexitate. Un chatbot simplu pornește de la 800€, un site modern cu AI de la 1500€, automatizări personalizate de la 1200€. Consultanța e gratuită și îți oferim o estimare clară după ce înțelegem nevoile tale. Primii 10 clienți primesc 30% discount.",
        },
        q3: {
          question: "Cât durează implementarea?",
          answer:
            "Proiecte simple (chatbot basic, automatizări simple): 1-2 săptămâni. Proiecte medii (site complet, integrări multiple): 3-4 săptămâni. Proiecte complexe (soluții custom enterprise): 6-8 săptămâni. Lucrăm iterativ - vezi progresul constant.",
        },
        q4: {
          question: "Oferiți garanție / suport?",
          answer:
            "Da! Garanție 30 de zile - dacă nu ești mulțumit, îți returnăm banii. Suport tehnic inclus 3 luni după lansare (răspunsuri în maxim 24h). După, poți opta pentru contract de mentenanță la 150€/lună sau suport ad-hoc.",
        },
        q5: {
          question: "Lucrez cu voi = cobai?",
          answer:
            "Nu! Deși suntem o companie tânără, avem experiență solidă în AI și dezvoltare software. Oferim proof of concept gratuit tocmai ca să vezi calitatea muncii noastre înainte să investești. Primii clienți beneficiază de discount, nu de calitate inferioară. Reputația noastră se construiește pe succesul tău.",
        },
      },
    },
    // Footer
    footer: {
      company: "TINKA AI",
      tagline: "Aducem AI în business-ul tău",
      description:
        "Soluții AI personalizate pentru companii în creștere. Tech modern, prețuri accesibile, rezultate măsurabile.",
      quickLinks: "Link-uri Rapide",
      home: "Acasă",
      solutions: "Soluții",
      about: "Despre Noi",
      contact: "Contact",
      resources: "Resurse",
      blog: "Blog",
      caseStudies: "Studii de Caz",
      faq: "Întrebări Frecvente",
      contactInfo: "Contact",
      email: "hello@tinkaai.com",
      phone: "+40 XXX XXX XXX",
      hours: "Luni - Vineri: 9:00 - 18:00",
      social: "Social Media",
      legal: "Legal",
      privacy: "Politica de Confidențialitate",
      terms: "Termeni și Condiții",
      copyright: "© 2025 TINKA AI. Toate drepturile rezervate.",
    },
  },
  ru: {
    // Navigation
    nav: {
      home: "Главная",
      solutions: "Решения",
      about: "О Нас",
      contact: "Контакты",
      services: "Услуги",
      testimonials: "Отзывы",
      pricing: "Цены",
    },
    // Hero Section
    hero: {
      title: "Привлекаем Искусственный Интеллект в Ваш бизнес",
      subtitle: "Молодая компания, передовая технология. Персонализированные решения AI для максимальной эффективности",
      cta: "Давайте Бесплатно Поговорим",
    },
    // What We Offer
    whatWeOffer: {
      title: "Что Мы Предлагаем",
      chatbots: {
        name: "Интеллектуальные Чат-боты 24/7",
        description: "Автоматический ответ на вопросы клиентов в любое время",
      },
      websites: {
        name: "Современные Сайты с ИИ",
        description: "Быстрые, адаптивные и интеллектуальные веб-платформы",
      },
      automation: {
        name: "Автоматизация Процессов",
        description: "Устранение рутинных задач и сохранение ценных часов",
      },
      consulting: {
        name: "Консультация по ИИ",
        description: "Персонализированные стратегии для интеграции ИИ в ваш бизнес",
      },
    },
    // Why AI Now
    whyAI: {
      title: "Почему ИИ Сейчас?",
      benefit1: {
        title: "Экономия Времени",
        description: "Автоматизация рутинных задач и сосредоточение на росте",
      },
      benefit2: {
        title: "Снижение Стоимости",
        description: "Оптимизация операций и снижение операционных расходов",
      },
      benefit3: {
        title: "Масштабируемость",
        description: "Увеличивайте способность без найма дополнительного персонала",
      },
      benefit4: {
        title: "Доступность 24/7",
        description: "Автоматизированные услуги, работающие круглосуточно",
      },
    },
    // Technologies
    technologies: {
      title: "Технологии, которые мы используем",
      subtitle: "Современный и обновленный стек для лучших решений",
    },
    // Special Offer
    specialOffer: {
      badge: "Ограниченная oferta",
      title: "Пилотный Проект с Скидкой",
      description: "Первые 10 клиентов получают 30% скидку на первый проект",
      cta: "Получить Сейчас",
    },
    // Solutions Page
    solutions: {
      title: "Наши Решения",
      subtitle: "Комплексные ИИ-услуги для трансформации операций вашего бизнеса",
      // Detailed Services
      chatbotDetail: {
        title: "Интеллектуальные Чат-боты 24/7",
        problem: "Что Решает",
        problemText:
          "Ваш клиенты ожидают мгновенного ответа, но вы не можете быть доступны круглосуточно. Вы теряете продажи и раздражаете клиентов из-за отсутствия реакции в нужное время.",
        how: "Как это работает",
        howText:
          "Наш ИИ чат-бот обучается на ваших беседах, понимает вопросы клиентов на естественном языке и предоставляет точные ответы мгновенно. Интегрируется на ваш сайт, Facebook и WhatsApp.",
        forWho: "Кому Это Подходит",
        forWhoText:
          "Электронная коммерция, услуги, рестораны, клиники - любой бизнес, который получает повторяющиеся вопросы от клиентов.",
        tech: "Технологии",
        example: "Практический Пример",
        exampleText:
          "Представьте себе чат-бота, который автоматически отвечает на 80% вопросов о продуктах, ценах и доступности - когда вы спите.",
      },
      websiteDetail: {
        title: "Современные Сайты с ИИ",
        problem: "Что Решает",
        problemText:
          "Ваш сайт медленный, устарел или не преобразует посетителей в клиентов. Вы теряете возможности из-за плохого пользовательского опыта.",
        how: "Как это работает",
        howText:
          "Мы создаем быстрые, адаптивные веб-сайты с оптимизацией SEO и интегрированными функциями ИИ: персонализированные рекомендации, интеллектуальный поиск и умные формы.",
        forWho: "Кому Это Подходит",
        forWhoText:
          "Стартапы, IMM, фрилансеры, агентства - кто бы хотел профессиональный и эффективный онлайн-присутствие.",
        tech: "Технологии",
        example: "Практический Пример",
        exampleText:
          "Сайт презентации с интегрированным чат-ботом, умными формами и аналитикой поведения посетителей - все для повышения конверсий.",
      },
      automationDetail: {
        title: "Автоматизация Процессов",
        problem: "Что Решает",
        problemText:
          "Ваша команда тратит часы на повторяющиеся задачи: обработка заказов, ответ на электронную почту, обновление данных. Это потеря времени.",
        how: "Как это работает",
        howText:
          "Мы анализируем ваши рабочие процессы и создаем интеллектуальные автоматизации: от обработки документов до синхронизации систем, все работает автоматически.",
        forWho: "Кому Это Подходит",
        forWhoText:
          "Любой бизнес с повторяющимися процессами: бухгалтерия, HR, продажи, логистика, поддержка клиентов.",
        tech: "Технологии",
        example: "Практический Пример",
        exampleText:
          "Полная автоматизация: новые заказы обрабатываются автоматически, счета генерируются и отправляются, запасы обновляются - без ручного вмешательства.",
      },
      consultingDetail: {
        title: "Консультация по ИИ",
        problem: "Что Решает",
        problemText:
          "Вы знаете, что ИИ может помочь вашему бизнесу, но не знаете, с чего начать или какие решения подходят для ваших уникальных потребностей.",
        how: "Как это работает",
        howText:
          "Мы анализируем ваш бизнес, идентифицируем возможности автоматизации и ИИ, и создаем персонализированную стратегию с конкретными шагами реализации.",
        forWho: "Кому Это Подходит",
        forWhoText: "Компании, которые хотят стратегически внедрять ИИ, а не хаотично - от стартапов до растущих IMM.",
        tech: "Технологии",
        example: "Практический Пример",
        exampleText:
          "Полная консультация: аудит процессов, идентификация возможностей ИИ, дорожная карта реализации, оценка затрат и ROI.",
      },
      // Process
      process: {
        title: "Наш Процесс",
        step1: {
          title: "Бесплатная Консультация",
          description: "Мы понимаем ваши потребности и идентифицируем возможности",
        },
        step2: {
          title: "Демонстрация / Proof of Concept",
          description: "Мы покажем вам, как будет работать решение, прежде чем вы инвестируете",
        },
        step3: {
          title: "Быстрая и Итеративная Разработка",
          description: "Мы создаем решение поэтапно, с постоянным обратной связью",
        },
        step4: {
          title: "Обучение и Приоритетная Поддержка",
          description: "Мы обучаем вас использовать систему и остаемся рядом с вами",
        },
      },
      // First Client Story
      firstClient: {
        badge: "Наша Успешная История",
        title: "Первый Наш Клиент",
        story:
          "Мы создали интеллектуальный чат-бот для онлайн-магазина локального предпринимателя, который получал более 100 вопросов в день о продуктах и доступности. Владелец тратил 4-5 часов в день на ответы на сообщения.",
        results: "Результаты",
        result1: "80% вопросов получают мгновенный автоматический ответ",
        result2: "Владелец экономит 20+ часов в неделю",
        result3: "Конверсия лидов увеличилась на 35%",
        result4: "Клиенты довольны - мгновенный ответ 24/7",
        testimonial:
          '"Не теряю время на ответах на одинаковые вопросы. Чат-бот работает круглосуточно, а я могу сосредоточиться на развитии бизнеса. Возврат инвестиций был очевиден в первый месяц!"',
        author: "Александр М.",
        role: "Владелец Онлайн-магазина",
      },
      // Special Offer
      specialOffer: {
        badge: "Специальная oferta",
        title: "Первые 10 Клиентов Получают 30% Скидку",
        description:
          "Бесплатная консультация + полный Proof of Concept. Без рисков, увидите результаты перед инвестициями.",
        cta: "Забронируйте Место",
        urgency: "Осталось всего 7 мест",
      },
    },
    // About Page
    about: {
      title: "О TINKA AI",
      subtitle: "Молодая компания, передовые технологии, реальные результаты",
      // Story
      story: {
        title: "Наша История",
        paragraph1:
          "Мы основали TINKA AI из страсти к технологии и желания сделать искусственный интеллект доступным для малого и среднего бизнеса. Мы видим ежедневно, как крупные компании используют ИИ для доминирования рынка, в то время как IMM остаются позади из-за высоких затрат и сложности.",
        paragraph2:
          "Мы молодая команда разработчиков и специалистов по ИИ, которые верят, что технология должна быть доступна всем. Мы не хотим быть просто поставщиком услуг - мы хотим быть вашим партнером в цифровой трансформации.",
        paragraph3:
          "Наша миссия проста: принести мощь ИИ в ваш бизнес без дорогих затрат и без сложного технического языка. Мы говорим на вашем языке, понимаем ваши вызовы и создаем решения, которые работают.",
      },
      // Mission & Vision
      mission: {
        title: "Наша Миссия",
        description:
          "Демократизировать доступ к технологии ИИ для IMM, предлагая персонализированные, доступные и эффективные решения, которые превращают вызовы в возможности роста.",
      },
      vision: {
        title: "Наше Видение",
        description:
          "Стать предпочтительным партнером по ИИ для растущих компаний в Румынии и Восточной Европе, помогая более 100 бизнесам автоматизировать процессы и расти эффективно в течение следующих 2-3 лет.",
      },
      // Values
      values: {
        title: "Наши Ценности",
        value1: {
          title: "Полная Прозрачность",
          description:
            "Открытая коммуникация без преувеличений. Мы говорим вам точно, чего ожидать и как мы туда доберемся.",
        },
        value2: {
          title: "Практическая Инновация",
          description:
            "Креативные решения, адаптированные к вашим уникальным потребностям, а не общие шаблоны. Каждый проект персонализирован.",
        },
        value3: {
          title: "Реальное Партнерство",
          description: "Ваш успех - наш успех. Мы остаемся с вами и после запуска, потому что нам важны результаты.",
        },
        value4: {
          title: "Современные Технологии",
          description: "Мы используем самые последние технологии ИИ без устаревшего кода. Наш стек всегда обновлен.",
        },
      },
      // Team
      team: {
        title: "Наша Команда",
        founder: {
          name: "Команда TINKA AI",
          role: "Основатели и Разработчики",
          bio1: "Общий опыт разработки программного обеспечения, машинного обучения и ИИ составляет более 10 лет. Мы ранее работали для технологических стартапов и международных компаний, где видели, как ИИ может полностью трансформировать бизнес.",
          bio2: "Мы решили основать TINKA AI, чтобы принести этот опыт малым и средним компаниям, которые не могут позволить себе внутренние команды ИИ или дорогих консультантов.",
        },
        approach: {
          title: "Наш Подход",
          description:
            "Мы работаем напрямую с вами, без посредников. Вы общаетесь с людьми, которые создают ваше решение. Быстрая коммуникация, постоянная обратная связь, измеримые результаты.",
        },
      },
      // Why Choose Us
      whyUs: {
        title: "Почему TINKA AI?",
        reason1: {
          stat: "100%",
          title: "Персонализированное Внимание",
          description: "Каждый клиент получает персонализированные решения, а не общие шаблоны",
        },
        reason2: {
          stat: "< 4ч",
          title: "Быстрый Ответ",
          description: "Мы отвечаем в течение 4 часов в рабочее время, без бюрократии",
        },
        reason3: {
          stat: "30%",
          title: "Скидка Первым Клиентам",
          description: "Первые 10 клиентов получают 30% скидку на первый проект",
        },
      },
      // CTA
      cta: {
        title: "Давайте Создадим Что-то Вместе",
        description: "Бесплатная консультация + proof of concept. Без рисков, увидите результаты перед инвестициями.",
        button: "Запланировать Бесплатную Консультацию",
      },
    },
    // Contact Page
    contact: {
      title: "Давайте Поговорим",
      subtitle: "Мы отвечаем в течение 4 часов в рабочее время",
      // Form
      form: {
        title: "Отправьте нам Сообщение",
        name: "Имя",
        namePlaceholder: "Ваше имя",
        email: "Email",
        emailPlaceholder: "email@exemplu.ru",
        challenge: "Какую проблему вы хотите решить с ИИ?",
        challengePlaceholder: "Кратко опишите, какие проблемы вы сталкиваетесь или что вы хотите автоматизировать...",
        budget: "Ваш Бюджет",
        budgetOption1: "До 1000€",
        budgetOption2: "1000€ - 3000€",
        budgetOption3: "3000€+",
        budgetOption4: "Поговорим",
        demo: "Хочу бесплатный демо / proof of concept",
        submit: "Отправить Сообщение",
        sending: "Отправка...",
        success: "Сообщение отправлено! Мы ответим вам в течение 4 часов.",
        error: "Ошибка при отправке. Пожалуйста, свяжитесь с нами напрямую по email.",
      },
      // Contact Info
      info: {
        title: "Свяжитесь с Нами Прямо",
        email: "Email",
        phone: "Телефон / WhatsApp",
        hours: "Рабочее время",
        hoursText: "Понедельник - Пятница: 9:00 - 18:00",
        response: "Время ответа: до 4 часов",
        calendar: "Или забронируйте встречу прямо сейчас",
        calendarCta: "Записаться на Звонок",
      },
      // Live Chat
      liveChat: {
        title: "Чат в реальном времени",
        description: "Этот чат-бот мы создали сами. Круто, не так ли?",
        cta: "Начать Беседу",
      },
      // FAQ
      faq: {
        title: "Часто задаваемые вопросы",
        q1: {
          question: "Вы новы на рынке. Почему стоит выбрать вас?",
          answer:
            "Именно поэтому мы новы! Мы используем самые последние технологии ИИ (без устаревшего кода), предлагаем персонализированное внимание (вы не просто номер в корпорации) и предлагаем конкурентоспособные цены, потому что хотим создать прочную базу довольных клиентов. Кроме того, мы предлагаем бесплатный proof of concept - увидите результаты перед инвестициями.",
        },
        q2: {
          question: "Сколько стоит проект?",
          answer:
            "Зависит от сложности. Простой чат-бот начинается от 800€, современный сайт с ИИ от 1500€, персонализированные автоматизации от 1200€. Консультация бесплатна, и мы предоставляем ясную оценку после того, как поймем ваши потребности. Первые 10 клиентов получают 30% скидку.",
        },
        q3: {
          question: "Сколько длится внедрение?",
          answer:
            "Простые проекты (базовый чат-бот, простые автоматизации): 1-2 недели. Средние проекты (полный сайт, множественные интеграции): 3-4 недели. Сложные проекты (пользовательские корпоративные решения): 6-8 недель. Мы работаем итеративно - видите постоянный прогресс.",
        },
        q4: {
          question: "Вы предлагаете гарантию / поддержку?",
          answer:
            "Да! Гарантия 30 дней - если вы не довольны, вернем деньги. Включена техническая поддержка 3 месяца после запуска (ответы в течение 24 часов). Затем вы можете выбрать контракт по обслуживанию по 150€ в месяц или поддержку по запросу.",
        },
        q5: {
          question: "Работать с вами - это эксперимент?",
          answer:
            "Нет! Хотя мы молодая компания, у нас есть твердый опыт в ИИ и разработке программного обеспечения. Мы предлагаем бесплатный proof of concept, чтобы вы могли увидеть качество нашей работы перед инвестициями. Первые клиенты получают скидку, а не худшее качество. Наша репутация строится на вашем успехе.",
        },
      },
    },
    // Footer
    footer: {
      company: "TINKA AI",
      tagline: "Привлекаем ИИ в ваш бизнес",
      description:
        "Персонализированные решения ИИ для растущих компаний. Современные технологии, доступные цены, измеримые результаты.",
      quickLinks: "Быстрые Ссылки",
      home: "Главная",
      solutions: "Решения",
      about: "О Нас",
      contact: "Контакты",
      resources: "Ресурсы",
      blog: "Блог",
      caseStudies: "Кейсы",
      faq: "Часто задаваемые вопросы",
      contactInfo: "Контакты",
      email: "hello@tinkaai.com",
      phone: "+7 XXX XXX XXX",
      hours: "Понедельник - Пятница: 9:00 - 18:00",
      social: "Социальные Сети",
      legal: "Юридическая информация",
      privacy: "Политика Конфиденциальности",
      terms: "Условия Использования",
      copyright: "© 2025 TINKA AI. Все права защищены.",
    },
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      solutions: "Solutions",
      about: "About Us",
      contact: "Contact",
      services: "Services",
      testimonials: "Testimonials",
      pricing: "Pricing",
    },
    // Hero Section
    hero: {
      title: "Bringing Artificial Intelligence into Your Business",
      subtitle: "Young company, cutting-edge tech. Personalized AI solutions for maximum efficiency",
      cta: "Let's Chat for Free",
    },
    // What We Offer
    whatWeOffer: {
      title: "What We Offer",
      chatbots: {
        name: "24/7 Intelligent Chatbots",
        description: "Automated instant responses to your clients, anytime",
      },
      websites: {
        name: "Modern Websites with AI",
        description: "Fast, responsive, and intelligent web platforms",
      },
      automation: {
        name: "Workflow Automation",
        description: "Eliminate repetitive tasks and save valuable time",
      },
      consulting: {
        name: "AI Consulting",
        description: "Personalized strategies for integrating AI into your business",
      },
    },
    // Why AI Now
    whyAI: {
      title: "Why AI Now?",
      benefit1: {
        title: "Time Savings",
        description: "Automate repetitive tasks and focus on growth",
      },
      benefit2: {
        title: "Cost Reduction",
        description: "Optimize operations and reduce operational costs",
      },
      benefit3: {
        title: "Scalability",
        description: "Increase capacity without hiring more staff",
      },
      benefit4: {
        title: "24/7 Availability",
        description: "Automated services that work non-stop for you",
      },
    },
    // Technologies
    technologies: {
      title: "Technologies We Use",
      subtitle: "Modern and updated stack for top solutions",
    },
    // Special Offer
    specialOffer: {
      badge: "Limited Offer",
      title: "Pilot Project with Discount",
      description: "First 10 clients receive 30% discount on their first project",
      cta: "Claim Now",
    },
    // Solutions Page
    solutions: {
      title: "Our Solutions",
      subtitle: "Comprehensive AI services designed to transform your business operations",
      // Detailed Services
      chatbotDetail: {
        title: "24/7 Intelligent Chatbots",
        problem: "What It Solves",
        problemText:
          "Your clients expect instant responses, but you can't be available 24/7. You lose sales and disappoint clients for not responding in time.",
        how: "How It Works",
        howText:
          "Our AI chatbot learns from your conversations, understands client inquiries in natural language, and provides precise instant responses. It integrates on your website, Facebook, WhatsApp.",
        forWho: "Who It's Ideal For",
        forWhoText:
          "E-commerce, services, restaurants, clinics - any business that receives repetitive questions from clients.",
        tech: "Technologies",
        example: "Practical Example",
        exampleText:
          "Imagine a chatbot that automatically answers 80% of product, price, and availability questions - while you sleep.",
      },
      websiteDetail: {
        title: "Modern Websites with AI",
        problem: "What It Solves",
        problemText:
          "Your website is slow, outdated, or doesn't convert visitors into clients. You lose opportunities because of poor user experience.",
        how: "How It Works",
        howText:
          "We build fast, responsive websites with SEO optimization and integrated AI features: personalized recommendations, intelligent search, smart forms.",
        forWho: "Who It's Ideal For",
        forWhoText:
          "Startups, IMM, freelancers, agencies - anyone who wants a professional and efficient online presence.",
        tech: "Technologies",
        example: "Practical Example",
        exampleText:
          "A presentation website with integrated chatbot, smart forms, and visitor behavior analytics - all optimized for conversions.",
      },
      automationDetail: {
        title: "Workflow Automation",
        problem: "What It Solves",
        problemText:
          "Your team spends hours on repetitive tasks: order processing, email responses, data updates. Time is money lost.",
        how: "How It Works",
        howText:
          "We analyze your workflows and create intelligent automations: from document processing to system synchronization, everything runs automatically.",
        forWho: "Who It's Ideal For",
        forWhoText: "Any business with repetitive processes: accounting, HR, sales, logistics, customer service.",
        tech: "Technologies",
        example: "Practical Example",
        exampleText:
          "Complete automation: new orders are processed automatically, invoices are generated and sent, stock is updated - without manual intervention.",
      },
      consultingDetail: {
        title: "AI Consulting",
        problem: "What It Solves",
        problemText:
          "You know AI can help your business, but you don't know where to start or which solutions are suitable for your unique needs.",
        how: "How It Works",
        howText:
          "We analyze your business, identify automation and AI opportunities, and create a personalized strategy with concrete implementation steps.",
        forWho: "Who It's Ideal For",
        forWhoText: "Companies that want to strategically adopt AI, not chaotically - from startups to growing IMM.",
        tech: "Technologies",
        example: "Practical Example",
        exampleText:
          "Complete consultation: workflow audit, AI opportunity identification, implementation roadmap, cost estimates, and ROI.",
      },
      // Process
      process: {
        title: "Our Process",
        step1: {
          title: "Free Consultation",
          description: "We understand your needs and identify opportunities",
        },
        step2: {
          title: "Demonstration / Proof of Concept",
          description: "We show you how the solution will work before you invest",
        },
        step3: {
          title: "Rapid & Iterative Development",
          description: "We build the solution in stages, with constant feedback",
        },
        step4: {
          title: "Training & Priority Support",
          description: "We train you to use the system and stay with you",
        },
      },
      // First Client Story
      firstClient: {
        badge: "Our Success Story",
        title: "Our First Client",
        story:
          "We built an intelligent chatbot for a local online store that received over 100 questions per day about products and availability. The owner spent 4-5 hours daily responding to messages.",
        results: "Results",
        result1: "80% of questions receive instant automated response",
        result2: "The owner saves 20+ hours per week",
        result3: "Lead conversion rate increased by 35%",
        result4: "Customers are happier - instant 24/7 support",
        testimonial:
          '"No longer wasting time on the same questions. The chatbot works non-stop, and I can focus on growing my business. ROI was evident within the first month!"',
        author: "Alexandru M.",
        role: "Online Store Owner",
      },
      // Special Offer
      specialOffer: {
        badge: "Special Offer",
        title: "First 10 Clients Receive 30% Discount",
        description: "Free consultation + complete Proof of Concept. No risk, see results before investing.",
        cta: "Reserve Your Spot",
        urgency: "Only 7 spots left",
      },
    },
    // About Page
    about: {
      title: "About TINKA AI",
      subtitle: "Young company, cutting-edge tech, real results",
      // Story
      story: {
        title: "Our Story",
        paragraph1:
          "We founded TINKA AI out of passion for technology and a desire to make artificial intelligence accessible for small and medium businesses. We see daily how large companies use AI to dominate the market, while SMEs fall behind due to high costs and complexity.",
        paragraph2:
          "We are a young team of developers and AI specialists who believe that technology should be accessible to everyone. We don't want to be just a service provider - we want to be your partner in digital transformation.",
        paragraph3:
          "Our mission is simple: bring the power of AI into your business without prohibitive costs and without complex technical jargon. We speak your language, understand your challenges, and build solutions that work.",
      },
      // Mission & Vision
      mission: {
        title: "Our Mission",
        description:
          "To democratize access to AI technology for SMEs, offering personalized, affordable, and efficient solutions that transform challenges into growth opportunities.",
      },
      vision: {
        title: "Our Vision",
        description:
          "To become the preferred AI partner for growing companies in Romania and Eastern Europe, helping over 100 businesses automate their processes and grow efficiently in the next 2-3 years.",
      },
      // Values
      values: {
        title: "Our Values",
        value1: {
          title: "Total Transparency",
          description:
            "Open communication without exaggerated promises. We tell you exactly what to expect and how we get there.",
        },
        value2: {
          title: "Practical Innovation",
          description:
            "Creative solutions tailored to your unique needs, not generic templates. Every project is personalized.",
        },
        value3: {
          title: "Real Partnership",
          description: "Your success is our success. We stay with you even after launch because we care about results.",
        },
        value4: {
          title: "Modern Technology",
          description: "We use the latest AI technologies without legacy code. Our stack is always up to date.",
        },
      },
      // Team
      team: {
        title: "Our Team",
        founder: {
          name: "TINKA AI Team",
          role: "Founders & Developers",
          bio1: "Combined experience of over 10 years in software development, machine learning, and AI. We previously worked for tech startups and international companies, where we saw how AI can completely transform a business.",
          bio2: "We decided to found TINKA AI to bring this expertise to small and medium companies that can't afford internal AI teams or expensive consultants.",
        },
        approach: {
          title: "Our Approach",
          description:
            "We work directly with you, no intermediaries. You talk to the people building your solution. Fast communication, constant feedback, measurable results.",
        },
      },
      // Why Choose Us
      whyUs: {
        title: "Why TINKA AI?",
        reason1: {
          stat: "100%",
          title: "Personalized Attention",
          description: "Every client receives personalized solutions, not generic templates",
        },
        reason2: {
          stat: "< 4h",
          title: "Quick Response",
          description: "We respond within 4 hours during business hours, no bureaucracy",
        },
        reason3: {
          stat: "30%",
          title: "First Client Discount",
          description: "First 10 clients receive 30% discount on their first project",
        },
      },
      // CTA
      cta: {
        title: "Let's Build Something Together",
        description: "Free consultation + proof of concept. No risk, see results before investing.",
        button: "Schedule Free Consultation",
      },
    },
    // Contact Page
    contact: {
      title: "Let's Talk",
      subtitle: "We respond within 4 hours during business hours",
      // Form
      form: {
        title: "Send Us a Message",
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "email@example.com",
        challenge: "What Challenge Do You Want to Solve with AI?",
        challengePlaceholder: "Briefly describe the problems you face or what you want to automate...",
        budget: "Your Budget",
        budgetOption1: "Up to 1000€",
        budgetOption2: "1000€ - 3000€",
        budgetOption3: "3000€+",
        budgetOption4: "Let's Discuss",
        demo: "I Want Free Demo / Proof of Concept",
        submit: "Send Message",
        sending: "Sending...",
        success: "Message sent! We'll respond to you within 4 hours.",
        error: "Error sending. Please contact us directly via email.",
      },
      // Contact Info
      info: {
        title: "Contact Us Directly",
        email: "Email",
        phone: "Phone / WhatsApp",
        hours: "Business Hours",
        hoursText: "Monday - Friday: 9:00 - 18:00",
        response: "Response Time: up to 4 hours",
        calendar: "Or book a meeting directly",
        calendarCta: "Schedule Call",
      },
      // Live Chat
      liveChat: {
        title: "Live Chat",
        description: "This chatbot we built ourselves. Cool, right?",
        cta: "Start Conversation",
      },
      // FAQ
      faq: {
        title: "Frequently Asked Questions",
        q1: {
          question: "You're new to the market. Why should I choose you?",
          answer:
            "Exactly because we're new! We use the latest AI technologies (no legacy code), offer personalized attention (you're not just a number in a corporation), and provide competitive prices because we want to build a solid base of satisfied clients. Plus, we offer a free proof of concept - see results before investing.",
        },
        q2: {
          question: "How much does a project cost?",
          answer:
            "It depends on complexity. A simple chatbot starts at 800€, a modern website with AI at 1500€, custom automations at 1200€. Consultation is free, and we provide a clear estimate after understanding your needs. First 10 clients receive 30% discount.",
        },
        q3: {
          question: "How long does implementation take?",
          answer:
            "Simple projects (basic chatbot, simple automations): 1-2 weeks. Medium projects (full website, multiple integrations): 3-4 weeks. Complex projects (custom enterprise solutions): 6-8 weeks. We work iteratively - see constant progress.",
        },
        q4: {
          question: "Do you offer warranty / support?",
          answer:
            "Yes! 30-day warranty - if you're not satisfied, we'll refund your money. Technical support is included for 3 months after launch (responses within 24 hours). Then you can choose a maintenance contract at 150€ per month or ad-hoc support.",
        },
        q5: {
          question: "Working with you = experiment?",
          answer:
            "No! Although we are a young company, we have solid experience in AI and software development. We offer a free proof of concept so you can see the quality of our work before investing. First clients benefit from a discount, not inferior quality. Our reputation is built on your success.",
        },
      },
    },
    // Footer
    footer: {
      company: "TINKA AI",
      tagline: "Bringing AI into your business",
      description:
        "Personalized AI solutions for growing companies. Modern technologies, affordable prices, measurable results.",
      quickLinks: "Quick Links",
      home: "Home",
      solutions: "Solutions",
      about: "About Us",
      contact: "Contact",
      resources: "Resources",
      blog: "Blog",
      caseStudies: "Case Studies",
      faq: "FAQ",
      contactInfo: "Contact",
      email: "hello@tinkaai.com",
      phone: "+44 XXX XXX XXX",
      hours: "Monday - Friday: 9:00 - 18:00",
      social: "Social Media",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      copyright: "© 2025 TINKA AI. All rights reserved.",
    },
  },
} as const
