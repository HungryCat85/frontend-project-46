import compareFiles from '../bin/compare.js';
import { fileURLToPath } from 'url'
import fs from 'fs';
import path from 'path';
import {jest} from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const myDirname = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

afterEach(() => {
  // process.argv = originalArgv; // restore original argv
  jest.resetModules(); // clear require cache
});

test('json01', () => {
  const file1 = myDirname('file01.json');
  const file2 = myDirname('file02.json');
  const expected01 = fs.readFileSync(myDirname('result01.txt'), 'utf-8');

  expect(compareFiles(file1, file2)).toEqual(expected01);
});

test('json02', () => {
  const file1 = myDirname('file01.json');
  const file2 = myDirname('file03.json');
  const expected01 = fs.readFileSync(myDirname('result02.txt'), 'utf-8');

  expect(compareFiles(file1, file2)).toEqual(expected01);
});

test('json03', () => {
  const file1 = myDirname('file03.json');
  const file2 = myDirname('file01.json');
  const expected01 = fs.readFileSync(myDirname('result03.txt'), 'utf-8');

  expect(compareFiles(file1, file2)).toEqual(expected01);
});