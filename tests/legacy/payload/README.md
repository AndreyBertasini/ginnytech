# Legacy Payload tests

These files belong to the previous Next.js/Payload template. The active npm manifest no longer includes Payload, React, Next.js or Vitest. They are archived for reference and are not part of `npm test`.

The supported Astro checks are `npm run check`, `npm run test:unit` and `npm run test:e2e`. The active Playwright configuration targets `tests/e2e/site.spec.ts` and the Astro server.

Restoring the legacy application would require its original dependencies, configuration and database services; moving these files does not make that workflow runnable.
