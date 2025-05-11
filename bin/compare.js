
import myParse from './parsers.js';

const compareFiles = (f1, f2) => {
  const file1 = myParse(f1);  // парсим файлы
  const file2 = myParse(f2);
  const file1Ar = Object.entries(file1);  // преобразуем объект в массив
  const file2Ar = Object.entries(file2);

  const compare01 = file1Ar
    .reduce((acc, [key1, value1]) => {
      if (!file2[key1] && file2[key1] !== false) {
        acc.push([key1, value1, ' - '])
        return acc;
      }
      if (file2[key1] !== value1) {
        acc.push(([key1, value1, ' - ']));
        acc.push(([key1, file2[key1], ' + ']));
        return acc;
      }
      acc.push([key1, value1, '   ']);
      return acc;
    }, []);
  
  const result = file2Ar.reduce((acc, [key2, value2]) => {
    if (!file1[key2] && file1[key2] !== false) {
      acc.push([key2, value2, ' + ']);
      return acc;
    };
    return acc
    }, compare01)
    .sort(([key1, ...value1], [key2, ...value2]) => key1.localeCompare(key2))
    .map(([key, value, res]) => `${res}${key}: ${value}`)
    .join('\n ');

  return `{\n ${result}\n}`;
};

export default compareFiles;