const plain = (valuefull) => {
  const checkArray = (data) => { // обрабатывам значение: комплексное, строковое или иное
    let result;
    if (Array.isArray(data)) result = '[complex value]';
    else if ((typeof data) === 'string') result = `'${data}'`;
    else result = data;
    return result;
  };

  const iter = (value, curProp = '') => {
    const result = value.filter(([prop, val, ch]) => ch !== '0') // отфильтровываем значения без изменений
      .reduce((str, [prop, val, ch], index, fullArray) => {
        const newProp = (curProp !== '') ? `${curProp}.${prop}` : prop; // собираем полный путь из названий параметров
        let curVal;
        let difProp;
        let curLine = '';
        switch (ch) {
          case '+': // если параметр был добавлен
            if (index > 0) difProp = fullArray[index - 1][0];
            if (difProp !== prop) {
              curVal = checkArray(val);
              curLine = `Property '${newProp}' was added with value: ${curVal}`;
              str.push(curLine);
            }
            return str;
          case '-':
            // сравниваем параметр с предыдущим
            if (index + 2 <= fullArray.length) difProp = fullArray[index + 1][0];
            if (difProp !== prop) curLine = `Property '${newProp}' was removed`; // если параметр был удалён
            else {
              curVal = checkArray(val);
              curLine = `Property '${newProp}' was updated. From ${curVal} to ${checkArray(fullArray[index + 1][1])}`; // если параметр был изменён
            }
            str.push(curLine);
            return str;
          default: // если параметр - дерево с внутренними изменениями
            if (Array.isArray(val)) str.push(iter(val, newProp));
            return str;
        }
      }, [])
      .join('\n');
    return result;
  };
  const result = iter(valuefull);

  return result;
};

export default plain;
