export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import type { Locale } from "@/contexts/locale-context";
import PortfolioClient from "./PortfolioClient";

const LOCALES: Locale[] = ["ro", "en", "ru"];

function urlFor(locale: Locale, path: string) {
  const prefix = locale === "ro" ? "" : `/${locale}`;
  return `https://tinka.md${prefix}${path}`;
}

const META: Record<Locale, { title: string; description: string; ogTitle: string }> = {
  ro: {
    title: "Portofoliu – Proiecte și produse SaaS",
    description:
      "Vezi portofoliul TINKA AI: proiecte SaaS, aplicații web și soluții digitale realizate pentru clienți din Moldova.",
    ogTitle: "Portofoliu – TINKA AI",
  },
  en: {
    title: "Portfolio – SaaS Projects and Products",
    description:
      "See TINKA AI's portfolio: SaaS projects, web applications and digital solutions built for clients in Moldova.",
    ogTitle: "Portfolio – TINKA AI",
  },
  ru: {
    title: "Портфолио – SaaS-проекты и продукты",
    description:
      "Портфолио TINKA AI: SaaS-проекты, веб-приложения и цифровые решения, реализованные для клиентов в Молдове.",
    ogTitle: "Портфолио – TINKA AI",
  },
};

const OG_LOCALE: Record<Locale, string> = { ro: "ro_MD", en: "en_US", ru: "ru_MD" };

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale;
  const m = META[locale];
  const url = urlFor(locale, "/portfolio");

  return {
    title: m.title,
    description: m.description,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: url,
      languages: {
        "x-default": urlFor("ro", "/portfolio"),
        ro: urlFor("ro", "/portfolio"),
        en: urlFor("en", "/portfolio"),
        ru: urlFor("ru", "/portfolio"),
      },
    },
    openGraph: {
      title: m.ogTitle,
      description: m.description,
      url,
      type: "website",
      siteName: "TINKA AI",
      locale: OG_LOCALE[locale],
      images: [{ url: "https://tinka.md/image/og-image.webp", width: 1200, height: 630, alt: m.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.description,
      images: ["https://tinka.md/image/og-image.webp"],
    },
  };
}

function PortfolioJSONLD({ locale }: { locale: Locale }) {
  const m = META[locale];
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: urlFor(locale, "/portfolio"),
    name: m.ogTitle,
    description: m.description,
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", name: "TINKA AI", url: "https://tinka.md" },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  const locale = (LOCALES.includes(raw as Locale) ? raw : "ro") as Locale;
  return (
    <>
      <PortfolioJSONLD locale={locale} />
      <PortfolioClient />
    </>
  );
}
