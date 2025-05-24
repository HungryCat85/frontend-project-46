import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import yaml from 'js-yaml';

const getExt = (s) => s.split('.').reverse()[0]; // получаем расширение файла

const myParse = (str) => {
  const ext = getExt(str);
  const data = readFileSync(resolve(str));

  let result;
  switch (ext) {
    case 'json': result = JSON.parse(data);
      break;
    case 'yaml': result = yaml.load(data) ?? {};
      break;
    case 'yml': result = yaml.load(data) ?? {};
      break;
    default: result = 'File extension is not supported!';
  }

  return result;
};

export default myParse;
