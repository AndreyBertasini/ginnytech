import type { CourseModule } from '../data/course';

// Identità condivise dei dati strutturati: ogni pagina punta agli stessi @id,
// così Google e gli agenti ricostruiscono un unico grafo (sito → organizzazione → autore).
export const SITE = 'https://ginnytech.it';
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
export const PERSON_ID = `${SITE}/chi-sono/#person`;
export const COURSE_URL = `${SITE}/programma/`;
export const LINKEDIN = 'https://www.linkedin.com/in/andrii-dyshkantiuk/';
export const GITHUB = 'https://github.com/AndreyBertasini';

export const absolute = (path: string) => new URL(path, SITE).toString();

export const organization = {
  '@type': 'EducationalOrganization',
  '@id': ORG_ID,
  name: 'GinnyTech',
  url: `${SITE}/`,
  logo: absolute('/favicon.svg'),
  image: absolute('/social-card.png'),
  description: 'Corso gratuito in italiano su analytics, marketing analytics e data engineering.',
  founder: { '@id': PERSON_ID },
  sameAs: [GITHUB + '/ginnytech', LINKEDIN],
};

export const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE}/`,
  name: 'GinnyTech',
  inLanguage: 'it-IT',
  publisher: { '@id': ORG_ID },
};

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'GinnyTech', path: '/' }, ...items].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export const modulePath = (m: Pick<CourseModule, 'slug'>) => `/programma/${m.slug}/`;

// Schema Course per un modulo: gratuito, online, al proprio ritmo, in italiano.
export function courseNode(m: CourseModule, prerequisites: CourseModule[] = []) {
  return {
    '@type': 'Course',
    '@id': `${absolute(modulePath(m))}#course`,
    url: absolute(modulePath(m)),
    name: m.title,
    description: m.summary,
    courseCode: `GT-${String(m.id).padStart(2, '0')}`,
    inLanguage: 'it',
    isAccessibleForFree: true,
    educationalLevel: prerequisites.length ? 'Intermedio' : 'Principiante',
    teaches: m.outcomes,
    about: m.keywords,
    coursePrerequisites: prerequisites.length ? prerequisites.map(p => p.title) : m.priorKnowledge,
    provider: { '@id': ORG_ID },
    creator: { '@id': PERSON_ID },
    isPartOf: { '@id': `${COURSE_URL}#course` },
    offers: { '@type': 'Offer', category: 'Free', price: 0, priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online', inLanguage: 'it' },
  };
}

export const graph = (...nodes: object[]) => JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
