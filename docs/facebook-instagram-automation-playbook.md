# Automatizare postări Facebook/Instagram + comentariu întârziat — playbook complet

Ghid pas-cu-pas, testat și validat end-to-end (implementat real pentru TINKA AI, 28-29 septembrie 2026), pentru a replica la orice client nou:
1. Postare automată pe Facebook/Instagram (text + imagine AI) via Metricool, pe un program (ex. 3x/săptămână).
2. Un comentariu de follow-up postat automat ~20 minute mai târziu, cu text variabil per postare — tehnică folosită ca să nu penalizezi reach-ul postării principale cu un link extern, dar să oferi totuși linkul/CTA-ul în comentariu.

**Timp real de implementare** (inclusiv tot debugging-ul din acest ghid): ~1 zi de lucru pentru primul client (unde ai învățat toate capcanele), probabil **1-2 ore** pentru următorii clienți dacă urmezi exact pașii de mai jos.

---

## 0. Arhitectura pe scurt

```
Claude Code Routine (rulează 3x/săptămână, cron)
  │
  ├─ 1. Scrie textul postării + generează o imagine AI
  ├─ 2. Publică prin Metricool MCP connector (Metricool = deja conectat la pagina de FB/IG a clientului)
  └─ 3. Scrie textul comentariului de follow-up într-un fișier JSON din repo, commit + push pe `main`
              │
              └─ (push-ul declanșează) → GitHub Actions workflow
                                            ├─ așteaptă 20 minute (sleep)
                                            ├─ ia cel mai recent post al paginii (Graph API, cu Page Access Token din GitHub Secret)
                                            └─ postează comentariul pe acel post (Graph API)
```

**De ce în felul ăsta și nu mai simplu:**
- Metricool NU are opțiune de comentariu întârziat (doar `firstCommentText`, postat simultan cu postarea).
- Rutinele Claude Code (trigger-uri programate) **nu pot stoca secrete persistente** — API-ul respinge explicit `environment_variables` pe un trigger, cu mesajul "trigger configs are persisted and replayed on every fire". Deci tokenul Facebook nu poate sta acolo.
- GitHub Actions Secrets e locul corect: standard, sigur, ușor de găsit în UI (Settings → Secrets and variables → Actions), și repo-ul clientului există oricum dacă folosești Claude Code pentru cod.
- Rutina Claude Code nu are nevoie de tokenul Facebook deloc — doar scrie un fișier și dă push (lucru pe care oricum îl face deja, pentru alte automatizări de tip blog).

---

## 1. Precondiții per client nou

- [ ] Cont Metricool conectat la pagina de Facebook (și Instagram, dacă e cazul) a clientului, cu conectorul MCP `Metricool_Social_Media_Management` atașat rutinei în Claude Code.
- [ ] Repo GitHub al clientului, cu acces de push deja funcțional din rutina Claude Code.
- [ ] (Opțional) Un generator de imagini AI conectat.
- [ ] **Acces de Administrator la Business Manager (Meta Business Suite) al clientului** — nu doar acces la pagină, ci la Business Settings. Fără asta nu poți crea System User și nu poți genera tokenul corect.

---

## 2. Generarea Page Access Token-ului — metoda CORECTĂ (System User)

> ⚠️ **NU folosi Graph API Explorer + User Token personal.** Am încercat asta prima dată și am pierdut ore întregi: dropdown-ul de permisiuni din Explorer arată inconsistent doar `pages_show_list` și `business_management`, tokenul rezultat nu are drepturi de scriere, iar apelurile directe cu el dau eroarea `"A Page access token is required for this call for the new Pages experience"`. Mergi direct la metoda de mai jos.

### 2.1 Creează Meta App **din interiorul Business Settings** (nu de pe developers.facebook.com direct)

> Dacă o creezi separat pe developers.facebook.com, aplicația NU se leagă automat de Business Portfolio, iar mai târziu System User-ul nu va putea primi rol în ea ("Nu este disponibilă nicio permisiune... atribuie-i utilizatorului de sistem un rol în aplicație").

