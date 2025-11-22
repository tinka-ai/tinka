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
            "name": "Soluții",
            "item": "https://tinka.md/solutions"
          }
        ]
      },

      {
        "@type": "LocalBusiness",
        "@id": "https://tinka.md/#business",
        "name": "TINKA AI",
        "url": "https://tinka.md",
        "image": "https://tinka.md/tinka-og-image.jpg",
        "telephone": "+37368333899",
        "email": "office@tinka.md",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Chișinău",
          "addressCountry": "Moldova"
        },
        "description":
          "Servicii digitale pentru IMM-urile din Moldova: website-uri moderne, chatbot AI, automatizări și consultanță.",
        "sameAs": [
          "https://www.facebook.com/tinka.ai",
          "https://www.instagram.com/tinka.ai"
        ]
      },

      {
        "@type": "ItemList",
        "@id": "https://tinka.md/solutions#list",
        "name": "Lista soluțiilor TINKA AI",
        "itemListOrder": "Ascending",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Service",
              "name": "Chatbot AI pentru afaceri",
              "url": "https://tinka.md/solutions",
              "description":
                "Chatbot AI în limba română și rusă, integrat cu WhatsApp, Facebook și website.",
              "provider": {
                "@id": "https://tinka.md/#business"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Service",
              "name": "Web design și creare site",
              "url": "https://tinka.md/solutions",
              "description":
                "Creare site-uri moderne și rapide, optimizate pentru Google.",
              "provider": {
                "@id": "https://tinka.md/#business"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "Service",
              "name": "Automatizări cu inteligență artificială",
              "url": "https://tinka.md/solutions",
              "description":
                "Fluxuri automate pentru CRM, email, WhatsApp și preluarea datelor.",
              "provider": {
                "@id": "https://tinka.md/#business"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "Service",
              "name": "Consultanță digitală și AI",
              "url": "https://tinka.md/solutions",
              "description":
                "Plan digital complet pentru IMM-uri: website, chatbot, automatizări.",
              "provider": {
                "@id": "https://tinka.md/#business"
              }
            }
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
