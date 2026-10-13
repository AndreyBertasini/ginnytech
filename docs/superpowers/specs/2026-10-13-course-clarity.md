# GinnyTech: struttura e testi del corso

## Obiettivo approvato

Dopo l'analisi di tutte le pagine, l'utente ha chiesto di correggere i problemi individuati e pubblicare le modifiche su `main`. Ha confermato che il corso è gratuito e già accessibile. L'intervento deve rendere chiari pubblico, prerequisiti, punto di partenza e progressione, con testi concreti e coerenti.

## Struttura

- Conservare gli identificativi dei 19 moduli e gli attuali collegamenti `https://ginnytech.it/course/modulo-N`.
- Pubblicare programma e guide di orientamento sotto `/programma/`, senza sostituire le lezioni esistenti.
- Unica fonte dati per catalogo, ricerca e percorsi.
- Base comune: orientamento (1, 18), fondamenti (3, 15, 14), dati affidabili (2, 9, 16, 7).
- Approfondimento Analytics e marketing: 5, 6, 17, 8.
- Approfondimento Data engineering: 10, 13, 11, 12.
- Chiusura comune: decisioni e ragionamento critico (4, 19).
- I prerequisiti di ogni modulo precedono il modulo nei percorsi consigliati. SQL avanzato richiede SELECT, WHERE, GROUP BY e JOIN; non presentarlo come SQL introduttivo.
- Ogni guida espone conoscenze richieste, obiettivi, argomenti, una proposta pratica, risultato da preparare e criteri di verifica.

## Revisione delle pagine

- Home: promessa concreta, gratuità, orientamento e confronto dei due percorsi.
- Informazioni: come funziona il corso, destinatari, prerequisiti, ordine e metodo di studio.
- Chi sono: metodo e profilo dell'autore, senza esperienza o risultati non documentati.
- Prenota una call: scopo, preparazione e destinazione esterna espliciti.
- Articoli: anteprime chiaramente distinguibili da articoli pubblicati.
- Cerca: filtro dei moduli per titolo, descrizione e parole chiave; etichetta accessibile, conteggio, stato vuoto, gestione di accenti e più parole.
- Glossario: definizioni corrette, esempi e collegamenti ai moduli; HTML semantico con `dl`, `dt`, `dd`.
- Privacy: comportamento effettivo delle pagine statiche, contatti e servizi esterni; niente affermazioni di conformità legale o tempi di conservazione inventati.
- Layout: navigazione esplicita e coerente, metadati specifici, favicon e immagine social locali, nessuna risorsa mancante e nessuna richiesta di font a terze parti.

## Vincoli tecnici e verifica

Astro 7, Node.js 24 e npm. Il build produce `.open-next/assets` senza riscrivere il vecchio `dist/`. Il materiale del precedente template Payload rimane conservato ma separato dal workflow Astro attivo.

Verificare catalogo e dipendenze dei percorsi, build, tipi, pagine e risorse locali, ricerca, accesso senza JavaScript, tastiera e schermi stretti. I test browser devono usare l'output compilato, non includere la barra strumenti di sviluppo.

La pubblicazione autorizzata è un normale push Git su `main`; niente force push e nessun deployment Wrangler diretto. La configurazione Cloudflare esistente può avviare il deployment, il cui esito va verificato separatamente.

## Limiti delle evidenze

Le lezioni non sono in questo checkout e il proxy blocca le letture del corso. Le guide presentano quindi obiettivi e proposte coerenti con gli argomenti del catalogo, senza attestare il contenuto delle singole lezioni. Gli aspetti legali e i trattamenti infrastrutturali non si possono ricostruire dal solo frontend: il gestore deve mantenere verificate le informazioni effettive dei servizi.
