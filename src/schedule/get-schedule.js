// node.js script to fetch most recent data from rcj-server
const http = require("http"); // eslint-disable-line
const https = require("https"); // eslint-disable-line
const fs = require("fs"); // eslint-disable-line
const path = require("path"); // eslint-disable-line

const serverUrl = "http://localhost:5000/schedule/json/";
console.log("Fetching schedule data from", serverUrl);
const jsonFiles = ["teams.json", "events.json", "competitions.json", "arenas.json", "scheduled-runs.json"];

const httpModule = serverUrl.startsWith("https://") ? https : http;

async function fetchAndSaveJsonFiles() {
  const data = [];
  for (const file of jsonFiles) {
    data.push(await get(serverUrl + file));
  }
  // check that all jsons were fetched correctly
  try {
    data.map((fileContent) => JSON.parse(fileContent));
  } catch (error) {
    console.log(error);
    throw "Failed to parse JSONs";
  }
  // write to files
  await Promise.all(jsonFiles.map((file, i) => writeFile(file, data[i])));

  await writeFile(
    "_timestamp.json",
    JSON.stringify(
      {
        time: Date.now(),
      },
      null,
      2
    )
  );
  await writeFile(
    "_computed.json",
    JSON.stringify(
      {
        ...JSON.parse(data[jsonFiles.findIndex((name) => name === "scheduled-runs.json")]).reduce((data, run) => {
          return {
            rounds: Math.max(data.rounds || 0, run.round),
          };
        }),
      },
      null,
      2
    )
  );
}

fetchAndSaveJsonFiles().catch(console.log);

// helpers
async function get(url) {
  return new Promise((resolve, reject) => {
    const req = httpModule.request(
      url,
      {
        Connection: "keep-alive",
      },
      (res) => {
        //console.log(res.statusCode);
        res.on("data", (d) => {
          const data = d; //.toString();
          resolve(data);
        });
      }
    );

    req.on("error", (error) => {
      console.error(error);
      reject(error);
    });

    req.end();
  });
}

async function writeFile(filename, content) {
  const filepath = path.join(__dirname, filename);
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, content, "utf8", function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
