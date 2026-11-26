// app/app-privacy/page.tsx — pagina publica de privacy policy pentru
// aplicatiile mobile TINKA AI publicate pe Google Play. Un singur URL
// (tinka.md/app-privacy) cu cate o sectiune per aplicatie, ca sa poata fi
// pus direct in Play Console la fiecare aplicatie noua fara a crea pagini
// separate de fiecare data.
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politica de Confidențialitate — Aplicații Mobile | TINKA AI",
  description:
    "Politica de confidențialitate pentru aplicațiile mobile Android publicate de TINKA AI pe Google Play: ce date accesează fiecare aplicație și cum sunt folosite.",
  alternates: { canonical: "https://tinka.md/app-privacy" },
  openGraph: {
    title: "Politica de Confidențialitate — Aplicații Mobile TINKA AI",
    description:
      "Ce date accesează și cum le folosește fiecare aplicație mobilă TINKA AI publicată pe Google Play.",
    url: "https://tinka.md/app-privacy",
    siteName: "TINKA AI",
    locale: "ro_MD",
    type: "website",
  },
}

type Section = { h2: string; body: React.ReactNode }

type AppPolicy = {
  id: string
  appName: string
  packageId: string
  updated: string
  summary: string[]
  sections: Section[]
}

const APPS: AppPolicy[] = [
  {
    id: "tinka-image-pdf",
    appName: "TINKA Image-PDF",
    packageId: "tinka.imagepdf",
    updated: "26 noiembrie 2026",
    summary: [
      "Nu colectează și nu transmite nicio dată către dezvoltator",
      "Nu necesită acces la internet și nu folosește servere cloud proprii",
      "Fără conturi de utilizator, fără reclame, fără instrumente de analiză",
      "Toată prelucrarea imaginilor și documentelor PDF se face local, pe dispozitiv",
    ],
    sections: [
      {
        h2: "1. Despre această politică",
        body: (
          <p>
            Această politică explică modul în care <strong>TINKA Image-PDF</strong> accesează și
            prelucrează fișierele alese de utilizator. Aplicația permite editarea imaginilor și
            documentelor PDF, conversia, extragerea paginilor și adăugarea de adnotări sau
            semnături vizuale. Procesarea se realizează local, pe dispozitiv.
          </p>
        ),
      },
      {
        h2: "2. Date accesate și utilizarea lor",
        body: (
          <>
            <p>
              Aplicația accesează imaginile, documentele PDF și proiectele pe care alegi să le
              deschizi prin selectorul de fișiere Android. Aceste fișiere pot conține informații
              personale, inclusiv fotografii, text și semnături. Conținutul este folosit numai
              pentru operațiunile solicitate: afișare, editare, conversie, salvare și distribuire.
            </p>
            <p>
              Textul introdus, desenele, adnotările și semnăturile adăugate sunt procesate local.
              Semnăturile salvate pentru reutilizare sunt păstrate pe dispozitiv; nu sunt trimise
              către TINKA AI și nu sunt folosite pentru identificare biometrică.
            </p>
            <p>Preferințele de limbă și temă sunt păstrate local sau gestionate de Android.</p>
          </>
        ),
      },
      {
        h2: "3. Colectare și transmitere",
        body: (
          <>
            <p>
              Aplicația nu transmite către dezvoltator conținutul documentelor, fotografiile,
              semnăturile sau preferințele utilizatorului. Nu include conturi, publicitate,
              instrumente de analiză a utilizării, raportare automată a erorilor către dezvoltator
              ori procesare în cloud. Nu colectează locația, contactele sau identificatori pentru
              publicitate și nu solicită permisiunea Android de acces la internet.
            </p>
            <p>
              TINKA AI nu vinde și nu utilizează documentele procesate în aplicație pentru
              publicitate sau antrenarea unor modele AI. Denumirea dezvoltatorului TINKA AI nu
              înseamnă că fișierele sunt trimise unui serviciu AI.
            </p>
          </>
        ),
      },
      {
        h2: "4. Acces la fișiere și servicii externe",
        body: (
          <>
            <p>
              Accesul la fișiere se face prin mecanismele Android de selectare a documentelor. Nu
              este necesar acces general la toate fișierele dispozitivului.
            </p>
            <p>
              Selectorul Android poate include furnizori externi de stocare, inclusiv servicii
              cloud. Dacă alegi un asemenea furnizor la deschidere sau salvare, acesta poate
              utiliza rețeaua și poate prelucra date conform propriilor politici, separat de
              aplicație.
            </p>
            <p>
              Dacă alegi Distribuire, aplicația destinatară selectată de tine primește fișierul
              exportat. Gestionarea ulterioară a acelui fișier este supusă politicii aplicației
              destinatare. Deschiderea site-ului TINKA pornește un browser extern; navigarea este
              supusă practicilor browserului și site-ului respectiv.
            </p>
          </>
        ),
      },
      {
        h2: "5. Stocare, păstrare și ștergere",
        body: (
          <>
            <p>
              Copiile importate, datele de lucru și semnăturile reutilizabile pot fi păstrate în
              spațiul privat al aplicației. Exporturile temporare sunt create în memoria cache
              privată. Nu este stabilit un termen automat fix de ștergere pentru toate fișierele
              locale. Android poate elimina memoria cache când este necesar.
            </p>
            <p>
              Poți șterge semnătura reutilizabilă prin opțiunea corespunzătoare din aplicație.
              Această acțiune nu elimină semnăturile deja inserate în proiecte sau documente
              exportate.
            </p>
            <p>
              Ștergerea datelor aplicației din setările Android sau dezinstalarea elimină datele
              din spațiul privat al aplicației. Copierea de siguranță automată Android este
              dezactivată pentru aceste date.
            </p>
            <p>
              Fișierele salvate în foldere alese de tine, proiectele exportate și copiile
              distribuite rămân în destinațiile respective până când sunt șterse acolo. Ștergerea
              datelor aplicației nu șterge aceste copii. Nu există cont de utilizator sau depozit
              de documente pe serverele dezvoltatorului care să necesite o cerere de ștergere.
            </p>
          </>
        ),
      },
      {
        h2: "6. Securitate",
        body: (
          <>
            <p>
              Datele interne sunt păstrate în spațiul privat oferit de Android. Distribuirea
              exporturilor utilizează acces de citire acordat aplicației destinatare prin
              mecanismele Android. Aplicația nu adaugă criptare proprie documentelor sau
              exporturilor. Protejează dispozitivul și acordă atenție destinațiilor de salvare și
              distribuire.
            </p>
            <p>
              Semnăturile adăugate sunt elemente vizuale, nu semnături digitale criptografice și
              nu presupun verificarea identității semnatarului.
            </p>
          </>
        ),
      },
      {
        h2: "7. Copii",
        body: (
          <p>
            Aplicația nu colectează și nu transmite către dezvoltator informații personale despre
            copii sau alți utilizatori. Fișierele selectate sunt procesate local conform acestei
            politici.
          </p>
        ),
      },
      {
        h2: "8. Modificări ale politicii",
        body: (
          <p>
            Această politică va fi actualizată dacă se schimbă practicile aplicației privind
            datele. Data ultimei actualizări este indicată la începutul secțiunii. Politica
            publicată și cea disponibilă în aplicație trebuie menținute în concordanță cu versiunea
            distribuită.
          </p>
        ),
      },
      {
        h2: "9. Contact",
        body: (
          <p>
            Dezvoltator: TINKA AI — Site:{" "}
            <a href="https://tinka.md" className="text-info hover:underline">
              https://tinka.md
            </a>{" "}
            — Contact pentru întrebări privind confidențialitatea:{" "}
            <a href="mailto:office@tinka.md" className="text-info hover:underline">
              office@tinka.md
            </a>
            .
          </p>
        ),
      },
    ],
  },
]

