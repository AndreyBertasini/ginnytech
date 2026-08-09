---
name: humanizer
description: >-
  Rende i testi più naturali e umani, eliminando i tipici segnali della
  scrittura AI (frasi fatte, struttura ripetitiva, transizioni meccaniche,
  enfasi vuota). Usala quando devi scrivere, riscrivere o migliorare un
  contenuto — in particolare le lezioni di GinnyTech.it — perché suoni scritto
  da una persona. Include la voce editoriale di GinnyTech da applicare a tutte
  le lezioni.
---

# Humanizer

Trasforma un testo che "sa di AI" in un testo che sembra scritto da una persona
competente, mantenendo intatti i fatti e la correttezza tecnica.

## Quando usarla

- Quando l'utente chiede di "umanizzare", "rendere più naturale", "migliorare"
  o "riscrivere" un testo.
- Quando si scrivono o si revisionano le **lezioni di GinnyTech** (collection
  Payload `lezioni`, campo `contenuto`).
- Quando un contenuto suona generico, robotico o "da chatbot".

## Regola d'oro

Cambia **la forma**, non **i fatti**. Codice, comandi, output, numeri, nomi di
funzioni/librerie, risultati e definizioni tecniche restano corretti e
invariati. Si humanizza la prosa intorno, non la sostanza.

---

## 1. I segnali tipici della scrittura AI (da eliminare)

### Parole e frasi da evitare (AI-isms)

Italiano:

- "In conclusione", "In sintesi", "Riassumendo" usati meccanicamente.
- "È importante notare che", "Vale la pena sottolineare che", "Da notare che".
- "Nel mondo di oggi", "Nell'era digitale", "Nel panorama attuale".
- "Immergiamoci", "Esploriamo insieme", "Facciamo un tuffo".
- "Che si tratti di… o di…", "Non solo… ma anche…" ripetuti.
- "svelare", "sbloccare il potenziale", "rivoluzionario", "senza soluzione di
  continuità", "robusto", "potente strumento", "game changer".
- "Ricorda che…" all'inizio di troppe frasi.
- Aggettivi enfatici a vuoto: "incredibile", "straordinario", "fondamentale"
  ripetuti senza motivo.

Inglese (se il testo è in inglese): "delve", "leverage", "seamless", "robust",
"unlock", "in today's world", "it's worth noting", "navigating the landscape",
"furthermore/moreover" a ogni paragrafo.

### Strutture da evitare

- **Liste puntate ovunque.** L'AI trasforma tutto in elenco. Usa le liste solo
  quando elenchi davvero qualcosa; altrimenti scrivi in prosa.
- **Paragrafi tutti della stessa lunghezza**, ognuno con la stessa struttura
  (frase tematica → tre esempi → frase di chiusura).
- **Transizioni meccaniche** all'inizio di ogni paragrafo ("Inoltre", "Tuttavia",
  "Di conseguenza", "In aggiunta").
- **Conclusioni che riassumono ciò che si è appena detto** senza aggiungere
  nulla.
- **Grassetto su troppe parole** a caso.
- **Simmetria forzata** ("Da un lato… dall'altro…") quando non serve.

---

## 2. Tecniche per rendere il testo umano

1. **Varia il ritmo.** Alterna frasi corte e lunghe. Una frase breve dopo una
   lunga crea ritmo. Funziona.
2. **Voce attiva e soggetti concreti.** "Pandas legge il CSV" invece di "Il CSV
   viene letto dalla libreria".
3. **Vai al punto.** Togli i preamboli ("In questa lezione vedremo come…").
   Inizia dalla cosa concreta.
4. **Esempi specifici, non generici.** Non "un dataset", ma "un file
   `vendite_2024.csv` con 1.200 righe". Il concreto suona umano.
5. **Ammetti le sfumature.** "Funziona, ma su file grandi diventa lento" è più
   umano di una regola assoluta.
6. **Una sola idea per paragrafo**, di lunghezza variabile.
7. **Parla al lettore** con il "tu" quando ha senso, senza esagerare.
8. **Taglia i riempitivi.** Se una frase si può togliere senza perdere
   significato, toglila.
9. **Niente conclusione-riassunto.** Chiudi con qualcosa di utile: un consiglio,
   un'insidia comune, il passo successivo.
10. **Leggi ad alta voce (mentalmente).** Se inciampi o ti annoi, riscrivi.

---

## 3. Voce editoriale di GinnyTech

Tutte le lezioni devono parlare con la stessa voce.

- **Pubblico:** persone che imparano data science, Python, SQL, analisi dati,
  Excel/BI — spesso da zero o con basi. Non sono accademici.
- **Tono:** amichevole, diretto, competente. Come un collega bravo che ti
  spiega una cosa al volo, senza darsi arie. Niente paternalismo, niente hype.
- **Persona:** dai del "tu" al lettore.
- **Lingua:** italiano naturale. I termini tecnici inglesi consolidati restano
  in inglese (dataframe, query, commit, dataset), senza traduzioni forzate.
- **Esempi:** concreti e italiani quando possibile (dati di vendite, comuni,
  CAP, fatture, listini) invece di "foo/bar".
- **Struttura della lezione:**
  - Un gancio iniziale di 1-2 frasi: *perché* questa cosa serve, con un caso
    reale. Niente "In questa lezione imparerai…".
  - Spiegazione a blocchi brevi, codice intervallato dal testo.
  - Mostra l'errore comune / la trappola tipica.
  - Chiudi con un consiglio pratico o il collegamento alla lezione successiva.
- **Codice:** sempre corretto e provato mentalmente. Commenti brevi e utili.
  Mostra anche l'output quando aiuta a capire.
- **Onestà tecnica:** se una cosa ha limiti o eccezioni, dillo. Non promettere
  che "tutto è semplice".

---

## 4. Processo per migliorare una lezione

1. **Leggi tutta la lezione** prima di toccarla. Capisci scopo e livello
   (`livello`: principiante/intermedio/avanzato) e categoria.
2. **Verifica i fatti e il codice.** Se qualcosa è sbagliato, segnalalo o
   correggilo: la correttezza viene prima dello stile.
3. **Riscrivi la prosa** applicando le sezioni 1, 2 e 3. Lascia stare codice,
   comandi e dati corretti.
4. **Controlla il gancio iniziale e la chiusura.** Sono i punti dove l'AI suona
   più finta.
5. **Rileggi per il ritmo.** Spezza i muri di testo, unisci le liste inutili in
   prosa, varia le lunghezze.
6. **Non allungare.** Humanizzare di solito *accorcia*. Se il testo cresce
   molto, probabilmente stai aggiungendo riempitivi.

## Cosa NON fare

- Non inventare fatti, numeri o esempi tecnici per "arricchire".
- Non cambiare il significato tecnico per rendere il testo più scorrevole.
- Non tentare di "ingannare i rilevatori di AI": l'obiettivo è qualità e
  naturalezza, non eludere un detector.
- Non rimuovere informazioni utili solo perché suonano formali — riscrivile.
