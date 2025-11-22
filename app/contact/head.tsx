export default function Head() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Acasă",
            "item": "https://tinka.md/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact",
            "item": "https://tinka.md/contact"
          }
        ]
      },

      {
        "@type": "ContactPage",
        "name": "Contact TINKA AI",
        "url": "https://tinka.md/contact",
        "description": "Formular de contact și date de contact pentru TINKA AI.",
        "mainEntity": {
          "@type": "Organization",
          "@id": "https://tinka.md/#business"
        }
      },

      {
        "@type": "Organization",
        "@id": "https://tinka.md/#business",
        "name": "TINKA AI",
        "url": "https://tinka.md",
        "email": "office@tinka.md",
        "telephone": "+37368333899",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Chișinău",
          "addressCountry": "Moldova"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+37368333899",
            "email": "office@tinka.md",
            "contactType": "customer service",
            "areaServed": "MD",
            "availableLanguage": ["ro", "ru", "en"]
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
