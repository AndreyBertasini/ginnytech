# GinnyTech course clarity implementation plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan inline. The user authorized implementation and publication to main after the written audit.

**Goal:** Turn the existing static catalogue into a coherent, navigable programme and correct the copy and behaviour of every public page.

**Architecture:** A single typed catalogue supplies the home, course overview, module pages and search. The site remains statically generated with Astro; search and the mobile menu use small browser scripts. Module URLs retain their existing identifiers.

**Tech stack:** Astro 7, TypeScript, Node.js 24, npm, Node test runner, Playwright Chromium.

**Spec:** `docs/superpowers/specs/2026-10-13-course-clarity.md`, records the written audit and the user's instruction to fix the identified issues and publish to main.

## Global constraints

- Use the existing isolated checkout, not a new worktree.
- Preserve `/course/modulo-1` through `/course/modulo-19`.
- Describe module programmes and proposed practice, not 216 supposedly published lessons.
- Use Italian copy; retain recognized tool names and explain technical terms.
- Do not invent prices, certifications, course availability, career results or legal facts.
- Keep the Cloudflare Pages deployment directory `.open-next/assets`.
- Do not add analytics, cookies, forms or external font requests.
- Publishing means a normal Git push to `main`; do not force push or deploy directly with Wrangler.

## Review focus

- Empty, accented, mixed-case and multiword search queries return useful results or a clear empty state.
- Module URL identity remains stable when the recommended study order changes.
- Course prerequisites form a valid order; advanced SQL is never presented as an introductory SQL course.
- Narrow screens, keyboard navigation and disabled JavaScript retain access to the programme.
- Every local link, fragment and image resolves; no unavailable content is advertised as published.

## Task 1: Shared programme and working course routes

**Files:** create `src/data/course.ts`, `src/components/ModuleCard.astro`, `src/pages/programma/index.astro`, `src/pages/programma/[slug].astro`, `tests/unit/course.test.ts`; modify `src/pages/index.astro`, `astro.config.mjs`, `package.json`, `tsconfig.json`.

**Interfaces:** export `modules: CourseModule[]`, `stages: CourseStage[]`, `learningPaths: LearningPath[]`, `findModules(query: string): CourseModule[]`. A module exposes stable id/slug, title, summary, keywords, prerequisites, outcomes, topics and a practice brief. A stage owns ordered module ids; paths use the shared foundation followed by specialization and decision modules.

- [x] Write unit tests for stable URLs, complete stage coverage, valid prerequisites and search behaviour; observe the current missing-catalogue failures.
- [x] Implement all 19 modules and six study stages, preserving the original topic scope.
- [x] Implement home orientation, `/programma/` and all 19 module programme pages with objectives, prerequisites, practice and navigation.
- [x] Route builds directly to `.open-next/assets`; validate the active Astro TypeScript scope.
- [x] Run catalogue tests, build and type checks before recording completion.

## Task 2: All page copy, resources and navigation

**Files:** modify all other `src/pages/*.astro`, `src/layouts/BaseLayout.astro`, `public/styles/global.css`; create `src/data/glossary.ts`, `public/favicon.svg`, `public/social-card.svg`; replace `README.md` with active development instructions.

**Interfaces:** consume the shared catalogue in search and glossary links. All programme links use local `/programma/` routes; existing course/lesson links stay at `https://ginnytech.it/course`. TidyCal and professional profiles are explicit external destinations.

- [x] Add browser regression checks for missing assets, all programme links, accessible search, empty results, no-JavaScript fallback and mobile navigation; observe the failures before fixes.
- [x] Rewrite eight public pages and common metadata with concrete, supportable Italian copy.
- [x] Make article previews explicit; correct all glossary definitions and add practical examples/module references.
- [x] Use system fonts; describe observable privacy behaviour and service-specific privacy contacts without inventing retention periods.
- [x] Replace nonexistent module images with semantic text covers, add favicon and a social preview asset, improve focus and mobile layout.
- [x] Run browser checks and inspect desktop/mobile screenshots.

## Task 3: Verify and publish

**Files:** active Playwright configuration and smoke tests, npm lockfile, generated-file ignore rules and relevant setup documentation.

- [x] Run the full active test suite, `npm run check`, `tsc --noEmit`, `npm run build` and `git diff --check`.
- [x] Review the complete diff and test evidence; fix material findings.
- [x] Keep legacy Payload code intact, exclude its obsolete tests/configuration from the active Astro workflow and document the distinction.
- [x] Save updated reusable cloud install/start instructions after verifying them.
- [ ] Commit only intended files, fetch main, reconcile any remote changes, push normally to `main` and verify the remote commit.

## Execution record

Implementation and publication are explicitly authorized. Missing commercial/course details will not block independent fixes: wording will avoid claims about those details. The external course was inaccessible through the proxy; module pages will expose a useful programme without fabricating lesson bodies. The privacy page describes the implemented static site and links to provider policies; exact provider retention and legal completeness require the operator's factual verification.

Decision after user clarification: the course is free and already accessible. Preserve all existing production course URLs and put orientation guides under `/programma/`; do not shadow `/course/` with catalogue pages. Show the confirmed free-access information; price/duration/certification details beyond that remain unspecified.


## Verified execution

- Task 1 complete: six catalogue tests failed on the absent shared catalogue, then passed with the implemented programme. Stable module IDs, prerequisite order, both paths and search edge cases are covered.
- Task 2 complete: browser regressions reproduced the unlabelled search and missing favicon. All eight pages, 19 programme guides, shared layout and local resources were then implemented. Course availability/free access wording follows the user's confirmation.
- Verification: `npm run check` reports zero errors, warnings and hints; `tsc --noEmit` exits zero; all six unit and seven production-browser tests pass. `npm ci` reproduces dependencies from the updated lockfile; the build produces 28 pages.
- Visual verification: desktop home and mobile programme inspected; 320px navigation without JavaScript is visible and does not overflow.
- Independent review: no Critical or Important findings. Considered limits are external course routing, underlying lesson contents, production deployment and operator/provider privacy facts.
- Development smoke check: local search page responds with HTTP 200; dependency discovery explicitly excludes retained legacy `src/app` files.
- Cloud configuration: tested install/start instructions saved as a draft; draft persistence does not execute scripts or publish the environment.

### Decisions carried through execution

- Keep existing course destinations and add guides under `/programma/`, following the clarification that the course is already accessible. The underlying lessons cannot be audited through the blocked proxy; no fabricated lesson bodies or counts are published.
- Use the production preview API for browser tests. This tests published assets and avoids Astro's agent-mode PID files and development toolbar affecting results.
- Preserve legacy Payload source and tests for reference while selecting only the supported Astro workflow. Restoring that old application requires its original dependencies and services.
- Describe observable static-site privacy behaviour, with provider references and operator contact, rather than asserting unverified legal completeness or retention periods.
- Git publication is authorized; Cloudflare deployment and cloud snapshot publication remain separate operations and are not inferred from a push or draft save.
