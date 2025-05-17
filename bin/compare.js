import _ from 'lodash';
import myParse from './parsers.js';


// -----------------------------------------------------------------------
const isObject = (object) => {
  return object !== null && typeof object === "object";
};

const toAr = (obj) => {
  const ar = Object.entries(obj);
  const result = ar.reduce((acc, [key, value]) => {
    if (isObject(value)) acc.push([key, toAr(value)])
      else acc.push([key, value]);
    return acc;
  }, []);
  return result;
};

const compareFiles = (file1, file2) => {
  
  const findDif = (tr01, tr02) => {
    const objEnts1 = Object.entries(tr01);  // получаем массивы из объектов
    const objEnts2 = Object.entries(tr02);
    const objKeys1 = Object.keys(tr01);
    const objKeys2 = Object.keys(tr02);
    const passed = {}; // добавить ключи пройденного 2-го объекта и потом по ним проверять на повторное прохождение

    

    const resTree = objEnts1.reduce((acc, [key1, value1]) => {
      if (!objKeys2.includes(key1) && key1 !== 'FalseNullKey') isObject(value1) ? acc.push([key1, toAr(value1), '-']) : acc.push([key1, value1, '-']);
      //else 
      for (const [key2, value2] of objEnts2) {
        if (!objKeys1.includes(key2) && !passed[key2]) {  // если key2 отсутствует в наборе ключей первого дерева
          isObject(value2) ? acc.push([key2, toAr(value2), '+']) : acc.push([key2, value2, '+']);
          passed[key2] = true;
        } else
        if (key1 === key2) {
          const isObjects = isObject(value1) && isObject(value2);
          if (isObjects) {
            if (_.isEqual(value1, value2)) {  // если узлы - одинаковые объекты, копируем весь узел
              acc.push( [key1, toAr(value1), 0]);
            } else {                          
              acc.push( [key1, findDif(value1, value2), 0]); // если узлы - разные объекты, углубляемся в узел
            } 
          } else if (value1 === value2) acc.push([key1, value1, 0]) // одинаковые ключи и значения
            else {  // если ключи одинаковые, а значения разные.
              isObject(value1) ? acc.push([key1, toAr(value1), '-']) : acc.push([key1, value1, '-']);
              isObject(value2) ? acc.push([key2, toAr(value2), '+' ]) : acc.push([key2, value2, '+']);
            }
        }
        
      } // конец цикла for
      
      return acc;
    }, []).sort(([key1, ...value1], [key2, ...value2]) => key1.localeCompare(key2)); // сортируем по ключу
    
    return resTree;
  }  // конец итерации findDif

  const tree1 = myParse(file1);  // парсим файлы
  const tree2 = myParse(file2);

  if (Object.entries(tree1).length === 0) tree1.FalseNullKey = true; // проверка на пустой объект первого файла
  const result = findDif(tree1, tree2);

  return result;
};


export default compareFiles;