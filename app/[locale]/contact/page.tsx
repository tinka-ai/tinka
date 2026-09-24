// app/[locale]/contact/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import type { Locale } from "@/contexts/locale-context";
import ContactClient from "./ContactClient";

const LOCALES: Locale[] = ["ro", "en", "ru"];

function urlFor(locale: Locale, path: string) {
  const prefix = locale === "ro" ? "" : `/${locale}`;
  return `https://tinka.md${prefix}${path}`;
}

const META: Record<Locale, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  ro: {
    title: "Contact TINKA AI – Consultanță, Website-uri și Soluții AI în Moldova",
    description:
      "Contactează echipa TINKA AI pentru consultanță în web design, automatizări AI, chatbot-uri și soluții digitale pentru afaceri din Republica Moldova.",
    ogTitle: "Contact TINKA AI – Soluții Digitale și AI în Moldova",
    ogDescription:
      "Suntem aici să ajutăm cu website-uri moderne, chatbot-uri AI și automatizări pentru afaceri din Republica Moldova.",
  },
  en: {
    title: "Contact TINKA AI – Consulting, Websites and AI Solutions in Moldova",
    description:
      "Contact the TINKA AI team for consulting on web design, AI automation, chatbots and digital solutions for businesses in the Republic of Moldova.",
    ogTitle: "Contact TINKA AI – Digital & AI Solutions in Moldova",
    ogDescription:
      "We're here to help with modern websites, AI chatbots and automation for businesses in the Republic of Moldova.",
  },
  ru: {
    title: "Контакты TINKA AI – Консалтинг, сайты и AI-решения в Молдове",
    description:
      "Свяжитесь с командой TINKA AI по вопросам веб-дизайна, AI-автоматизации, чатботов и цифровых решений для бизнеса в Молдове.",
    ogTitle: "Контакты TINKA AI – Цифровые и AI-решения в Молдове",
    ogDescription:
      "Мы готовы помочь с современными сайтами, AI-чатботами и автоматизацией для бизнеса в Молдове.",
  },
};

const OG_LOCALE: Record<Locale, string> = { ro: "ro_MD", en: "en_US", ru: "ru_MD" };

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale;
  const m = META[locale];
  const url = urlFor(locale, "/contact");

  return {
    title: m.title,
    description: m.description,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: url,
      languages: {
        "x-default": urlFor("ro", "/contact"),
        ro: urlFor("ro", "/contact"),
        en: urlFor("en", "/contact"),
        ru: urlFor("ru", "/contact"),
      },
    },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url,
      siteName: "TINKA AI",
      locale: OG_LOCALE[locale],
      type: "website",
      images: [{ url: "https://tinka.md/image/og-image.webp", width: 1200, height: 630, alt: m.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.ogDescription,
      images: ["https://tinka.md/image/og-image.webp"],
    },
  };
}

const BREADCRUMB_LABEL: Record<Locale, { home: string; contact: string }> = {
  ro: { home: "Acasă", contact: "Contact" },
  en: { home: "Home", contact: "Contact" },
  ru: { home: "Главная", contact: "Контакты" },
};

function ContactJSONLD({ locale }: { locale: Locale }) {
  const m = META[locale];
  const url = urlFor(locale, "/contact");
  const bc = BREADCRUMB_LABEL[locale];

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: bc.home, item: urlFor(locale, "") || urlFor(locale, "/") },
          { "@type": "ListItem", position: 2, name: bc.contact, item: url },
        ],
      },
      {
        "@type": "ContactPage",
        name: m.title,
        url,
        description: m.description,
        inLanguage: locale,
        mainEntity: { "@id": "https://tinka.md/#business" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale;
  return (
    <>
      <ContactJSONLD locale={locale} />
      <ContactClient />
    </>
  );
}
