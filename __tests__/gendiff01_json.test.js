import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import { jest } from '@jest/globals'
import genDiff from '../src/index.js'

const filename1 = fileURLToPath(import.meta.url)
const dirname1 = path.dirname(filename1)

const myDirname = filename => path.join(dirname1, '..', '__fixtures__', filename)

afterEach(() => {
  // process.argv = originalArgv; // restore original argv
  jest.resetModules() // clear require cache
})

test('json01', () => {
  const file1 = myDirname('file01.json')
  const file2 = myDirname('file02.json')
  const expected01 = fs.readFileSync(myDirname('result01.txt'), 'utf-8')
  const diff = genDiff(file1, file2, 'stylish')
  expect(diff).toEqual(expected01)
})

test('json02', () => {
  const file1 = myDirname('file01.json')
  const file2 = myDirname('file03.json')
  const expected01 = fs.readFileSync(myDirname('result02.txt'), 'utf-8')
  const diff = genDiff(file1, file2, 'stylish')
  expect(diff).toEqual(expected01)
})

test('json03', () => {
  const file1 = myDirname('file03.json')
  const file2 = myDirname('file01.json')
  const expected01 = fs.readFileSync(myDirname('result03.txt'), 'utf-8')
  const diff = genDiff(file1, file2, 'stylish')
  expect(diff).toEqual(expected01)
})

test('json04', () => {
  const file1 = myDirname('file11.json')
  const file2 = myDirname('file12.json')
  const expected01 = fs.readFileSync(myDirname('result11.txt'), 'utf-8')
  const diff = genDiff(file1, file2, 'stylish')
  expect(diff).toEqual(expected01)
})

test('json_plain01', () => {
  const file1 = myDirname('file11.json')
  const file2 = myDirname('file12.json')
  const expected01 = fs.readFileSync(myDirname('result_plain01.txt'), 'utf-8')
  const diff = genDiff(file1, file2, 'plain')
  expect(diff).toEqual(expected01)
})

test('json_plain02', () => {
  const file1 = myDirname('file12.json')
  const file2 = myDirname('file11.json')
  const expected01 = fs.readFileSync(myDirname('result_plain02.txt'), 'utf-8')
  const diff = genDiff(file1, file2, 'plain')
  expect(diff).toEqual(expected01)
})

test('json_json01', () => {
  const file1 = myDirname('file11.json')
  const file2 = myDirname('file12.json')
  const expected01 = fs.readFileSync(myDirname('result_json01.txt'), 'utf-8')
  const diff = genDiff(file1, file2, 'json')
  expect(diff).toEqual(expected01)
})

test('json_json02', () => {
  const file1 = myDirname('file12.json')
  const file2 = myDirname('file11.json')
  const expected01 = fs.readFileSync(myDirname('result_json02.txt'), 'utf-8')
  const diff = genDiff(file1, file2, 'json')
  expect(diff).toEqual(expected01)
})
