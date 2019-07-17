// Lodash init
const _get = require('lodash/get');

// Common
const typeData = require('../common/typeData');

/**
 * @name FindFilter
 * @description Get some data for right filters
 * @param {Array} filters
 * @param {Array} data
 * @return {Promise}
 * */

function filter(filters, data = []) {
  return new Promise((resolve, reject) => {
    let array = data;

    for (let i = 0; i < filters.length; i++) {
      const { key, value } = filters[i];
      let clear = [];
      for (let j = 0; j < array.length; j++) {
        const val = _get(array[j], key, '');

        if (typeData(val) === 'array') {
          for (let k = 0; k < val.length; k++) {
            if (String(val[k]).toLowerCase() === String(value).toLowerCase()) {
              clear.push(array[j]);
              break;
            }
          }
        } else {
          if (String(val).toLowerCase() === String(value).toLowerCase()) {
            clear.push(array[j]);
          }
        }
      }

      array = clear;
    }

    if (array.length === 0) {
      reject({
        status: 404,
        message: 'Not found for your request. Please write right request ;)'
      });
    } else {
      resolve(array);
    }
  });
}

module.exports = filter;
