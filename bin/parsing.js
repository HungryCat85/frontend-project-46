import { cwd } from 'node:process'; // убрать, если лишнее
import { readFileSync } from 'node:fs';
import {resolve} from 'node:path'

const getExt = (s) => s.split('.').reverse()[0];

const myParse = (str) => {
  const ext = getExt(str);
  const data = readFileSync(resolve(str));
  let result;
  if (ext === 'json') result = JSON.parse(data);
  // if (ext === 'yaml') result = YA .parse(data);
  // console.log(result);
  return result;
}

export default myParse;

// console.log(cwd());
// myParse('./src/files/file1.json');
// console.log(resolve('Z:/FrontEnd/Projects/frontend-project-46/src/files/file1.json'));