const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

test('activation deletes obsolete shell caches and preserves sibling caches', async () => {
  const handlers = {};
  const keys = new Set();
  const context = vm.createContext({
    self: { addEventListener: (name, fn) => { handlers[name] = fn; }, clients: { claim() {} } },
    caches: { keys: async () => [...keys], delete: async key => keys.delete(key) },
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../sw.js'), 'utf8'), context);
  const current = vm.runInContext('VERSION', context);
  const retained = [current, 'lift-tracker-fonts', 'zeroscroll-shell-v2'];
  for (const key of [...retained, 'lift-tracker-v1']) keys.add(key);

  let activation;
  handlers.activate({ waitUntil(promise) { activation = promise; } });
  await activation;
  assert.deepEqual([...keys], retained);
});
