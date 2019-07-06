const fieldsFilter = require('./fields');

/**
 * @name SizeFilter
 * @description Generate new array with the given size
 * @param {Number | String} size
 * @param {Array} data
 * @param {Array} fields
 * */

function size(size, data, fields) {
  // Set new object
  let arr = [];
  let counter = size;

  if (size >= data.length && size !== 0) {
    counter = data.length;
  } else if (size === 'all') {
    counter = data.length;
  }

  for (let i = 0; i < counter; i++) {
    arr.push(fieldsFilter(fields, data[i]));
  }

  return arr;
}

module.exports = size;
