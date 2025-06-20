import _ from 'lodash'
import myParse from './parsers.js'

// -----------------------------------------------------------------------
const isObject = object => object !== null && typeof object === 'object'

const toAr = (obj) => {
  const ar = Object.entries(obj)
  const result = ar.reduce((acc, [key, value]) => {
    if (isObject(value)) acc.push([key, toAr(value)])
    else acc.push([key, value])
    return acc
  }, [])
  return result
}

const compareFiles = (file1, file2) => {
  const findDif = (tr01, tr02) => {
    const objEnts1 = Object.entries(tr01) // получаем массивы из объектов
    const objEnts2 = Object.entries(tr02)
    const objKeys1 = Object.keys(tr01)
    const objKeys2 = Object.keys(tr02)
    const passed = {} // добавить ключи пройденного 2-го объекта и потом по ним
    // проверять на повторное прохождение

    const resTree = objEnts1.reduce((acc, [key1, value1]) => {
      if (!objKeys2.includes(key1) && key1 !== 'FalseNullKey') {
        if (isObject(value1)) {
          acc.push([key1, toAr(value1), '-'])
        }
        else {
          acc.push([key1, value1, '-'])
        }
      }
      // else
      objEnts2.forEach(([key2, value2]) => {
      // for (const [key2, value2] of objEnts2) {
        // если key2 отсутствует в наборе ключей первого дерева
        if (!objKeys1.includes(key2) && !passed[key2]) {
          if (isObject(value2)) {
            acc.push([key2, toAr(value2), '+'])
          }
          else {
            acc.push([key2, value2, '+'])
          }
          passed[key2] = true
        }
        else
          if (key1 === key2) {
            const isObjects = isObject(value1) && isObject(value2)
            if (isObjects) {
              if (_.isEqual(value1, value2)) { // если узлы - одинаковые объекты, копируем весь узел
                acc.push([key1, toAr(value1), 0])
              }
              else {
              // если узлы - разные объекты, углубляемся в узел
                acc.push([key1, findDif(value1, value2)])
              }
            }
            else if (value1 === value2) acc.push([key1, value1, 0]) // одинаковые ключи и значения
            else { // если ключи одинаковые, а значения разные.
              if (isObject(value1)) {
                acc.push([key1, toAr(value1), '-'])
              }
              else {
                acc.push([key1, value1, '-'])
              }
              if (isObject(value2)) {
                acc.push([key2, toAr(value2), '+'])
              }
              else {
                acc.push([key2, value2, '+'])
              }
            }
          }
      })// конец цикла for

      return acc
    }, [])
      .sort(([key1], [key2]) => key1.localeCompare(key2)) // сортируем

    return resTree
  } // конец итерации findDif

  const tree1 = myParse(file1) // парсим файлы
  const tree2 = myParse(file2)

  // проверка на пустой объект первого файла
  if (Object.entries(tree1).length === 0) tree1.FalseNullKey = true
  const result = findDif(tree1, tree2)

  return result
}

export default compareFiles
