const createProxyStorage = require('..');

const localStorage = {};
const key = 'namespace';
const cache = createProxyStorage(key, {
  a: 2,
  b: 3,
  c: [4,5],
  d: {e:6},
  f: [{g:6}]
}, localStorage, true);


test('strict mode', () => {
  expect(() => {
    cache.a = [];
  }).toThrow(Error);
});
