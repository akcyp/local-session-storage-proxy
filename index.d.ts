declare module "createProxyStorage" {
  export default function createProxyStorage (storage_id: string, keys: any, root = window.localStorage, strict = false): any;
}
