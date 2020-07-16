# local-session-storage-proxy

Work with window.localStorage, window.sessionStorage as if it were an object, using ES6 Proxy

## Installation

```bash
npm i local-session-storage-proxy
```

## Get Started

```js
// ES6 modules with Babel or TypeScript
import createProxyStorage from 'local-session-storage-proxy';

// CommonJS modules
const createProxyStorage = require('local-session-storage-proxy');

const storage = createProxyStorage('namespace', {
  exampleProp: 42,
  exampleArr: []
});

storage.exampleProp = 1024;
storage.exampleArr.push('Hello world');

console.log(window.localStorage['namespace']);
// "{"exampleProp":1024,"exampleArr":["Hello world"]}"
```

## Syntax

```ts
const cache = createProxyStorage(storage_id: string, keys: any, root = window.localStorage, strict = false); // Returns proxy object
```

Options:

- `storage_id` ID - key for root store
- `keys` Default values ​​for the storage, if strict mode is enabled, also defines the structure of the store
- `root` Target object, localStorage, sessionStorage or your own
- `strict` Set to true to prevent storage structure change

## Examples

- SessionStorage usage

```js
const createProxyStorage = require('local-session-storage-proxy');
const storage = createProxyStorage('namespace', {
  exampleProp: 42,
  exampleArr: []
}, window.sessionStorage);

```

- Strict mode

```js
const createProxyStorage = require('local-session-storage-proxy');
const storage = createProxyStorage('namespace', {
  a: 42,
  b: {
    c: 1
  }
}, window.localStorage, true);

storage.b = {}; // ERROR!
storage.b.c = 2; // OK
storage.b.e = 'new value?'; // ERROR!
```

- No strict mode

```js
const createProxyStorage = require('local-session-storage-proxy');
const storage = createProxyStorage('namespace', {
  a: 42,
  b: {
    c: 1
  }
}, window.localStorage, false);

storage.b = {}; // OK
storage.b.c = 2; // OK
storage.b.e = 'new value?'; // OK
```
