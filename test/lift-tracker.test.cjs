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
