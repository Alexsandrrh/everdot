const typeData = require('./typeData');

/**
 * @name AnalyserObject
 * @description Generate all schema current object
 * @param {Object} object
 * @return {Object}
 * */

function analizerObject(object) {
  let obj = {};

  for (let key in object) {
    const item = object[key];
    const type = typeData(item);

    if (type === 'array') {
      obj[key] = [analyzerArray(item)];
    } else {
      obj[key] = type;
    }
  }

  return obj;
}

/**
 * @name AnalyserArray
 * @description Generate all schema current object
 * @param {Array} array
 * @return {Object}
 * */

function analyzerArray(array) {
  const item = array[0];
  const type = typeData(item);

  if (type === 'object') {
    return analizerObject(item);
  } else {
    return type;
  }
}

/**
 * @name AnalyserSchema
 * @description Generate schema
 * @param {String} type
 * @param {String} example
 * @return {Object}
 * */

function analyserSchema(type, example) {
  return {
    type,
    example
  };
}

module.exports = analizerObject;
