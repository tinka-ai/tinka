// app/contact/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Script from "next/script";
import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact TINKA AI – Consultanță, Website-uri și Soluții AI în Moldova",
  description:
    "Contactează echipa TINKA AI pentru consultanță în web design, automatizări AI, chatbot-uri și soluții digitale pentru afaceri din Republica Moldova.",

  alternates: {
    canonical: "https://tinka.md/contact",
    languages: {
      "ro-MD": "https://tinka.md/contact",
      "en-US": "https://tinka.md/en/contact",
      "ru-MD": "https://tinka.md/ru/contact",
    },
  },

  openGraph: {
    title: "Contact TINKA AI – Soluții Digitale și AI în Moldova",
    description:
      "Suntem aici să ajutăm cu website-uri moderne, chatbot-uri AI și automatizări pentru afaceri din Republica Moldova.",
    url: "https://tinka.md/contact",
    siteName: "TINKA AI",
    locale: "ro_MD",
    alternateLocale: ["en_US", "ru_MD"],
    type: "website",
    images: [
      {
        url: "https://tinka.md/og/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact TINKA AI Moldova",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact TINKA AI – Soluții Digitale pentru Afaceri",
    description:
      "Scrie-ne pentru website-uri moderne, chatboturi AI și automatizări business.",
    images: ["https://tinka.md/og/contact-og.jpg"],
  },
};

function ContactJSONLD() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: "https://tinka.md/contact",
    mainEntity: {
      "@type": "Organization",
      name: "TINKA AI",
      url: "https://tinka.md",
      email: "office@tinka.md",
      telephone: "+37368333899",
      logo: "https://tinka.md/tinka-og-image.jpg",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+37368333899",
        email: "office@tinka.md",
        areaServed: "Moldova",
        availableLanguage: ["ro", "ru", "en"],
      },
    },
  };

  return (
    <Script
      id="contact-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function ContactPage() {
  return (
    <>
      <ContactJSONLD />
      <ContactClient />
    </>
  );
}
