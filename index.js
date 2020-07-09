
/**
 * Work with window.localStorage, window.sessionStorage as if it were an object, using ES6 Proxy
 * @param {string} storage_id ID - key for root store
 * @param {any} keys Default values ​​for the storage, if strict mode is enabled, also defines the structure of the store
 * @param {any} root Target object, localStorage, sessionStorage or your own
 * @param {boolean} strict Set to true to prevent storage structure change
 */
function createProxyStorage (storage_id, keys, root = window.localStorage, strict = false) {
  const getStorage = () => {
    try {
      return JSON.parse(root[storage_id]);
    } catch (e) {
      return JSON.parse(JSON.stringify(keys));
    }
  };
  const updateStorage = (storage) => root[storage_id] = JSON.stringify(storage);
  const validateValue = (value) => {
    if (!['string', 'number', 'object', 'undefined', 'boolean'].includes(typeof(value)) || value instanceof Date) {
      throw new Error('ProxyStorage does not store this variable type');
    }
  };
  const createObserver = (path, storage) => {
    for (const key in storage) {
      validateValue(storage[key]);
      if (typeof storage[key] === 'object') {
        storage[key] = createObserver([...path, key], storage[key]);
      }
    }
    return new Proxy(storage, {
      get(target, name) {
        return target[name];
      },
      set(target, name, value) {
        if (strict && !(name in target) && !Array.isArray(target)) {
          throw new Error('Cannot create new property in strict mode');
        }
        if (strict && typeof target[name] === 'object') {
          throw new Error('Cannot override objects in strict mode');
        }
        validateValue(value);
        if (strict && typeof value === 'object') {
          throw new Error('Cannot create objects in strict mode');
        }
        if (typeof value === 'object') {
          target[name] = createObserver([...path, name], value);
        } else {
          target[name] = value;
        }
        updateStorage(cache);
        return true;
      },
      deleteProperty (target, name) {
        if (strict && !Array.isArray(target)) {
          throw new Error('Cannot delete properties in strict mode');
        }
        delete target[name];
        updateStorage(cache);
        return true;
      },
      defineProperty (target, name, attributes) {
        if (strict) {
          throw new Error('Cannot define properties in strict mode');
        }
        Object.defineProperty(target, name, attributes);
        return true;
      }
    });
  };
  const storage = getStorage();
  if (typeof storage !== 'object' || Array.isArray(storage)) {
    throw new Error('Invalid storage');
  }
  const cache = createObserver([], storage, storage);
  return cache;
};
module.exports = createProxyStorage;
