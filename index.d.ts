declare module "createProxyStorage" {
  export default function createProxyStorage<T = {}>(storage_id: string, keys: T = {}, root = window.localStorage, strict = false): T;
}
