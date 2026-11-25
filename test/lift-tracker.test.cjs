const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');
const appScript = fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];

function functionSource(name) {
  const start = appScript.indexOf('  function ' + name + '(');
  assert.ok(start >= 0, name);
  return appScript.slice(start, appScript.indexOf('\n  }', start) + 4);
}

test('zero added weight produces an active bodyweight target and set preview', () => {
  const fields = { '#warmup': { checked: false }, '#weight': { value: '' },
    '#reps': { value: '6' }, '#beat': {} };
  const state = { selected: 'Pull-up' };
  const last = { top: { weightKg: 0, reps: 5 }, sets: [{ weightKg: 0, reps: 5 }], date: '2026-01-02' };
  const example = {
    state, $: key => fields[key], lastSession: () => last,
    formDate: () => '2026-01-03', todayKey: () => '2026-01-03', setsOn: () => [],
    workingSets: entries => entries, routineTarget: () => null, activeRoutine: () => null,
    isBW: exercise => exercise === 'Pull-up', stepOf: () => 2.5,
    kgTrim: String, dayLabel: String, wt: (_, weight) => weight ? weight + ' added kg' : 'Bodyweight',
    heavier: (a, b) => a.weightKg > b.weightKg || (a.weightKg === b.weightKg && a.reps > b.reps),
    change: () => '+1 rep', setHTML: (field, html) => { field.html = html; },
  };
  vm.runInNewContext(['readForm', 'setTable', 'renderBeat'].map(functionSource).join('\n') + '\nrenderBeat();', example);
  assert.match(fields['#beat'].html, /data-w="0" data-r="6" aria-pressed="true"/);
  assert.match(fields['#beat'].html, /Bodyweight × 6<\/span><span class="sr">, next set/);
  assert.match(fields['#beat'].html, /ahead of last time/);
});

test('stall duration starts after the most recent tied best', () => {
  const exercise = 'Squat';
  const sets = [50, 55, 54, 55, 54, 53, 52].map((weightKg, index) => ({
    date: '2026-01-0' + (index + 1), weightKg, reps: 5,
  }));
  const context = {
    exerciseList: () => [exercise], setIndex: () => ({ byEx: new Map([[exercise, sets]]) }),
    todayKey: () => '2026-01-09', parse: Date.parse, DAY: 86_400_000, workingSets: entries => entries,
  };
  const comparisons = appScript.match(/^  const (?:heavier|bestSet) = .*$/gm);
  assert.equal(comparisons.length, 2);
  const result = vm.runInNewContext(comparisons.join('\n') + '\n' + functionSource('stalledLifts') + '\nstalledLifts()', context);
  assert.equal(result.length, 1);
  assert.equal(result[0].since, 3);
  assert.equal(result[0].best.date, '2026-01-04');
});

test('service worker cache includes offline pages and existing images', () => {
  const script = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  const shell = vm.runInNewContext(script.match(/const SHELL = ([\s\S]*?);/)[1]);
  assert.ok(shell.includes('about.html'));
  const about = fs.readFileSync(path.join(root, 'about.html'), 'utf8');
  for (const [, image] of about.matchAll(/"(media\/about-[^"]+\.png)"/g)) assert.ok(shell.includes(image), image);
  for (const asset of shell) fs.accessSync(path.join(root, asset));
});

function sourceBetween(first, next) {
  const start = appScript.indexOf(first);
  const end = appScript.indexOf(next, start + first.length);
  assert.ok(start >= 0 && end > start, first);
  return appScript.slice(start, end);
}

const logSource = sourceBetween('  const LOG_KEYS', '  let lastRaw');

test('storage repair preserves valid legacy sets and drops invalid dates', () => {
  const raw = JSON.stringify({
    sets: [
      { id: 4, exercise: 'Squat', date: '2024-02-29', weightKg: '42.5', reps: '6' },
      { id: 4, exercise: 'Squat', date: '2024-03-01', weightKg: 50, reps: 5 },
      { exercise: 'Squat', date: '2026-02-29', weightKg: 50, reps: 5 },
    ],
    futureSchemaField: { keep: true },
  });
  const { data, dropped } = vm.runInNewContext(logSource + '\nparseLog(raw);', { raw, newId: () => 'repaired' });
  assert.equal(dropped, 1);
  assert.equal(data.sets[0].weightKg, 42.5);
  assert.equal(data.sets[0].reps, 6);
  assert.deepEqual(Array.from(data.sets, set => set.id), ['4', 'repaired']);
  assert.equal(data.extra.futureSchemaField.keep, true);
});

test('backup merges are repeatable and roll back in memory when storage fails', () => {
  const existing = { id: 'one', exercise: 'Squat', date: '2026-01-02', weightKg: 45, reps: 5 };
  const incoming = { ...existing, id: 'two', weightKg: 50 };
  const raw = JSON.stringify({ app: 'lift-tracker', sets: [existing, incoming] });
  const state = { sets: [existing], customEx: [], routines: [], hidden: [], body: [] };
  const source = [
    logSource,
    appScript.match(/^  const importError = .*$/m)[0],
    functionSource('planBackupImport'),
    functionSource('commitBackupImport'),
    '({ planBackupImport, commitBackupImport })',
  ].join('\n');
  let fail = true;
  const api = vm.runInNewContext(source, {
    state, copyPrev() {}, save() { if (fail) throw new Error('Storage full'); },
  });
  const plan = api.planBackupImport(raw);
  assert.equal(plan.counts.added, 1);
  assert.equal(plan.counts.skipped, 1);
  assert.throws(() => api.commitBackupImport(plan), /Storage full/);
  assert.deepEqual(state.sets, [existing]);
  fail = false;
  assert.equal(api.commitBackupImport(plan).added, 1);
  assert.equal(api.planBackupImport(raw).counts.added, 0);
});

test('personal records and weekly streaks ignore warm-ups', () => {
  const workout = (id, date, weightKg, reps, warmup = false) => ({ id, date, weightKg, reps, warmup, exercise: 'Squat' });
  const sets = [
    workout('baseline', '2026-01-05', 50, 5),
    workout('record', '2026-01-12', 50, 6),
    workout('warmup', '2026-01-19', 55, 5, true),
    workout('later', '2026-01-26', 49, 6),
  ];
  const source = [
    sourceBetween('  const pad =', '  const MON ='),
    sourceBetween('  const fastOrder =', '  const setsOf ='),
    appScript.match(/^  const heavier = .*$/m)[0],
    functionSource('prIds'),
    functionSource('streakData'),
    '({ prs: prIds(), streak: streakData() })',
  ].join('\n');
  const { prs, streak } = vm.runInNewContext(source, {
    state: { sets }, DAY: 86_400_000, todayKey: () => '2026-01-28',
    workingSets: entries => entries.filter(entry => !entry.warmup),
  });
  assert.deepEqual(Array.from(prs), ['record']);
  assert.equal(streak.cur, 1);
  assert.equal(streak.longest, 2);
});

test('plate math handles exact, rounded, and below-bar totals', () => {
  const source = [
    appScript.match(/^  const PLATES = .*$/m)[0],
    functionSource('platesFor'),
    'platesFor',
  ].join('\n');
  const calculate = vm.runInNewContext(source);
  const exact = calculate(72.5, 20);
  assert.equal(exact.exact, true);
  assert.deepEqual(Array.from(exact.list), [25, 1.25]);
  const rounded = calculate(73, 20);
  assert.equal(rounded.exact, false);
  assert.equal(rounded.nearest, 72.5);
  assert.equal(calculate(15, 20).under, true);
});
