const fs = require("fs-extra");
const path = require("path");
const apiFolder = path.resolve("./src/api");
const checkApiFolder = fs.ensureDir(apiFolder);
const apiFiles = fs.readdirSync(apiFolder);
const template = `
"use strict";
module.exports = {}
`;
const opts = [
  "service.js",
  "rounte.js",
  "controller.js",
  "schema.js",
  "middleware.js",
];

if (checkApiFolder && apiFiles.length) {
  for (const file of apiFiles) {
    for (const opt of opts) {
      fs.outputFile(`${apiFolder}/${file}/${file}.${opt}`, template).catch(
        (err) => {
          console.error(err);
        }
      );
    }
  }
  process.exit(1);
} else {
  console.error(
    "No folder found, please create a folder component inside ./src/api/"
  );
  process.exit(1);
}
