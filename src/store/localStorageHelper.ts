const LS_PREFIX = "rcj-dss-vue-";

export function getFromLocalStorage(key: string) {
  return localStorage.getItem(LS_PREFIX + key);
}

export function writeToLocalStorage(key: string, value: string) {
  localStorage.setItem(LS_PREFIX + key, value);
}

export function getJsonFromLocalStorage(key: string, defaultValue = {}) {
  const value = getFromLocalStorage(key);
  try {
    const obj = JSON.parse(value || "");
    return obj || defaultValue;
  } catch {
    return defaultValue;
  }
}

export function writeJsonToLocalStorage(key: string, obj: Object) {
  const value = JSON.stringify(obj);
  writeToLocalStorage(key, value);
}
