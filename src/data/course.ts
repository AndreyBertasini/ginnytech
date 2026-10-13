import { matchesQuery } from '../lib/search.ts';

export interface CourseModule {
  id: number;
  slug: string;
  title: string;
  summary: string;
  keywords: string[];
  prerequisiteIds: number[];
  priorKnowledge: string;
  outcomes: string[];
  topics: string[];
  practice: { brief: string; deliverable: string; criteria: string[] };
}

export interface CourseStage {
  id: string;
  title: string;
  description: string;
  moduleIds: number[];
}

export interface LearningPath {
  id: string;
  title: string;
  audience: string;
  goal: string;
  moduleIds: number[];
}

export const stages: CourseStage[] = [
  { id: 'orientamento', title: 'Scegli il tuo obiettivo', description: 'Chiarisci cosa vuoi imparare e collega lo studio alle attività dei diversi ruoli nei dati.', moduleIds: [1, 18] },
  { id: 'fondamenti', title: 'Consolida i fondamenti', description: 'Parti da metriche, matematica e SQL. Il modulo SQL richiede già le conoscenze di base del linguaggio.', moduleIds: [3, 15, 14] },
  { id: 'dati-affidabili', title: 'Costruisci dati affidabili', description: 'Collega raccolta, modello dei dati, trasformazioni e dashboard in un percorso di analisi coerente.', moduleIds: [2, 9, 16, 7] },
  { id: 'analytics-marketing', title: 'Approfondisci analytics e marketing', description: 'Studia prodotto e campagne, poi esperimenti e modelli previsionali.', moduleIds: [5, 6, 17, 8] },
  { id: 'data-engineering', title: 'Approfondisci data engineering', description: 'Passa dallo storage alla gestione dei sistemi, fino ai flussi di eventi e alle analisi in tempo reale.', moduleIds: [10, 13, 11, 12] },
  { id: 'decisioni', title: 'Collega analisi e decisioni', description: 'Formula raccomandazioni chiare, valuta i limiti delle evidenze e rendi esplicite le responsabilità.', moduleIds: [4, 19] },
];

