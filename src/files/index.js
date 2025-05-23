import compareFiles from '../../bin/compare.js';
import { formatdata } from '../../formatters/index.js'

const gendiff = (file1, file2, format = 'stylish') => {
  return formatdata(compareFiles((file1), (file2)), format);
}

export default gendiff;