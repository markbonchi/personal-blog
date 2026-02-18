import fs from "fs";
import { writeFile, readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url)),
  outputDir = join(__dirname, "data"),
  outputFilePath = join(outputDir, "articles.json");

// Ensures directory exists (optional but recommended)
fs.mkdirSync(outputDir, { recursive: true });

// make async edits to the entire system

// Saves JSON object to JSON file
const saveJsonFile = async (data) => {
  if (!data) data = [];
  try {
    let jsonData = JSON.stringify(data, null, 4);
    await writeFile(outputFilePath, jsonData, "utf-8");
  } catch (err) {
    console.log(`writeFile Error: ${err}`);
  }
};

// Validates presence of output file
const validatefile = (path) => {
  if (!fs.existsSync(path)) return false;
  return true;
};

// Loads JSON object from JSON file
const loadJsonFile = async () => {
  try {
    if (!validatefile(outputFilePath)) await saveJsonFile();
    const data = await readFile(outputFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(`readFile Error: ${err}`);
  }
};

export { outputFilePath, saveJsonFile, loadJsonFile };