1. [business.facebook.com/settings](https://business.facebook.com/settings) → **Conturi** → **Aplicații** → **Adaugă** → creează aplicație nouă.
2. Nume: `<Client> Automation`.
3. Use case: **Content management** → **"Manage everything on your Page"**.

### 2.2 Creează System User și dă-i acces la pagină

1. Business Settings → **Utilizatori** → **Utilizatori de sistem** → **Adaugă**.
2. Nume: `<Client> Automation Bot`, rol: **Admin**.
3. Click pe el → **Atribuie active** → tab **Pagini** → selectează pagina clientului → **Acces deplin (Full control)** → Salvează.

### 2.3 Dă-ți ție însuți rol de Admin în aplicație

> **Capcana #1 reală întâlnită**: la generarea tokenului apare mesajul *"You are not an admin of this app. You may see a limited set of permissions"* — asta explică de ce doar 2 permisiuni erau disponibile.

1. Business Settings → Conturi → Aplicații → click pe aplicația creată → **Persoane** (sau link-ul "Manage app roles" din popup-ul de eroare de mai sus) → adaugă-te pe tine ca **Administrator**.

### 2.4 Generează tokenul System User-ului cu TOATE permisiunile corecte

1. Business Settings → Utilizatori de sistem → click pe bot-ul creat → **Generează un cod**.
2. Selectează aplicația creată mai sus.
3. Expirare: **Niciodată** (nu 60 zile — vrei un token stabil pentru automatizare).
4. La permisiuni, bifează **exact aceste 5**:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_engagement` ← **cea mai importantă, fără ea comentariul eșuează cu HTTP 403 "(#200) You do not have sufficient permissions"**
   - `pages_manage_posts`
   - `business_management`
5. **Generează un cod** → copiază tokenul (System User Token).

### 2.5 Exchange către Page Access Token (obligatoriu pentru "new Pages experience")

Tokenul de System User de mai sus **nu poate fi folosit direct** pentru apeluri pe Pagină — dă eroarea `"A Page access token is required for this call for the new Pages experience"`. Trebuie un exchange suplimentar:

Deschide în browser (înlocuiește `<PAGE_ID>` și `<SYSTEM_USER_TOKEN>`):
```
https://graph.facebook.com/v26.0/<PAGE_ID>/?fields=access_token&access_token=<SYSTEM_USER_TOKEN>
```

Rezultat: `{"access_token":"...","id":"<PAGE_ID>"}` — **acesta e Page Access Token-ul final**, cel care merge efectiv în GitHub Secret.

> ⚠️ **Capcana #2 reală, cea mai costisitoare din tot procesul**: când copiezi `access_token`-ul din acest JSON, copiază **DOAR valoarea dintre ghilimele**, niciodată tot blocul JSON. Dacă lipești accidental `{"access_token":"EAAP...","id":"123"}` întreg în secretul GitHub, obții un șir contaminat cu literele din `access_token` și `id` amestecate cu tokenul real — curl va eșua cu `"URL rejected: Malformed input to a URL function"` și pare complet de neînțeles până verifici lungimea (`${#TOKEN}`) și observi că nu se potrivește cu lungimea unui token curat (~190-200 caractere).

---

## 3. Salvează tokenul ca GitHub Secret

1. `github.com/<client>/<repo>/settings/secrets/actions` (link direct, mai sigur decât navigarea prin meniuri — "Secrets and variables" e un item separat de "Actions" în sidebar-ul de Settings, ușor de ratat).
2. **New repository secret** → Name: `FB_PAGE_ACCESS_TOKEN` → Value: **doar** tokenul curat de la pasul 2.5.
3. Notează și **Page ID**-ul (nu e secret, merge direct în codul workflow-ului).

---

## 4. Workflow-ul GitHub Actions (versiune finală, testată și funcțională)

Creează `.github/workflows/fb-delayed-comment.yml`:

```yaml
name: Facebook delayed follow-up comment

on:
  push:
    branches: [main]
    paths:
      - "automation/pending-fb-comment.json"
  workflow_dispatch: {}

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Wait 20 minutes so the comment lands after the post has settled
        run: sleep 1200

      - name: Extract comment text from the pending file
        run: |
          node -e "
            const fs = require('fs');
            const data = JSON.parse(fs.readFileSync('automation/pending-fb-comment.json', 'utf8'));
            if (!data.comment_text) { console.error('MISSING_COMMENT_TEXT'); process.exit(1); }
            fs.writeFileSync('/tmp/comment.txt', data.comment_text);
          "

      - name: Find the target post and post the comment
        env:
          FB_PAGE_ACCESS_TOKEN: ${{ secrets.FB_PAGE_ACCESS_TOKEN }}
          FB_PAGE_ID: "<PAGE_ID_AICI>"
        run: |
          # GitHub porneste acest pas cu `bash -e {0}` DIN AFARA (vezi "shell:" in log) —
          # doar stergerea unui "set -e" propriu NU il dezactiveaza, flag-ul e deja activ
          # la nivel de proces. Trebuie anulat explicit cu set +e, altfel orice VAR=$(cmd)
          # care esueaza omoara scriptul instant, inainte sa apuci sa citesti $? sau sa printezi ceva.
          set +e

          # curl poate respinge URL-ul cu "Malformed input to a URL function" daca tokenul
          # are caractere invizibile (spatii/newline de la copiere, sau JSON lipit din greseala
          # — vezi Capcana #2 mai sus). Lista alba stricta: pastram DOAR ce e valid intr-un
          # token Facebook (litere, cifre, _ si -).
          echo "Token length before cleanup: ${#FB_PAGE_ACCESS_TOKEN}"
          FB_PAGE_ACCESS_TOKEN="$(printf '%s' "$FB_PAGE_ACCESS_TOKEN" | tr -cd 'A-Za-z0-9_-')"
          echo "Token length after cleanup: ${#FB_PAGE_ACCESS_TOKEN}"

          if [ -z "$FB_PAGE_ACCESS_TOKEN" ]; then
            echo "::error::FB_PAGE_ACCESS_TOKEN secret is empty or not set in this repo's Settings > Secrets > Actions."
            exit 1
          fi

          HTTP_CODE=$(curl -sS -o /tmp/posts_response.json -w "%{http_code}" \
            "https://graph.facebook.com/v26.0/${FB_PAGE_ID}/posts?fields=id,message,created_time&limit=3&access_token=${FB_PAGE_ACCESS_TOKEN}" \
            2>/tmp/curl_err_1.txt)
          CURL_EXIT=$?
          echo "curl exit code (fetch posts): $CURL_EXIT, HTTP: $HTTP_CODE"

          if [ "$CURL_EXIT" -ne 0 ]; then
            echo "::error::curl failed with exit code $CURL_EXIT while fetching recent posts. curl stderr:"
            cat /tmp/curl_err_1.txt
            exit 1
          fi
          if [ "$HTTP_CODE" -lt 200 ] || [ "$HTTP_CODE" -ge 300 ]; then
            echo "::error::Facebook API returned HTTP $HTTP_CODE fetching recent posts. Response body:"
            cat /tmp/posts_response.json
            exit 1
          fi

          POST_ID=$(node -e "
            const fs = require('fs');
            const j = JSON.parse(fs.readFileSync('/tmp/posts_response.json', 'utf8'));
            if (j.error) { console.error('API_ERROR: ' + JSON.stringify(j.error)); process.exit(1); }
            if (!j.data || !j.data.length) { console.error('NO_POSTS_FOUND'); process.exit(1); }
            const post = j.data[0];
            const ageMinutes = (Date.now() - new Date(post.created_time).getTime()) / 60000;
            if (ageMinutes > 40) {
              console.error('MOST_RECENT_POST_TOO_OLD: ' + ageMinutes.toFixed(1) + ' minutes old, refusing to comment on a possibly wrong post');
              process.exit(1);
            }
            console.log(post.id);
          ")
          NODE_EXIT=$?
          if [ "$NODE_EXIT" -ne 0 ]; then
            echo "::error::Could not determine target post (see message above), exit code $NODE_EXIT."
            exit 1
          fi

          echo "Target post id: $POST_ID"

          HTTP_CODE=$(curl -sS -o /tmp/comment_response.json -w "%{http_code}" -X POST "https://graph.facebook.com/v26.0/${POST_ID}/comments" \
            --data-urlencode "message@/tmp/comment.txt" \
            --data-urlencode "access_token=${FB_PAGE_ACCESS_TOKEN}" \
            2>/tmp/curl_err_2.txt)
          CURL_EXIT=$?
          echo "curl exit code (post comment): $CURL_EXIT, HTTP: $HTTP_CODE"

          if [ "$CURL_EXIT" -ne 0 ]; then
            echo "::error::curl failed with exit code $CURL_EXIT while posting the comment. curl stderr:"
            cat /tmp/curl_err_2.txt
            exit 1
          fi
          if [ "$HTTP_CODE" -lt 200 ] || [ "$HTTP_CODE" -ge 300 ]; then
            echo "::error::Facebook API returned HTTP $HTTP_CODE posting the comment. Response body:"
            cat /tmp/comment_response.json
            exit 1
          fi

          node -e "
            const fs = require('fs');
            const r = JSON.parse(fs.readFileSync('/tmp/comment_response.json', 'utf8'));
            if (r.error) { console.error('COMMENT_FAILED: ' + JSON.stringify(r.error)); process.exit(1); }
            console.log('Comment posted successfully, id: ' + r.id);
          "
          exit $?
```

**De ce arată exact așa (fiecare linie e o lecție plătită cu timp real de debugging):**
- `set +e` explicit — vezi Capcana #3 mai jos.
- `curl -sS` (nu doar `-s`) + `2>/tmp/curl_err.txt` — altfel nu vezi NICIODATĂ mesajul real de eroare al lui curl.
- Verificare manuală a `$?` după fiecare curl, NU `set -e` global — vezi Capcana #3.
- Verificarea de "post mai vechi de 40 min → refuză" — plasă de siguranță reală, esențială: dacă altcineva postează manual pe pagină chiar înainte ca workflow-ul să ruleze, nu comentează din greșeală pe postarea greșită.
- `workflow_dispatch: {}` — permite testare manuală din UI GitHub (Actions → workflow → **Run workflow**) fără să aștepți un push real.

---

## 5. Prompt-ul rutinei Claude Code

```
STEP 1: Citește istoricul recent de postări (Metricool: getBrandSettings, getScheduledPosts) ca să
        eviți repetarea aceluiași tip de conținut. IMPORTANT: fromDate/toDate trebuie sa aiba offset
        de fus orar explicit (+03:00), altfel Metricool respinge cu "could not be parsed".

STEP 2: Scrie textul postării (limba/tonul clientului), 2-5 propoziții scurte, 2-4 hashtag-uri.

STEP 3: (opțional) Generează o imagine AI potrivită temei.

STEP 4, PUBLISH: Metricool createScheduledPost cu autoPublish:true, draft:false. IMPORTANT: foloseste
        un timestamp cu 1-3 minute in viitor pentru "acum" — Metricool respinge o data exact "acum"
        sau in trecut cu "Publication date cannot be in the past".

STEP 4b, DELAYED FOLLOW-UP COMMENT HANDOFF (doar dacă Step 4 a reușit):
        Facebook nu are opțiune de comentariu întârziat, iar acest sandbox nu poate ține un secret
        persistent — de asta comentariul real e postat de un GitHub Actions workflow deja configurat
        la .github/workflows/fb-delayed-comment.yml, care ține tokenul ca GitHub Secret și așteaptă
        20 de minute. Singura sarcină aici e handoff-ul textului:
        1. Scrie UN comentariu de follow-up scurt, natural, ca și cum pagina răspunde la propria
           postare — NICIODATĂ o repetare a textului postării și NICIODATĂ un CTA fix repetat
           identic de fiecare dată.
        2. IMPORTANT — verifică pe ce branch ești ÎNAINTE de commit: `git branch --show-current`.
           Dacă rutina are configurat un "outcomes" cu o ramură dedicată (ex. claude/xxx), un push
           acolo NU declanșează workflow-ul (care ascultă doar push pe `main`). Fă explicit
           `git fetch origin main && git checkout main && git reset --hard origin/main` înainte de
           orice modificare, ca să fii sigur că lucrezi pe main.
        3. Scrie acest text ca `comment_text` într-un JSON la `automation/pending-fb-comment.json`.
        4. Commit + push pe `main` — acest push declanșează automat workflow-ul.

STEP 5, FINAL REPORT: raportează ce ai postat, dacă imaginea a reușit, confirmarea publicării live,
        și confirmarea (sau eroarea) handoff-ului de comentariu.
```

---

## 6. Toate capcanele reale întâlnite (index rapid, ca să nu le repeți)

| # | Simptom | Cauză reală | Fix |
|---|---|---|---|
| 1 | Graph API Explorer arată doar 2 permisiuni | Nu ești admin al aplicației | Business Settings → Aplicații → adaugă-te Administrator |
| 2 | `"A Page access token is required for this call for the new Pages experience"` | Ai folosit User Token sau System User Token direct | Fă exchange: `GET /<PAGE_ID>?fields=access_token&access_token=<TOKEN>` |
| 3 | `curl: (3) URL rejected: Malformed input to a URL function` | Ai lipit tot JSON-ul (`{"access_token":"...","id":"..."}`) în loc de doar valoare | Copiază DOAR ce e între ghilimele; verifică `${#TOKEN}` |
| 4 | Script moare fără niciun mesaj, exit code 3, chiar și cu diagnosticare adăugată | `bash -e {0}` e impus de GitHub din exterior; `set -e` propriu sau lipsa lui nu contează | `set +e` explicit ca prima linie |
| 5 | `(#200) You do not have sufficient permissions to perform this action` (HTTP 403) la scriere, dar citirea merge | Lipsește `pages_manage_engagement` pe tokenul folosit efectiv | Regenerează System User token cu toate cele 5 permisiuni bifate |
| 6 | `getScheduledPosts`/`createScheduledPost` — "could not be parsed" | Lipsă offset fus orar în dată | Adaugă `+03:00` (sau fusul corect) la fiecare dată ISO |
| 7 | `"Publication date cannot be in the past"` | Timestamp "acum" e deja trecut până ajunge la API | Folosește +1-3 minute în viitor |
| 8 | Push-ul rutinei nu declanșează workflow-ul deloc | Rutina a lucrat pe o ramură feature dedicată (`outcomes` config), nu pe `main` | `git checkout main && git reset --hard origin/main` explicit înainte de commit |
| 9 | Rutina se oprește în mijlocul unui `sleep`/verificări, fără eroare | Sesiunea de rutină poate "termina" turn-ul în timp ce așteaptă un background task | Verifică manual dacă handoff-ul chiar s-a întâmplat (git log); dacă nu, repetă manual |
| 10 | Actualizare rutină (trigger) prin API resetează `session_context.allowed_tools`/model la un preset larg | API-ul înlocuiește tot obiectul `ccr`, nu doar câmpul trimis | Include ÎNTOTDEAUNA `environment_id` + `session_context` complet în orice update |
| 11 | `environment_variables` respins pe update de trigger | Nu e suportat pe trigger-uri (rutine programate) — design intenționat de securitate | Nu insista; folosește GitHub Secrets + Actions (secțiunea 2-4 de mai sus) |

---

## 7. Checklist final de verificare (bifează în ordine)

- [ ] System User creat, cu Full Control pe pagină.
- [ ] Tu ești Administrator al aplicației Meta.
- [ ] Token generat cu toate cele 5 permisiuni (`pages_show_list`, `pages_read_engagement`, `pages_manage_engagement`, `pages_manage_posts`, `business_management`), expirare "Niciodată".
- [ ] Exchange făcut, Page Access Token final obținut (nu System User Token-ul brut).
- [ ] Secret GitHub setat cu **doar** valoarea tokenului, verificată vizual că nu conține `{`, `}`, `"`, `:`.
- [ ] Workflow `.github/workflows/fb-delayed-comment.yml` cu `set +e` explicit și `curl -sS`.
- [ ] Test manual via `workflow_dispatch` → verifică log-ul complet (folosește "View raw logs" din meniul `...`, nu vizualizatorul interactiv care uneori nu arată liniile din mijloc).
- [ ] Test real end-to-end: o postare proaspătă (sub 40 min) → workflow-ul ar trebui să raporteze `"Comment posted successfully, id: ..."`.
