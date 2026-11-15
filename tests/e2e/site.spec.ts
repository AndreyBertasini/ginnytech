import { test, expect } from '@playwright/test';

const pages = ['/', '/programma/', '/informazioni/', '/chi-sono/', '/articoli/', '/cerca/', '/glossario/', '/prenota-call/', '/privacy/'];

test('every public page exposes an Italian title and one descriptive heading', async ({ page }) => {
  for (const route of pages) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'it');
    await expect(page).toHaveTitle(/GinnyTech/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
  }
});

test('programme provides nineteen local guides while preserving existing course destinations', async ({ page }) => {
  await page.goto('/programma/');
  const links = page.locator('.module-card a[href^="/programma/modulo-"]');
  await expect(links).toHaveCount(19);
  for (let id = 1; id <= 19; id++) {
    const response = await page.goto(`/programma/modulo-${id}/`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'Prima di iniziare', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Metti in pratica', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Apri il modulo nel corso gratuito', exact: true })).toHaveAttribute('href', `https://ginnytech.it/course/modulo-${id}`);
  }
});

test('search works for aliases, accents, multiword queries and no results', async ({ page }) => {
  await page.goto('/cerca/');
  const input = page.getByRole('searchbox', { name: 'Argomento o titolo del modulo' });
  const results = page.locator('.search-result:visible');
  await expect(results).toHaveCount(19);
  await input.fill('  DBT  ');
  await expect(results).toHaveCount(1);
  await expect(results.first()).toContainText('Analytics engineering');
  await input.fill('magazzino dati');
  await expect(results).toHaveCount(1);
  await expect(results.first()).toContainText('Data warehouse');
  await input.fill('probabilita');
  await expect(results).not.toHaveCount(0);
  await input.fill('termine-inesistente-xyz');
  await expect(results).toHaveCount(0);
  await expect(page.getByText('Nessun modulo trovato.', { exact: false })).toBeVisible();
  await input.fill('   ');
  await expect(results).toHaveCount(19);
});

test('search and programme remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/cerca/');
  await expect(page.locator('.search-result')).toHaveCount(19);
  await expect(page.locator('noscript .notice')).toBeVisible();
  await expect(page.locator('noscript .notice')).toContainText('Puoi consultare tutti i moduli');
  await page.locator('.search-result').first().click();
  await expect(page.locator('h1')).toBeVisible();
  await context.close();
});

test('mobile menu is keyboard usable and narrow screens do not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /menu/i });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Navigazione principale' }).getByRole('link', { name: 'Programma', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  for (const route of ['/', '/programma/', '/programma/modulo-14/', '/cerca/', '/glossario/']) {
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBe(true);
  }
});

test('every local link, fragment and referenced asset resolves across the site', async ({ page, request }) => {
  const socialPreview = await request.get('/social-card.png');
  expect(socialPreview.status()).toBe(200);
  expect(socialPreview.headers()['content-type']).toContain('image/png');
  const routes = [...pages, ...Array.from({ length: 19 }, (_, i) => `/programma/modulo-${i + 1}/`)];
  const checked = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const targets = await page.locator('a[href], img[src], link[href], meta[property="og:image"]').evaluateAll(elements => elements.flatMap(element => {
      const value = element.getAttribute('href') || element.getAttribute('src') || element.getAttribute('content');
      return value && (value.startsWith('/') || value.startsWith('#')) ? [value] : [];
    }));
    for (const target of targets) {
      const url = new URL(target, `http://127.0.0.1:4322${route}`);
      if (url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        if (url.pathname === route) {
          expect(await page.locator('[id]').evaluateAll(elements => elements.map(element => element.id)), `${route}${url.hash}`).toContain(id);
        } else {
          const response = await request.get(url.pathname);
          expect(await response.text(), target).toContain(`id="${id}"`);
        }
      }
      const key = url.pathname;
      if (!checked.has(key)) {
        expect((await request.get(key)).status(), key).toBe(200);
        checked.add(key);
      }
    }
  }
  await page.goto('/');
  expect(await page.locator('img').evaluateAll(images => images.every(img => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0))).toBe(true);
});

test('articles clearly distinguish previews and the site makes no external font requests', async ({ page }) => {
  const destinations: string[] = [];
  page.on('request', request => destinations.push(request.url()));
  await page.goto('/articoli/');
  await expect(page.getByText('Gli articoli sono in preparazione.', { exact: true })).toBeVisible();
  await expect(page.locator('.article-card')).toHaveCount(4);
  expect(destinations.some(url => /fonts\.googleapis\.com|fonts\.gstatic\.com/.test(url))).toBe(false);
});

test('profile page exposes structured data, the course map and no private details', async ({ page }) => {
  await page.goto('/chi-sono/');
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'profile');
  const graph = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text)['@graph']);
  const types = graph.map((node: { '@type': string }) => node['@type']);
  expect(types).toEqual(expect.arrayContaining(['ProfilePage', 'Person', 'BreadcrumbList', 'FAQPage']));
  await expect(page.locator('.heat-col')).toHaveCount(19);
  const person = graph.find((node: { '@type': string }) => node['@type'] === 'Person');
  expect(person.hasCredential).toMatchObject({ name: 'ClickHouse Certified Developer', dateCreated: '2026-11-07' });
  const certificate = await page.request.get('/certificati/clickhouse-certified-developer.pdf');
  expect(certificate.status()).toBe(200);
  expect(certificate.headers()['content-type']).toContain('pdf');
  await expect(page.locator('body')).not.toContainText(/SNAI|Flutter|Verona|Milano/);
});

test('search engines and AI agents get valid structured data, robots and llms.txt', async ({ page, request }) => {
  const routes = ['/', '/programma/', '/programma/modulo-12/', '/glossario/', '/chi-sono/', '/informazioni/', '/articoli/', '/cerca/', '/prenota-call/', '/privacy/'];
  for (const route of routes) {
    await page.goto(route);
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.length, route).toBeGreaterThan(0);
    const types = blocks.flatMap(text => JSON.parse(text)['@graph'].map((node: { '@type': string }) => node['@type']));
    expect(types, route).toEqual(expect.arrayContaining(['EducationalOrganization', 'WebSite']));
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /^index, follow/);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description!.length, route).toBeLessThanOrEqual(160);
  }

  await page.goto('/programma/modulo-12/');
  const moduleTypes = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text => JSON.parse(text)['@graph']);
  const course = moduleTypes.find((node: { '@type': string }) => node['@type'] === 'Course');
  expect(course).toMatchObject({ isAccessibleForFree: true, inLanguage: 'it', offers: { price: 0, priceCurrency: 'EUR' } });

  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Sitemap: https://ginnytech.it/sitemap-index.xml');
  for (const agent of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) expect(robots).toContain(`User-agent: ${agent}\nAllow: /`);
  expect(robots).not.toMatch(/Disallow: \/\S/);

  const llms = await (await request.get('/llms.txt')).text();
  expect(llms.startsWith('# GinnyTech\n\n> ')).toBe(true);
  expect(llms.match(/\/programma\/modulo-\d+\//g)?.length).toBe(19);
  const full = await (await request.get('/llms-full.txt')).text();
  expect(full).toContain('## Modulo 19:');
  expect(full).toContain('# Glossario');
});

test('missing pages return a noindex 404', async ({ page }) => {
  const response = await page.goto('/pagina-inesistente/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});