const catalogue: CourseModule[] = [
  {
    id: 1, slug: 'modulo-1', title: 'Come studiare e scegliere il tuo percorso',
    summary: 'Definisci il tuo obiettivo, organizza lo studio e collega ogni argomento a un’attività concreta.',
    keywords: ['metodo di studio', 'panoramica', 'data work', 'piano'], prerequisiteIds: [],
    priorKnowledge: 'Non servono competenze tecniche specifiche. Parti da una domanda o da un obiettivo che vuoi affrontare con i dati.',
    outcomes: ['Scegliere un punto di partenza in base al proprio livello.', 'Organizzare studio, appunti e attività di verifica.'],
    topics: ['Obiettivi di apprendimento e autovalutazione', 'Studio, ripasso e documentazione', 'Dal concetto a un risultato di lavoro'],
    practice: { brief: 'Scegli una domanda di lavoro e identifica le competenze necessarie per affrontarla.', deliverable: 'Un piano di studio con obiettivo, moduli scelti e una prima attività pratica.', criteria: ['L’obiettivo descrive qualcosa che puoi fare o mostrare.', 'Il piano distingue conoscenze già acquisite e argomenti da studiare.'] },
  },
  {
    id: 2, slug: 'modulo-2', title: 'Raccolta dati e progettazione del tracking',
    summary: 'Progetta eventi e controlli per raccogliere dati coerenti, documentati e utilizzabili nelle analisi.',
    keywords: ['data collection', 'tracking systems', 'GA4', 'eventi', 'qualità'], prerequisiteIds: [3],
    priorKnowledge: 'Saper distinguere una domanda di analisi dalla metrica usata per rispondervi.',
    outcomes: ['Definire eventi, proprietà e regole di raccolta.', 'Individuare errori e duplicazioni nel tracking.'],
    topics: ['Piano di misurazione e specifiche degli eventi', 'Identificativi, proprietà e controlli', 'Qualità, documentazione e minimizzazione dei dati'],
    practice: { brief: 'Progetta il tracking di un percorso di registrazione, dalla visita al completamento.', deliverable: 'Una tabella degli eventi con proprietà, momento di raccolta e controlli.', criteria: ['Ogni evento risponde a una domanda esplicita.', 'Sono definiti controlli per eventi mancanti o duplicati.'] },
  },
  {
    id: 3, slug: 'modulo-3', title: 'Metriche e KPI per leggere il business',
    summary: 'Collega obiettivi e indicatori, definisci come misurarli e riconosci i limiti dei confronti.',
    keywords: ['KPI tree', 'fondamenti analitici', 'baseline', 'indicatori'], prerequisiteIds: [],
    priorKnowledge: 'Familiarità con percentuali e fogli di calcolo. Non è necessario conoscere un particolare strumento di analytics.',
    outcomes: ['Definire un indicatore con formula, unità e periodo.', 'Distinguere variazioni reali da confronti poco omogenei.'],
    topics: ['Obiettivi, metriche e KPI', 'Alberi delle metriche e responsabilità', 'Granularità, denominatori e confronti'],
    practice: { brief: 'Definisci come misurare l’attivazione degli utenti di un prodotto.', deliverable: 'Una scheda della metrica e una mappa degli indicatori collegati.', criteria: ['Numeratore, denominatore e intervallo sono espliciti.', 'La metrica è collegata a una possibile decisione.'] },
  },
  {
    id: 4, slug: 'modulo-4', title: 'Usare i dati nelle decisioni',
    summary: 'Organizza analisi e revisioni periodiche per trasformare i risultati in azioni e responsabilità chiare.',
    keywords: ['data driven', 'governance', 'operating system decisionale', 'decision memo'], prerequisiteIds: [3, 7],
    priorKnowledge: 'Saper leggere una dashboard e spiegare come sono definiti i suoi indicatori.',
    outcomes: ['Scrivere una raccomandazione basata su evidenze e limiti.', 'Definire chi decide, chi agisce e quando verificare l’esito.'],
    topics: ['Ritmo delle revisioni e responsabilità', 'Documenti decisionali e alternative', 'Azioni, verifiche e aggiornamento delle ipotesi'],
    practice: { brief: 'Usa una dashboard per proporre un intervento su una metrica in peggioramento.', deliverable: 'Una breve nota con evidenza, alternative, raccomandazione e verifica successiva.', criteria: ['Fatti e ipotesi sono distinti.', 'La proposta indica un responsabile e un criterio di valutazione.'] },
  },
  {
    id: 5, slug: 'modulo-5', title: 'Analisi di prodotto: funnel, attivazione e retention',
    summary: 'Studia dove gli utenti incontrano difficoltà e come cambia l’utilizzo del prodotto nel tempo.',
    keywords: ['product analytics', 'growth diagnostics', 'coorti', 'conversione'], prerequisiteIds: [3, 14, 7],
    priorKnowledge: 'Saper definire eventi, interrogare dati con SQL e leggere percentuali con denominatori coerenti.',
    outcomes: ['Analizzare passaggi e abbandoni di un funnel.', 'Confrontare coorti di utenti con una definizione esplicita di ritorno.'],
    topics: ['Attivazione e valore per l’utente', 'Funnel e segmentazione', 'Coorti, retention e monetizzazione'],
    practice: { brief: 'Analizza un percorso dalla registrazione alla prima attività utile.', deliverable: 'Un funnel e un confronto tra coorti con ipotesi di approfondimento.', criteria: ['I passaggi hanno eventi e finestre temporali definiti.', 'Il confronto non confonde utenti nuovi e utenti già attivi.'] },
  },
  {
    id: 6, slug: 'modulo-6', title: 'Analisi di marketing e sostenibilità economica',
    summary: 'Valuta costi, ricavi e risultati delle campagne, distinguendo attribuzione ed effetto incrementale.',
    keywords: ['marketing analytics', 'incrementality', 'unit economics', 'CAC', 'LTV', 'campagne'], prerequisiteIds: [3, 14],
    priorKnowledge: 'Saper leggere metriche di costo e conversione e distinguere ricavi e margini.',
    outcomes: ['Confrontare campagne usando metriche economiche coerenti.', 'Spiegare perché l’attribuzione non dimostra un effetto causale.'],
    topics: ['Costi di acquisizione e valore del cliente', 'Attribuzione e incrementality', 'Confronti di campagne e sostenibilità'],
    practice: { brief: 'Confronta due campagne considerando spesa, nuovi clienti, ricavi e margine.', deliverable: 'Una tabella di valutazione con limiti e domande da verificare.', criteria: ['Periodo, popolazione e definizioni sono omogenei.', 'L’analisi distingue conversioni attribuite e risultati incrementali.'] },
  },
  {
    id: 7, slug: 'modulo-7', title: 'Dashboard per monitorare e decidere',
    summary: 'Scegli metriche, visualizzazioni e contesto per costruire dashboard leggibili e utili al lavoro quotidiano.',
    keywords: ['visualization', 'decision interface', 'visualizzazione', 'report', 'alert'], prerequisiteIds: [3],
    priorKnowledge: 'Avere una domanda di monitoraggio e definizioni chiare per le metriche da rappresentare.',
    outcomes: ['Scegliere grafici coerenti con la domanda e i dati.', 'Organizzare una dashboard con contesto, priorità e segnali di attenzione.'],
    topics: ['Destinatari e domande della dashboard', 'Gerarchia visiva e scelta dei grafici', 'Confronti, aggiornamento e segnalazioni'],
    practice: { brief: 'Disegna una dashboard per la revisione settimanale di un prodotto.', deliverable: 'Una bozza con metriche principali, confronti e note interpretative.', criteria: ['Ogni grafico risponde a una domanda.', 'Periodo, unità e aggiornamento dei dati sono visibili.'] },
  },
  {
    id: 8, slug: 'modulo-8', title: 'Previsioni e modelli per il marketing',
    summary: 'Confronta previsioni e scenari, misura gli errori e distingui capacità predittiva e spiegazione causale.',
    keywords: ['marketing data science', 'forecasting', 'prediction', 'scenari', 'modelli'], prerequisiteIds: [15, 17],
    priorKnowledge: 'Conoscere probabilità, valutazione dell’incertezza e criteri di confronto dei modelli. Per gli esercizi con codice serve familiarità con il linguaggio utilizzato.',
    outcomes: ['Confrontare una previsione con una baseline semplice.', 'Interpretare errori e limiti prima di usare un modello in una decisione.'],
    topics: ['Baseline e previsione', 'Validazione temporale ed errori', 'Scenari, causalità e rischio del modello'],
    practice: { brief: 'Imposta un confronto tra una previsione semplice e un modello più articolato.', deliverable: 'Un piano di validazione con periodo di test, baseline e misura dell’errore.', criteria: ['Il test usa dati successivi a quelli di addestramento.', 'I risultati predittivi non vengono presentati come prove causali.'] },
  },
  {
    id: 9, slug: 'modulo-9', title: 'Data warehouse e modellazione analitica',
    summary: 'Definisci granularità, relazioni e gestione dello storico per creare dati adatti alle domande di analisi.',
    keywords: ['data warehousing', 'magazzino dati', 'analytical architecture', 'grain', 'storicizzazione'], prerequisiteIds: [14],
    priorKnowledge: 'Conoscere chiavi, relazioni tra tabelle e JOIN in SQL.',
    outcomes: ['Definire cosa rappresenta una riga di una tabella.', 'Progettare relazioni e storico senza duplicare le misure.'],
    topics: ['Fatti, dimensioni e granularità', 'Chiavi e relazioni', 'Storico e qualità del modello'],
    practice: { brief: 'Modella ordini, clienti e prodotti per analizzare vendite e acquisti ripetuti.', deliverable: 'Uno schema con granularità, chiavi e regole di aggiornamento.', criteria: ['La granularità è dichiarata per ogni tabella.', 'Le relazioni evitano di moltiplicare ricavi o quantità.'] },
  },
  {
    id: 10, slug: 'modulo-10', title: 'S3, data lake e lakehouse',
    summary: 'Organizza dati e accessi nello storage e valuta quando usare un data lake o una lakehouse.',
    keywords: ['object storage', 'archivio', 'partizioni', 'formati'], prerequisiteIds: [9],
    priorKnowledge: 'Conoscere la differenza tra dati grezzi e dati modellati e le principali esigenze di un sistema analitico.',
    outcomes: ['Definire organizzazione, formato e accessi dei dati.', 'Valutare compromessi tra flessibilità, affidabilità e costi.'],
    topics: ['Object storage e organizzazione dei file', 'Formati, partizioni e catalogazione', 'Data lake, lakehouse e gestione degli accessi'],
    practice: { brief: 'Progetta uno storage per eventi giornalieri e dati pronti per l’analisi.', deliverable: 'Una mappa delle aree di storage con formati, partizioni e regole di accesso.', criteria: ['Dati grezzi e trasformati hanno una gestione esplicita.', 'La strategia considera aggiornamenti, recupero e costi di lettura.'] },
  },
  {
    id: 11, slug: 'modulo-11', title: 'Kafka e flussi di eventi',
    summary: 'Comprendi come viaggiano gli eventi e come gestire schemi, elaborazione ed errori nei flussi.',
    keywords: ['event streaming', 'stream processing', 'producer', 'consumer', 'schemi'], prerequisiteIds: [10, 13],
    priorKnowledge: 'Conoscere gestione dei sistemi, contratti dei dati e principi di persistenza. Per implementare esempi serve esperienza di programmazione.',
    outcomes: ['Descrivere il percorso di un evento tra produttori e consumatori.', 'Gestire duplicazioni, cambi di schema ed errori di elaborazione.'],
    topics: ['Topic, partizioni e consumatori', 'Schemi e compatibilità degli eventi', 'Consegna, recupero e gestione degli errori'],
    practice: { brief: 'Progetta un flusso di eventi di acquisto con due consumatori indipendenti.', deliverable: 'Un diagramma del flusso con schema dell’evento e strategia di recupero.', criteria: ['La gestione dei duplicati è esplicita.', 'Il progetto considera un consumatore fermo e un cambio di schema.'] },
  },
  {
    id: 12, slug: 'modulo-12', title: 'Analisi in tempo reale con ClickHouse',
    summary: 'Progetta acquisizione e interrogazione dei dati tenendo conto di latenza, prestazioni e costi.',
    keywords: ['real time', 'realtime', 'MergeTree', 'ingestion', 'latenza'], prerequisiteIds: [11, 14],
    priorKnowledge: 'Conoscere SQL, flussi di eventi e differenza tra momento dell’evento e momento di acquisizione.',
    outcomes: ['Definire una latenza utile per la domanda di analisi.', 'Valutare struttura delle tabelle e compromessi nelle query.'],
    topics: ['Acquisizione ed eventi tardivi', 'Tabelle MergeTree e ordinamento', 'Prestazioni, latenza e costi'],
    practice: { brief: 'Progetta il monitoraggio quasi in tempo reale di transazioni.', deliverable: 'Uno schema delle tabelle con query principale e budget di latenza.', criteria: ['La latenza richiesta è motivata dal caso d’uso.', 'Sono considerati eventi tardivi e ripetuti.'] },
  },
  {
    id: 13, slug: 'modulo-13', title: 'Gestire e monitorare i sistemi dati',
    summary: 'Affronta distribuzione, osservabilità, sicurezza e gestione degli incidenti nei sistemi dati.',
    keywords: ['infrastructure', 'ops', 'deploy', 'observability', 'incident response'], prerequisiteIds: [9],
    priorKnowledge: 'Conoscere una pipeline dati e i suoi componenti. Sono utili nozioni di terminale, versionamento e gestione degli accessi.',
    outcomes: ['Definire controlli di funzionamento e segnali di errore.', 'Documentare una procedura di risposta e ripristino.'],
    topics: ['Distribuzione e configurazione', 'Monitoraggio, qualità e sicurezza', 'Incidenti, ripristino e documentazione operativa'],
    practice: { brief: 'Prepara una procedura per una pipeline che smette di aggiornare i dati.', deliverable: 'Una guida con rilevazione, diagnosi, ripristino e comunicazione.', criteria: ['La procedura distingue dati in ritardo da dati errati.', 'Il ripristino include una verifica del risultato.'] },
  },
  {
    id: 14, slug: 'modulo-14', title: 'SQL avanzato per l’analisi',
    summary: 'Usa query per analizzare coorti, funnel ed esperimenti e valuta le prestazioni delle interrogazioni.',
    keywords: ['advanced SQL', 'query', 'window functions', 'finestre', 'join'], prerequisiteIds: [],
    priorKnowledge: 'Prima di questo modulo devi conoscere SELECT, WHERE, GROUP BY e JOIN. Se stai iniziando da zero, consolida queste basi prima di affrontare SQL avanzato.',
    outcomes: ['Scrivere query analitiche con aggregazioni e funzioni finestra.', 'Verificare granularità, duplicazioni e prestazioni dei risultati.'],
    topics: ['Aggregazioni, CTE e funzioni finestra', 'Coorti, funnel e finestre temporali', 'Verifica dei risultati e prestazioni'],
    practice: { brief: 'Calcola il ritorno dei clienti per mese di primo acquisto su un dataset di ordini.', deliverable: 'Una query commentata e una tabella di coorti con controlli di qualità.', criteria: ['Ogni cliente è assegnato a una sola coorte iniziale.', 'JOIN e aggregazioni non duplicano clienti o ordini.'] },
  },
  {
    id: 15, slug: 'modulo-15', title: 'Matematica e probabilità per l’analisi',
    summary: 'Consolida i concetti matematici necessari per comprendere modelli, stime e incertezza.',
    keywords: ['matematica', 'probabilità', 'distribuzioni', 'inferenza', 'regressione'], prerequisiteIds: [],
    priorKnowledge: 'Saper lavorare con percentuali, proporzioni e algebra elementare. Ripassa queste nozioni se non le usi da tempo.',
    outcomes: ['Interpretare distribuzioni, variabilità e probabilità.', 'Distinguere una stima puntuale dalla sua incertezza.'],
    topics: ['Probabilità e distribuzioni', 'Variabilità, campioni e stime', 'Relazioni tra variabili e regressione'],
    practice: { brief: 'Confronta due campioni di valori e descrivi cosa puoi concludere dalle differenze.', deliverable: 'Una nota con distribuzioni, variabilità e limiti del confronto.', criteria: ['La conclusione considera dimensione e selezione dei campioni.', 'Una correlazione non viene interpretata automaticamente come causalità.'] },
  },
  {
    id: 16, slug: 'modulo-16', title: 'Analytics engineering con dbt',
    summary: 'Organizza trasformazioni SQL, test e documentazione per creare modelli e metriche coerenti.',
    keywords: ['data build tool', 'semantic layer', 'data contracts', 'trasformazioni'], prerequisiteIds: [9, 14],
    priorKnowledge: 'Conoscere SQL e modellazione analitica. Sono utili nozioni di Git e organizzazione di un progetto.',
    outcomes: ['Separare livelli di trasformazione con responsabilità chiare.', 'Definire test e documentazione per un modello analitico.'],
    topics: ['Modelli di staging e modelli di analisi', 'Test, documentazione e dipendenze', 'Definizioni condivise delle metriche'],
    practice: { brief: 'Organizza la trasformazione di ordini grezzi in un modello di ricavi giornalieri.', deliverable: 'Una mappa dei modelli SQL con test e definizione della metrica.', criteria: ['Le trasformazioni hanno dipendenze esplicite.', 'I test coprono chiavi, valori mancanti e coerenza dei ricavi.'] },
  },
  {
    id: 17, slug: 'modulo-17', title: 'Statistica e progettazione degli A/B test',
    summary: 'Definisci un esperimento, valuta la potenza statistica e interpreta i risultati con i loro limiti.',
    keywords: ['significatività', 'A/B testing', 'experimentation', 'power', 'causalità'], prerequisiteIds: [15, 3],
    priorKnowledge: 'Conoscere probabilità, variabilità e definizione delle metriche. La metrica di successo va scelta prima di leggere i risultati.',
    outcomes: ['Definire ipotesi, metrica e unità di assegnazione.', 'Interpretare risultati e incertezza senza fermarsi al solo p-value.'],
    topics: ['Randomizzazione e disegno sperimentale', 'Dimensione campionaria e potenza', 'Intervalli, significatività e limiti del test'],
    practice: { brief: 'Progetta un test di una nuova pagina di registrazione.', deliverable: 'Un piano sperimentale con ipotesi, metrica, guardrail e criteri di analisi.', criteria: ['Assegnazione e popolazione sono definite prima del test.', 'Il piano distingue effetto rilevante e significatività statistica.'] },
  },
  {
    id: 18, slug: 'modulo-18', title: 'Ruoli e percorsi professionali nei dati',
    summary: 'Confronta attività e competenze di marketing, prodotto e finanza per scegliere cosa approfondire.',
    keywords: ['direzioni in analitica', 'carriera', 'ruoli', 'finanza', 'professioni'], prerequisiteIds: [1],
    priorKnowledge: 'Avere un primo obiettivo di studio. Non sono richieste competenze tecniche specifiche.',
    outcomes: ['Distinguere attività, interlocutori e responsabilità dei diversi ruoli.', 'Collegare il proprio obiettivo a competenze e attività pratiche.'],
    topics: ['Analytics per marketing, prodotto e finanza', 'Responsabilità e collaborazione', 'Scelta delle competenze da approfondire'],
    practice: { brief: 'Confronta due ruoli che ti interessano usando attività e competenze richieste.', deliverable: 'Una matrice delle competenze e una scelta motivata del percorso.', criteria: ['Il confronto descrive attività concrete.', 'La scelta considera interessi e conoscenze iniziali, senza promettere un esito occupazionale.'] },
  },
  {
    id: 19, slug: 'modulo-19', title: 'Ragionamento critico nell’analisi dei dati',
    summary: 'Esamina ipotesi, causalità e limiti dell’evidenza per formulare conclusioni proporzionate ai dati.',
    keywords: ['filosofia', 'epistemologia', 'evidenza', 'etica', 'ragionamento'], prerequisiteIds: [3, 15],
    priorKnowledge: 'Conoscere definizioni delle metriche e concetti di probabilità e incertezza.',
    outcomes: ['Rendere esplicite le ipotesi dietro una conclusione.', 'Comunicare evidenze, limiti e responsabilità di una raccomandazione.'],
    topics: ['Ipotesi, osservazioni e spiegazioni', 'Causalità e limiti dell’evidenza', 'Comunicazione, rischio e responsabilità'],
    practice: { brief: 'Rileggi una tua analisi e cerca conclusioni che vadano oltre ciò che i dati mostrano.', deliverable: 'Una revisione con affermazioni, evidenze, alternative e limiti.', criteria: ['Ogni affermazione ha una base riconoscibile.', 'Sono indicate spiegazioni alternative e informazioni che potrebbero cambiare la conclusione.'] },
  },
];

export const modules = stages.flatMap(stage => stage.moduleIds.map(id => catalogue.find(module => module.id === id)!));

const foundation = stages.slice(0, 3).flatMap(stage => stage.moduleIds);
export const learningPaths: LearningPath[] = [
  { id: 'analytics', title: 'Analytics e marketing', audience: 'Per analisti, marketer e chi lavora sulle metriche di un prodotto.', goal: 'Collega dati affidabili, analisi di prodotto, campagne ed esperimenti alle decisioni.', moduleIds: [...foundation, 5, 6, 17, 8, 4, 19] },
  { id: 'engineering', title: 'Data engineering', audience: 'Per chi vuole progettare e gestire sistemi che rendono i dati disponibili e affidabili.', goal: 'Collega modellazione, storage, gestione operativa e flussi di eventi.', moduleIds: [...foundation, 10, 13, 11, 12, 4, 19] },
];

export function findModules(query: string): CourseModule[] {
  return modules.filter(module => matchesQuery([module.title, module.summary, ...module.keywords].join(' '), query));
}
