import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import { parse, TYPE } from '@formatjs/icu-messageformat-parser';

const directory = new URL('./catalogs/', import.meta.url);

function argumentsIn(ast, result = new Set()) {
  for (const token of ast) {
    if (token.type !== TYPE.literal && token.type !== TYPE.pound) result.add(`${token.type}:${token.value}`);
    if (token.children) argumentsIn(token.children, result);
    if (token.options) {
      for (const option of Object.values(token.options)) argumentsIn(option.value, result);
    }
  }
  return result;
}

async function readCatalog(file) {
  const catalog = JSON.parse(await readFile(new URL(file, directory), 'utf8'));
  assert.ok(catalog && typeof catalog === 'object' && !Array.isArray(catalog), `${file}: expected a catalog object`);
  return new Map(Object.entries(catalog).map(([id, entry]) => {
    const context = `${file}: ${id}`;
    const value = entry?.defaultMessage;
    assert.ok(typeof value === 'string' && value.trim(), `${context}: missing message`);
    assert.ok(entry.description === undefined || typeof entry.description === 'string', `${context}: invalid description`);
    let ast;
    assert.doesNotThrow(() => { ast = parse(value); }, `${context}: invalid ICU syntax`);
    if (id === 'settings.title' || id.startsWith('native.')) {
      assert.ok(value.length <= 200 && !/[\r\n]/u.test(value), `${context}: expected a short, single line`);
      assert.doesNotMatch(value.replaceAll('{name}', ''), /[{}]/u, context);
      assert.ok(ast.every(token => token.type === TYPE.literal ||
        (token.type === TYPE.argument && token.value === 'name')), `${context}: unsupported native formatting`);
      if (id === 'native.window.ExitFullscreen') assert.equal(value.split('{name}').length, 2, context);
    }
    return [id, argumentsIn(ast)];
  }));
}

const source = await readCatalog('en.json');
assert.ok(source.size > 0, 'The English source catalog is empty');

for (const file of (await readdir(directory)).filter(name => name.endsWith('.json')).sort()) {
  test(`${file} preserves valid messages and source arguments`, async () => {
    if (file === 'en.json') return;
    for (const [id, args] of await readCatalog(file)) {
      assert.ok(source.has(id), `${file}: unknown message ${id}`);
      assert.deepEqual(args, source.get(id), `${file}: different arguments in ${id}`);
    }
  });
}
