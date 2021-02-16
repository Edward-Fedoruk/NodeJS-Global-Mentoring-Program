import { createReadStream, createWriteStream, promises as fs } from 'fs';
import path from 'path';
import csv from 'csvtojson';

const csvPath = path.join(__dirname, './csv/annual-enterprise-survey-2019-financial-year-provisional-csv.csv');
const csvOutputPath = path.join(__dirname, './csv/test.txt');

// stream version
csv()
  .fromStream(createReadStream(csvPath))
  .pipe(createWriteStream(csvOutputPath));

// RAM load version
// csv()
//   .fromFile(csvPath)
//   .then(JSON.stringify)
//   .then((csvJSON) => fs.writeFile(csvOutputPath, csvJSON))
//   .catch(console.error);
