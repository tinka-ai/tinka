export const ro = {
  nav: {
    home: "Acasă",
    solutions: "Soluții",
    about: "Despre",
    contact: "Contact",
    blog: "Blog",
    caseStudies: "Studii de caz",
    privacy: "Confidențialitate",
    terms: "Termeni",
    language: "Limbă",
  },

  // pentru pagina principală (app/page.tsx)
  hero: {
    title: "Din Tradițional în Digital",
    subtitle: "Soluții AI & Web pentru afaceri care vor să crească.",
    ctaPrimary: "Vezi soluțiile",
    ctaSecondary: "Contactează-ne",
  },

  // /about
  about: {
    title: "Despre TINKA AI",
    subtitle: "Construim produse digitale rapide și fiabile.",
    content:
      "Suntem o echipă axată pe rezultate: aplicații web cu Next.js, automatizări și asistenți AI pentru IMM-uri.",
  },

  // /solutions
  solutions: {
    title: "Soluțiile noastre",
    subtitle: "De la site-uri rapide la chatboți și automatizări.",
    items: [
      { title: "Website cu Next.js", description: "Site-uri rapide, SEO-friendly, găzduite pe Netlify." },
      { title: "Chatbot AI", description: "Asistenți AI pentru vânzări, suport și operațiuni." },
      { title: "Automatizări", description: "Fluxuri automate care economisesc timp și bani." },
      { title: "Consultanță", description: "Arhitectură, audit și plan de implementare." },
    ],
  },

  // /privacy
  privacy: {
    title: "Politica de confidențialitate",
    updated: "Ultima actualizare",
    intro:
      "Respectăm datele tale și folosim doar informațiile strict necesare pentru a oferi serviciile noastre.",
  },

  // /terms
  terms: {
    title: "Termeni și condiții",
    intro:
      "Prin utilizarea acestui site accepți termenii și condițiile. Citește cu atenție secțiunile de mai jos.",
  },

  // /contact – păstrat complet
  contact: {
    title: "Contact",
    subtitle: "Hai să vorbim despre proiectul tău.",
    info: {
      title: "Informații de contact",
      email: "Email",
      phone: "Telefon",
      hours: "Program",
      location: "Locație",
      locationDetail: "Chișinău, Republica Moldova",
    },
    quickResponse: { title: "Răspundem rapid", description: "Îți răspundem în 24 de ore lucrătoare." },
    form: {
      successTitle: "Mulțumim!",
      successMessage: "Mesajul a fost trimis. Revenim în curând.",
      name: "Nume",
      namePlaceholder: "Numele tău",
      email: "Email",
      emailPlaceholder: "ex: nume@domeniu.md",
      phone: "Telefon",
      phonePlaceholder: "+373…",
      company: "Companie",
      companyPlaceholder: "Numele companiei",
      service: "Serviciu",
      servicePlaceholder: "Alege serviciul",
      budget: "Buget",
      budgetPlaceholder: "Alege bugetul",
      message: "Mesaj",
      messagePlaceholder: "Spune-ne câteva detalii…",
      submit: "Trimite",
      serviceOptions: {
        chatbot: "Chatbot AI",
        website: "Website",
        automation: "Automatizări",
        consulting: "Consultanță",
        other: "Altceva",
      },
      budgetOptions: {
        option1: "< 1.000 €",
        option2: "1.000–5.000 €",
        option3: "5.000–10.000 €",
        option4: "> 10.000 €",
      },
    },
    faq: {
      title: "Întrebări frecvente",
      subtitle: "Răspunsuri rapide",
      question1: { q: "Cum începem?", a: "Ne scrii și stabilim o discuție." },
      question2: { q: "În cât timp livrați?", a: "De regulă 2–6 săptămâni, în funcție de proiect." },
      question3: { q: "Plăți și contract?", a: "Da, contract + factură; 30% avans." },
      question4: { q: "Mentenanță?", a: "Oferim pachete de mentenanță." },
      question5: { q: "Hosting propriu?", a: "Se poate, sau găzduim noi." },
      question6: { q: "Tehnologii?", a: "Next.js, Netlify, Tailwind etc." },
      question7: { q: "Limba?", a: "Suport în română, rusă, engleză." },
      question8: { q: "Date personale?", a: "Respectăm GDPR și bune practici." },
    },
  },

  footer: {
    company: "TINKA AI SRL",
    tagline: "Din Tradițional în Digital",
    description: "Soluții AI & Web pentru IMM-uri.",
    quickLinks: "Linkuri rapide",
    home: "Acasă",
    solutions: "Soluții",
    about: "Despre",
    contact: "Contact",
    resources: "Resurse",
    blog: "Blog",
    caseStudies: "Studii de caz",
    faq: "FAQ",
    contactInfo: "Contact",
    email: "office@tinka.md",
    phone: "+373 68 333 899",
    hours: "Lun–Vin 09:00–18:00",
    copyright: `© ${new Date().getFullYear()} TINKA AI`,
    privacy: "Politica de confidențialitate",
    terms: "Termeni și condiții",
  },
} as const
