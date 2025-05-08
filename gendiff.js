#!/usr/bin/env node

import { program } from 'commander'
import myParse from './bin/parsing.js';
import compareFiles from './bin/compare.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .argument('<file1>', 'first file')
  .argument('<file2>', 'second file')
  .action((file1, file2) => {
   // console.log((myParse(file2)));
    console.log(compareFiles(myParse(file1), myParse(file2)));
    return true;
  });

program.parse()