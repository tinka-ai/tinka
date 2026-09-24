// app/[locale]/about/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import type { Locale } from "@/contexts/locale-context";
import AboutClient from "./AboutClient";

const LOCALES: Locale[] = ["ro", "en", "ru"];

function urlFor(locale: Locale, path: string) {
  const prefix = locale === "ro" ? "" : `/${locale}`;
  return `https://tinka.md${prefix}${path}`;
}

const META: Record<Locale, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  ro: {
    title: "Despre TINKA AI – Cine suntem și ce facem",
    description:
      "Află povestea TINKA AI, misiunea noastră și cum ajutăm afacerile din Moldova cu web design modern, AI, automatizări și soluții digitale inteligente.",
    ogTitle: "Despre noi – TINKA AI",
    ogDescription:
      "Suntem o agenție digitală specializată în Web Design, AI, Chatbot-uri și automatizări pentru afacerile din Moldova.",
  },
  en: {
    title: "About TINKA AI – Who We Are and What We Do",
    description:
      "Learn about TINKA AI's story, our mission, and how we help businesses in Moldova with modern web design, AI, automation and smart digital solutions.",
    ogTitle: "About Us – TINKA AI",
    ogDescription:
      "We're a digital agency specialized in web design, AI, chatbots and automation for businesses in Moldova.",
  },
  ru: {
    title: "О компании TINKA AI – Кто мы и чем занимаемся",
    description:
      "Узнайте историю TINKA AI, нашу миссию и как мы помогаем бизнесу в Молдове с современным веб-дизайном, ИИ, автоматизацией и умными цифровыми решениями.",
    ogTitle: "О нас – TINKA AI",
    ogDescription:
      "Мы — цифровое агентство, специализирующееся на веб-дизайне, ИИ, чатботах и автоматизации для бизнеса в Молдове.",
  },
};

const OG_LOCALE: Record<Locale, string> = { ro: "ro_MD", en: "en_US", ru: "ru_MD" };

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale;
  const m = META[locale];
  const url = urlFor(locale, "/about");

  return {
    title: m.title,
    description: m.description,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: url,
      languages: {
        "x-default": urlFor("ro", "/about"),
        ro: urlFor("ro", "/about"),
        en: urlFor("en", "/about"),
        ru: urlFor("ru", "/about"),
      },
    },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url,
      type: "website",
      siteName: "TINKA AI",
      locale: OG_LOCALE[locale],
      images: [
        { url: "https://tinka.md/image/og-image.webp", width: 1200, height: 630, alt: m.ogTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.ogDescription,
      images: ["https://tinka.md/image/og-image.webp"],
    },
  };
}

const BREADCRUMB_LABEL: Record<Locale, { home: string; about: string }> = {
  ro: { home: "Acasă", about: "Despre" },
  en: { home: "Home", about: "About" },
  ru: { home: "Главная", about: "О компании" },
};

function AboutJSONLD({ locale }: { locale: Locale }) {
  const m = META[locale];
  const url = urlFor(locale, "/about");
  const bc = BREADCRUMB_LABEL[locale];

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: bc.home, item: urlFor(locale, "") || urlFor(locale, "/") },
          { "@type": "ListItem", position: 2, name: bc.about, item: url },
        ],
      },
      {
        "@type": "AboutPage",
        name: m.title,
        description: m.description,
        url,
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

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale;
  return (
    <>
      <AboutJSONLD locale={locale} />
      <AboutClient />
    </>
  );
}
