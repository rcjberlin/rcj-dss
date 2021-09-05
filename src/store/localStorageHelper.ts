const LS_PREFIX = "rcj-dss-vue-";

export function getFromLocalStorage(key: string): string | null {
  return localStorage.getItem(LS_PREFIX + key);
}

export function writeToLocalStorage(key: string, value: string): void {
  localStorage.setItem(LS_PREFIX + key, value);
}

export function getJsonFromLocalStorage(key: string, defaultValue = {}): Object { // eslint-disable-line
  const value = getFromLocalStorage(key);
  try {
    const obj = JSON.parse(value || "");
    return obj || defaultValue;
  } catch {
    return defaultValue;
  }
}

export function writeJsonToLocalStorage(key: string, obj: Object): void { // eslint-disable-line
  const value = JSON.stringify(obj);
  writeToLocalStorage(key, value);
}
