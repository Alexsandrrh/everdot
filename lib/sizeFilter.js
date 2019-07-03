const fieldsFilter = require('./fieldsFilter');

/**
 * @name SizeFilter
 * @description Generate new array with the given size
 * @param {number} size
 * @param {array} data
 * @param {array} fields
 * */

function sizeFilter(size, data, fields) {
  // Set new object
  let arr = [];
  let counter = size;

  if (size >= data.length && size !== 0) {
    counter = data.length;
  }

  for (let i = 0; i < counter; i++) {
    arr.push(fieldsFilter(fields, data[i]));
  }
  return arr;
}

module.exports = sizeFilter;
