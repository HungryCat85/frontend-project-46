import { readFileSync } from 'node:fs';
import {resolve} from 'node:path'

const getExt = (s) => s.split('.').reverse()[0];

const myParse = (str) => {
  const ext = getExt(str);
  const data = readFileSync(resolve(str));
  let result;
  if (ext === 'json') result = JSON.parse(data);

  return result;
}

export default myParse; 
