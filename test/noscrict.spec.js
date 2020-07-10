const createProxyStorage = require('..');

const localStorage = {};
const key = 'namespace';
const cache = createProxyStorage(key, {
  a: 2,
  b: 3,
  c: [4,5],
  d: {e:6},
  f: [{g:6}]
}, localStorage, false);

test('No errors in non-strict mode', () => {
  expect(() => {
    cache.a = 22;
    cache.b = 'string';
    cache.c.push(6);
    cache.d = {val: 'new prop as obj'};
  }).not.toThrow(Error);
});

test('JSON.stringify equality', () => {
  expect(JSON.stringify(cache)).toBe(localStorage[key]);
});

test('Null', () => {
  expect(() => {
    cache.a = null;
  }).not.toThrow(Error);
  expect(cache.a).toBe(null);
});

test('JSON.stringify equality', () => {
  expect(JSON.stringify(cache)).toBe(localStorage[key]);
});
