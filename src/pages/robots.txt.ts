import type { APIRoute } from 'astro';

// Tutti i crawler sono benvenuti, compresi quelli degli assistenti AI:
// il corso è gratuito e vogliamo che venga citato correttamente.
const aiAgents = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'CCBot', 'Meta-ExternalAgent', 'DuckAssistBot',
];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://ginnytech.it');
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    ...aiAgents.flatMap(agent => [`User-agent: ${agent}`, 'Allow: /', '']),
    `Sitemap: ${new URL('/sitemap-index.xml', base)}`,
    '',
    `# Riepilogo per agenti e modelli linguistici: ${new URL('/llms.txt', base)}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
