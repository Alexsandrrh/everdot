const fieldsFilter = require('./fieldsFilter');

/**
 * @name SizeFilter
 * @description Generate new array with the given size
 * @param {number} size
 * @param {array} data
 * */

function sizeFilter(size, data, fields) {
  // Set new object
  let arr = [];

  if (size >= data.length && size !== 0) {
    return data;
  } else {
    for (let i = 0; i < size; i++) {
      arr.push(fieldsFilter(fields, data[i]));
    }
    return arr;
  }
}

module.exports = sizeFilter;
