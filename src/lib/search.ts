export function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('it').trim();
}

export function matchesQuery(text: string, query: string): boolean {
  const haystack = normalizeSearch(text);
  return normalizeSearch(query).split(/\s+/).filter(Boolean).every(word => haystack.includes(word));
}
