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
            "position": 2",
            "name": "Despre",
            "item": "https://tinka.md/about"
          }
        ]
      },

      {
        "@type": "AboutPage",
        "name": "Despre TINKA AI",
        "description":
          "Informații despre TINKA AI, misiunea și viziunea agenției digitale din Republica Moldova.",
        "url": "https://tinka.md/about",
        "mainEntity": {
          "@id": "https://tinka.md/#business"
        }
      },

      {
        "@type": "Organization",
        "@id": "https://tinka.md/#business",
        "name": "TINKA AI",
        "url": "https://tinka.md",
        "logo": "https://tinka.md/tinka-og-image.jpg",
        "email": "office@tinka.md",
        "telephone": "+37368333899",
        "description":
          "TINKA AI oferă servicii digitale în Moldova: web design, AI chatbot, automatizări și soluții moderne pentru IMM-uri.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Chișinău",
          "addressCountry": "Moldova"
        },
        "sameAs": [
          "https://www.facebook.com/tinka.ai",
          "https://www.instagram.com/tinka.ai"
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
