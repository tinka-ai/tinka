"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/contexts/locale-context"

type Section =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h2"; text: string }

type PrivacyT = {
  back: string
  title: string
  updated: string
  sections: { h2: string; body: Section[] }[]
  contactLabel: string
  contactEmailLabel: string
  email: string
}

const PRIVACY: Record<"ro" | "ru" | "en", PrivacyT> = {
  ro: {
    back: "Acasă",
    title: "Politica de confidențialitate",
    updated: "Ultima actualizare: August 2025",
    sections: [
      {
        h2: "1. Introducere",
        body: [
          {
            type: "p",
            text:
              'TINKA AI ("noi", "compania noastră") respectă confidențialitatea informațiilor dumneavoastră și se angajează să le protejeze în conformitate cu legislația aplicabilă din Republica Moldova. Această Politică de Confidențialitate descrie modul în care colectăm, utilizăm, stocăm și protejăm informațiile dumneavoastră.',
          },
        ],
      },
      {
        h2: "2. Date de contact",
        body: [
          { type: "ul", items: [
            "Denumirea companiei: TINKA AI",
            "Adresa: [De completat]",
            "Email: office@tinka.md",
            "Telefon: [De completat]",
          ]},
        ],
      },
      {
        h2: "3. Informații pe care le colectăm",
        body: [
          { type: "p", text: "Colectăm următoarele categorii de informații pe care ni le furnizați direct sau care sunt generate în procesul utilizării serviciilor noastre:" },
          { type: "h2", text: "3.1. Informații de identificare și contact" },
          { type: "ul", items: [
            "Nume și prenume",
            "Adresa de email",
            "Număr de telefon",
            "Adresa (dacă este aplicabil)",
            "Denumirea companiei și funcția",
          ]},
          { type: "h2", text: "3.2. Informații comerciale" },
          { type: "ul", items: [
            "Informații despre afacere și cerințe de proiect",
            "Documente și materiale furnizate pentru prestarea serviciilor",
            "Corespondență și comunicări de afaceri",
          ]},
          { type: "h2", text: "3.3. Informații tehnice" },
          { type: "ul", items: [
            "Adresa IP",
            "Tipul și versiunea browserului",
            "Sistemul de operare",
            "Date de utilizare a site-ului web (pagini vizitate, durata vizitei)",
          ]},
          { type: "h2", text: "3.4. Informații financiare" },
          { type: "ul", items: [
            "Informații de facturare",
            "Istoric de tranzacții și plăți",
          ]},
        ],
      },
      {
        h2: "4. Cum folosim informațiile dumneavoastră",
        body: [
          { type: "h2", text: "4.1. Furnizarea serviciilor" },
          { type: "ul", items: [
            "Prestarea serviciilor solicitate",
            "Comunicarea cu privire la proiectele în curs",
            "Procesarea comenzilor și plăților",
            "Asistență tehnică și suport clienți",
          ]},
          { type: "h2", text: "4.2. Îmbunătățirea serviciilor" },
          { type: "ul", items: [
            "Analiză și statistici interne",
            "Optimizarea performanței serviciilor",
            "Dezvoltarea de noi funcționalități",
          ]},
          { type: "h2", text: "4.3. Comunicări" },
          { type: "ul", items: [
            "Trimiterea de actualizări despre proiectele dumneavoastră",
            "Informații despre serviciile noastre (doar cu acordul dumneavoastră)",
            "Răspunsuri la solicitările dumneavoastră",
          ]},
          { type: "h2", text: "4.4. Conformitate legală" },
          { type: "ul", items: [
            "Respectarea obligațiilor legale și fiscale",
            "Răspunsul la cerințele autorităților competente",
          ]},
        ],
      },
      {
        h2: "5. Partajarea informațiilor",
        body: [
          { type: "ul", items: [
            "5.1. Nu vindem, nu închiriem și nu dezvăluim informațiile dumneavoastră terților în scopuri de marketing.",
          ]},
          { type: "p", text: "5.2. Putem partaja informațiile dumneavoastră cu:" },
          { type: "ul", items: [
            "Furnizori de servicii (hosting, procesare plăți, servicii contabile)",
            "Autorități publice când acest lucru este impus de lege",
            "Pentru a proteja drepturile, proprietatea sau siguranța TINKA AI, a clienților sau a publicului",
          ]},
          { type: "p", text: "5.3. Toți partenerii noștri sunt obligați contractual să mențină confidențialitatea informațiilor." },
        ],
      },
      {
        h2: "6. Securitatea informațiilor",
        body: [
          { type: "p", text: "6.1. Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja informațiile dumneavoastră împotriva:" },
          { type: "ul", items: [
            "Accesului neautorizat",
            "Modificării neautorizate",
            "Divulgării accidentale sau ilegale",
            "Distrugerii sau pierderii",
          ]},
          { type: "p", text: "6.2. Măsurile de securitate includ:" },
          { type: "ul", items: [
            "Criptarea informațiilor sensibile",
            "Controale stricte de acces",
            "Monitorizarea sistemelor",
            "Backup-uri regulate și securizate",
            "Formarea personalului privind confidențialitatea",
          ]},
          { type: "p", text: "6.3. Nicio metodă de transmitere sau stocare electronică nu este 100% sigură; nu putem garanta securitatea absolută." },
        ],
      },
      {
        h2: "7. Păstrarea informațiilor",
        body: [
          { type: "p", text: "7.1. Păstrăm informațiile dumneavoastră doar atât timp cât este necesar pentru:" },
          { type: "ul", items: [
            "Furnizarea serviciilor solicitate",
            "Respectarea obligațiilor legale și contractuale",
            "Rezolvarea disputelor și aplicarea acordurilor",
          ]},
          { type: "p", text: "7.2. Perioade orientative de păstrare:" },
          { type: "ul", items: [
            "Informații contractuale: pe durata contractului + 5 ani",
            "Comunicări comerciale: 3 ani",
            "Informații tehnice: maximum 24 luni",
          ]},
          { type: "p", text: "7.3. La expirarea perioadei necesare, informațiile vor fi șterse sau anonimizate în mod sigur." },
        ],
      },
      {
        h2: "8. Drepturile dumneavoastră",
        body: [
          { type: "p", text: "8.1. Aveți următoarele drepturi:" },
          { type: "ul", items: [
            "Dreptul de acces",
            "Dreptul la rectificare",
            "Dreptul la ștergere",
            "Dreptul la opoziție",
            "Dreptul de a retrage consimțământul",
          ]},
          { type: "p", text: "8.2. Pentru exercitarea drepturilor, contactați-ne la office@tinka.md" },
          { type: "p", text: "8.3. Vom răspunde solicitărilor în maximum 30 de zile calendaristice." },
        ],
      },
      {
        h2: "9. Cookie-uri și tehnologii similare",
        body: [
          { type: "ul", items: [
            "9.1. Site-ul nostru utilizează cookie-uri pentru a îmbunătăți experiența utilizatorului.",
          ]},
          { type: "p", text: "9.2. Tipuri de cookie-uri:" },
          { type: "ul", items: [
            "Cookie-uri esențiale",
            "Cookie-uri analitice",
            "Cookie-uri de preferințe",
          ]},
          { type: "p", text: "9.3. Puteți controla cookie-urile din setările browserului; dezactivarea anumitor cookie-uri poate afecta funcționalitatea." },
        ],
      },
      {
        h2: "10. Comunicări de marketing",
        body: [
          { type: "ul", items: [
            "10.1. Trimitem comunicări de marketing doar cu acordul dumneavoastră explicit.",
          ]},
          { type: "p", text: "10.2. Puteți renunța oricând prin:" },
          { type: "ul", items: [
            'Click pe „dezabonare” din email',
            "Contactarea noastră la office@tinka.md",
          ]},
        ],
      },
      {
        h2: "11. Linkuri către site-uri terțe",
        body: [
          { type: "p", text: "Site-ul nostru poate conține linkuri către site-uri terțe. Nu suntem responsabili pentru practicile acestora; vă recomandăm să citiți politicile lor de confidențialitate." },
        ],
      },
      {
        h2: "12. Minori",
        body: [
          { type: "p", text: "Serviciile noastre nu sunt destinate persoanelor sub 18 ani. Nu colectăm în mod intenționat informații de la minori fără acordul reprezentanților legali." },
        ],
      },
      {
        h2: "13. Transferuri internaționale de informații",
        body: [
          { type: "p", text: "13.1. În procesul de furnizare a serviciilor, informațiile pot fi transferate și stocate pe servere situate în afara Republicii Moldova (de ex., platforme de hosting, CDN, colaborare în dezvoltare)." },
          { type: "h2", text: "13.2. Garanții implementate" },
          { type: "ul", items: [
            "Certificări și conformitate: furnizori cu standarde internaționale (ex.: ISO 27001, SOC 2), principii GDPR",
            "Măsuri tehnice: criptare TLS/SSL în tranzit și criptare la repaus, acces restricționat, autentificare cu doi factori, monitorizare",
            "Măsuri contractuale: clauze de protecție a datelor și garanții contractuale conforme cu standardele internaționale",
          ]},
          { type: "h2", text: "13.3. Minimizarea datelor transferate" },
          { type: "ul", items: [
            "Transferăm doar informațiile strict necesare",
            "Nu stocăm date sensibile fără criptare suplimentară",
            "Datele financiare sunt procesate prin furnizori specializați cu certificări superioare",
          ]},
          { type: "h2", text: "13.4. Drepturile dumneavoastră" },
          { type: "ul", items: [
            "Puteți solicita detalii despre locațiile de stocare",
            "Puteți solicita ștergerea datelor",
            "Vă puteți opune transferurilor internaționale, unde este cazul",
          ]},
          { type: "p", text: "13.5. Prin utilizarea serviciilor noastre, luați la cunoștință și sunteți de acord cu astfel de transferuri; dacă nu sunteți de acord, scrieți-ne la office@tinka.md pentru alternative." },
        ],
      },
      {
        h2: "14. Modificări ale Politicii de Confidențialitate",
        body: [
          { type: "ul", items: [
            "14.1. Ne rezervăm dreptul de a modifica această Politică.",
            "14.2. Modificările vor fi publicate cu data ultimei actualizări.",
            "14.3. Modificările importante pot fi comunicate prin email sau notificare pe site.",
            "14.4. Continuarea utilizării serviciilor constituie acceptarea noii Politici.",
          ]},
        ],
      },
      {
        h2: "15. Contact",
        body: [
          { type: "ul", items: [
            "Email: office@tinka.md",
            "Adresa: [De completat]",
            "Telefon: [De completat]",
          ]},
          { type: "p", text: "Ne angajăm să răspundem solicitărilor în timp util și să abordăm orice preocupări legate de confidențialitate. Prin utilizarea serviciilor TINKA AI, confirmați că ați citit, înțeles și acceptat această Politică de Confidențialitate." },
        ],
      },
    ],
    contactLabel: "Întrebări despre această politică?",
    contactEmailLabel: "Scrie-ne la",
    email: "office@tinka.md",
  },

  ru: {
    back: "На главную",
    title: "Политика конфиденциальности",
    updated: "Последнее обновление: Август 2025",
    sections: [
      {
        h2: "1. Введение",
        body: [
          { type: "p", text: "TINKA AI уважает конфиденциальность ваших данных и защищает их согласно законодательству Республики Молдова. В этой политике описано, как мы собираем, используем, храним и защищаем информацию." },
        ],
      },
      {
        h2: "2. Контакты",
        body: [
          { type: "ul", items: [
            "Название компании: TINKA AI",
            "Адрес: [Уточнить]",
            "Email: office@tinka.md",
            "Телефон: [Уточнить]",
          ]},
        ],
      },
      {
        h2: "3. Какие данные мы собираем",
        body: [
          { type: "p", text: "Категории данных, предоставляемые напрямую или возникающие при использовании сервисов:" },
          { type: "h2", text: "3.1. Идентификационные и контактные данные" },
          { type: "ul", items: ["Имя и фамилия","Email","Телефон","Адрес (при наличии)","Компания и должность"]},
          { type: "h2", text: "3.2. Коммерческая информация" },
          { type: "ul", items: ["Сведения о бизнесе и требования к проекту","Документы и материалы","Деловая переписка"]},
          { type: "h2", text: "3.3. Техническая информация" },
          { type: "ul", items: ["IP-адрес","Тип/версия браузера","ОС","Данные об использовании сайта (страницы, длительность)"]},
          { type: "h2", text: "3.4. Финансовая информация" },
          { type: "ul", items: ["Выставление счетов","История транзакций и платежей"]},
        ],
      },
      {
        h2: "4. Как мы используем данные",
        body: [
          { type: "h2", text: "4.1. Предоставление услуг" },
          { type: "ul", items: ["Оказание запрошенных услуг","Связь по текущим проектам","Обработка заказов и платежей","Техподдержка"]},
          { type: "h2", text: "4.2. Улучшение услуг" },
          { type: "ul", items: ["Внутренняя аналитика","Оптимизация производительности","Разработка новых функций"]},
          { type: "h2", text: "4.3. Коммуникации" },
          { type: "ul", items: ["Обновления по проектам","Информация об услугах (с вашего согласия)","Ответы на запросы"]},
          { type: "h2", text: "4.4. Законодательные требования" },
          { type: "ul", items: ["Соблюдение правовых и налоговых обязанностей","Ответы на запросы компетентных органов"]},
        ],
      },
      {
        h2: "5. Передача данных",
        body: [
          { type: "ul", items: ["5.1. Мы не продаем и не сдаем ваши данные в аренду третьим лицам в маркетинговых целях."]},
          { type: "p", text: "5.2. Возможна передача:" },
          { type: "ul", items: ["Поставщикам услуг (хостинг, платежи, бухгалтерия)","Госорганам — если этого требует закон","Для защиты прав, собственности и безопасности TINKA AI, клиентов и общества"]},
          { type: "p", text: "5.3. Все партнеры обязаны сохранять конфиденциальность по договору." },
        ],
      },
      {
        h2: "6. Безопасность данных",
        body: [
          { type: "p", text: "Меры по защите от несанкционированного доступа, изменения, раскрытия, уничтожения." },
          { type: "ul", items: ["Шифрование чувствительных данных","Строгий контроль доступа","Мониторинг систем","Регулярные резервные копии","Обучение персонала"]},
          { type: "p", text: "Ни один способ передачи/хранения не дает 100% гарантии." },
        ],
      },
      {
        h2: "7. Срок хранения",
        body: [
          { type: "ul", items: ["Данные хранятся столько, сколько необходимо для услуг, правовых обязанностей и урегулирования споров."]},
          { type: "ul", items: ["Договорные данные: срок договора + 5 лет","Деловые коммуникации: 3 года","Технические данные: до 24 месяцев"]},
          { type: "p", text: "По истечении сроков — безопасное удаление/анонимизация." },
        ],
      },
      {
        h2: "8. Ваши права",
        body: [
          { type: "ul", items: ["Доступ","Исправление","Удаление","Возражение","Отзыв согласия"]},
          { type: "p", text: "Запросы направляйте на office@tinka.md. Ответ — до 30 календарных дней." },
        ],
      },
      {
        h2: "9. Cookie и аналогичные технологии",
        body: [
          { type: "ul", items: ["Мы используем cookie для улучшения опыта."]},
          { type: "ul", items: ["Обязательные","Аналитические","Настроек/предпочтений"]},
          { type: "p", text: "Управление в настройках браузера; отключение может ограничить функционал." },
        ],
      },
      {
        h2: "10. Маркетинговые сообщения",
        body: [
          { type: "ul", items: ["Отправляем только при явном согласии."]},
          { type: "ul", items: ['Отписка через ссылку в письме', "Или на email: office@tinka.md"]},
        ],
      },
      {
        h2: "11. Ссылки на сторонние сайты",
        body: [{ type: "p", text: "Мы не несем ответственность за политику конфиденциальности сторонних сайтов." }],
      },
      {
        h2: "12. Несовершеннолетние",
        body: [{ type: "p", text: "Сервисы не предназначены для лиц младше 18 лет." }],
      },
      {
        h2: "13. Международные передачи данных",
        body: [
          { type: "p", text: "Данные могут храниться за пределами РМ (хостинг, CDN, платформы разработки)." },
          { type: "h2", text: "Гарантии" },
          { type: "ul", items: [
            "Сертификаты: ISO 27001, SOC 2; принципы GDPR",
            "TLS/SSL в транзите, шифрование в покое, ограничение доступа, MFA, мониторинг",
            "Договорные положения о защите данных",
          ]},
          { type: "h2", text: "Минимизация" },
          { type: "ul", items: [
            "Передаем только необходимые данные",
            "Не храним чувствительные данные без доп. шифрования",
            "Финданные — у сертифицированных провайдеров",
          ]},
          { type: "h2", text: "Ваши права" },
          { type: "ul", items: [
            "Запросить детали локаций хранения",
            "Попросить удаление",
            "Возразить против международных передач (где применимо)",
          ]},
          { type: "p", text: "Используя сервисы, вы соглашаетесь с такими передачами; для альтернатив — office@tinka.md." },
        ],
      },
      {
        h2: "14. Изменения политики",
        body: [
          { type: "ul", items: ["Публикуем изменения с датой обновления; важные изменения — через уведомления/почту; дальнейшее использование = согласие."]},
        ],
      },
      {
        h2: "15. Контакты",
        body: [
          { type: "ul", items: ["Email: office@tinka.md","Адрес: [Уточнить]","Телефон: [Уточнить]"]},
          { type: "p", text: "Мы ответим своевременно и рассмотрим любые вопросы конфиденциальности." },
        ],
      },
    ],
    contactLabel: "Вопросы по этой политике?",
    contactEmailLabel: "Пишите на",
    email: "office@tinka.md",
  },

  en: {
    back: "Back to Home",
    title: "Privacy Policy",
    updated: "Last updated: August 2025",
    sections: [
      {
        h2: "1. Introduction",
        body: [
          { type: "p", text: "TINKA AI (“we”, “our”) respects your privacy and protects personal data under applicable Moldovan law. This Policy explains how we collect, use, store and protect your information." },
        ],
      },
      {
        h2: "2. Contact details",
        body: [
          { type: "ul", items: [
            "Company name: TINKA AI",
            "Address: [To be completed]",
            "Email: office@tinka.md",
            "Phone: [To be completed]",
          ]},
        ],
      },
      {
        h2: "3. Information we collect",
        body: [
          { type: "p", text: "Categories provided directly by you or generated while using our services:" },
          { type: "h2", text: "3.1. Identification & contact data" },
          { type: "ul", items: ["Full name","Email address","Phone number","Address (if applicable)","Company and role"]},
          { type: "h2", text: "3.2. Business information" },
          { type: "ul", items: ["Business details and project requirements","Documents/materials for service delivery","Business correspondence"]},
          { type: "h2", text: "3.3. Technical information" },
          { type: "ul", items: ["IP address","Browser type/version","Operating system","Website usage data (pages, duration)"]},
          { type: "h2", text: "3.4. Financial information" },
          { type: "ul", items: ["Billing information","Transaction/payment history"]},
        ],
      },
      {
        h2: "4. How we use your information",
        body: [
          { type: "h2", text: "4.1. Service delivery" },
          { type: "ul", items: ["Providing requested services","Project communications","Processing orders and payments","Technical support"]},
          { type: "h2", text: "4.2. Service improvement" },
          { type: "ul", items: ["Internal analytics","Performance optimization","New features development"]},
          { type: "h2", text: "4.3. Communications" },
          { type: "ul", items: ["Project updates","Service information (with your consent)","Responding to requests"]},
          { type: "h2", text: "4.4. Legal compliance" },
          { type: "ul", items: ["Fulfilling legal/tax obligations","Responding to competent authorities"]},
        ],
      },
      {
        h2: "5. Sharing information",
        body: [
          { type: "ul", items: ["5.1. We do not sell or rent your data for marketing purposes."]},
          { type: "p", text: "5.2. We may share with:" },
          { type: "ul", items: ["Service providers (hosting, payments, accounting)","Public authorities when required by law","To protect the rights, property or safety of TINKA AI, clients or the public"]},
          { type: "p", text: "5.3. All partners are contractually bound to confidentiality." },
        ],
      },
      {
        h2: "6. Security",
        body: [
          { type: "p", text: "Measures against unauthorized access, alteration, disclosure, destruction:" },
          { type: "ul", items: ["Encryption of sensitive data","Strict access controls","System monitoring","Regular secure backups","Staff training"]},
          { type: "p", text: "No method of transmission or storage is 100% secure; absolute security cannot be guaranteed." },
        ],
      },
      {
        h2: "7. Data retention",
        body: [
          { type: "ul", items: ["We retain data as long as needed for services, legal/contractual obligations, dispute resolution."]},
          { type: "ul", items: ["Contract data: contract term + 5 years","Business communications: 3 years","Technical data: up to 24 months"]},
          { type: "p", text: "After retention, data will be securely deleted or anonymized." },
        ],
      },
      {
        h2: "8. Your rights",
        body: [
          { type: "ul", items: ["Access","Rectification","Erasure","Objection","Withdrawal of consent"]},
          { type: "p", text: "To exercise rights: office@tinka.md. We respond within 30 calendar days." },
        ],
      },
      {
        h2: "9. Cookies and similar technologies",
        body: [
          { type: "ul", items: ["We use cookies to improve user experience."]},
          { type: "ul", items: ["Essential","Analytics","Preferences"]},
          { type: "p", text: "You can control cookies in your browser settings; disabling some may impact functionality." },
        ],
      },
      {
        h2: "10. Marketing communications",
        body: [
          { type: "ul", items: ["Sent only with your explicit consent."]},
          { type: "ul", items: ['Unsubscribe link in emails', "Or contact: office@tinka.md"]},
        ],
      },
      {
        h2: "11. Third-party links",
        body: [{ type: "p", text: "We are not responsible for the privacy practices of third-party sites." }],
      },
      {
        h2: "12. Minors",
        body: [{ type: "p", text: "Our services are not intended for individuals under 18." }],
      },
      {
        h2: "13. International data transfers",
        body: [
          { type: "p", text: "Data may be stored outside Moldova (e.g., hosting/CDN/development platforms)." },
          { type: "h2", text: "Safeguards" },
          { type: "ul", items: [
            "Certifications: ISO 27001, SOC 2; GDPR principles",
            "TLS/SSL in transit; encryption at rest; restricted access; MFA; monitoring",
            "Contractual data-protection clauses",
          ]},
          { type: "h2", text: "Data minimization" },
          { type: "ul", items: [
            "Transfer only what is strictly necessary",
            "No sensitive data stored without extra encryption",
            "Financial data processed by certified providers",
          ]},
          { type: "h2", text: "Your rights" },
          { type: "ul", items: [
            "Request storage locations details",
            "Request deletion",
            "Object to international transfers where applicable",
          ]},
          { type: "p", text: "By using our services you consent to such transfers; for alternatives email office@tinka.md." },
        ],
      },
      {
        h2: "14. Changes to this Policy",
        body: [
          { type: "ul", items: ["We will publish changes with the update date; material changes may be notified by email/site; continued use = acceptance."]},
        ],
      },
      {
        h2: "15. Contact",
        body: [
          { type: "ul", items: ["Email: office@tinka.md","Address: [To be completed]","Phone: [To be completed]"]},
          { type: "p", text: "We respond promptly and address privacy concerns. By using TINKA AI services you confirm you have read, understood and accepted this Policy." },
        ],
      },
    ],
    contactLabel: "Questions about this policy?",
    contactEmailLabel: "Email us at",
    email: "office@tinka.md",
  },
}

export default function PrivacyPage() {
  const { locale, t: T } = useLocale() as any
const L = (PRIVACY as any)[locale as "ro" | "ru" | "en"] ?? PRIVACY.ro

const subjects = {
  ro: "Întrebare privind Politica de Confidențialitate",
  ru: "Вопрос по Политике конфиденциальности",
  en: "Question about the Privacy Policy",
} as const

const bodies = {
  ro: "Bună, echipa TINKA AI,\n\nAm o întrebare legată de Politica de Confidențialitate:\n\n",
  ru: "Здравствуйте, уважаемая команда TINKA AI,\n\nУ меня вопрос по Политике конфиденциальности:\n\n",
  en: "Hello TINKA AI team,\n\nI have a question about the Privacy Policy:\n\n",
} as const

const lang = (["ro","ru","en"] as const).includes(locale as any) ? (locale as "ro"|"ru"|"en") : "ro"

const mailHref = `mailto:${L.email
  }?subject=${encodeURIComponent(subjects[lang])
  }&body=${encodeURIComponent(bodies[lang])}`


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
             <a href={mailHref} className="text-info hover:underline">
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
