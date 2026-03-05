// app/terms/page.tsx
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Termeni și Condiții | TINKA AI",
  description:
    "Termenii și condițiile de utilizare a serviciilor TINKA AI – agenție digitală din Republica Moldova specializată în web design, chatbot AI și automatizări.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tinka.md/terms",
    languages: {
      "x-default": "https://tinka.md/terms",
      "ro": "https://tinka.md/terms",
    },
  },
  openGraph: {
    title: "Termeni și Condiții | TINKA AI",
    description: "Termenii și condițiile de utilizare a serviciilor TINKA AI.",
    url: "https://tinka.md/terms",
    siteName: "TINKA AI",
    locale: "ro_MD",
    type: "website",
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            ← Acasă
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-2">
            Termeni și Condiții
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Ultima actualizare: Martie 2025
          </p>

          <article className="prose prose-invert max-w-none space-y-8 text-muted-foreground">

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptarea Termenilor</h2>
              <p>
                Prin accesarea și utilizarea website-ului tinka.md și a serviciilor oferite de TINKA AI,
                confirmați că ați citit, înțeles și acceptați prezentii Termeni și Condiții. Dacă nu
                sunteți de acord, vă rugăm să nu utilizați serviciile noastre.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Descrierea Serviciilor</h2>
              <p>TINKA AI oferă următoarele servicii:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Creare și design website-uri profesionale</li>
                <li>Dezvoltare și integrare chatbot-uri AI</li>
                <li>Automatizări business și integrări software</li>
                <li>Consultanță digitală și strategie online</li>
                <li>Magazine online și soluții e-commerce</li>
                <li>Optimizare SEO și marketing digital</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Comenzi și Contracte</h2>
              <p>
                3.1. Fiecare proiect este supus unui contract individual semnat de ambele părți,
                care specifică scopul, termenele, costul și condițiile de livrare.
              </p>
              <p className="mt-2">
                3.2. Comanda devine fermă după confirmarea în scris (email sau contract semnat) și
                achitarea avansului convenit.
              </p>
              <p className="mt-2">
                3.3. Modificările de scop solicitate după semnarea contractului pot atrage costuri
                și termene suplimentare.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Prețuri și Plăți</h2>
              <p>
                4.1. Prețurile sunt stabilite individual, în funcție de complexitatea proiectului,
                și sunt indicate în oferta/contractul transmis clientului.
              </p>
              <p className="mt-2">
                4.2. Plata se efectuează conform graficului stabilit în contract (de regulă: avans
                + plată finală la livrare).
              </p>
              <p className="mt-2">
                4.3. Toate prețurile sunt exprimate în MDL sau EUR și includ TVA acolo unde este
                aplicabil conform legislației Republicii Moldova.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Drepturi de Proprietate Intelectuală</h2>
              <p>
                5.1. La finalizarea plății integrale, drepturile de autor asupra produsului livrat
                (cod, design, conținut creat de TINKA AI) se transferă clientului, cu excepția
                componentelor terțe (biblioteci, teme, plugin-uri) care rămân sub licențele lor
                originale.
              </p>
              <p className="mt-2">
                5.2. TINKA AI își rezervă dreptul de a prezenta proiectul în portofoliu, cu acordul
                clientului.
              </p>
              <p className="mt-2">
                5.3. Clientul garantează că materialele furnizate (logo, texte, imagini) nu
                încalcă drepturile terților.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Garanție și Suport</h2>
              <p>
                6.1. TINKA AI oferă o perioadă de garanție de 30 de zile pentru corectarea
                erorilor tehnice apărute din vina noastră după livrare.
              </p>
              <p className="mt-2">
                6.2. Serviciile de suport și mentenanță pe termen lung sunt disponibile prin
                pachete separate, stabilite contractual.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitarea Răspunderii</h2>
              <p>
                7.1. TINKA AI nu este responsabilă pentru pierderi indirecte, pierderi de profit,
                pierderi de date sau daune rezultate din utilizarea sau imposibilitatea utilizării
                serviciilor noastre, în afara cazurilor prevăzute de lege.
              </p>
              <p className="mt-2">
                7.2. Răspunderea maximă a TINKA AI este limitată la valoarea contractului aferent
                proiectului în cauză.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Confidențialitate</h2>
              <p>
                Colectarea și prelucrarea datelor cu caracter personal sunt descrise în{" "}
                <Link href="/privacy" className="text-sky-400 hover:underline">
                  Politica de Confidențialitate
                </Link>
                , care face parte integrantă din acești Termeni.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Modificarea Termenilor</h2>
              <p>
                TINKA AI își rezervă dreptul de a modifica acești Termeni și Condiții în orice
                moment. Modificările vor fi publicate pe această pagină cu data actualizării.
                Continuarea utilizării serviciilor după publicarea modificărilor constituie
                acceptarea noilor termeni.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Legea Aplicabilă</h2>
              <p>
                Acești Termeni sunt guvernați de legislația Republicii Moldova. Orice litigiu va
                fi soluționat pe cale amiabilă sau, în caz de eșec, de instanțele competente din
                Republica Moldova.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Email: <a href="mailto:office@tinka.md" className="text-sky-400 hover:underline">office@tinka.md</a></li>
                <li>Telefon: <a href="tel:+37368333899" className="text-sky-400 hover:underline">+373 68 333 899</a></li>
                <li>Adresa: Chișinău, Republica Moldova</li>
              </ul>
            </section>

          </article>

          <div className="mt-10 rounded-lg border border-border p-4 text-sm text-muted-foreground">
            <p>
              Întrebări despre acești Termeni?{" "}
              <a
                href="mailto:office@tinka.md?subject=Intrebare%20Termeni%20si%20Conditii"
                className="text-sky-400 hover:underline"
              >
                Scrie-ne la office@tinka.md
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
