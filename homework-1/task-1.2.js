import { promises as fs } from 'fs';
import path from 'path';
import csv from 'csvtojson';

const csvPath = path.join(__dirname, './csv/annual-enterprise-survey-2019-financial-year-provisional-csv.csv');
const csvOutputPath = path.join(__dirname, './csv/test.txt');

csv()
  .fromFile(csvPath)
  .then(JSON.stringify)
  .then((csvContent) => fs.writeFile(csvOutputPath, csvContent))
  .then(() => console.log('file moved successfully'))
  .catch(console.error);
