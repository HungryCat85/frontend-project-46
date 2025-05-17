import compareFiles from '../bin/compare.js';
import * as formaters from '../bin/formaters.js'
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

test('yaml01', () => {
  const file1 = myDirname('file01.yaml');
  const file2 = myDirname('file02.yml');
  const expected01 = fs.readFileSync(myDirname('result01.txt'), 'utf-8');
  const diff = compareFiles((file1), (file2));
  expect(formaters.stylish(diff)).toEqual(expected01);
});

test('yaml02', () => {
  const file1 = myDirname('file01.yaml');
  const file2 = myDirname('file03.yaml');
  const expected01 = fs.readFileSync(myDirname('result02.txt'), 'utf-8');
  const diff = compareFiles((file1), (file2));
  expect(formaters.stylish(diff)).toEqual(expected01);
});

test('yaml03', () => {
  const file1 = myDirname('file03.yaml');
  const file2 = myDirname('file01.yaml');
  const expected01 = fs.readFileSync(myDirname('result03.txt'), 'utf-8');
  const diff = compareFiles((file1), (file2));
  expect(formaters.stylish(diff)).toEqual(expected01);
});

test('yaml04', () => {
  const file1 = myDirname('file11.yml');
  const file2 = myDirname('file12.yaml');
  const expected01 = fs.readFileSync(myDirname('result11.txt'), 'utf-8');
  const diff = compareFiles((file1), (file2));
  expect(formaters.stylish(diff)).toEqual(expected01);
});