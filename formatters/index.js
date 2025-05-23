import { stylish } from './stylish.js'
import { plain } from './plane.js'

const formatdata = (data, format = 'stylish') => {
  // let result;
  switch (format) {
    case 'stylish': return stylish(data);
    case 'plain': return plain(data);
    default: return 'No such format';
  }
};

export {formatdata};
