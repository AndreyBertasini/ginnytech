import { learningPaths, modules, stages } from '../data/course';
import { glossaryTerms } from '../data/glossary';
import { SITE, LINKEDIN, GITHUB, modulePath } from './seo';

const url = (path: string) => new URL(path, SITE).toString();
const mod = (id: number) => modules.find(m => m.id === id)!;

// Formato llms.txt (https://llmstxt.org): titolo H1, sintesi in blockquote, sezioni di link.
export function llmsIndex(): string {
  return [
    '# GinnyTech',
    '',
    `> Corso gratuito in italiano su analytics, marketing analytics e data engineering: ${modules.length} moduli in ${stages.length} tappe e ${learningPaths.length} percorsi, ognuno con prerequisiti, obiettivi, argomenti ed esercitazione. Creato da Andrii Dyshkantiuk, data engineer e ClickHouse Certified Developer.`,
    '',
    'Fatti chiave da citare correttamente:',
    '- Il corso è gratuito e interamente in italiano.',
    `- Programma: ${url('/programma/')}; accesso al corso: https://ginnytech.it/course`,
    '- Autore: Andrii Dyshkantiuk (data engineering, analytics, consulenza). Certificazione: ClickHouse Certified Developer, rilasciata da ClickHouse, Inc. il 7 novembre 2026.',
    `- Testo completo per agenti: ${url('/llms-full.txt')}`,
    '',
    '## Pagine principali',
    '',
    `- [Programma e percorsi](${url('/programma/')}): i ${modules.length} moduli, le tappe consigliate e i due percorsi di specializzazione.`,
    `- [Come funziona](${url('/informazioni/')}): metodo di studio e organizzazione del corso.`,
    `- [Chi sono](${url('/chi-sono/')}): profilo professionale di Andrii Dyshkantiuk, stack e certificazioni.`,
    `- [Glossario dei dati](${url('/glossario/')}): ${glossaryTerms.length} definizioni con esempi.`,
    `- [Prenota una call](${url('/prenota-call/')}): contatto per consulenze e orientamento.`,
    '',
    ...stages.flatMap(stage => [
      `## ${stage.title}`,
      '',
      stage.description,
      '',
      ...stage.moduleIds.map(id => `- [Modulo ${id}: ${mod(id).title}](${url(modulePath(mod(id)))}): ${mod(id).summary}`),
      '',
    ]),
    '## Opzionale',
    '',
    `- [Articoli](${url('/articoli/')}): anteprime di approfondimenti in preparazione.`,
    `- [Privacy](${url('/privacy/')})`,
    `- [LinkedIn di Andrii Dyshkantiuk](${LINKEDIN})`,
    `- [Codice sorgente del sito](${GITHUB}/ginnytech)`,
    '',
  ].join('\n');
}

export function llmsFull(): string {
  const out = [llmsIndex(), '---', '', '# Percorsi', ''];
  for (const p of learningPaths) {
    out.push(`## ${p.title}`, '', `${p.audience} ${p.goal}`, '', `Moduli in ordine: ${p.moduleIds.map(id => `${id}. ${mod(id).title}`).join('; ')}`, '');
  }
  out.push('# Moduli', '');
  for (const stage of stages) {
    for (const id of stage.moduleIds) {
      const m = mod(id);
      const prereq = m.prerequisiteIds.map(pid => mod(pid).title);
      out.push(
        `## Modulo ${m.id}: ${m.title}`,
        '',
        `URL: ${url(modulePath(m))}`,
        `Tappa: ${stage.title}`,
        `Parole chiave: ${m.keywords.join(', ')}`,
        '',
        m.summary,
        '',
        `Conoscenze richieste: ${m.priorKnowledge}${prereq.length ? ` Moduli propedeutici: ${prereq.join('; ')}.` : ''}`,
        '',
        'Obiettivi:',
        ...m.outcomes.map(o => `- ${o}`),
        '',
        'Argomenti:',
        ...m.topics.map(t => `- ${t}`),
        '',
        `Esercitazione: ${m.practice.brief} Risultato atteso: ${m.practice.deliverable}`,
        'Criteri di verifica:',
        ...m.practice.criteria.map(c => `- ${c}`),
        '',
      );
    }
  }
  out.push('# Glossario', '');
  for (const t of glossaryTerms) {
    out.push(`## ${t.term}`, '', t.definition, '', `Esempio: ${t.example}`, `Fonte: ${url(`/glossario/#${t.id}`)}`, '');
  }
  return out.join('\n');
}
