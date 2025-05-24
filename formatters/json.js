const makeObj = (data) => { // строим дерево объектов из массива
  const iter = (value) => {
    let resultIter;
    if (Array.isArray(value)) {
      resultIter = value.reduce((acc, [prop, val, ch]) => {
        acc[prop] = iter(val);
        return acc;
      }, {});
    } else resultIter = value;
    return resultIter;
  };
  const result = iter(data);
  return result;
};

const jsonF = (valueFull) => {
  const iter = (value) => {
    const result = value
      .reduce((obj, [prop, val, ch], index, fullArray) => {
        let curVal;
        let difProp;
        switch (ch) {
          case 0:
            obj[prop] = { unchanged: val };
            return obj;
          case '+': // если параметр был добавлен
            if (index > 0) difProp = fullArray[index - 1][0];
            if (difProp !== prop) {
              curVal = makeObj(val);
              obj[prop] = { added: makeObj(val) };
            }
            return obj;
          case '-':
            // сравниваем параметр со следующим
            if (index + 2 <= fullArray.length) difProp = fullArray[index + 1][0];
            if (difProp !== prop) obj[prop] = { removed: makeObj(val) }; // если параметр был удалён
            else {
              curVal = makeObj(val);
              // если параметр был изменён
              obj[prop] = {
                before: curVal,
                after: makeObj(fullArray[index + 1][1]),
              };
            }
            return obj;
          default: // если параметр - дерево с внутренними изменениями
            if (Array.isArray(val)) obj[prop] = iter(val);
            return obj;
        }
      }, {});
    return result;
  };
  const result = JSON.stringify(iter(valueFull));

  return (result);
};

export default jsonF;
