import stylish from './stylish.js'
import plain from './plane.js'
import jsonF from './json.js'

const formatdata = (data, format = 'stylish') => {
  // let result;
  switch (format) {
    case 'stylish': return stylish(data)
    case 'plain': return plain(data)
    case 'json': return jsonF(data)
    default: return 'No such format'
  }
}

export default formatdata