function AppPrivacyJSONLD() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Politica de Confidențialitate — Aplicații Mobile TINKA AI",
    url: "https://tinka.md/app-privacy",
    isPartOf: { "@type": "WebSite", name: "TINKA AI", url: "https://tinka.md" },
    publisher: { "@id": "https://tinka.md/#business" },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export default function AppPrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppPrivacyJSONLD />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <a href="https://tinka.md" className="text-sm text-info hover:underline">
            ← tinka.md
          </a>

          <h1 className="text-3xl font-bold text-foreground mt-4 mb-2">
            Politica de Confidențialitate — Aplicații Mobile TINKA AI
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Această pagină conține politica de confidențialitate pentru fiecare aplicație Android
            publicată de TINKA AI pe Google Play. Fiecare secțiune de mai jos corespunde unei
            singure aplicații, identificată prin numele și identificatorul ei de pachet.
          </p>

          {APPS.map((app) => (
            <article key={app.id} id={app.id} className="mb-16 scroll-mt-8">
              <h2 className="text-2xl font-bold text-foreground mb-1">{app.appName}</h2>
              <p className="text-xs text-muted-foreground mb-1">
                Identificator pachet: <code>{app.packageId}</code> · Dezvoltator: TINKA AI · Site:{" "}
                <a href="https://tinka.md" className="text-info hover:underline">
                  tinka.md
                </a>
              </p>
              <p className="text-sm text-muted-foreground mb-6">Ultima actualizare: {app.updated}</p>

              <div className="rounded-lg border border-border bg-muted/30 p-4 mb-8">
                <p className="text-sm font-semibold text-foreground mb-2">Pe scurt</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {app.summary.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="prose prose-invert max-w-none">
                {app.sections.map((s, i) => (
                  <section key={i} className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{s.h2}</h3>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      {s.body}
                    </div>
                  </section>
                ))}
              </div>
            </article>
          ))}

          <div className="mt-4 rounded-lg border border-border p-4 text-sm text-muted-foreground">
            <p>
              Legal: T.I.N.K.A. AI SRL · IDNO 10125600048437 · Chișinău, Republica Moldova ·{" "}
              <a href="mailto:office@tinka.md" className="text-info hover:underline">
                office@tinka.md
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
