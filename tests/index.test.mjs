import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('run reference', () => {
  assert.deepEqual(api.lineRuns([0, 1, 1, 0, 1, 0, 1, 1, 1]), [2, 1, 3]);
});
test('candidate placements', () => {
  assert.deepEqual(api.nonogramCandidates(3, [2]), [
    [1, 1, 0],
    [0, 1, 1],
  ]);
});
test('empty and impossible clues', () => {
  assert.deepEqual(api.nonogramCandidates(0, []), [[]]);
  assert.deepEqual(api.nonogramCandidates(3, []), [[0, 0, 0]]);
  assert.deepEqual(api.nonogramCandidates(3, [2, 2]), []);
});
test('consensus unknowns', () => {
  assert.deepEqual(
    api.nonogramConsensus([
      [1, 1, 0],
      [0, 1, 1],
    ]),
    [-1, 1, -1],
  );
});
test('budgets and invalid clues', () => {
  assert.throws(() => api.nonogramCandidates(10, [1], 9));
  assert.throws(() => api.nonogramCandidates(65, []));
  assert.throws(() => api.lineRuns([1, 2]));
  assert.throws(() => api.nonogramConsensus([]));
});
test('exhaustive binary-line oracle', () => {
  for (let n = 0; n <= 8; n++) {
    const groups = new Map();
    for (let mask = 0; mask < 2 ** n; mask++) {
      const line = Array.from({ length: n }, (_, i) => (mask >> i) & 1),
        key = api.lineRuns(line).join();
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(line);
    }
    for (const [key, rows] of groups) {
      const c = api.nonogramCandidates(n, key ? key.split(',').map(Number) : []);
      assert.deepEqual(c.map((x) => x.join()).sort(), rows.map((x) => x.join()).sort());
    }
  }
});
