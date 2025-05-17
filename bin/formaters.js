import fs from'fs';

const stylish = (value, replacer = ' ') => {
  const spacesCount = 4;
  const iter = (currentValue, depth) => {
  
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = currentValue.map(([key, val, ch]) => {
      let pr;
      switch (ch) {
        case '+': 
          pr = '+ ';
          break;
        case '-':
          pr = '- ';
          break;
        default: 
          pr = '  ';
      }
      const result = (val !== '') ? `${currentIndent}${pr}${key}: ` : `${currentIndent}${pr}${key}:`;
      return Array.isArray(val) ? `${result}${iter(val, depth + 1)}` : `${result}${val}`;
    });
  
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  
  const result = String(iter(value, 1));
/*
  const fileName = './__fixtures__/myResult.txt';
  fs.writeFile(fileName, result, (err) => {
    // если произошла ошибка, выбрасываем исключение
    if (err) throw err;
    // выводим сообщение об успешной записи
    console.log('Данные сохранены в файл');
  });
  */
  return result;
};

export {stylish};
