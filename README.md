# GinnyTech

Sito informativo statico del corso gratuito GinnyTech, in italiano, costruito con Astro 7. Il programma collega analytics, marketing e data engineering.

## Sviluppo

Requisiti: Node.js 24 LTS e npm. Installa dal lockfile:

```bash
npm ci
npm run dev
```

Il server Astro usa normalmente la porta 4321. Astro 7 può avviarlo in background quando rileva un agente; gestiscilo con `npm exec astro dev status`, `npm exec astro dev logs` e `npm exec astro dev stop`. In un ambiente cloud già isolato usa il checkout esistente.

Per disabilitare la telemetria della CLI nell’ambiente di lavoro imposta `ASTRO_TELEMETRY_DISABLED=1`.

## Programma e contenuti

- `src/data/course.ts`: unica fonte per i 19 moduli, prerequisiti, sei tappe, due percorsi e proposte pratiche.
- `src/lib/search.ts`: normalizzazione e confronto condivisi tra ricerca e test.
- `src/data/glossary.ts`: definizioni, esempi e moduli collegati.
- `src/pages/programma/`: programma e guide statiche ai moduli.
- `src/pages/`: home e pagine informative.
- `src/layouts/` e `public/styles/`: navigazione, metadati e stili comuni.

Le guide al programma sono sotto `/programma/`. Gli indirizzi già esistenti del corso e delle lezioni restano `https://ginnytech.it/course` e `https://ginnytech.it/course/modulo-N`: non vengono sostituiti da pagine di orientamento. La gratuità e la disponibilità del corso sono state confermate dal titolare. Le guide non dichiarano un numero di lezioni pubblicate, certificazioni, durata o assistenza non verificati.

Gli articoli sono attualmente anteprime, chiaramente indicate come contenuti in preparazione. Le pagine non caricano font esterni, strumenti di analytics o servizi di prenotazione incorporati; TidyCal si apre attraverso un collegamento esplicito.

## Verifica

```bash
npm run check
npm exec tsc -- --noEmit
npm test
npm run build
```

`npm test` esegue il catalogo con il runner Node e poi i test browser Playwright: ricerca, percorsi, accessibilità di base, comportamento senza JavaScript, schermi stretti e risoluzione delle risorse locali.

Playwright utilizza Chromium di sistema quando disponibile in `/usr/bin/chromium`; puoi specificare un altro eseguibile con `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Se non hai un browser installato:

```bash
npx playwright install chromium
```

Il download richiede accesso ai domini ufficiali di distribuzione Playwright. Il server dei test usa l’API di anteprima Astro sul build nella porta 4322, è gestito da Playwright e non interferisce con il server di sviluppo sulla porta 4321.

TypeScript resta nella versione 6: al momento `astro check` richiede l’API programmatica che TypeScript 7 non fornisce. Il controllo include i file Astro e TypeScript del sito attivo.

## Build e Cloudflare Pages

`npm run build` produce direttamente `.open-next/assets`. `wrangler.jsonc` dichiara lo stesso percorso in `pages_build_output_dir`, così Pages usa gli asset generati e non un eventuale valore precedente nel pannello. Gli output generati non sono tracciati nel repository. Per esaminare il build usa `npm run preview`.

Per la pubblicazione automatica, il progetto Cloudflare Pages deve essere collegato a questo repository con ramo di produzione `main` e comando di build `npm run build`. Controlla nel pannello che il deployment di produzione corrisponda all’ultimo commit: la presenza del codice su GitHub non prova l’esito del deployment. La cartella di output corretta è `.open-next/assets`, mai una copia storica di `dist/`.

`npm run deploy` compila e invia gli asset al progetto Cloudflare Pages `ginnytech`; richiede autenticazione Cloudflare ed è separato dalla pubblicazione Git su `main`. Un push non dimostra da solo il completamento del deployment: verificare l’esito nel progetto Cloudflare.

Favicon e immagine social sono locali. La sorgente modificabile della card è `public/social-card.svg`; l’anteprima per i social è `public/social-card.png` (1200 × 630).

## Materiale del precedente template

I file Payload/Next.js in `src/app`, `src/collections`, `src/migrations` e le configurazioni Payload sono materiale legacy, non importato dal sito Astro. I vecchi test sono conservati in `tests/legacy/payload` e non fanno parte della suite attiva. Il vecchio `pnpm-lock.yaml` è relativo a quel template: per questo sito usa esclusivamente npm e `package-lock.json`.

## Informazioni da mantenere verificate

La revisione riguarda il sito informativo e il programma. Prima di ampliare dichiarazioni su supporto, durata, risultati o trattamento dei dati del corso, verificarle con il titolare e con i servizi effettivamente usati. L’informativa descrive il comportamento delle pagine statiche; conservazione dei messaggi, basi giuridiche e dettagli del trattamento del corso richiedono la conferma del gestore. Non dedurre questi dati dal solo codice frontend.
