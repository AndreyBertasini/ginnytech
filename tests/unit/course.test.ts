import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

async function catalogue() {
  assert.ok(existsSync(new URL('../../src/data/course.ts', import.meta.url)), 'The course needs one shared catalogue');
  return import('../../src/data/course.ts');
}

test('all original module URLs remain unique and available', async () => {
  const { modules } = await catalogue();
  assert.equal(modules.length, 19);
  assert.equal(new Set(modules.map(m => m.slug)).size, 19);
  for (let id = 1; id <= 19; id++) {
    const module = modules.find(m => m.id === id);
    assert.equal(module?.slug, `modulo-${id}`);
    assert.ok(module?.outcomes.length && module?.topics.length && module?.practice.deliverable);
  }
});

test('study stages cover each module once with prerequisites first', async () => {
  const { modules, stages } = await catalogue();
  const order = stages.flatMap(stage => stage.moduleIds);
  assert.equal(new Set(order).size, 19);
  assert.equal(order.length, 19);
  for (const module of modules) {
    for (const prerequisite of module.prerequisiteIds) {
      assert.ok(order.indexOf(prerequisite) >= 0, `Unknown prerequisite ${prerequisite}`);
      assert.ok(order.indexOf(prerequisite) < order.indexOf(module.id), `Prerequisite ${prerequisite} must precede ${module.id}`);
    }
  }
});

test('both specializations include the shared foundation and valid dependencies', async () => {
  const { modules, learningPaths } = await catalogue();
  assert.equal(learningPaths.length, 2);
  for (const path of learningPaths) {
    assert.equal(new Set(path.moduleIds).size, path.moduleIds.length);
    for (const id of [1, 3, 14, 15, 9, 16, 7]) assert.ok(path.moduleIds.includes(id));
    for (const id of path.moduleIds) {
      const module = modules.find(m => m.id === id);
      assert.ok(module);
      for (const prerequisite of module.prerequisiteIds) {
        assert.ok(path.moduleIds.indexOf(prerequisite) < path.moduleIds.indexOf(id));
        assert.ok(path.moduleIds.includes(prerequisite));
      }
    }
  }
});

test('advanced SQL states the basic SQL knowledge required before study', async () => {
  const { modules } = await catalogue();
  const sql = modules.find(m => m.id === 14)!;
  assert.match(sql.priorKnowledge, /SELECT/);
  assert.match(sql.priorKnowledge, /JOIN/);
});

test('search matches titles, descriptions and technical aliases regardless of accents or case', async () => {
  const { findModules } = await catalogue();
  assert.ok(findModules('SQL').some(m => m.id === 14));
  assert.ok(findModules('  DBT  ').some(m => m.id === 16));
  assert.deepEqual(findModules('probabilita').map(m => m.id), findModules('probabilità').map(m => m.id));
  assert.ok(findModules('magazzino dati').some(m => m.id === 9));
});

test('search preserves programme order, handles multiword queries and clearly returns no matches', async () => {
  const { modules, findModules } = await catalogue();
  assert.deepEqual(findModules('   ').map(m => m.id), modules.map(m => m.id));
  assert.deepEqual(findModules('termine-inesistente-xyz'), []);
  assert.ok(findModules('test statistica').some(m => m.id === 17));
});
