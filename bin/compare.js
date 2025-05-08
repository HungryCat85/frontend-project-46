
const compareFiles = (file1, file2) => {
  const file2Ar = Object.entries(file2);
  const compare01 = Object.entries(file1)
    .reduce((acc, [key1, value1]) => {
      if (!file2[key1]) {
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
    if (!file1[key2]) {
      acc.push([key2, value2, ' + ']);
      return acc;
    };
    return acc
    }, compare01)
    .sort(([key1, ...value1], [key2, ...value2]) => key1.localeCompare(key2))
    .map(([key, value, res]) => `${res} ${key}: ${value}`)
    .join('\n ');
  console.log(file1);
  console.log(file2);
  return `{\n ${result} \n}`;
};

export default compareFiles;