export const appVersion: Promise<string> = new Promise((resolve, reject) => {
  fetch("./version.txt")
    .then((response) => response.text())
    .then((versionString) => {
      const prefix = "VERSION ";
      if (versionString.startsWith(prefix)) {
        resolve(versionString.substring(prefix.length).trim());
      } else {
        throw new Error("Unexpected version string");
      }
    })
    .catch((err) => reject(err));
});
