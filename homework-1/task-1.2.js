import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import csv from 'csvtojson';

const csvPath = path.join(__dirname, './csv/annual-enterprise-survey-2019-financial-year-provisional-csv.csv');
const csvOutputPath = path.join(__dirname, './csv/test.txt');

csv()
  .fromStream(createReadStream(csvPath))
  .pipe(createWriteStream(csvOutputPath));
