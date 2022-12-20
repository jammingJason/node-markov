/** Command-line tool to generate Markov text. */
// const newMM = require('./markov.js');

import { MarkovMachine } from './markov.js';
// const vjc = new MarkovMachine('This is the hat that the cat had in the bag.');
// console.log(vjc.makeText());
import fs from 'fs';
import axios from 'axios';

const argv = process.argv;
let strPath = argv[argv.length - 1];
const whichWay = argv[2];

if (whichWay === 'file') {
  getFileContents(strPath);
} else if (whichWay === 'url') {
  getUrlContents(strPath);
  //   console.log('URL');
}

async function getUrlContents(path) {
  // console.log(path);
  await axios
    .get(path)
    .then((resp) => {
      const mm = new MarkovMachine(resp.data);
      console.log(mm.makeText());
      // console.log(data.data);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

async function getFileContents(path) {
  await fs.readFile(`./${path}`, 'utf-8', (err, data) => {
    if (err) {
      console.log('You have hit an ERROR : ', err);
      process.exit(1);
    } else {
      const mm = new MarkovMachine(data);
      console.log(mm.makeText());
    }
  });
}

function writToFile(nameOfFile, content) {
  fs.appendFile(
    `./${nameOfFile}`,
    content,
    { encoding: 'utf-8', flag: 'a' },
    (err) => {
      if (err) {
        console.log('ERROR : ', err);
        process.exit(1);
      }
      console.log('IT WORKED');
    }
  );
}
